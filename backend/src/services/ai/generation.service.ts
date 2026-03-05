// generation.service.ts - Sinh câu trả lời từ LLM qua Ollama
import axios from 'axios';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const LLM_MODEL = process.env.OLLAMA_LLM_MODEL || 'gpt-oss:120b';

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

const SYSTEM_PROMPT = `Bạn là trợ lý AI chuyên tư vấn laptop tại cửa hàng Laptop Shop.

NGUYÊN TẮC TRẢ LỜI:
1. CHỈ trả lời dựa trên thông tin trong [Context] được cung cấp.
2. Nếu thông tin không có trong context, hãy nói: "Tôi không tìm thấy thông tin về vấn đề này trong tài liệu của chúng tôi."
3. KHÔNG bịa đặt thông tin sản phẩm, giá cả, hoặc thông số kỹ thuật không có trong context.
4. Trả lời thân thiện, rõ ràng, có cấu trúc.
5. Khi so sánh sản phẩm, dùng bảng hoặc bullet points.
6. Luôn đề xuất khách xem trực tiếp sản phẩm tại cửa hàng hoặc website nếu cần chắc chắn hơn.`;

/**
 * Sinh câu trả lời từ LLM dựa trên context và lịch sử chat
 */
export async function generateAnswer(
    question: string,
    context: string,
    history: ChatMessage[] = []
): Promise<string> {
    const userMessage = context
        ? `[Context từ tài liệu]:\n${context}\n\n[Câu hỏi của khách hàng]:\n${question}`
        : `[Câu hỏi của khách hàng]:\n${question}\n\n(Không tìm thấy thông tin liên quan trong tài liệu)`;

    const messages: ChatMessage[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        // Giữ tối đa 6 tin nhắn gần nhất (3 lượt hội thoại)
        ...history.slice(-6),
        { role: 'user', content: userMessage },
    ];

    const response = await axios.post(
        `${OLLAMA_BASE_URL}/api/chat`,
        {
            model: LLM_MODEL,
            messages,
            stream: false,
            options: {
                temperature: 0.3,  // Thấp để AI bám sát tài liệu
                top_p: 0.9,
                num_predict: 1024,
            },
        },
        { timeout: 120_000 } // 2 phút timeout
    );

    return response.data?.message?.content || 'Xin lỗi, tôi không thể tạo câu trả lời lúc này.';
}

/**
 * Kiểm tra Ollama có đang chạy không
 */
export async function checkOllamaHealth(): Promise<boolean> {
    try {
        await axios.get(`${OLLAMA_BASE_URL}/api/tags`, { timeout: 5000 });
        return true;
    } catch {
        return false;
    }
}

/**
 * Lấy danh sách model đang có trong Ollama
 */
export async function listOllamaModels(): Promise<string[]> {
    try {
        const res = await axios.get(`${OLLAMA_BASE_URL}/api/tags`, { timeout: 5000 });
        return (res.data?.models || []).map((m: { name: string }) => m.name);
    } catch {
        return [];
    }
}
