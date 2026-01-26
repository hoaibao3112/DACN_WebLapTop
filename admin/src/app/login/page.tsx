"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [matkhau, setMatkhau] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response: any = await api.post('/auth/login', { email, matkhau });

            // Store tokens and user info
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('adminUser', JSON.stringify(response.user));

            // Redirect to dashboard
            router.push('/');
        } catch (err: any) {
            setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
            <div className="max-w-md w-full animate-fade-in">
                <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/50 border border-gray-100 overflow-hidden">
                    <div className="p-8 text-center bg-blue-600">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                            LA
                        </div>
                        <h1 className="text-2xl font-bold text-white">Laptop Admin</h1>
                        <p className="text-blue-100 text-sm mt-1">Hệ thống quản trị cửa hàng</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                                    ⚠️ {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@example.com"
                                        className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Mật khẩu</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                                    <input
                                        type="password"
                                        required
                                        value={matkhau}
                                        onChange={(e) => setMatkhau(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between ml-1 text-sm">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <span className="text-gray-500">Ghi nhớ đăng nhập</span>
                                </label>
                                <a href="#" className="text-blue-600 font-bold hover:underline">Quên mật khẩu?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <span>Đăng nhập hệ thống</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <p className="text-center text-gray-400 text-sm mt-8">
                    &copy; 2024 Laptop Store Admin Panel. All Rights Reserved.
                </p>
            </div>
        </div>
    );
}
