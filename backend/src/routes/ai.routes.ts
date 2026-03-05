import { Router } from 'express';
import {
    health,
    chat,
    ingestDocumentHandler,
    uploadMiddleware,
    getCollectionInfoHandler,
    searchTest,
} from '../controllers/ai.controller';

const router = Router();

/**
 * @route   GET /api/ai/health
 * @desc    Kiểm tra trạng thái AI service (Ollama, Qdrant)
 * @access  Public
 */
router.get('/health', health);

/**
 * @route   POST /api/ai/chat
 * @desc    RAG chat: Hybrid Search → Rerank → LLM Generation
 * @body    { message: string, conversationHistory?: ChatMessage[] }
 * @access  Public
 */
router.post('/chat', chat);

/**
 * @route   POST /api/ai/ingest
 * @desc    Upload PDF → Chunk → Embed → Lưu vào Qdrant
 * @body    form-data: file (PDF), chunkSize?, chunkOverlap?
 * @access  Public (có thể thêm auth middleware nếu cần)
 */
router.post('/ingest', uploadMiddleware.single('file'), ingestDocumentHandler);

/**
 * @route   GET /api/ai/collection-info
 * @desc    Thông tin Qdrant collection và Ollama models
 * @access  Public
 */
router.get('/collection-info', getCollectionInfoHandler);

/**
 * @route   POST /api/ai/search-test
 * @desc    Debug: test retrieval pipeline (không gọi LLM)
 * @body    { query: string }
 * @access  Public
 */
router.post('/search-test', searchTest);

export default router;
