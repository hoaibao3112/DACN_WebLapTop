'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form
  const [loginData, setLoginData] = useState({
    ten_dang_nhap: '',
    mat_khau: '',
  });

  // Register form
  const [registerData, setRegisterData] = useState({
    ten_dang_nhap: '',
    mat_khau: '',
    email: '',
    ho_ten: '',
    so_dien_thoai: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(loginData);
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(registerData);
      router.push('/');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLoginMode ? 'Đăng nhập' : 'Đăng ký'}
          </h1>
          <p className="text-gray-600">
            {isLoginMode ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới'}
          </p>
        </div>

        <Card>
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsLoginMode(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                isLoginMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setIsLoginMode(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                !isLoginMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Đăng ký
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          {isLoginMode ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Tên đăng nhập"
                type="text"
                required
                value={loginData.ten_dang_nhap}
                onChange={(e) => setLoginData({ ...loginData, ten_dang_nhap: e.target.value })}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />

              <Input
                label="Mật khẩu"
                type="password"
                required
                value={loginData.mat_khau}
                onChange={(e) => setLoginData({ ...loginData, mat_khau: e.target.value })}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />

              <Button type="submit" fullWidth loading={loading}>
                Đăng nhập
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                </div>
              </div>

              {/* OAuth Buttons */}
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
                  }}
                  className="flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Đăng nhập bằng Google
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/facebook`;
                  }}
                  className="flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Đăng nhập bằng Facebook
                </Button>
              </div>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                label="Tên đăng nhập"
                type="text"
                required
                value={registerData.ten_dang_nhap}
                onChange={(e) => setRegisterData({ ...registerData, ten_dang_nhap: e.target.value })}
              />

              <Input
                label="Email"
                type="email"
                required
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              />

              <Input
                label="Họ tên"
                type="text"
                required
                value={registerData.ho_ten}
                onChange={(e) => setRegisterData({ ...registerData, ho_ten: e.target.value })}
              />

              <Input
                label="Số điện thoại"
                type="tel"
                value={registerData.so_dien_thoai}
                onChange={(e) => setRegisterData({ ...registerData, so_dien_thoai: e.target.value })}
              />

              <Input
                label="Mật khẩu"
                type="password"
                required
                value={registerData.mat_khau}
                onChange={(e) => setRegisterData({ ...registerData, mat_khau: e.target.value })}
              />

              <Button type="submit" fullWidth loading={loading}>
                Đăng ký
              </Button>
            </form>
          )}
        </Card>

        <p className="text-center text-sm text-gray-600 mt-6">
          Bằng việc đăng nhập, bạn đồng ý với{' '}
          <a href="/terms" className="text-blue-600 hover:underline">
            Điều khoản sử dụng
          </a>{' '}
          và{' '}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Chính sách bảo mật
          </a>
        </p>
      </div>
    </div>
  );
}
