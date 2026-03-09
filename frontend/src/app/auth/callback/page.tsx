'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { saveTokens } from '@/lib/auth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function AuthCallbackInner() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const refreshToken = searchParams.get('refreshToken');
      const error = searchParams.get('error');

      if (error) {
        alert('Đăng nhập thất bại. Vui lòng thử lại.');
        window.location.href = '/login';
        return;
      }

      if (token && refreshToken) {
        // Save tokens — hard reload so AuthContext remounts and fetches profile
        saveTokens(token, refreshToken);
        window.location.href = '/';
      } else {
        window.location.href = '/login';
      }
    };

    handleCallback();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        </div>
      }
    >
      <AuthCallbackInner />
    </Suspense>
  );
}
