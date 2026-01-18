# Hướng Dẫn Authentication - Login & Lấy Token

## 🔐 Bạn cần LOGIN trước khi đặt hàng!

Endpoint `/api/orders` yêu cầu authentication. Bạn phải có **access token** trước.

## 📝 API Đăng Ký & Đăng Nhập

### 1. ĐĂNG KÝ TÀI KHOẢN

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "hoten": "Nguyễn Văn A",
  "email": "test@example.com",
  "matkhau": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "test@example.com",
      "hoten": "Nguyễn Văn A"
    }
  }
}
```

### 2. ĐĂNG NHẬP

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "test@example.com",
  "matkhau": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "test@example.com",
      "hoten": "Nguyễn Văn A",
      "roles": ["customer"],
      "permissions": ["view:products", "manage:own_cart", ...]
    }
  }
}
```

## 💻 Code Frontend - React/Next.js

### Auth Service

```typescript
// services/auth.service.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Register
export const register = async (userData: {
  hoten: string;
  email: string;
  matkhau: string;
}) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Login
export const login = async (credentials: {
  email: string;
  matkhau: string;
}) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  
  // Lưu tokens vào localStorage
  if (response.data.success) {
    localStorage.setItem('access_token', response.data.data.accessToken);
    localStorage.setItem('refresh_token', response.data.data.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }
  
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

// Get access token
export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

// Check if user is logged in
export const isAuthenticated = () => {
  return !!getAccessToken();
};
```

### Login Component

```tsx
// components/Login.tsx
'use client';

import { useState } from 'react';
import { login } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    matkhau: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData);
      
      if (result.success) {
        // Redirect to home or checkout page
        router.push('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng Nhập</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={formData.matkhau}
            onChange={(e) => setFormData({...formData, matkhau: e.target.value})}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
}
```

### Register Component

```tsx
// components/Register.tsx
'use client';

import { useState } from 'react';
import { register } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    hoten: '',
    email: '',
    matkhau: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await register(formData);
      
      if (result.success) {
        // Auto login after register
        localStorage.setItem('access_token', result.data.accessToken);
        localStorage.setItem('refresh_token', result.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        
        router.push('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng ký thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Đăng Ký</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Họ tên:</label>
          <input
            type="text"
            value={formData.hoten}
            onChange={(e) => setFormData({...formData, hoten: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={formData.matkhau}
            onChange={(e) => setFormData({...formData, matkhau: e.target.value})}
            required
            minLength={6}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </form>
    </div>
  );
}
```

### Protected Route HOC

```tsx
// components/ProtectedRoute.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/services/auth.service';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  if (!isAuthenticated()) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
```

### Axios Interceptor (Tự động thêm token)

```typescript
// lib/axios.ts
import axios from 'axios';
import { getAccessToken } from '@/services/auth.service';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request interceptor - tự động thêm token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired - redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

### Updated Order Service (với axios instance)

```typescript
// services/order.service.ts
import axiosInstance from '@/lib/axios';

export const createOrder = async (orderData: any) => {
  const response = await axiosInstance.post('/orders', orderData);
  return response.data;
};

export const getOrders = async () => {
  const response = await axiosInstance.get('/orders');
  return response.data;
};

export const getOrderById = async (orderId: number) => {
  const response = await axiosInstance.get(`/orders/${orderId}`);
  return response.data;
};
```

## 🧪 Test với Postman/Thunder Client

### 1. Register
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "hoten": "Test User",
  "email": "test@test.com",
  "matkhau": "123456"
}
```

### 2. Login
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@test.com",
  "matkhau": "123456"
}
```

**Copy accessToken từ response!**

### 3. Create Order (với token)
```http
POST http://localhost:5000/api/orders
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "hoten": "Nguyễn Văn A",
  "sodienthoai": "0912345678",
  "diachi": "123 ABC",
  "payment_method": "COD",
  "items": [
    {
      "thongsokythuat_id": 1,
      "soluong": 1
    }
  ]
}
```

## ⚡ Quick Fix cho Frontend hiện tại

Nếu bạn đang test nhanh, làm theo steps:

1. **Đăng ký/Đăng nhập** qua API
2. **Copy accessToken** từ response
3. **Lưu vào localStorage:**
   ```javascript
   localStorage.setItem('access_token', 'YOUR_TOKEN_HERE');
   ```
4. **Reload page** và thử đặt hàng lại

## 🔄 Refresh Token

Khi access token hết hạn (4h), dùng refresh token:

```typescript
// services/auth.service.ts
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  
  const response = await axios.post(`${API_URL}/auth/refresh`, {
    refreshToken
  });
  
  if (response.data.success) {
    localStorage.setItem('access_token', response.data.data.accessToken);
    return response.data.data.accessToken;
  }
  
  throw new Error('Refresh token failed');
};
```

---

**LƯU Ý:** Access token hết hạn sau **4 giờ**, refresh token hết hạn sau **14 ngày**.
