// embedding.service.ts - Lấy vector embedding từ Ollama (BGE-M3)
import axios from 'axios';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || 'bge-m3';

/**
 * Tạo embedding vector cho một đoạn text sử dụng Ollama BGE-M3
 */
export async function getEmbedding(text: string): Promise<number[]> {
    const response = await axios.post(`${OLLAMA_BASE_URL}/api/embeddings`, {
        model: EMBED_MODEL,
        prompt: text,
    });
    return response.data.embedding as number[];
}

/**
 * Tạo embedding cho nhiều text (batch)
 */
export async function getBatchEmbeddings(texts: string[]): Promise<number[][]> {
    const results: number[][] = [];
    for (const text of texts) {
        const emb = await getEmbedding(text);
        results.push(emb);
    }
    return results;
}

/**
 * Tính cosine similarity giữa 2 vector
 */
export function cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;
    let dot = 0, magA = 0, magB = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        magA += a[i] * a[i];
        magB += b[i] * b[i];
    }
    const denom = Math.sqrt(magA) * Math.sqrt(magB);
    return denom === 0 ? 0 : dot / denom;
}
