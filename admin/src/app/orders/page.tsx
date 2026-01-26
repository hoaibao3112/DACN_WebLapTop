"use client";

import React, { useEffect, useState } from 'react';
import AdminShell from "@/components/AdminShell";
import { api } from "@/lib/api";

interface Order {
    id_hoadon: number;
    ma_don_hang: string;
    tong_tien: number;
    trangthai: string;
    hinhthuc_thanhtoan: string;
    ngay_dat: string;
    taikhoan?: {
        hoten: string;
        email: string;
    };
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

    const fetchOrders = async (page = 1) => {
        setLoading(true);
        try {
            const result: any = await api.get(`/admin/orders?page=${page}&limit=10`);
            setOrders(result.orders || []);
            if (result.pagination) {
                setPagination(result.pagination);
            }
        } catch (err: any) {
            console.error('Failed to fetch orders:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleUpdateStatus = async (orderId: number, newStatus: string) => {
        try {
            await api.post(`/admin/orders/${orderId}`, { status: newStatus }, { method: 'PATCH' } as any);
            setOrders(orders.map(o => o.id_hoadon === orderId ? { ...o, trangthai: newStatus } : o));
            alert('Cập nhật trạng thái thành công');
        } catch (err: any) {
            alert('Lỗi: ' + err.message);
        }
    };

    // Note: My api helper doesn't handle PATCH directly as a method yet, 
    // let's update api.ts first or use a work-around.
    // Actually, I'll update api.ts to support patch.

    const stats = [
        { label: 'Tổng đơn hàng', value: pagination.total.toString(), change: '+12%', icon: '🛍️', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Chờ xác nhận', value: '45', change: '-5%', icon: '⏳', color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Đang giao hàng', value: '120', change: '+8%', icon: '🚚', color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Doanh thu tháng', value: '850.000.000₫', change: '+15%', icon: '💵', color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <AdminShell>
            <div className="space-y-6 animate-fade-in text-gray-800">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Quản Lý Đơn Hàng</h2>
                        <p className="text-gray-500">Xem và xử lý các đơn hàng từ khách hàng.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => fetchOrders(pagination.page)}
                            className="bg-white border border-gray-200 text-gray-600 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center space-x-2"
                        >
                            <span>🔄</span>
                            <span>Làm mới</span>
                        </button>
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2">
                            <span>📊</span>
                            <span>Xuất Excel</span>
                        </button>
                    </div>
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

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center space-y-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                            <p className="text-gray-400 text-sm font-medium">Đang tải danh sách đơn hàng...</p>
                        </div>
                    ) : (
                        <>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Mã đơn hàng</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Khách hàng</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ngày đặt</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Tổng tiền</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Trạng thái</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Cập nhật trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {orders.length > 0 ? orders.map((order) => (
                                        <tr key={order.id_hoadon} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-blue-600 text-sm">{order.ma_don_hang}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-sm">{order.taikhoan?.hoten || 'Khách vãng lai'}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{order.taikhoan?.email || 'N/A'}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-600">{new Date(order.ngay_dat).toLocaleString('vi-VN')}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <p className="font-bold text-sm">{order.tong_tien.toLocaleString()}₫</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${order.trangthai === 'Hoàn thành' ? 'bg-green-50 text-green-600' :
                                                        order.trangthai === 'Chờ duyệt' ? 'bg-orange-50 text-orange-600' :
                                                            order.trangthai === 'Hủy' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                                                    }`}>
                                                    {order.trangthai}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <select
                                                    className="bg-gray-50 border-none rounded-lg py-1 px-3 text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                                                    value={order.trangthai}
                                                    onChange={(e) => handleUpdateStatus(order.id_hoadon, e.target.value)}
                                                >
                                                    <option value="Chờ duyệt">Chờ duyệt</option>
                                                    <option value="Đang giao">Đang giao</option>
                                                    <option value="Hoàn thành">Hoàn thành</option>
                                                    <option value="Hủy">Hủy đơn</option>
                                                </select>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-20 text-center text-gray-400 font-medium">
                                                Không tìm thấy đơn hàng nào.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        </AdminShell>
    );
}
