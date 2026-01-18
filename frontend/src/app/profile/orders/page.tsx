'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ordersApi } from '@/lib/api';
import { Order } from '@/lib/types';
import { formatCurrency, getProductImageUrl, getOrderStatusLabel, getOrderStatusColor } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

type OrderStatus = 'all' | 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<OrderStatus>('all');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, authLoading]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      console.log('Fetching orders...');
      const response = await ordersApi.getAll();
      console.log('Orders response:', response);
      if (response.success && response.data) {
        console.log('Orders data:', response.data);
        setOrders(response.data);
      } else {
        console.error('No orders data:', response);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.trang_thai === activeTab);

  const tabs: { key: OrderStatus; label: string }[] = [
    { key: 'all', label: 'Tất cả' },
    { key: 'pending', label: 'Chờ duyệt' },
    { key: 'confirmed', label: 'Đã xác nhận' },
    { key: 'shipping', label: 'Đang giao' },
    { key: 'delivered', label: 'Hoàn thành' },
    { key: 'cancelled', label: 'Đã hủy' },
  ];

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Đơn Hàng Đã Mua</h1>
        <p className="text-gray-600 mb-8">Theo dõi và quản lý lịch sử mua sắm của bạn</p>

        {/* Tabs */}
        <Card padding="none" className="mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Chưa có đơn hàng nào</h3>
            <p className="text-gray-600 mb-6">Bạn chưa có đơn hàng {activeTab !== 'all' ? getOrderStatusLabel(activeTab).toLowerCase() : ''}</p>
            <Button onClick={() => router.push('/products')}>Mua sắm ngay</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.ma_hoa_don} padding="none" className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Mã đơn: <span className="font-semibold text-gray-900">DH{order.ma_hoa_don.toString().padStart(4, '0')}-{String(order.ma_hoa_don).slice(-3)}</span></p>
                      <p className="text-sm text-gray-600">Ngày đặt: {new Date(order.ngay_dat).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      order.trang_thai === 'delivered' ? 'success' : 
                      order.trang_thai === 'cancelled' ? 'danger' : 
                      order.trang_thai === 'shipping' ? 'primary' : 
                      'warning'
                    }
                    size="lg"
                  >
                    {getOrderStatusLabel(order.trang_thai)}
                  </Badge>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4 mb-4">
                    {order.chi_tiet_hoa_don?.slice(0, 2).map((item) => (
                      <div key={item.ma_chi_tiet} className="flex gap-4">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          {item.san_pham?.hinh_anh && (
                            <Image
                              src={getProductImageUrl(item.san_pham.hinh_anh)}
                              alt={item.san_pham?.ten_san_pham || ''}
                              width={80}
                              height={80}
                              className="object-cover w-full h-full"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{item.san_pham?.ten_san_pham}</h4>
                          <p className="text-sm text-gray-600">{item.san_pham?.thuong_hieu}</p>
                          <p className="text-sm text-gray-600">Số lượng: {item.so_luong}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(item.don_gia)}</p>
                        </div>
                      </div>
                    ))}
                    {order.chi_tiet_hoa_don && order.chi_tiet_hoa_don.length > 2 && (
                      <p className="text-sm text-gray-600">
                        Và {order.chi_tiet_hoa_don.length - 2} sản phẩm khác...
                      </p>
                    )}
                  </div>

                  {/* Order Total */}
                  <div className="pt-4 border-t flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Tổng cộng:</span>
                      <span className="text-2xl font-bold text-blue-600">{formatCurrency(order.tong_tien)}</span>
                    </div>
                    <div className="flex gap-3">
                      {order.trang_thai === 'delivered' && (
                        <Button variant="outline" size="sm" onClick={() => router.push('/products')}>
                          Mua lại
                        </Button>
                      )}
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => router.push(`/profile/orders/${order.ma_hoa_don}`)}
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination - Simple version */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button variant="primary" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
