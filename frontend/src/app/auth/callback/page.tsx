'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { saveTokens, saveUser } from '@/lib/auth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const refreshToken = searchParams.get('refreshToken');
      const error = searchParams.get('error');

      if (error) {
        alert('Đăng nhập thất bại. Vui lòng thử lại.');
        router.push('/login');
        return;
      }

      if (token && refreshToken) {
        // Save tokens
        saveTokens(token, refreshToken);

        // Fetch user profile
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            saveUser(data.data);
            router.push('/');
          } else {
            throw new Error('Failed to fetch profile');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          alert('Đã xảy ra lỗi. Vui lòng đăng nhập lại.');
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}
