'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency, getProductImageUrl, getAccessToken } from '@/lib/auth';
import { CartItem } from '@/lib/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

type PaymentMethod = 'COD' | 'VNPAY' | 'MOMO' | 'ZALOPAY' | 'VIETQR';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getCartTotal, loading: cartLoading, refreshCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');

  // Shipping info
  const [shippingInfo, setShippingInfo] = useState({
    hoten: '',
    sodienthoai: '',
    email: '',
    diachi: '',
    ghichu: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (cartItems.length === 0) {
      router.push('/cart');
      return;
    }

    // Pre-fill user info
    if (user) {
      setShippingInfo(prev => ({
        ...prev,
        hoten: (user as any).hoten || (user as any).ho_ten || '',
        email: user.email || '',
        sodienthoai: (user as any).sodienthoai || (user as any).so_dien_thoai || '',
      }));
    }
  }, [isAuthenticated, cartItems, user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!shippingInfo.hoten || !shippingInfo.sodienthoai || !shippingInfo.diachi) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        ...shippingInfo,
        payment_method: paymentMethod,
        items: cartItems.map((item: CartItem) => ({
          thongsokythuat_id: item.thongsokythuat_id,
          soluong: item.soluong,
          dongia: item.thongsokythuat?.gia_ban || 0,
        })),
      };

      // Create order
      const token = getAccessToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh cart to clear it from frontend state
        await refreshCart();

        // Check if there was a payment gateway error
        if (data.data.payment_error) {
          // Order created but payment URL failed
          alert(`✅ ${data.message}\n\n⚠️ Đơn hàng đã được tạo (Mã: ${data.data.order.ma_don_hang})\n\nVui lòng liên hệ shop để được hướng dẫn thanh toán hoặc chọn phương thức khác.`);
          router.push('/profile/orders');
          return;
        }

        // If payment method requires redirect (VNPay, MoMo, ZaloPay)
        if (data.data.payment_url) {
          window.location.href = data.data.payment_url;
        } else {
          // COD or VietQR - show success
          alert('✅ Đặt hàng thành công!');
          router.push(`/profile/orders`);
        }
      } else {
        throw new Error(data.message || 'Đặt hàng thất bại');
      }
    } catch (error: unknown) {
      console.error('Checkout error:', error);
      const message = error instanceof Error ? error.message : 'Có lỗi xảy ra. Vui lòng thử lại.';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    {
      id: 'COD' as PaymentMethod,
      name: 'Tiền mặt (COD)',
      icon: '💵',
      description: 'Thanh toán khi nhận hàng',
    },
    {
      id: 'VNPAY' as PaymentMethod,
      name: 'VNPay',
      icon: '🏦',
      description: 'Thanh toán qua VNPay',
    },
    {
      id: 'MOMO' as PaymentMethod,
      name: 'MoMo',
      icon: '🎯',
      description: 'Ví điện tử MoMo',
    },
    {
      id: 'ZALOPAY' as PaymentMethod,
      name: 'ZaloPay',
      icon: '💙',
      description: 'Ví điện tử ZaloPay',
    },
    {
      id: 'VIETQR' as PaymentMethod,
      name: 'VietQR',
      icon: '📱',
      description: 'Quét mã QR ngân hàng',
    },
  ];

  const subtotal = getCartTotal();
  const shippingFee = subtotal >= 15000000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  if (cartLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Thanh toán đơn hàng</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Shipping & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  Thông tin nhận hàng
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Họ và tên *</label>
                    <Input
                      name="hoten"
                      value={shippingInfo.hoten}
                      onChange={handleInputChange}
                      placeholder="Nhập họ tên đầy đủ"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Số điện thoại *</label>
                      <Input
                        name="sodienthoai"
                        type="tel"
                        value={shippingInfo.sodienthoai}
                        onChange={handleInputChange}
                        placeholder="0987654321"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Địa chỉ giao hàng *</label>
                    <textarea
                      name="diachi"
                      value={shippingInfo.diachi}
                      onChange={handleInputChange}
                      placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Ghi chú</label>
                    <textarea
                      name="ghichu"
                      value={shippingInfo.ghichu}
                      onChange={handleInputChange}
                      placeholder="Ghi chú cho người bán..."
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  Phương thức thanh toán
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === method.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                        className="w-5 h-5 text-blue-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{method.icon}</span>
                          <span className="font-semibold">{method.name}</span>
                        </div>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'VIETQR' && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 Sau khi đặt hàng, bạn sẽ nhận được mã QR để quét thanh toán qua app ngân hàng.
                    </p>
                  </div>
                )}
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <h2 className="text-xl font-bold mb-4">Tóm tắt đơn hàng</h2>

                {/* Products */}
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {cartItems.map((item: CartItem) => (
                    <div key={item.id_ctgiohang} className="flex gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded">
                        <Image
                          src={getProductImageUrl(item.thongsokythuat?.sanpham?.anh_daidien)}
                          alt={item.thongsokythuat?.sanpham?.ten_sanpham || ''}
                          fill
                          className="object-cover rounded"
                        />
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                          {item.soluong}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.thongsokythuat?.sanpham?.ten_sanpham}
                        </p>
                        <p className="text-sm text-blue-600 font-semibold">
                          {formatCurrency(item.thongsokythuat?.gia_ban || 0)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tạm tính:</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Phí vận chuyển:</span>
                    <span className={shippingFee === 0 ? 'text-green-600 font-semibold' : 'font-semibold'}>
                      {shippingFee === 0 ? 'Miễn phí' : formatCurrency(shippingFee)}
                    </span>
                  </div>
                  {shippingFee === 0 && (
                    <p className="text-xs text-green-600">
                      ✓ Miễn phí vận chuyển cho đơn từ 15 triệu
                    </p>
                  )}
                  <div className="flex justify-between text-sm text-red-600">
                    <span>Giảm giá:</span>
                    <span>-0đ</span>
                  </div>
                </div>

                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatCurrency(total)}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <LoadingSpinner size="sm" />
                        <span>Đang xử lý...</span>
                      </div>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        XÁC NHẬN ĐẶT HÀNG
                      </span>
                    )}
                  </Button>
                </div>

                <div className="mt-4 space-y-2 text-xs text-gray-600">
                  <p className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Miễn phí vận chuyển cho đơn từ 15 triệu</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Đổi trả trong 7 ngày</span>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
