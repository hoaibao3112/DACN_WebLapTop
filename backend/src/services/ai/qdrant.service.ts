// qdrant.service.ts - Kết nối và tương tác với Qdrant vector database
import { QdrantClient } from '@qdrant/js-client-rest';


const QDRANT_URL = process.env.QDRANT_URL || 'http://localhost:6333';
const QDRANT_API_KEY = process.env.QDRANT_API_KEY || undefined;
const COLLECTION = process.env.QDRANT_COLLECTION || 'laptop_docs';

let _client: QdrantClient | null = null;

export function getQdrantClient(): QdrantClient {
    if (!_client) {
        _client = new QdrantClient({
            url: QDRANT_URL,
            ...(QDRANT_API_KEY ? { apiKey: QDRANT_API_KEY } : {}),
        });
    }
    return _client;
}

export interface ChunkDocument {
    id?: string;
    text: string;
    embedding: number[];
    metadata?: Record<string, unknown>;
}

export interface ScoredChunk {
    id: string;
    text: string;
    score: number;
    metadata?: Record<string, unknown>;
}

/**
 * Tìm kiếm vector similarity trong Qdrant
 */
export async function searchVector(
    queryEmbedding: number[],
    topK: number,
    filter?: Record<string, unknown>
): Promise<ScoredChunk[]> {
    const client = getQdrantClient();
    const results = await client.search(COLLECTION, {
        vector: queryEmbedding,
        limit: topK,
        with_payload: true,
        ...(filter ? { filter } : {}),
    });

    return results.map((r) => ({
        id: String(r.id),
        text: (r.payload?.text as string) || '',
        score: r.score,
        metadata: r.payload as Record<string, unknown>,
    }));
}

/**
 * Lưu các chunk vào Qdrant (dùng khi ingest tài liệu)
 */
export async function upsertChunks(chunks: ChunkDocument[]): Promise<void> {
    const client = getQdrantClient();

    // Kiểm tra collection có tồn tại chưa
    const collections = await client.getCollections();
    const exists = collections.collections.some((c) => c.name === COLLECTION);

    if (!exists && chunks.length > 0) {
        const vectorSize = chunks[0].embedding.length;
        await client.createCollection(COLLECTION, {
            vectors: { size: vectorSize, distance: 'Cosine' },
        });
    }

    const points = chunks.map((chunk) => ({
        id: generateUUID(),
        vector: chunk.embedding,
        payload: {
            text: chunk.text,
            ...(chunk.metadata || {}),
        },
    }));

    await client.upsert(COLLECTION, { points, wait: true });
}

/**
 * Lấy thông tin collection
 */
export async function getCollectionInfo() {
    const client = getQdrantClient();
    try {
        const info = await client.getCollection(COLLECTION);
        return info;
    } catch {
        return null;
    }
}

// UUID tạo từ crypto để không cần thêm package uuid
function generateUUID(): string {
    // Dùng crypto.randomUUID nếu có (Node 14.17+)
    try {
        return (crypto as unknown as { randomUUID: () => string }).randomUUID();
    } catch {
        // Fallback
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}
