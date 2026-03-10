import { NextRequest, NextResponse } from 'next/server';

// URL của AI backend server riêng (port 5001)
// Cấu hình trong .env.local: NEXT_PUBLIC_AI_API_URL=http://localhost:5001/api/ai
const AI_BASE_URL =
  process.env.NEXT_PUBLIC_AI_API_URL ||
  process.env.AI_API_URL ||
  'http://localhost:5000/api/ai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * POST /api/ai-chat (Next.js proxy route)
 * 
 * Nhận request từ frontend → proxy đến AI backend (port 5001) → trả về response.
 * 
 * Body nhận vào:
 *   { message: string, conversationHistory?: { role, content }[] }
 * 
 * Trả về:
 *   { response: string, meta?: { queryComplexity, topK, chunksRetrieved, hasContext } }
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const body = await request.json() as {
      message: string;
      conversationHistory?: Message[];
    };
    const { message, conversationHistory } = body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Chỉ gửi role + content, bỏ timestamp/id của frontend
    const cleanHistory: Message[] = (conversationHistory || [])
      .filter((msg) => msg.role === 'user' || msg.role === 'assistant')
      .map((msg) => ({ role: msg.role, content: msg.content }))
      .slice(-6); // Giữ tối đa 6 tin nhắn gần nhất

    // Proxy đến AI backend
    const response = await fetch(`${AI_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message.trim(),
        conversationHistory: cleanHistory,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('AI Backend Error:', errorData);
      return NextResponse.json(
        { error: 'AI service không phản hồi', message: errorData.message },
        { status: response.status }
      );
    }

    const data = await response.json() as {
      success: boolean;
      response: string;
      meta?: {
        queryComplexity: string;
        topK: number;
        chunksRetrieved: number;
        hasContext: boolean;
      };
    };

    // Trả về response + meta cho frontend biết
    return NextResponse.json({
      response: data.response,
      meta: data.meta,
    });
  } catch (error) {
    console.error('AI Chat Proxy Error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
};
