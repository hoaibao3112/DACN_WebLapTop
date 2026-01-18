'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ordersApi } from '@/lib/api';
import { Order } from '@/lib/types';
import { formatCurrency, formatDate, getOrderStatusLabel, getOrderStatusColor } from '@/lib/auth';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersApi.getAll();
      if (response.success && response.data) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Hồ Sơ Cá Nhân</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {((user as any).hoten || (user as any).ho_ten || 'U').charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold mb-1">{(user as any).hoten || (user as any).ho_ten || 'User'}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>

              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
                  Thông tin cá nhân
                </button>
                <button
                  onClick={() => router.push('/profile/orders')}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  Đơn hàng của tôi
                </button>
                <button
                  onClick={() => router.push('/profile/addresses')}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  Sổ địa chỉ
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600"
                >
                  Đăng xuất
                </button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Info */}
            <Card>
              <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ tên
                  </label>
                  <p className="text-gray-900">{(user as any).hoten || (user as any).ho_ten || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                {((user as any).sodienthoai || (user as any).so_dien_thoai) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <p className="text-gray-900">{(user as any).sodienthoai || (user as any).so_dien_thoai}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái tài khoản
                  </label>
                  <p className="text-gray-900">
                    {(user as any).trangthai || (user as any).trang_thai === 'active' ? (
                      <span className="text-green-600 font-medium">Hoạt động</span>
                    ) : (
                      <span className="text-red-600 font-medium">Không hoạt động</span>
                    )}
                  </p>
                </div>
              </div>
            </Card>

            {/* Recent Orders */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Đơn hàng gần đây</h2>
                <button
                  onClick={() => router.push('/profile/orders')}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Xem tất cả
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      key={order.ma_hoa_don}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">Đơn hàng #{order.ma_hoa_don}</p>
                          <p className="text-sm text-gray-600">{formatDate(order.ngay_dat)}</p>
                        </div>
                        <Badge variant={order.trang_thai === 'delivered' ? 'success' : 'primary'}>
                          {getOrderStatusLabel(order.trang_thai)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-blue-600">
                          {formatCurrency(order.tong_tien)}
                        </p>
                        <button
                          onClick={() => router.push(`/profile/orders/${order.ma_hoa_don}`)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">Bạn chưa có đơn hàng nào</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
