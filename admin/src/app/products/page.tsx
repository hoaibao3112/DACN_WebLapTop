"use client";

import AdminShell from "@/components/AdminShell";

export default function ProductsPage() {
    const products = [
        { id: 1, name: 'Dell XPS 13 9315', sku: 'DELL-XPS13-001', brand: 'DELL', price: '29.990.000₫', stock: 15, status: 'Còn hàng', image: '/api/placeholder/48/48' },
        { id: 2, name: 'MacBook Pro 14" M2 Max', sku: 'MAC-P14M2-X', brand: 'APPLE', price: '55.500.000₫', stock: 8, status: 'Còn hàng', image: '/api/placeholder/48/48' },
        { id: 3, name: 'Asus ROG Zephyrus G14', sku: 'ASUS-ROG-Z14-23', brand: 'ASUS', price: '42.000.000₫', stock: 0, status: 'Hết hàng', image: '/api/placeholder/48/48' },
        { id: 4, name: 'HP Spectre x360 14"', sku: 'HP-SPEC-X14', brand: 'HP', price: '31.000.000₫', stock: 5, status: 'Còn hàng', image: '/api/placeholder/48/48' },
    ];

    return (
        <AdminShell>
            <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Quản Lý Sản Phẩm Laptop</h2>
                        <p className="text-gray-500">Quản lý kho và cập nhật giá cho các dòng laptop.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2">
                        <span>➕</span>
                        <span>Thêm sản phẩm mới</span>
                    </button>
                </div>

                {/* Filters and Search */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[300px] relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên sản phẩm, mã SKU hoặc thương hiệu..."
                            className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none"
                        />
                    </div>
                    <select className="bg-gray-50 border-none rounded-xl py-2.5 px-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none">
                        <option>Thương hiệu</option>
                        <option>Apple</option>
                        <option>Dell</option>
                        <option>Asus</option>
                    </select>
                    <select className="bg-gray-50 border-none rounded-xl py-2.5 px-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none">
                        <option>Trạng thái</option>
                        <option>Còn hàng</option>
                        <option>Sắp hết hàng</option>
                        <option>Hết hàng</option>
                    </select>
                    <button className="bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-all flex items-center space-x-2">
                        <span>⏳</span>
                        <span>Lọc</span>
                    </button>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Hình ảnh</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Thương hiệu</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Giá</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Tồn kho</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Trạng thái</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-800 text-sm">{product.name}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">SKU: {product.sku}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] font-bold uppercase">
                                            {product.brand}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="font-bold text-blue-600 text-sm">{product.price}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-medium text-gray-700">{product.stock}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${product.status === 'Còn hàng'
                                                ? 'bg-green-50 text-green-600'
                                                : 'bg-red-50 text-red-600'
                                            }`}>
                                            {product.status}
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
                        <p className="text-sm text-gray-500">Hiển thị 1-4 trong số 124 sản phẩm</p>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 transition-all">◀</button>
                            {[1, 2, 3, '...', 32].map((page, i) => (
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
