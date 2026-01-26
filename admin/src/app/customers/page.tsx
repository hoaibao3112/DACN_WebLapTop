"use client";

import AdminShell from "@/components/AdminShell";

export default function CustomersPage() {
    const customers = [
        { id: 1, name: 'Nguyễn Văn A', email: 'vanna@gmail.com', phone: '0901234567', orders: 12, totalSpent: '150.000.000₫', lastOrder: '2 giờ trước', status: 'Kích hoạt' },
        { id: 2, name: 'Trần Thị B', email: 'thib@yahoo.com', phone: '0912345678', orders: 5, totalSpent: '45.000.000₫', lastOrder: 'Hôm qua', status: 'Kích hoạt' },
        { id: 3, name: 'Lê Văn C', email: 'vanc@hotmail.com', phone: '0987654321', orders: 2, totalSpent: '12.000.000₫', lastOrder: '2 ngày trước', status: 'Khóa' },
        { id: 4, name: 'Phạm Thị D', email: 'thid@gmail.com', phone: '0909876543', orders: 8, totalSpent: '89.000.000₫', lastOrder: '1 tuần trước', status: 'Kích hoạt' },
        { id: 5, name: 'Hoàng Văn E', email: 'vane@gmail.com', phone: '0919283746', orders: 20, totalSpent: '320.000.000₫', lastOrder: '30 phút trước', status: 'Kích hoạt' },
    ];

    const stats = [
        { label: 'Tổng khách hàng', value: '2,840', change: '+12.5%', icon: '👥', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Khách hàng mới (Tháng)', value: '145', change: '+18.2%', icon: '✨', color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Tỷ lệ quay lại', value: '64%', change: '+2.4%', icon: '🔄', color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Giá trị trung bình', value: '18.500.000₫', change: '+5.1%', icon: '💎', color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <AdminShell>
            <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Quản Lý Khách Hàng</h2>
                        <p className="text-gray-500">Xem thông tin chi tiết và lịch sử mua hàng của khách hàng.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2">
                        <span>➕</span>
                        <span>Thêm khách hàng mới</span>
                    </button>
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

                {/* Filters and Search */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-1 min-w-[300px] relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                            className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <select className="bg-gray-50 border-none rounded-xl py-2.5 px-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none">
                            <option>Trạng thái</option>
                            <option>Kích hoạt</option>
                            <option>Khóa</option>
                        </select>
                        <button className="bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-all flex items-center space-x-2">
                            <span>📤</span>
                            <span>Xuất CSV</span>
                        </button>
                    </div>
                </div>

                {/* Customers Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Khách hàng</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Thông tin liên hệ</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Đơn hàng</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Tổng chi tiêu</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Trạng thái</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-400">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">{customer.name}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">ID: {customer.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-800">{customer.email}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{customer.phone}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <p className="font-bold text-gray-800 text-sm">{customer.orders}</p>
                                        <p className="text-[10px] text-gray-400 uppercase font-medium">{customer.lastOrder}</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="font-bold text-blue-600 text-sm">{customer.totalSpent}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${customer.status === 'Kích hoạt'
                                                ? 'bg-green-50 text-green-600'
                                                : 'bg-red-50 text-red-600'
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                <span>✏️</span>
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                <span>🗑️</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">Hiển thị 1-5 trong số 2,840 khách hàng</p>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-all">◀</button>
                            {[1, 2, 3, '...', 284].map((page, i) => (
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
