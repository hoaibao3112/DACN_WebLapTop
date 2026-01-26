"use client";

import AdminShell from "@/components/AdminShell";

export default function AIAdminPage() {
    const sources = [
        { id: 1, name: 'Quy_che_cong_ty_2024.pdf', type: 'PDF', size: '2.4 MB', date: '14/05/2024', status: 'Đã hoàn thành', color: 'text-green-600', bg: 'bg-green-50' },
        { id: 2, name: 'Huong_dan_su_dung_AI.docx', type: 'Word', size: '1.1 MB', date: '15/05/2024', status: 'Đang xử lý (45%)', color: 'text-orange-600', bg: 'bg-orange-50' },
        { id: 3, name: 'https://docs.langchain.com/intro', type: 'Website', size: '--', date: '15/05/2024', status: 'Đã hoàn thành', color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <AdminShell>
            <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Quản Lý Dữ Liệu AI (RAG)</h2>
                        <p className="text-gray-500">Quản lý cơ sở kiến thức và cấu hình mô hình Langchain + Ollama.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="bg-white border border-gray-200 text-gray-600 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center space-x-2">
                            <span>🔄</span>
                            <span>Quét lại dữ liệu</span>
                        </button>
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2">
                            <span>⚡</span>
                            <span>Đào tạo lại hệ thống</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Upload Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <div className="flex items-center space-x-3 text-blue-600 mb-2">
                            <span className="text-2xl">📄</span>
                            <h3 className="font-bold text-gray-800">Tải lên tệp tin</h3>
                        </div>
                        <p className="text-sm text-gray-400">PDF, Word, TXT (Tối đa 25MB)</p>
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center space-y-4 hover:border-blue-400 transition-colors cursor-pointer group">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                📤
                            </div>
                            <p className="text-sm font-medium text-gray-500">Kéo và thả tệp vào đây hoặc nhấn để chọn</p>
                        </div>
                        <button className="w-full bg-gray-50 text-gray-800 py-3 rounded-xl font-bold border border-gray-100 hover:bg-gray-100 transition-all">
                            Bắt đầu nạp tệp
                        </button>
                    </div>

                    {/* Web Scraping Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <div className="flex items-center space-x-3 text-purple-600 mb-2">
                            <span className="text-2xl">🌐</span>
                            <h3 className="font-bold text-gray-800">Nhập URL Website</h3>
                        </div>
                        <p className="text-sm text-gray-400">Trích xuất nội dung từ trang web công khai</p>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Địa chỉ website</label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/docs"
                                    className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="recursive" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500" />
                                <label htmlFor="recursive" className="text-sm text-gray-600">Quét tất cả các trang con (Recursive)</label>
                            </div>
                        </div>
                        <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all">
                            Thu thập dữ liệu
                        </button>
                    </div>
                </div>

                {/* Sources List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-gray-800">Danh sách nguồn dữ liệu</h3>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                            <input
                                type="text"
                                placeholder="Tìm kiếm nguồn..."
                                className="bg-gray-50 border-none rounded-xl py-2 px-10 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tên nguồn</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Loại</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Kích thước</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ngày nạp</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {sources.map((source) => (
                                <tr key={source.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-xl">
                                                {source.type === 'PDF' ? '📕' : source.type === 'Word' ? '📘' : '🔗'}
                                            </span>
                                            <span className="font-bold text-gray-800 text-sm">{source.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-gray-400">{source.type}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{source.size}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{source.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${source.bg} ${source.color}`}>
                                            {source.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                            <span>🗑️</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">Hiển thị 3 trên 3 nguồn dữ liệu</p>
                        <div className="flex space-x-2">
                            <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-400 cursor-not-allowed bg-white">Trước</button>
                            <button className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 bg-white hover:bg-gray-50">Sau</button>
                        </div>
                    </div>
                </div>

                {/* Config and System Status */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-6">Cấu hình mô hình</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Model Name</label>
                                    <select className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                                        <option>Llama 3 (8b)</option>
                                        <option>Mistral (7b)</option>
                                        <option>Gemma (7b)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Temperature</label>
                                        <span className="text-blue-600 font-bold text-xs">0.7</span>
                                    </div>
                                    <input type="range" className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Chunk Size</label>
                                    <input
                                        type="number"
                                        defaultValue="1000"
                                        className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                    />
                                </div>
                                <button className="w-full mt-2 bg-white border border-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm">
                                    Lưu cấu hình
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-3xl">
                            🟢
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 uppercase tracking-widest text-xs">Trạng thái hệ thống</h4>
                            <p className="text-green-600 font-bold mt-1 uppercase text-sm">Ollama Online</p>
                        </div>
                        <p className="text-xs text-gray-400">Thời gian phản hồi trung bình: 1.2s</p>
                    </div>
                </div>
            </div>
        </AdminShell>
    );
}
