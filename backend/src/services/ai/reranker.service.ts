// reranker.service.ts - Rerank các chunk dựa trên cosine similarity với query embedding
import { getEmbedding, cosineSimilarity } from './embedding.service';
import type { ScoredChunk } from './qdrant.service';

/**
 * Rerank danh sách chunks dựa trên cosine similarity với query embedding
 * Trả về topN chunks có điểm cao nhất
 */
export async function rerankChunks(
    query: string,
    chunks: ScoredChunk[],
    topN: number = 5
): Promise<ScoredChunk[]> {
    if (chunks.length === 0) return [];
    if (chunks.length <= topN) return chunks;

    // Lấy query embedding
    const queryEmbedding = await getEmbedding(query);

    // Tính điểm rerank cho từng chunk
    const scored = await Promise.all(
        chunks.map(async (chunk) => {
            let rerankScore: number;
            // Nếu chunk có embedding trong metadata thì dùng luôn
            if (chunk.metadata?.embedding && Array.isArray(chunk.metadata.embedding)) {
                rerankScore = cosineSimilarity(queryEmbedding, chunk.metadata.embedding as number[]);
            } else {
                // Tính lại embedding cho text chunk
                const chunkEmbedding = await getEmbedding(chunk.text);
                rerankScore = cosineSimilarity(queryEmbedding, chunkEmbedding);
            }
            return { ...chunk, score: rerankScore };
        })
    );

    // Sắp xếp và trả về topN
    return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, topN);
}
