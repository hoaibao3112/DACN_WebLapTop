import { Request, Response } from 'express';
import multer from 'multer';
import { buildContext } from '../services/ai/retrieval.service';
import { generateAnswer, checkOllamaHealth, listOllamaModels, type ChatMessage } from '../services/ai/generation.service';
import { ingestDocument, getIngestedCount } from '../services/ai/document.service';
import { getCollectionInfo } from '../services/ai/qdrant.service';

// Multer: chỉ nhận file PDF, lưu trong memory (không ghi ra disk)
export const uploadMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Chỉ chấp nhận file PDF'));
        }
    },
});

// ─────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────

/**
 * GET /api/ai/health
 * Kiểm tra trạng thái AI service, Ollama và Qdrant
 */
export const health = async (_req: Request, res: Response): Promise<void> => {
    const ollamaOk = await checkOllamaHealth();
    const collectionInfo = await getCollectionInfo();

    res.json({
        success: true,
        message: 'AI Service is running',
        timestamp: new Date().toISOString(),
        services: {
            ollama: ollamaOk ? 'online' : 'offline',
            qdrant: collectionInfo ? 'online' : 'offline',
            bm25_indexed_chunks: getIngestedCount(),
        },
        config: {
            embed_model: process.env.OLLAMA_EMBED_MODEL || 'bge-m3',
            llm_model: process.env.OLLAMA_LLM_MODEL || 'gpt-oss:120b',
            collection: process.env.QDRANT_COLLECTION || 'laptop_docs',
        },
    });
};

// ─────────────────────────────────────────────
// RAG CHAT
// ─────────────────────────────────────────────

/**
 * POST /api/ai/chat
 * Body: { message: string, conversationHistory?: ChatMessage[] }
 * 
 * Pipeline:
 * 1. Retrieve context (Dynamic TopK + Hybrid Search + Reranking + MMR)
 * 2. Generate answer from LLM (gpt-oss:120b via Ollama)
 */
export const chat = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message, conversationHistory } = req.body as {
            message: string;
            conversationHistory?: ChatMessage[];
        };

        if (!message || typeof message !== 'string' || message.trim() === '') {
            res.status(400).json({ success: false, error: 'message là bắt buộc và không được rỗng' });
            return;
        }

        // Retrieve context từ Qdrant
        const { context, chunks, queryComplexity, topK } = await buildContext(message.trim());

        // Generate câu trả lời
        const answer = await generateAnswer(
            message.trim(),
            context,
            conversationHistory || []
        );

        res.json({
            success: true,
            response: answer,
            meta: {
                queryComplexity,
                topK,
                chunksRetrieved: chunks.length,
                hasContext: context.length > 0,
            },
        });
    } catch (error) {
        console.error('❌ AI Chat Error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// ─────────────────────────────────────────────
// DOCUMENT INGESTION
// ─────────────────────────────────────────────

/**
 * POST /api/ai/ingest
 * Form-data: file (PDF)
 * 
 * Upload PDF → parse → chunk → embed → upsert vào Qdrant
 */
export const ingestDocumentHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).json({ success: false, error: 'Vui lòng upload file PDF' });
            return;
        }

        const chunkSize = parseInt(req.body.chunkSize || '512', 10);
        const chunkOverlap = parseInt(req.body.chunkOverlap || '64', 10);

        const result = await ingestDocument(file.buffer, file.originalname, chunkSize, chunkOverlap);

        res.json({
            success: true,
            message: `Đã ingest thành công ${result.chunks} chunks từ "${result.filename}"`,
            data: result,
        });
    } catch (error) {
        console.error('❌ Ingest Error:', error);
        res.status(500).json({
            success: false,
            error: 'Lỗi khi ingest tài liệu',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// ─────────────────────────────────────────────
// COLLECTION INFO
// ─────────────────────────────────────────────

/**
 * GET /api/ai/collection-info
 * Thông tin Qdrant collection và Ollama models
 */
export const getCollectionInfoHandler = async (_req: Request, res: Response): Promise<void> => {
    try {
        const [info, models] = await Promise.all([
            getCollectionInfo(),
            listOllamaModels(),
        ]);

        res.json({
            success: true,
            collection: {
                name: process.env.QDRANT_COLLECTION || 'laptop_docs',
                info: info || null,
                exists: info !== null,
            },
            ollama: {
                baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
                models,
            },
            bm25: {
                indexedChunks: getIngestedCount(),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Không thể lấy thông tin collection',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// ─────────────────────────────────────────────
// SEARCH TEST (Debug)
// ─────────────────────────────────────────────

/**
 * POST /api/ai/search-test
 * Body: { query: string }
 * Debug endpoint để test retrieval pipeline mà không gọi LLM
 */
export const searchTest = async (req: Request, res: Response): Promise<void> => {
    try {
        const { query } = req.body as { query: string };
        if (!query) {
            res.status(400).json({ success: false, error: 'query là bắt buộc' });
            return;
        }

        const result = await buildContext(query.trim());

        res.json({
            success: true,
            query,
            queryComplexity: result.queryComplexity,
            topK: result.topK,
            chunksReturned: result.chunks.length,
            context: result.context,
            chunks: result.chunks.map((c) => ({
                id: c.id,
                score: c.score,
                preview: c.text.slice(0, 200) + (c.text.length > 200 ? '...' : ''),
            })),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Lỗi khi test search',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
