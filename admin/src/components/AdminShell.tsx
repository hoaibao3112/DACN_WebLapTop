"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    const menuItems = [
        { name: 'Tổng quan', icon: '📊', path: '/' },
        { name: 'Sản phẩm', icon: '📦', path: '/products' },
        { name: 'Đơn hàng', icon: '🛒', path: '/orders' },
        { name: 'Khách hàng', icon: '👥', path: '/customers' },
        { name: 'Dữ liệu AI', icon: '🤖', path: '/ai' },
        { name: 'Thống kê', icon: '📈', path: '/reports' },
        { name: 'Cài đặt', icon: '⚙️', path: '/settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'
                    } bg-white shadow-xl transition-all duration-300 ease-in-out flex flex-col z-20 sticky top-0 h-screen`}
            >
                <div className="p-6 flex items-center justify-between border-b border-gray-100">
                    <div className={`flex items-center space-x-3 ${!isSidebarOpen && 'hidden'}`}>
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                            LA
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-800 leading-tight">Laptop Admin</h1>
                            <p className="text-xs text-gray-500">Quản trị hệ thống</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isSidebarOpen ? '◀' : '▶'}
                    </button>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className={`font-medium ${!isSidebarOpen && 'hidden'}`}>{item.name}</span>
                                {item.name === 'Đơn hàng' && isSidebarOpen && (
                                    <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">12</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium">
                        <span className="text-xl">📤</span>
                        <span className={!isSidebarOpen ? 'hidden' : ''}>Đăng xuất</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
                    <div className="flex-1 max-w-xl">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                            <input
                                type="text"
                                placeholder="Tìm kiếm dữ liệu..."
                                className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                            <span>🔔</span>
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                            <span>🌙</span>
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center space-x-3 cursor-pointer group">
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Nguyễn Văn A</p>
                                <p className="text-[11px] text-gray-500 uppercase tracking-wider">Quản trị viên</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                                <img src="/api/placeholder/40/40" alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
                    {children}
                </main>
            </div>
        </div>
    );
}
