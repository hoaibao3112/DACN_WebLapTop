'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ordersApi } from '@/lib/api';
import { Order } from '@/lib/types';
import { formatCurrency, getProductImageUrl, getOrderStatusLabel, getPaymentMethodLabel } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isAuthenticated && params.id) {
      fetchOrder();
    }
  }, [isAuthenticated, authLoading, params.id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const orderId = parseInt(params.id as string);
      const response = await ordersApi.getById(orderId);
      if (response.success && response.data) {
        setOrder(response.data);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order || !confirm('Bạn có chắc muốn hủy đơn hàng này?')) return;

    try {
      const response = await ordersApi.cancel(order.ma_hoa_don);
      if (response.success) {
        alert('Đã hủy đơn hàng thành công');
        fetchOrder();
      }
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'Không thể hủy đơn hàng');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusStep = (status: string): number => {
    const steps: Record<string, number> = {
      pending: 0,
      confirmed: 1,
      shipping: 2,
      delivered: 3,
      cancelled: -1,
    };
    return steps[status] ?? 0;
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy đơn hàng</h1>
        <Button onClick={() => router.push('/profile/orders')}>Về danh sách đơn hàng</Button>
      </div>
    );
  }

  const currentStep = getStatusStep(order.trang_thai);
  const orderSteps = [
    { label: 'Đã đặt', status: 'pending', date: order.ngay_dat },
    { label: 'Đã xác nhận', status: 'confirmed', date: null },
    { label: 'Đang giao', status: 'shipping', date: null },
    { label: 'Hoàn thành', status: 'delivered', date: order.ngay_giao },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/profile/orders')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Lịch sử mua hàng
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Chi Tiết Đơn Hàng Khách Hàng</h1>
              <p className="text-gray-600">
                Mã đơn hàng: <span className="font-semibold">LT-{order.ma_hoa_don.toString().padStart(5, '0')}</span>
              </p>
              <p className="text-sm text-gray-600">
                Ngày đặt hàng: {new Date(order.ngay_dat).toLocaleString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </p>
            </div>
            <Button variant="outline" onClick={handlePrint}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              In hóa đơn
            </Button>
          </div>
        </div>

        {/* Order Status Timeline */}
        {order.trang_thai !== 'cancelled' && (
          <Card className="mb-6">
            <h2 className="text-xl font-bold mb-6">Trạng thái vận chuyển</h2>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200" style={{ zIndex: 0 }}>
                <div 
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${(currentStep / (orderSteps.length - 1)) * 100}%` }}
                />
              </div>

              {/* Steps */}
              <div className="relative flex justify-between" style={{ zIndex: 1 }}>
                {orderSteps.map((step, index) => {
                  const isCompleted = index <= currentStep;
                  const isCurrent = index === currentStep;

                  return (
                    <div key={step.status} className="flex flex-col items-center flex-1">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white transition-all ${
                          isCompleted 
                            ? 'bg-blue-600' 
                            : 'bg-gray-200'
                        }`}
                      >
                        {isCompleted ? (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-gray-400" />
                        )}
                      </div>
                      <p className={`mt-3 text-sm font-medium text-center ${isCompleted ? 'text-blue-600' : 'text-gray-500'}`}>
                        {step.label}
                      </p>
                      {step.date && (
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(step.date).toLocaleDateString('vi-VN')}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {order.trang_thai === 'pending' && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Đơn hàng đang được xác nhận:</strong> Bạn đang chờ người bán xác nhận đơn hàng. Bạn sẽ được thông báo qua tin nhắn hôm nay.
                </p>
              </div>
            )}
          </Card>
        )}

        {order.trang_thai === 'cancelled' && (
          <Card className="mb-6 bg-red-50 border-red-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-red-900">Đơn hàng đã bị hủy</h3>
                <p className="text-sm text-red-700">Đơn hàng của bạn đã được hủy</p>
              </div>
            </div>
          </Card>
        )}

        {/* Products */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold mb-4">Sản phẩm đã mua</h2>
          <div className="space-y-4">
            {order.chi_tiet_hoa_don?.map((item) => (
              <div key={item.ma_chi_tiet} className="flex gap-4 pb-4 border-b last:border-b-0">
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  {item.san_pham?.hinh_anh && (
                    <Image
                      src={getProductImageUrl(item.san_pham.hinh_anh)}
                      alt={item.san_pham?.ten_san_pham || ''}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.san_pham?.ten_san_pham}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {item.san_pham?.thuong_hieu} | {item.san_pham?.ma_san_pham || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">Màu sắc: Moonlight White</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-blue-600">{formatCurrency(item.don_gia)}</p>
                  <p className="text-sm text-gray-600">Số lượng: x{item.so_luong}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <Card>
            <h2 className="text-xl font-bold mb-4">Tổng kết đơn hàng</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tạm tính ({order.chi_tiet_hoa_don?.length || 0} sản phẩm):</span>
                <span className="font-medium">{formatCurrency(order.tong_tien)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Phí vận chuyển:</span>
                <span className="font-medium">Miễn phí</span>
              </div>
              {order.tong_tien > 37280000 && (
                <div className="flex justify-between text-sm text-red-600">
                  <span>Giảm giá (Voucher TECH03):</span>
                  <span className="font-medium">-1,000,000đ</span>
                </div>
              )}
              <div className="pt-3 border-t flex justify-between">
                <span className="font-bold text-lg">Tổng thanh toán:</span>
                <span className="font-bold text-2xl text-blue-600">{formatCurrency(order.tong_tien)}</span>
              </div>
            </div>

            {order.trang_thai === 'pending' && (
              <Button 
                variant="outline" 
                fullWidth 
                className="mt-4 text-red-600 border-red-300 hover:bg-red-50"
                onClick={handleCancelOrder}
              >
                Yêu cầu hủy hàng / Hoàn tiền
              </Button>
            )}

            <Button variant="outline" fullWidth className="mt-3">
              Liên hệ hỗ trợ
            </Button>
          </Card>

          {/* Delivery & Payment Info */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <Card>
              <h2 className="text-xl font-bold mb-4">Thông tin người nhận</h2>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold">Địa điểm vận chuyển</p>
                    <p className="text-sm text-gray-600">Số 123 Đường Lê Lợi, Phường Bến Thành</p>
                    <p className="text-sm text-gray-600">Thành phố Quận 1, TP Hồ Chí Minh</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card>
              <h2 className="text-xl font-bold mb-4">Hình thức thanh toán</h2>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">{getPaymentMethodLabel(order.phuong_thuc_thanh_toan)}</p>
                  <p className="text-sm text-gray-600">Mã giao dịch: GD{order.ma_hoa_don.toString().padStart(8, '0')}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
