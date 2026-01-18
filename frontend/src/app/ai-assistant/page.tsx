'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ConversationHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function AIAssistantPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Xin chào! Tôi là trợ lý AI chuyên về laptop. Tôi có thể giúp bạn tìm kiếm chiếc laptop phù hợp với nhu cầu và ngân sách của bạn. Bạn đang tìm laptop cho mục đích gì?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationHistory[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load conversation history from localStorage
    const saved = localStorage.getItem('ai_chat_history');
    if (saved) {
      const parsed = JSON.parse(saved) as ConversationHistory[];
      setConversationHistory(parsed.map((conv) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        messages: conv.messages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      })));
    }
  }, []);

  const saveConversation = (msgs: Message[]): void => {
    if (msgs.length <= 1) return; // Don't save if only welcome message

    const convId = currentConversationId || Date.now().toString();
    const title = msgs[1]?.content.slice(0, 50) + (msgs[1]?.content.length > 50 ? '...' : '');
    
    const newConv: ConversationHistory = {
      id: convId,
      title,
      messages: msgs,
      createdAt: new Date(),
    };

    const updated = conversationHistory.filter(c => c.id !== convId);
    updated.unshift(newConv);
    setConversationHistory(updated.slice(0, 10)); // Keep only last 10
    localStorage.setItem('ai_chat_history', JSON.stringify(updated.slice(0, 10)));
    setCurrentConversationId(convId);
  };

  const handleSend = async (): Promise<void> => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input.trim(),
          conversationHistory: updatedMessages.slice(-6), // Last 3 exchanges
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      saveConversation(finalMessages);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
        timestamp: new Date(),
      };
      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const loadConversation = (conv: ConversationHistory): void => {
    setMessages(conv.messages);
    setCurrentConversationId(conv.id);
  };

  const startNewChat = (): void => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Xin chào! Tôi là trợ lý AI chuyên về laptop. Tôi có thể giúp bạn tìm kiếm chiếc laptop phù hợp với nhu cầu và ngân sách của bạn. Bạn đang tìm laptop cho mục đích gì?',
        timestamp: new Date(),
      },
    ]);
    setCurrentConversationId(null);
  };

  const quickQuestions = [
    'Tôi cần một laptop dưới 20 triệu cho việc lập trình',
    'Laptop Gaming 30Tr có gì tốt?',
    'Sinh viên IT - 20Tr',
    'Đồ họa chuyên nghiệp',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 h-screen flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">AI Shopping Assistant</h1>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  ĐANG TRỰC TUYẾN
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => router.push('/products')}>
              Xem sản phẩm
            </Button>
          </div>
        </div>

        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Sidebar - Conversation History */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="h-full flex flex-col p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-700">LỊCH SỬ TƯ VẤN</h2>
                <button
                  onClick={startNewChat}
                  className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Hội thoại mới"
                >
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2">
                {conversationHistory.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">Chưa có lịch sử tư vấn</p>
                ) : (
                  conversationHistory.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => loadConversation(conv)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentConversationId === conv.id
                          ? 'bg-blue-100 border border-blue-300'
                          : 'hover:bg-gray-100 border border-transparent'
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-800 truncate">{conv.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {conv.messages.length - 1} tin nhắn • {new Date(conv.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </button>
                  ))
                )}
              </div>

              {/* Quick Actions */}
              <div className="mt-4 pt-4 border-t space-y-2">
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(question)}
                    className="w-full text-left p-2 text-xs text-gray-700 hover:bg-blue-50 rounded-lg border border-gray-200 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <Card className="flex-1 flex flex-col overflow-hidden">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                      message.role === 'assistant'
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                        : 'bg-gradient-to-br from-gray-600 to-gray-800'
                    }`}>
                      {message.role === 'assistant' ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`flex-1 max-w-3xl ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block p-4 rounded-2xl ${
                        message.role === 'assistant'
                          ? 'bg-white border border-gray-200 shadow-sm'
                          : 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <p className={`text-xs text-gray-500 mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <LoadingSpinner size="sm" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-block p-4 rounded-2xl bg-white border border-gray-200">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t p-4 bg-gray-50">
                <div className="flex gap-3 items-end max-w-5xl mx-auto">
                  <div className="flex-1 relative">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Nhập yêu cầu của bạn tại đây..."
                      rows={1}
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      style={{ maxHeight: '120px' }}
                    />
                    <button
                      type="button"
                      className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600"
                      title="Đính kèm file"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                  </div>
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className="px-6 py-3 rounded-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </Button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  DỮ LIỆU THÔNG SỐ KỸ THUẬT ĐƯỢC CẬP NHẬT TỪ HỆ THỐNG • 2024
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
