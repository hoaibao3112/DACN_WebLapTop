"use client";

import AdminShell from "@/components/AdminShell";

export default function OrdersPage() {
    const orders = [
        { id: '#ORD-2024-001', customer: 'Trần Thanh Tùng', email: 'tung.tt@gmail.com', date: '22/10/2023 14:30', total: '28.500.000₫', status: 'Chờ xác nhận', color: 'text-orange-600', bg: 'bg-orange-50' },
        { id: '#ORD-2024-002', customer: 'Nguyễn Thùy Linh', email: 'linh.nt@outlook.com', date: '22/10/2023 10:15', total: '15.900.000₫', status: 'Đang giao', color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: '#ORD-2024-003', customer: 'Lê Minh Hải', email: 'haile@company.vn', date: '21/10/2023 16:45', total: '42.000.000₫', status: 'Đã giao', color: 'text-green-600', bg: 'bg-green-50' },
        { id: '#ORD-2024-004', customer: 'Phạm Anh Quân', email: 'quan.pham@gmail.com', date: '21/10/2023 09:20', total: '12.500.000₫', status: 'Đã hủy', color: 'text-red-600', bg: 'bg-red-50' },
    ];

    const stats = [
        { label: 'Tổng đơn hàng', value: '1,250', change: '+12%', icon: '🛍️', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Chờ xác nhận', value: '45', change: '-5%', icon: '⏳', color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Đang giao hàng', value: '120', change: '+8%', icon: '🚚', color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Doanh thu tháng', value: '850.000.000₫', change: '+15%', icon: '💵', color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <AdminShell>
            <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Quản Lý Đơn Hàng</h2>
                        <p className="text-gray-500">Xem và xử lý các đơn hàng từ khách hàng.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="bg-white border border-gray-200 text-gray-600 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center space-x-2">
                            <span>🔄</span>
                            <span>Làm mới</span>
                        </button>
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2">
                            <span>📊</span>
                            <span>Xuất Excel</span>
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                            <p className="text-xl font-bold text-gray-800 mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs and Filters */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-1 bg-gray-50 p-1 rounded-xl">
                        {['Tất cả', 'Chờ xác nhận', 'Đang giao', 'Đã giao', 'Đã hủy'].map((tab, i) => (
                            <button key={i} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${i === 0 ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                            <input
                                type="text"
                                placeholder="Tìm kiếm đơn hàng..."
                                className="bg-gray-50 border-none rounded-xl py-2 px-10 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
                            />
                        </div>
                        <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-xl font-medium hover:bg-gray-100 transition-all flex items-center space-x-2 text-sm border border-gray-100">
                            <span>⏳</span>
                            <span>Bộ lọc</span>
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Mã đơn hàng</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tên khách hàng</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ngày đặt</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Tổng tiền</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Trạng thái</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-blue-600 text-sm">{order.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-800 text-sm">{order.customer}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{order.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-600">{order.date}</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="font-bold text-gray-800 text-sm">{order.total}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${order.bg} ${order.color}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                <span>👁️</span>
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                <span>✏️</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">Hiển thị 1-10 trên 1,250 đơn hàng</p>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-all">◀</button>
                            {[1, 2, 3, '...', 125].map((page, i) => (
                                <button key={i} className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${page === 1 ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}>
                                    {page}
                                </button>
                            ))}
                            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-all">▶</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminShell>
    );
}
