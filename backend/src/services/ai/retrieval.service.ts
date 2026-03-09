// retrieval.service.ts - Pipeline truy xuất: Dynamic Top-K, Hybrid Search, MMR
import { getEmbedding, cosineSimilarity } from './embedding.service';
import { searchVector, type ScoredChunk } from './qdrant.service';
import { bm25Search, getBM25IndexSize } from './bm25.service';
import { rerankChunks } from './reranker.service';

// ─────────────────────────────────────────────
// 1. DYNAMIC TOP-K
// ─────────────────────────────────────────────

type QueryComplexity = 'simple' | 'medium' | 'complex';

/**
 * Phân tích độ phức tạp câu hỏi dựa trên độ dài và từ khóa
 */
export function detectQueryComplexity(query: string): QueryComplexity {
    const wordCount = query.trim().split(/\s+/).length;
    const complexPatterns = /so sánh|phân tích|giải thích chi tiết|tổng hợp|đánh giá|compare|analyse|analyze|explain in detail/i;
    const simplePatterns = /là gì|what is|giá bao nhiêu|how much|bao giờ|when/i;

    if (wordCount <= 5 && simplePatterns.test(query)) return 'simple';
    if (wordCount >= 15 || complexPatterns.test(query)) return 'complex';
    return 'medium';
}

/**
 * Chọn số lượng chunk cần retrieve dựa trên độ phức tạp
 */
export function dynamicTopK(complexity: QueryComplexity): number {
    const map: Record<QueryComplexity, number> = {
        simple: 3,
        medium: 7,
        complex: 15,
    };
    return map[complexity];
}

// ─────────────────────────────────────────────
// 2. HYBRID SEARCH (Vector + BM25)
// ─────────────────────────────────────────────

/**
 * Kết hợp kết quả từ Vector search và BM25 bằng Reciprocal Rank Fusion (RRF)
 */
export async function hybridSearch(
    query: string,
    topK: number
): Promise<ScoredChunk[]> {
    const queryEmbedding = await getEmbedding(query);

    // Lấy kết quả từ cả 2 nguồn
    const [vectorResults, bm25Results] = await Promise.all([
        searchVector(queryEmbedding, topK * 2),
        getBM25IndexSize() > 0 ? Promise.resolve(bm25Search(query, topK * 2)) : Promise.resolve([]),
    ]);

    // RRF (Reciprocal Rank Fusion) để kết hợp
    const k = 60; // constant
    const scores = new Map<string, { chunk: ScoredChunk; rrf: number }>();

    vectorResults.forEach((chunk, rank) => {
        const rrf = 1 / (k + rank + 1);
        if (!scores.has(chunk.id)) {
            scores.set(chunk.id, { chunk, rrf });
        } else {
            scores.get(chunk.id)!.rrf += rrf;
        }
    });

    bm25Results.forEach((result, rank) => {
        const rrf = 1 / (k + rank + 1);
        if (!scores.has(result.id)) {
            scores.set(result.id, {
                chunk: { id: result.id, text: result.text, score: result.score },
                rrf,
            });
        } else {
            scores.get(result.id)!.rrf += rrf;
        }
    });

    // Sắp xếp theo điểm RRF
    return Array.from(scores.values())
        .sort((a, b) => b.rrf - a.rrf)
        .slice(0, topK)
        .map(({ chunk, rrf }) => ({ ...chunk, score: rrf }));
}

// ─────────────────────────────────────────────
// 3. MMR - Maximal Marginal Relevance
// ─────────────────────────────────────────────

/**
 * Áp dụng MMR để đa dạng hóa kết quả retrieval
 * lambda = 0 → đa dạng tối đa; lambda = 1 → relevance tối đa
 */
export async function applyMMR(
    chunks: ScoredChunk[],
    queryEmbedding: number[],
    lambda: number = 0.6,
    topN: number = 5
): Promise<ScoredChunk[]> {
    if (chunks.length <= topN) return chunks;

    // Lấy embedding của tất cả chunks
    const embeddingsMap = new Map<string, number[]>();
    for (const chunk of chunks) {
        try {
            const emb = await getEmbedding(chunk.text);
            embeddingsMap.set(chunk.id, emb);
        } catch {
            // skip nếu không lấy được embedding
        }
    }

    const selected: ScoredChunk[] = [];
    const remaining = [...chunks];

    while (selected.length < topN && remaining.length > 0) {
        let bestIdx = 0;
        let bestScore = -Infinity;

        for (let i = 0; i < remaining.length; i++) {
            const chunk = remaining[i];
            const chunkEmb = embeddingsMap.get(chunk.id);
            if (!chunkEmb) continue;

            const relevance = cosineSimilarity(queryEmbedding, chunkEmb);

            let maxSim = 0;
            for (const sel of selected) {
                const selEmb = embeddingsMap.get(sel.id);
                if (selEmb) {
                    maxSim = Math.max(maxSim, cosineSimilarity(chunkEmb, selEmb));
                }
            }

            const mmrScore = lambda * relevance - (1 - lambda) * maxSim;
            if (mmrScore > bestScore) {
                bestScore = mmrScore;
                bestIdx = i;
            }
        }

        selected.push(remaining.splice(bestIdx, 1)[0]);
    }

    return selected;
}

// ─────────────────────────────────────────────
// 4. FULL PIPELINE: Build Context cho LLM
// ─────────────────────────────────────────────

export interface RetrievalResult {
    context: string;
    chunks: ScoredChunk[];
    queryComplexity: QueryComplexity;
    topK: number;
}

/**
 * Pipeline đầy đủ:
 * 1. Detect complexity → Dynamic Top-K
 * 2. Hybrid Search (Vector + BM25)
 * 3. Reranking → top 5 chunks
 * 4. MMR để đa dạng hóa
 * 5. Build context string
 */
export async function buildContext(query: string): Promise<RetrievalResult> {
    // Bước 1: Độ phức tạp câu hỏi
    const complexity = detectQueryComplexity(query);
    const topK = dynamicTopK(complexity);

    // Bước 2: Hybrid search
    const hybridResults = await hybridSearch(query, topK);

    if (hybridResults.length === 0) {
        return {
            context: '',
            chunks: [],
            queryComplexity: complexity,
            topK,
        };
    }

    // Bước 3: Reranking → top 5
    const reranked = await rerankChunks(query, hybridResults, 5);

    // Bước 4: MMR để đa dạng hóa
    const queryEmbedding = await getEmbedding(query);
    const diversified = await applyMMR(reranked, queryEmbedding, 0.65, 5);

    // Bước 5: Build context
    const context = diversified
        .map((chunk, idx) => `[Đoạn ${idx + 1}]:\n${chunk.text}`)
        .join('\n\n---\n\n');

    return { context, chunks: diversified, queryComplexity: complexity, topK };
}
