'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productsApi } from '@/lib/api';
import { Product } from '@/lib/types';
import ProductCard from '@/components/products/ProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productsApi.getAll({ limit: 8, sortBy: 'newest' });
        if (response.success) {
          setFeaturedProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="bg-white">

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e8f4fd 0%, #dbeafe 40%, #ede9fe 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Premium Laptops 2024
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                Định Hình
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Thế Hệ Mới
                </span>
              </h1>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed max-w-md">
                Trải nghiệm sức mạnh vượt trội cùng những chiếc laptop công nghệ đỉnh cao nhất 2024. Thiết kế tinh tế, hiệu năng đột phá cho mọi nhu cầu.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/products"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300">
                  Khám phá ngay
                </Link>
                <Link href="/about"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 transition-all">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Xem TVC
                </Link>
              </div>
            </div>

            {/* Right — laptop image card */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-100 rounded-full blur-2xl" />
                <Image
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80"
                  alt="Laptop 2024"
                  width={480}
                  height={320}
                  className="relative z-10 w-full h-auto object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header row */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Sản Phẩm Nổi Bật</h2>
              <p className="text-gray-500">Những mẫu laptop được yêu thích nhất với công nghệ tiên tiến nhất hiện nay.</p>
            </div>
            <Link href="/products" className="hidden md:inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm whitespace-nowrap">
              Xem tất cả sản phẩm
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id_sanpham || product.ma_san_pham || Math.random()}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400">Chưa có sản phẩm nào</p>
            </div>
          )}

          {/* Mobile view all link */}
          <div className="mt-8 text-center md:hidden">
            <Link href="/products" className="inline-flex items-center gap-1 text-blue-600 font-medium">
              Xem tất cả sản phẩm
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Danh Mục Sản Phẩm</h2>
            <p className="text-gray-500">Lựa chọn laptop phù hợp nhất với nhu cầu và phong cách sống của bạn.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Gaming */}
            <Link href="/products?category=gaming">
              <div className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)' }}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                {/* decorative circle */}
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                {/* controller icon */}
                <div className="absolute bottom-14 right-5 text-6xl opacity-80">🎮</div>
                <div className="relative z-10 p-6 flex flex-col h-full">
                  <h3 className="text-white text-2xl font-bold mb-2">Gaming</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Hiệu năng mạnh mẽ, đồ họa đỉnh cao cho game thủ chuyên nghiệp.</p>
                  <div className="mt-auto inline-flex items-center text-white font-medium text-sm">
                    Khám phá ngay
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Văn Phòng */}
            <Link href="/products?category=office">
              <div className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' }}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute bottom-14 right-5 text-6xl opacity-80">💼</div>
                <div className="relative z-10 p-6 flex flex-col h-full">
                  <h3 className="text-white text-2xl font-bold mb-2">Văn Phòng</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Mỏng nhẹ, pin bền bỉ, xử lý đa nhiệm mượt mà cho công việc.</p>
                  <div className="mt-auto inline-flex items-center text-white font-medium text-sm">
                    Khám phá ngay
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Đồ Họa */}
            <Link href="/products?category=graphics">
              <div className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' }}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute bottom-14 right-5 text-6xl opacity-80">🎨</div>
                <div className="relative z-10 p-6 flex flex-col h-full">
                  <h3 className="text-white text-2xl font-bold mb-2">Đồ Họa</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Màn hình chuẩn màu, sức mạnh render vượt giới hạn.</p>
                  <div className="mt-auto inline-flex items-center text-white font-medium text-sm">
                    Khám phá ngay
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Sinh Viên */}
            <Link href="/products?category=student">
              <div className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer" style={{ background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)' }}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute bottom-14 right-5 text-6xl opacity-80">🎓</div>
                <div className="relative z-10 p-6 flex flex-col h-full">
                  <h3 className="text-white text-2xl font-bold mb-2">Sinh Viên</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Giá tốt, bền bỉ, đồng hành cùng bạn suốt quãng đời sinh viên.</p>
                  <div className="mt-auto inline-flex items-center text-white font-medium text-sm">
                    Khám phá ngay
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
