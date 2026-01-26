"use client";

import React, { useEffect, useState } from 'react';
import AdminShell from "@/components/AdminShell";
import { api } from "@/lib/api";

interface User {
    id_taikhoan: number;
    hoten: string;
    email: string;
    sodienthoai: string;
    ngay_tao: string;
    trangthai: boolean;
    vaitros?: Array<{ ten_vaitro: string }>;
}

export default function CustomersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

    const fetchUsers = async (page = 1) => {
        setLoading(true);
        try {
            const result: any = await api.get(`/admin/users?page=${page}&limit=10`);
            if (result.users) {
                setUsers(result.users);
                setPagination(result.pagination);
            } else {
                setUsers(result || []);
            }
        } catch (err: any) {
            console.error('Failed to fetch users:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggleStatus = async (userId: number) => {
        if (!confirm('Bạn có chắc chắn muốn thay đổi trạng thái tài khoản này?')) return;
        try {
            await api.patch(`/admin/users/${userId}`, {});
            setUsers(users.map(u => u.id_taikhoan === userId ? { ...u, trangthai: !u.trangthai } : u));
            alert('Cập nhật trạng thái thành công');
        } catch (err: any) {
            alert('Lỗi: ' + err.message);
        }
    };

    const stats = [
        { label: 'Tổng khách hàng', value: pagination.total.toString(), change: '+12.5%', icon: '👥', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Khách hàng mới (Tháng)', value: '145', change: '+18.2%', icon: '✨', color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Tỷ lệ quay lại', value: '64%', change: '+2.4%', icon: '🔄', color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Giá trị trung bình', value: '18.500.000₫', change: '+5.1%', icon: '💎', color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <AdminShell>
            <div className="space-y-6 animate-fade-in text-gray-800">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Quản Lý Khách Hàng</h2>
                        <p className="text-gray-500">Xem thông tin chi tiết và danh sách khách hàng của hệ thống.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2">
                        <span>➕</span>
                        <span>Thêm khách hàng mới</span>
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm font-medium">
                        ⚠️ Lỗi: {error}
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-900">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center text-xl`}>
                                    {stat.icon}
                                </div>
                                <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</h3>
                            <p className="text-xl font-bold mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Customers Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center space-y-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                            <p className="text-gray-400 text-sm font-medium">Đang tải danh sách khách hàng...</p>
                        </div>
                    ) : (
                        <>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Khách hàng</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Liên hệ</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Ngày gia nhập</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Trạng thái</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.length > 0 ? users.map((user) => (
                                        <tr key={user.id_taikhoan} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-400">
                                                        {user.hoten?.charAt(0) || 'U'}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm">{user.hoten}</p>
                                                        <p className="text-xs text-gray-400 mt-0.5">ID: {user.id_taikhoan}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-medium">{user.email}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{user.sodienthoai || 'N/A'}</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <p className="text-sm text-gray-600">{new Date(user.ngay_tao).toLocaleDateString('vi-VN')}</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${user.trangthai
                                                        ? 'bg-green-50 text-green-600'
                                                        : 'bg-red-50 text-red-600'
                                                    }`}>
                                                    {user.trangthai ? 'Kích hoạt' : 'Khóa'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button
                                                        onClick={() => handleToggleStatus(user.id_taikhoan)}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${user.trangthai
                                                                ? 'text-red-600 hover:bg-red-50'
                                                                : 'text-green-600 hover:bg-green-50'
                                                            }`}
                                                    >
                                                        {user.trangthai ? 'Khóa tài khoản' : 'Mở khóa'}
                                                    </button>
                                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                        <span>✏️</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-20 text-center text-gray-400 font-medium">
                                                Không tìm thấy người dùng nào.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                                <p className="text-sm text-gray-500">Hiển thị {users.length} trong số {pagination.total} khách hàng</p>
                                <div className="flex items-center space-x-2">
                                    <button
                                        disabled={pagination.page <= 1}
                                        onClick={() => fetchUsers(pagination.page - 1)}
                                        className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-50 transition-all"
                                    >◀</button>
                                    {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => fetchUsers(page)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${page === pagination.page ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        disabled={pagination.page >= pagination.totalPages}
                                        onClick={() => fetchUsers(pagination.page + 1)}
                                        className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-50 transition-all"
                                    >▶</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AdminShell>
    );
}
