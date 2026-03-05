// bm25.service.ts - BM25 keyword search cho Hybrid Search
// Triển khai BM25 (Best Match 25) in-memory

interface Doc {
    id: string;
    text: string;
    tokens: string[];
    tf: Map<string, number>;
}

export interface BM25Result {
    id: string;
    text: string;
    score: number;
}

const k1 = 1.5; // term frequency saturation parameter
const b = 0.75;  // length normalization parameter

let corpus: Doc[] = [];
let idfCache: Map<string, number> = new Map();
let avgDocLength = 0;

/**
 * Tokenize text thành array các từ (lowercase, bỏ ký tự đặc biệt)
 */
function tokenize(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[^\w\sàáảãạăắặằẵặâấầẩẫậđèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]/g, ' ')
        .split(/\s+/)
        .filter((t) => t.length > 1);
}

/**
 * Xây dựng BM25 index từ danh sách documents
 */
export function buildBM25Index(documents: Array<{ id: string; text: string }>): void {
    corpus = documents.map((doc) => {
        const tokens = tokenize(doc.text);
        const tf = new Map<string, number>();
        for (const t of tokens) {
            tf.set(t, (tf.get(t) || 0) + 1);
        }
        return { id: doc.id, text: doc.text, tokens, tf };
    });

    // Tính IDF
    idfCache = new Map();
    const N = corpus.length;
    const dfMap = new Map<string, number>();
    for (const doc of corpus) {
        const seen = new Set<string>();
        for (const t of doc.tokens) {
            if (!seen.has(t)) {
                dfMap.set(t, (dfMap.get(t) || 0) + 1);
                seen.add(t);
            }
        }
    }
    for (const [term, df] of dfMap.entries()) {
        idfCache.set(term, Math.log((N - df + 0.5) / (df + 0.5) + 1));
    }

    avgDocLength = corpus.length > 0
        ? corpus.reduce((s, d) => s + d.tokens.length, 0) / corpus.length
        : 1;
}

/**
 * Tìm kiếm BM25 cho một query, trả về topK kết quả
 */
export function bm25Search(query: string, topK: number): BM25Result[] {
    if (corpus.length === 0) return [];

    const queryTokens = tokenize(query);
    const scores: Array<{ id: string; text: string; score: number }> = [];

    for (const doc of corpus) {
        let score = 0;
        const dl = doc.tokens.length;
        for (const qt of queryTokens) {
            const idf = idfCache.get(qt) || 0;
            const freq = doc.tf.get(qt) || 0;
            const tfNorm = (freq * (k1 + 1)) / (freq + k1 * (1 - b + b * (dl / avgDocLength)));
            score += idf * tfNorm;
        }
        if (score > 0) {
            scores.push({ id: doc.id, text: doc.text, score });
        }
    }

    return scores
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)
        .map((r) => ({ id: r.id, text: r.text, score: r.score }));
}

/**
 * Lấy số lượng document trong index
 */
export function getBM25IndexSize(): number {
    return corpus.length;
}
