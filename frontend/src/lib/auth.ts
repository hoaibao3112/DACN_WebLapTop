import { User } from './types';

// Storage keys
const USER_KEY = 'user_data';
const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Check if we're in the browser
const isBrowser = typeof window !== 'undefined';

// User data management
export const saveUser = (user: User): void => {
  if (isBrowser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const getUser = (): User | null => {
  if (!isBrowser) return null;
  
  try {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const removeUser = (): void => {
  if (isBrowser) {
    localStorage.removeItem(USER_KEY);
  }
};

// Token management
export const saveTokens = (accessToken: string, refreshToken: string): void => {
  if (isBrowser) {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const getAccessToken = (): string | null => {
  return isBrowser ? localStorage.getItem(TOKEN_KEY) : null;
};

export const getRefreshToken = (): string | null => {
  return isBrowser ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
};

export const removeTokens = (): void => {
  if (isBrowser) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

// Clear all auth data
export const clearAuthData = (): void => {
  removeUser();
  removeTokens();
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAccessToken() && !!getUser();
};

// Check if token is expired (basic check)
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= exp;
  } catch (error) {
    return true;
  }
};

// Format currency (Vietnamese Dong)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

// Format date
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Vietnamese format)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Format phone number
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  }
  return phone;
};

// Generate unique ID for temporary items
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Debounce function for search
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Get product image URL
export const getProductImageUrl = (imagePath?: string): string => {
  // If no image path, return placeholder
  if (!imagePath) return '/images/placeholder-product.jpg';
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it starts with /uploads, point to backend
  if (imagePath.startsWith('/uploads') || imagePath.startsWith('uploads')) {
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${cleanPath}`;
  }
  
  // If it's a relative path starting with /, return as is (Next.js will handle it)
  if (imagePath.startsWith('/')) {
    return imagePath;
  }
  
  // Otherwise, assume it's in backend uploads
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/products/${imagePath}`;
};

// Order status labels
export const getOrderStatusLabel = (status: string): string => {
  const statusLabels: Record<string, string> = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    shipping: 'Đang giao hàng',
    delivered: 'Đã giao hàng',
    cancelled: 'Đã hủy',
  };
  return statusLabels[status] || status;
};

// Order status colors
export const getOrderStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    pending: 'text-yellow-600 bg-yellow-50',
    confirmed: 'text-blue-600 bg-blue-50',
    shipping: 'text-purple-600 bg-purple-50',
    delivered: 'text-green-600 bg-green-50',
    cancelled: 'text-red-600 bg-red-50',
  };
  return statusColors[status] || 'text-gray-600 bg-gray-50';
};

// Payment method labels
export const getPaymentMethodLabel = (method: string): string => {
  const methodLabels: Record<string, string> = {
    cod: 'Thanh toán khi nhận hàng',
    banking: 'Chuyển khoản ngân hàng',
    'e-wallet': 'Ví điện tử',
  };
  return methodLabels[method] || method;
};

// Product status labels
export const getProductStatusLabel = (status: string): string => {
  const statusLabels: Record<string, string> = {
    available: 'Còn hàng',
    out_of_stock: 'Hết hàng',
    discontinued: 'Ngừng kinh doanh',
  };
  return statusLabels[status] || status;
};
