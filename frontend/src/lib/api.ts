import { 
  ApiResponse, 
  PaginatedResponse, 
  Product, 
  ProductFilters,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  Cart,
  Order,
  Address
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Token management
const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setAccessToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
};

export const clearTokens = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

// API Error class
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Request wrapper with automatic token refresh
async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAccessToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Merge with any existing headers from options
  if (options.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(options.headers)) {
      options.headers.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      Object.assign(headers, options.headers);
    }
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  // If unauthorized and we have a refresh token, try to refresh
  if (response.status === 401 && getRefreshToken()) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Retry the original request with new token
      headers['Authorization'] = `Bearer ${getAccessToken()}`;
      response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers,
      });
    }
  }

  return response;
}

// Refresh access token
async function refreshAccessToken(): Promise<boolean> {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      clearTokens();
      return false;
    }

    const data = await response.json();
    setAccessToken(data.data.accessToken);
    return true;
  } catch (error) {
    clearTokens();
    return false;
  }
}

// Generic API call handler
async function apiCall<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetchWithAuth(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.message || errorData.error || 'An error occurred',
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Network error occurred');
  }
}

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiCall<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.success && response.data) {
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
    }
    
    return response;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiCall<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.success && response.data) {
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
    }
    
    return response;
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    return apiCall<ApiResponse<User>>('/api/auth/profile');
  },

  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    return apiCall<ApiResponse<User>>('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  logout: () => {
    clearTokens();
  },
};

// Products API
export const productsApi = {
  getAll: async (filters?: ProductFilters): Promise<PaginatedResponse<Product>> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const url = `/api/products${queryString ? `?${queryString}` : ''}`;
    
    return apiCall<PaginatedResponse<Product>>(url);
  },

  getById: async (id: number): Promise<ApiResponse<Product>> => {
    return apiCall<ApiResponse<Product>>(`/api/products/${id}`);
  },

  search: async (query: string): Promise<ApiResponse<Product[]>> => {
    return apiCall<ApiResponse<Product[]>>(`/api/products/search?q=${encodeURIComponent(query)}`);
  },
};

// Cart API
export const cartApi = {
  get: async (): Promise<ApiResponse<Cart>> => {
    return apiCall<ApiResponse<Cart>>('/api/cart');
  },

  add: async (productId: number, quantity: number): Promise<ApiResponse<Cart>> => {
    return apiCall<ApiResponse<Cart>>('/api/cart/items', {
      method: 'POST',
      body: JSON.stringify({ thongsokythuat_id: productId, soluong: quantity }),
    });
  },

  update: async (itemId: number, quantity: number): Promise<ApiResponse<Cart>> => {
    return apiCall<ApiResponse<Cart>>(`/api/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ soluong: quantity }),
    });
  },

  remove: async (itemId: number): Promise<ApiResponse<void>> => {
    return apiCall<ApiResponse<void>>(`/api/cart/items/${itemId}`, {
      method: 'DELETE',
    });
  },

  clear: async (): Promise<ApiResponse<void>> => {
    return apiCall<ApiResponse<void>>('/api/cart', {
      method: 'DELETE',
    });
  },
};

// Orders API
export const ordersApi = {
  create: async (orderData: {
    ma_dia_chi?: number;
    phuong_thuc_thanh_toan: 'cod' | 'banking' | 'e-wallet';
    ghi_chu?: string;
  }): Promise<ApiResponse<Order>> => {
    return apiCall<ApiResponse<Order>>('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getAll: async (): Promise<ApiResponse<Order[]>> => {
    return apiCall<ApiResponse<Order[]>>('/api/orders');
  },

  getById: async (id: number): Promise<ApiResponse<Order>> => {
    return apiCall<ApiResponse<Order>>(`/api/orders/${id}`);
  },

  cancel: async (id: number): Promise<ApiResponse<Order>> => {
    return apiCall<ApiResponse<Order>>(`/api/orders/${id}/cancel`, {
      method: 'PUT',
    });
  },
};

// Addresses API
export const addressesApi = {
  getAll: async (): Promise<ApiResponse<Address[]>> => {
    return apiCall<ApiResponse<Address[]>>('/api/addresses');
  },

  create: async (data: Omit<Address, 'ma_dia_chi' | 'ma_tai_khoan' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Address>> => {
    return apiCall<ApiResponse<Address>>('/api/addresses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: number, data: Partial<Address>): Promise<ApiResponse<Address>> => {
    return apiCall<ApiResponse<Address>>(`/api/addresses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    return apiCall<ApiResponse<void>>(`/api/addresses/${id}`, {
      method: 'DELETE',
    });
  },

  setDefault: async (id: number): Promise<ApiResponse<Address>> => {
    return apiCall<ApiResponse<Address>>(`/api/addresses/${id}/default`, {
      method: 'PUT',
    });
  },
};

export default {
  auth: authApi,
  products: productsApi,
  cart: cartApi,
  orders: ordersApi,
  addresses: addressesApi,
};
