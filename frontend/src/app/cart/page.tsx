'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency, getProductImageUrl } from '@/lib/auth';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, loading, removeFromCart, updateCartItem, getCartTotal, getCartCount } = useCart();

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      if (confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?')) {
        await removeFromCart(itemId);
      }
      return;
    }
    await updateCartItem(itemId, newQuantity);
  };

  const handleRemove = async (itemId: number) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      await removeFromCart(itemId);
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <svg className="w-32 h-32 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
          <p className="text-gray-600 mb-6">Bạn chưa thêm sản phẩm nào vào giỏ hàng</p>
          <Button onClick={() => router.push('/products')}>
            Tiếp tục mua sắm
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Giỏ hàng ({getCartCount()} sản phẩm)</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item: CartItem) => (
              <Card key={item.id_ctgiohang}>
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={getProductImageUrl(item.thongsokythuat?.sanpham?.anh_daidien)}
                      alt={item.thongsokythuat?.sanpham?.ten_sanpham || ''}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">
                      <a 
                        href={`/products/${item.thongsokythuat?.id_sanpham}`}
                        className="hover:text-blue-600"
                      >
                        {item.thongsokythuat?.sanpham?.ten_sanpham}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.thongsokythuat?.sanpham?.thuonghieu}
                    </p>
                    <p className="text-lg font-bold text-blue-600">
                      {formatCurrency(item.thongsokythuat?.gia_ban || 0)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(item.id_ctgiohang)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id_ctgiohang, item.soluong - 1)}
                        className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">{item.soluong}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id_ctgiohang, item.soluong + 1)}
                        className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm text-gray-600">
                      Tổng: <span className="font-bold text-gray-900">{formatCurrency((item.thongsokythuat?.gia_ban || 0) * item.soluong)}</span>
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h2 className="text-xl font-bold mb-4">Tổng đơn hàng</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính:</span>
                  <span className="font-medium">{formatCurrency(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển:</span>
                  <span className="font-medium">Miễn phí</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-600">{formatCurrency(getCartTotal())}</span>
                  </div>
                </div>
              </div>

              <Button variant="primary" size="lg" fullWidth onClick={handleCheckout}>
                Thanh toán
              </Button>

              <button
                onClick={() => router.push('/products')}
                className="w-full text-center text-blue-600 hover:text-blue-700 font-medium mt-4"
              >
                Tiếp tục mua sắm
              </button>

              <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Miễn phí vận chuyển cho đơn từ 15 triệu</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Đổi trả trong 7 ngày</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Bảo hành chính hãng</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
