"use client";

import React, { useEffect, useState } from 'react';
import AdminShell from "@/components/AdminShell";
import { api } from "@/lib/api";

interface Product {
    ma_san_pham: number;
    ten_san_pham: string;
    thuong_hieu: string;
    hinh_anh: string;
    gia_ban: number;
    so_luong_ton: number;
    trang_thai?: string;
    id_sanpham: number;
}

interface Category {
    id_danhmuc: number;
    ten_danhmuc: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        ten_sanpham: '',
        thuonghieu: '',
        danhmuc_id: '',
        mota: '',
    });

    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const result: any = await api.get(`/products?page=${page}&limit=10`);
            setProducts(result.data || result);
            if (result.pagination) {
                setPagination(result.pagination);
            }
        } catch (err: any) {
            console.error('Failed to fetch products:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const result: any = await api.get('/products/categories');
            setCategories(result);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter(p => p.id_sanpham !== id));
            alert('Đã xóa sản phẩm thành công');
        } catch (err: any) {
            alert('Lỗi: ' + err.message);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/products', newProduct);
            setIsAddModalOpen(false);
            setNewProduct({ ten_sanpham: '', thuonghieu: '', danhmuc_id: '', mota: '' });
            fetchProducts();
            alert('Thêm sản phẩm thành công');
        } catch (err: any) {
            alert('Lỗi: ' + err.message);
        }
    };

    return (
        <AdminShell>
            <div className="space-y-6 animate-fade-in relative">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Quản Lý Sản Phẩm Laptop</h2>
                        <p className="text-gray-500">Quản lý kho và cập nhật giá cho các dòng laptop.</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2"
                    >
                        <span>➕</span>
                        <span>Thêm sản phẩm mới</span>
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm font-medium">
                        ⚠️ Lỗi: {error}
                    </div>
                )}

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
                        <option value="">Tất cả thương hiệu</option>
                        <option value="Apple">Apple</option>
                        <option value="Dell">Dell</option>
                        <option value="Asus">Asus</option>
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
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center space-y-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                            <p className="text-gray-400 text-sm font-medium">Đang tải danh sách sản phẩm...</p>
                        </div>
                    ) : (
                        <>
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
                                    {products.length > 0 ? products.map((product) => (
                                        <tr key={product.ma_san_pham} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <img
                                                    src={product.hinh_anh || '/api/placeholder/48/48'}
                                                    alt={product.ten_san_pham}
                                                    className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-gray-800 text-sm">{product.ten_san_pham}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">ID: {product.id_sanpham}</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-[10px] font-bold uppercase">
                                                    {product.thuong_hieu}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <p className="font-bold text-blue-600 text-sm">{product.gia_ban.toLocaleString()}₫</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-medium text-gray-700">{product.so_luong_ton}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${product.so_luong_ton > 0
                                                        ? 'bg-green-50 text-green-600'
                                                        : 'bg-red-50 text-red-600'
                                                    }`}>
                                                    {product.so_luong_ton > 0 ? 'Còn hàng' : 'Hết hàng'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                        <span>✏️</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id_sanpham)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    >
                                                        <span>🗑️</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-20 text-center text-gray-400 font-medium">
                                                Không tìm thấy sản phẩm nào.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                                <p className="text-sm text-gray-500">Hiển thị {products.length} trong số {pagination.total} sản phẩm</p>
                                <div className="flex items-center space-x-2">
                                    <button
                                        disabled={pagination.page <= 1}
                                        onClick={() => fetchProducts(pagination.page - 1)}
                                        className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-50 transition-all"
                                    >◀</button>
                                    {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => fetchProducts(page)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${page === pagination.page ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        disabled={pagination.page >= pagination.totalPages}
                                        onClick={() => fetchProducts(pagination.page + 1)}
                                        className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-50 transition-all"
                                    >▶</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Add Product Modal */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in">
                            <div className="p-6 bg-blue-600 flex items-center justify-between text-white">
                                <h3 className="text-xl font-bold">Thêm sản phẩm laptop mới</h3>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                                >✕</button>
                            </div>
                            <form onSubmit={handleAddProduct} className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Tên sản phẩm</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="VD: Dell XPS 13 9315"
                                            className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            value={newProduct.ten_sanpham}
                                            onChange={(e) => setNewProduct({ ...newProduct, ten_sanpham: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Thương hiệu</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="VD: DELL"
                                            className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            value={newProduct.thuonghieu}
                                            onChange={(e) => setNewProduct({ ...newProduct, thuonghieu: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Danh mục</label>
                                        <select
                                            required
                                            className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            value={newProduct.danhmuc_id}
                                            onChange={(e) => setNewProduct({ ...newProduct, danhmuc_id: e.target.value })}
                                        >
                                            <option value="">Chọn danh mục</option>
                                            {categories.map(cat => (
                                                <option key={cat.id_danhmuc} value={cat.id_danhmuc}>{cat.ten_danhmuc}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Mô tả sản phẩm</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="Nhập mô tả chi tiết về sản phẩm..."
                                        value={newProduct.mota}
                                        onChange={(e) => setNewProduct({ ...newProduct, mota: e.target.value })}
                                    ></textarea>
                                </div>
                                <div className="flex items-center justify-end space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all font-medium"
                                    >Hủy bỏ</button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                                    >Lưu sản phẩm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminShell>
    );
}
