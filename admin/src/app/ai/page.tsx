"use client";

import AdminShell from "@/components/AdminShell";
import { useState, useRef, ChangeEvent, DragEvent, useEffect } from "react";

const API_BASE_URL = 'http://localhost:5202/api/v1';

interface UploadedFile {
    file_name: string;
    hash: string;
    status: string;
}

export default function AIAdminPage() {
    const [filesList, setFilesList] = useState<UploadedFile[]>([]);
    const [isLoadingFiles, setIsLoadingFiles] = useState(false);
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processStep, setProcessStep] = useState<'upload' | 'ingest' | 'reset' | null>(null);
    const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Lấy danh sách file khi mount Component
    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        setIsLoadingFiles(true);
        try {
            const res = await fetch(`${API_BASE_URL}/files`);
            const data = await res.json();
            if (res.ok && data.status === 'success') {
                setFilesList(data.data || []);
            } else {
                console.error("Lỗi khi load danh sách files:", data.message);
            }
        } catch (error) {
            console.error("Fetch files error:", error);
        } finally {
            setIsLoadingFiles(false);
        }
    };

    const handleResetDB = async () => {
        if (!confirm("BẠN CÓ CHẮC CHẮN MUỐN XÓA TOÀN BỘ CƠ SỞ DỮ LIỆU VECTOR?\nHành động này không thể hoàn tác và AI sẽ quên toàn bộ kiến thức hiện tại.")) {
            return;
        }

        setIsProcessing(true);
        setProcessStep('reset');
        setToastMessage(null);

        try {
            const res = await fetch(`${API_BASE_URL}/reset`, { method: 'POST' });
            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                setToastMessage({ type: 'success', text: data.message || "Đã reset toàn bộ Database vector thành công." });
                await fetchFiles(); // Refresh lại danh sách sẽ rỗng
            } else {
                setToastMessage({ type: 'error', text: data.message || "Lỗi khi reset Database." });
            }
        } catch (error) {
            console.error("Reset error:", error);
            setToastMessage({ type: 'error', text: "Lỗi kết nối khi reset Database." });
        } finally {
            setIsProcessing(false);
            setProcessStep(null);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setToastMessage(null);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setSelectedFile(e.dataTransfer.files[0]);
            setToastMessage(null);
        }
    };

    // Luồng Chỉ Upload File
    const handleUploadOnly = async () => {
        if (!selectedFile) {
            setToastMessage({ type: 'error', text: "Vui lòng chọn file trước khi tải lên." });
            return;
        }

        setIsProcessing(true);
        setProcessStep('upload');
        setToastMessage(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const uploadRes = await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                body: formData,
            });

            const uploadData = await uploadRes.json().catch(() => ({}));

            if (uploadRes.status === 400) {
                setToastMessage({ type: 'error', text: uploadData.message || "Lỗi: File này đã tồn tại (trùng lặp Hash)." });
            } else if (!uploadRes.ok) {
                setToastMessage({ type: 'error', text: uploadData.message || "Lỗi hệ thống khi tải file." });
            } else {
                setToastMessage({ type: 'success', text: "Upload file thành công! Bạn có thể nhấn 'Tiến hành Nạp AI' để AI học dữ liệu từ các tệp tin mới nạp." });
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                await fetchFiles(); // Lấy lại danh sách file đã tải vào Backend
            }
        } catch (error) {
            console.error("Upload error:", error);
            setToastMessage({ type: 'error', text: "Đã xảy ra lỗi kết nối khi tải file." });
        } finally {
            setIsProcessing(false);
            setProcessStep(null);
        }
    };

    // Luồng Chỉ Ingest AI
    const handleIngestOnly = async () => {
        setIsProcessing(true);
        setProcessStep('ingest');
        setToastMessage(null);

        try {
            const ingestRes = await fetch(`${API_BASE_URL}/ingest`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            const ingestData = await ingestRes.json().catch(() => ({}));

            if (ingestRes.ok) {
                setToastMessage({ type: 'success', text: ingestData.message || "Trí khôn AI đã cập nhật thành công!" });
                await fetchFiles();
            } else {
                setToastMessage({ type: 'error', text: ingestData.message || "Quá trình nạp dữ liệu vào AI thất bại." });
            }
        } catch (error) {
            console.error("Ingest error:", error);
            setToastMessage({ type: 'error', text: "Đã xảy ra lỗi kết nối cục bộ khi nạp AI." });
        } finally {
            setIsProcessing(false);
            setProcessStep(null);
        }
    };

    return (
        <AdminShell>
            <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Quản Lý Dữ Liệu AI (RAG)</h2>
                        <p className="text-gray-500">Quản lý cơ sở kiến thức và cấu hình mô hình Langchain + Ollama.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button 
                            onClick={fetchFiles}
                            disabled={isLoadingFiles}
                            className="bg-white border border-gray-200 text-gray-600 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center space-x-2"
                        >
                            <span className={isLoadingFiles ? "animate-spin" : ""}>🔄</span>
                            <span>{isLoadingFiles ? 'Đang tải...' : 'Làm mới danh sách'}</span>
                        </button>
                        <button 
                            onClick={handleResetDB}
                            disabled={isProcessing}
                            className="bg-red-50 text-red-600 border border-red-200 px-6 py-2.5 rounded-xl font-bold shadow-sm hover:bg-red-100 transition-all flex items-center space-x-2 cursor-pointer"
                        >
                            <span>🗑️</span>
                            <span>Khôi phục CSDL (Reset)</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Upload Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3 text-blue-600">
                                <span className="text-2xl">📄</span>
                                <h3 className="font-bold text-gray-800">Tải lên tệp tin</h3>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">PDF, Word, TXT (Tối đa 25MB)</p>

                        <div
                            className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center space-y-4 transition-colors cursor-pointer group relative border-gray-200 hover:border-blue-400`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.txt"
                                disabled={isProcessing}
                            />
                            <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                📤
                            </div>
                            <p className="text-sm font-medium text-gray-500 text-center">
                                {selectedFile ? (
                                    <span className="text-blue-600 font-bold">{selectedFile.name}</span>
                                ) : (
                                    "Kéo và thả tệp vào đây hoặc nhấn để chọn"
                                )}
                            </p>
                        </div>

                        {/* Buttons for actions */}
                        <div className="space-y-3">
                            <button
                                onClick={handleUploadOnly}
                                disabled={!selectedFile || isProcessing || isLoadingFiles}
                                className={`w-full py-3 rounded-xl font-bold transition-all shadow-sm ${selectedFile && !isProcessing && !isLoadingFiles
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
                                    : 'bg-gray-50 text-gray-400 border border-gray-100 cursor-not-allowed'
                                    }`}
                            >
                                {isProcessing && processStep === 'upload' ? 'Đang tải tệp lên máy chủ...' : 'Tải tệp lên máy chủ'}
                            </button>
                        </div>
                    </div>

                    {/* Danh sách tệp đã tải */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3 text-purple-600">
                                <span className="text-2xl">📂</span>
                                <h3 className="font-bold text-gray-800">Danh sách File ({filesList.length})</h3>
                            </div>
                            <button
                                onClick={handleIngestOnly}
                                disabled={isProcessing}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-purple-700 transition-all text-sm flex items-center space-x-2 disabled:bg-purple-300"
                                title="Quét toàn bộ thư mục và nạp dữ liệu chưa được học vào AI"
                            >
                                <span>✨</span>
                                <span>Tiến hành Nạp AI</span>
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-auto border border-gray-100 rounded-xl bg-gray-50/50">
                            {isLoadingFiles ? (
                                <div className="p-8 text-center text-gray-500">Đang tải danh sách file...</div>
                            ) : filesList.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">Chưa có tệp dữ liệu nào trong AI.</div>
                            ) : (
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-100 border-b border-gray-200">
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Tên file</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase w-28">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filesList.map((file, idx) => (
                                            <tr key={idx} className="hover:bg-white transition-colors bg-gray-50/30 text-sm">
                                                <td className="px-4 py-3 font-medium text-gray-700 truncate max-w-[200px]" title={file.file_name}>
                                                    {file.file_name}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-600 border border-green-200 inline-block text-center whitespace-nowrap">
                                                        {file.status === 'embedded' ? 'Đã nhúng AI' : file.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Message */}
            {toastMessage && (
                <div className={`fixed bottom-6 right-6 p-4 rounded-xl shadow-xl flex items-center space-x-3 z-50 animate-fade-in max-w-sm ${toastMessage.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                    <span className="text-xl shrink-0">{toastMessage.type === 'success' ? '✅' : '❌'}</span>
                    <span className="font-medium text-sm flex-1">{toastMessage.text}</span>
                    <button onClick={() => setToastMessage(null)} className="ml-2 text-gray-400 hover:text-gray-600 shrink-0">
                        ✖
                    </button>
                </div>
            )}

            {/* Full Screen Loading Tracker for Ingest */}
            {isProcessing && processStep === 'ingest' && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] flex items-center justify-center flex-col animate-fade-in">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 space-y-6">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-gray-100 rounded-full"></div>
                            <div className="w-20 h-20 border-4 border-blue-600 rounded-full border-t-transparent absolute top-0 left-0 animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-3xl">🤖</div>
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-bold text-gray-800">Đang nạp AI...</h3>
                            <p className="text-sm border border-orange-100 bg-orange-50 text-orange-800 p-3 rounded-xl">
                                Đang nạp dữ liệu cho AI học, vui lòng không tắt trang... Quá trình này có thể mất vài phút.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Full Screen Loading Tracker for Reset */}
            {isProcessing && processStep === 'reset' && (
                <div className="fixed inset-0 bg-red-900/60 backdrop-blur-sm z-[100] flex items-center justify-center flex-col animate-fade-in">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 space-y-6">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-gray-100 rounded-full"></div>
                            <div className="w-20 h-20 border-4 border-red-600 rounded-full border-t-transparent absolute top-0 left-0 animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-3xl">⚠️</div>
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-bold text-gray-800">Đang khôi phục...</h3>
                            <p className="text-sm text-gray-500">Đang xóa toàn bộ dữ liệu Vector DB. Vui lòng không tắt trang.</p>
                        </div>
                    </div>
                </div>
            )}
        </AdminShell>
    );
}
