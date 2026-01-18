// Core entity types matching backend models
export interface User {
  ma_tai_khoan: number;
  ten_dang_nhap: string;
  email: string;
  ho_ten: string;
  so_dien_thoai?: string;
  ngay_sinh?: string;
  gioi_tinh?: 'Nam' | 'Nữ' | 'Khác';
  ma_vai_tro: number;
  trang_thai: 'active' | 'inactive' | 'banned';
  created_at: string;
  updated_at: string;
}

export interface Product {
  id_sanpham?: number; // Backend uses this
  ma_san_pham?: number; // Legacy field
  ten_sanpham: string;
  thuonghieu?: string;
  danhmuc_id: number;
  mota?: string;
  anh_daidien?: string;
  ngay_capnhat?: string;
  trang_thai?: 'available' | 'out_of_stock' | 'discontinued';
  
  // Relations
  danhmuc?: Category;
  thongsokythuats?: TechnicalSpec[];
  
  // Legacy fields for compatibility
  ten_san_pham?: string;
  mo_ta?: string;
  gia_ban?: number;
  gia_nhap?: number;
  so_luong_ton?: number;
  ma_danh_muc?: number;
  hinh_anh?: string;
  thuong_hieu?: string;
  xuat_xu?: string;
  bao_hanh?: string;
  created_at?: string;
  updated_at?: string;
  danh_muc?: Category;
  thong_so_ky_thuat?: TechnicalSpec[];
}

export interface Category {
  id_danhmuc: number;
  ten_danhmuc: string;
  ma_danh_muc?: number; // Legacy
  ten_danh_muc?: string; // Legacy
  mo_ta?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TechnicalSpec {
  id_thongsokythuat: number;
  id_sanpham: number;
  sku: string;
  ten_hienthi: string;
  cpu: string;
  ram: string;
  dungluong: string;
  card_roi?: string;
  manhinh?: string;
  trongluong?: string;
  congketnoi?: string;
  hedieuhanh?: string;
  gia_ban: number;
  ton_kho?: number;
  
  // Legacy fields
  ma_thong_so?: number;
  ma_san_pham?: number;
  ten_thong_so?: string;
  gia_tri?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  ma_chi_tiet: number;
  ma_gio_hang: number;
  ma_san_pham: number;
  so_luong: number;
  don_gia: number;
  created_at: string;
  updated_at: string;
  san_pham?: Product;
}

export interface Cart {
  ma_gio_hang: number;
  ma_tai_khoan: number;
  created_at: string;
  updated_at: string;
  chi_tiet_gio_hang?: CartItem[];
}

export interface Order {
  ma_hoa_don: number;
  ma_tai_khoan: number;
  ma_dia_chi?: number;
  tong_tien: number;
  trang_thai: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  phuong_thuc_thanh_toan: 'cod' | 'banking' | 'e-wallet';
  ghi_chu?: string;
  ngay_dat: string;
  ngay_giao?: string;
  created_at: string;
  updated_at: string;
  chi_tiet_hoa_don?: OrderItem[];
}

export interface OrderItem {
  ma_chi_tiet: number;
  ma_hoa_don: number;
  ma_san_pham: number;
  so_luong: number;
  don_gia: number;
  created_at: string;
  updated_at: string;
  san_pham?: Product;
}

export interface Address {
  ma_dia_chi: number;
  ma_tai_khoan: number;
  ho_ten: string;
  so_dien_thoai: string;
  dia_chi: string;
  thanh_pho: string;
  quan_huyen: string;
  phuong_xa: string;
  loai_dia_chi: 'home' | 'office';
  mac_dinh: boolean;
  created_at: string;
  updated_at: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface LoginCredentials {
  ten_dang_nhap: string;
  mat_khau: string;
}

export interface RegisterData {
  ten_dang_nhap: string;
  mat_khau: string;
  email: string;
  ho_ten: string;
  so_dien_thoai?: string;
  ngay_sinh?: string;
  gioi_tinh?: 'Nam' | 'Nữ' | 'Khác';
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

// Filter types
export interface ProductFilters {
  category?: number;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  status?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest';
  page?: number;
  limit?: number;
}

// Cart context types
export interface CartContextType {
  cart: Cart | null;
  cartItems: CartItem[];
  loading: boolean;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
  refreshCart: () => Promise<void>;
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}
