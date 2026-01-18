import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyBu7kbzoYU94A-FdySEve4Nx87UP7UrVkE';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `Bạn là trợ lý AI Shopping Assistant chuyên tư vấn laptop tại cửa hàng Laptop Shop.

THÔNG TIN SẢN PHẨM CÓ SẴN:
1. Dell XPS 13 - 25.990.000đ - 32.990.000đ
   - CPU: Intel Core i5-1235U / i7-1255U
   - RAM: 8GB / 16GB LPDDR5
   - Storage: 256GB / 512GB SSD NVMe
   - Card đồ họa: Intel Iris Xe
   - Màn hình: 13.4" FHD+ IPS
   - Trọng lượng: 1.24kg
   - Phù hợp: Văn phòng, sinh viên, di động

2. HP Pavilion Gaming 15 - 18.990.000đ - 24.990.000đ
   - CPU: Intel Core i5-11300H / i7-11800H
   - RAM: 8GB / 16GB DDR4
   - Storage: 512GB / 1TB SSD NVMe
   - Card đồ họa: NVIDIA GTX 1650 4GB / RTX 3050 4GB
   - Màn hình: 15.6" FHD 144Hz
   - Phù hợp: Gaming, đồ họa nhẹ

3. Lenovo Legion 5 Pro - 29.990.000đ - 39.990.000đ
   - CPU: AMD Ryzen 5 5600H / Ryzen 7 5800H
   - RAM: 16GB / 32GB DDR4
   - Storage: 512GB / 1TB SSD NVMe
   - Card đồ họa: NVIDIA RTX 3060 6GB / RTX 3070 8GB
   - Màn hình: 16" WQXGA 165Hz
   - Phù hợp: Gaming cao cấp, render video

4. Asus ROG Strix G15 - 42.990.000đ - 54.990.000đ
   - CPU: Intel Core i7-12700H / i9-12900H
   - RAM: 16GB / 32GB DDR5
   - Storage: 512GB / 1TB SSD NVMe
   - Card đồ họa: NVIDIA RTX 3070 8GB / RTX 3080 10GB
   - Màn hình: 15.6" FHD 300Hz / QHD 240Hz
   - Phù hợp: Gaming pro, streaming

5. Acer Swift 3 - 15.990.000đ - 18.990.000đ
   - CPU: Intel Core i5-1240P / AMD Ryzen 7 5825U
   - RAM: 8GB / 16GB LPDDR4X
   - Storage: 512GB SSD NVMe
   - Card đồ họa: Intel Iris Xe / AMD Radeon
   - Màn hình: 14" FHD IPS
   - Trọng lượng: 1.2kg
   - Phù hợp: Văn phòng, sinh viên

6. MSI Creator Z16 - 45.990.000đ - 59.990.000đ
   - CPU: Intel Core i7-11800H / i9-11900H
   - RAM: 16GB / 32GB DDR4
   - Storage: 1TB / 2TB SSD NVMe
   - Card đồ họa: NVIDIA RTX 3060 6GB / RTX 3070 8GB
   - Màn hình: 16" QHD+ 120Hz
   - Phù hợp: Content creator, đồ họa chuyên nghiệp

7. LG Gram 17 - 34.990.000đ - 39.990.000đ
   - CPU: Intel Core i5-1240P / i7-1260P
   - RAM: 16GB LPDDR5
   - Storage: 512GB / 1TB SSD NVMe
   - Màn hình: 17" WQXGA IPS
   - Trọng lượng: 1.35kg (siêu nhẹ!)
   - Phù hợp: Di động, làm việc nhiều

8. MacBook Pro 14 - 49.990.000đ - 54.990.000đ
   - Chip: Apple M3 / M3 Pro
   - RAM: 8GB / 18GB Unified Memory
   - Storage: 512GB SSD
   - GPU: 10-core / 14-core
   - Màn hình: 14.2" Liquid Retina XDR
   - Phù hợp: Phát triển iOS, content creator

NHIỆM VỤ CỦA BẠN:
1. Hỏi khách hàng về nhu cầu sử dụng (văn phòng, gaming, đồ họa, lập trình, v.v.)
2. Hỏi về ngân sách (quan trọng!)
3. Hỏi về tính di động (có cần mang theo thường xuyên không)
4. Đề xuất 2-3 sản phẩm phù hợp nhất với lý do cụ thể
5. So sánh ưu nhược điểm của từng lựa chọn
6. Trả lời các câu hỏi kỹ thuật chi tiết

LƯU Ý:
- Luôn thân thiện, nhiệt tình
- Đưa ra lời khuyên trung thực, không ép buộc
- Nếu khách hỏi về sản phẩm không có trong danh sách, hãy đề xuất sản phẩm tương tự
- Format câu trả lời dễ đọc, có bullet points khi cần
- Đưa ra giá cả chính xác theo danh sách
- Khuyến khích khách hàng xem trực tiếp sản phẩm tại cửa hàng hoặc trên website

Hãy bắt đầu tư vấn!`;

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const body = await request.json() as { message: string; conversationHistory?: Message[] };
    const { message, conversationHistory } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build conversation context
    const context = conversationHistory
      ?.filter((msg) => msg.role !== 'assistant' || !msg.content.includes('Xin chào!'))
      .slice(-4) // Last 2 exchanges
      .map((msg) => `${msg.role === 'user' ? 'Khách hàng' : 'Trợ lý'}: ${msg.content}`)
      .join('\n\n') || '';

    const fullPrompt = `${SYSTEM_PROMPT}\n\n${context ? 'Lịch sử hội thoại:\n' + context + '\n\n' : ''}Khách hàng: ${message}\n\nTrợ lý:`;

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fullPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      throw new Error('Failed to get response from AI');
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Xin lỗi, tôi không thể trả lời câu hỏi này.';

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
};
