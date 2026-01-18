'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { productsApi } from '@/lib/api';
import { Product } from '@/lib/types';
import { formatCurrency, getProductImageUrl } from '@/lib/auth';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ProductSpecs from '@/components/products/ProductSpecs';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const productId = parseInt(params.id as string);
      
      // Check if productId is valid
      if (isNaN(productId)) {
        console.error('Invalid product ID:', params.id);
        setLoading(false);
        return;
      }
      
      const response = await productsApi.getById(productId);
      if (response.success && response.data) {
        setProduct(response.data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!product || !product.ma_san_pham) return;

    try {
      setAddingToCart(true);
      await addToCart(product.ma_san_pham, quantity);
      alert('Đã thêm vào giỏ hàng!');
    } catch (error: any) {
      alert(error.message || 'Không thể thêm vào giỏ hàng');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    if (isAuthenticated) {
      router.push('/cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
        <Button onClick={() => router.push('/products')}>Về trang sản phẩm</Button>
      </div>
    );
  }

  const isOutOfStock = product.trang_thai === 'out_of_stock' || product.so_luong_ton === 0;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2">
            <li><a href="/" className="text-blue-600 hover:underline">Trang chủ</a></li>
            <li>/</li>
            <li><a href="/products" className="text-blue-600 hover:underline">Sản phẩm</a></li>
            <li>/</li>
            <li className="text-gray-600">{product.ten_san_pham}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div>
            <Card padding="none" className="overflow-hidden">
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={getProductImageUrl(product.hinh_anh)}
                  alt={product.ten_san_pham || 'Sản phẩm'}
                  fill
                  className="object-cover"
                  priority
                />
                {isOutOfStock && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="danger" size="lg">Hết hàng</Badge>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Product Info */}
          <div>
            <Card>
              {product.thuong_hieu && (
                <p className="text-sm text-gray-500 mb-2">{product.thuong_hieu}</p>
              )}
              
              <h1 className="text-3xl font-bold mb-4">{product.ten_san_pham}</h1>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-blue-600">
                  {formatCurrency(product.gia_ban || 0)}
                </span>
              </div>

              {product.mo_ta && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Mô tả</h3>
                  <p className="text-gray-700">{product.mo_ta}</p>
                </div>
              )}

              {!isOutOfStock && (
                <>
                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <label className="block font-semibold mb-2">Số lượng</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center font-medium"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={product.so_luong_ton || 0}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(product.so_luong_ton || 0, parseInt(e.target.value) || 1)))}
                        className="w-20 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => setQuantity(Math.min(product.so_luong_ton || 0, quantity + 1))}
                        className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center font-medium"
                      >
                        +
                      </button>
                      <span className="text-sm text-gray-600">
                        {product.so_luong_ton} sản phẩm có sẵn
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      fullWidth
                      onClick={handleAddToCart}
                      loading={addingToCart}
                    >
                      Thêm vào giỏ
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleBuyNow}
                      loading={addingToCart}
                    >
                      Mua ngay
                    </Button>
                  </div>
                </>
              )}

              {/* Product Info */}
              <div className="mt-6 pt-6 border-t space-y-3">
                {product.xuat_xu && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Xuất xứ:</span>
                    <span className="font-medium">{product.xuat_xu}</span>
                  </div>
                )}
                {product.bao_hanh && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bảo hành:</span>
                    <span className="font-medium">{product.bao_hanh}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Technical Specs */}
        {product.thong_so_ky_thuat && product.thong_so_ky_thuat.length > 0 && (
          <ProductSpecs specs={product.thong_so_ky_thuat} />
        )}
      </div>
    </div>
  );
}
