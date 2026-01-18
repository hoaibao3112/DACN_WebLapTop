'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productsApi } from '@/lib/api';
import { Product } from '@/lib/types';
import { formatCurrency, getProductImageUrl } from '@/lib/auth';
import ProductCard from '@/components/products/ProductCard';
import Button from '@/components/ui/Button';
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
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Thế Hệ Laptop Mới
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  2024
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Trải nghiệm sức mạnh vượt trội cùng những chiếc laptop thế hệ mới nhất. 
                Giá tốt nhất thị trường, bảo hành chu đáo.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" variant="secondary">
                    Xem ngay
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white hover:bg-white/20">
                    Tư vấn: 1900 XXXX
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Sản Phẩm Nổi Bật</h2>
            <p className="text-gray-600 text-lg">
              Khám phá những sản phẩm laptop hot nhất hiện nay
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {featuredProducts.map((product) => (
                  <ProductCard 
                    key={product.id_sanpham || product.ma_san_pham || Math.random()} 
                    product={product} 
                  />
                ))}
              </div>
              <div className="text-center">
                <Link href="/products">
                  <Button variant="outline" size="lg">
                    Xem tất cả sản phẩm
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500">Chưa có sản phẩm nào</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Danh Mục Sản Phẩm</h2>
            <p className="text-gray-600 text-lg">
              Tìm laptop phù hợp với nhu cầu của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Gaming',
                description: 'Hiệu năng mạnh mẽ',
                icon: '🎮',
                color: 'from-red-500 to-orange-600',
                link: '/products?category=gaming',
              },
              {
                title: 'Văn Phòng',
                description: 'Làm việc hiệu quả',
                icon: '💼',
                color: 'from-blue-500 to-cyan-600',
                link: '/products?category=office',
              },
              {
                title: 'Đồ Họa',
                description: 'Sáng tạo không giới hạn',
                icon: '🎨',
                color: 'from-purple-500 to-pink-600',
                link: '/products?category=graphics',
              },
              {
                title: 'Sinh Viên',
                description: 'Giá tốt, chất lượng',
                icon: '🎓',
                color: 'from-green-500 to-teal-600',
                link: '/products?category=student',
              },
            ].map((category, index) => (
              <Link key={`category-${category.title}-${index}`} href={category.link}>
                <div className={`relative bg-gradient-to-br ${category.color} rounded-2xl p-6 h-48 overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="relative z-10 text-white h-full flex flex-col justify-between">
                    <div>
                      <div className="text-5xl mb-2">{category.icon}</div>
                      <h3 className="text-2xl font-bold mb-1">{category.title}</h3>
                      <p className="text-white/90">{category.description}</p>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      Khám phá ngay
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
