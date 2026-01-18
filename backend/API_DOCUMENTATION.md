# Laptop Shop Backend API

Backend API cho ứng dụng Laptop Shop được xây dựng với Node.js, Express, TypeScript và Sequelize.

## 📋 Tính năng

- ✅ **Authentication & Authorization**: JWT-based authentication với refresh tokens
- ✅ **Product Management**: CRUD operations cho sản phẩm với filters & search
- ✅ **Shopping Cart**: Quản lý giỏ hàng với add/update/remove items
- ✅ **Order Management**: Tạo đơn hàng, theo dõi trạng thái, hủy đơn
- ✅ **Address Management**: Quản lý địa chỉ giao hàng
- ✅ **Error Handling**: Centralized error handling middleware
- ✅ **CORS**: Configured for frontend integration

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MySQL (v8+)

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Update .env with your database credentials
# DB_HOST=localhost
# DB_PORT=3306
# DB_NAME=laptop_shop
# DB_USER=root
# DB_PASSWORD=your_password
# JWT_SECRET=your_jwt_secret

# Run development server
npm run dev
```

Server sẽ chạy tại: **http://localhost:3000**

## 📚 API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "ten_dang_nhap": "user123",
  "mat_khau": "password123",
  "email": "user@example.com",
  "ho_ten": "Nguyen Van A",
  "so_dien_thoai": "0123456789"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "ten_dang_nhap": "user123",
  "mat_khau": "password123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <access_token>
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "<refresh_token>"
}
```

### Products

#### Get All Products (with filters)
```http
GET /api/products?page=1&limit=12&category=1&brand=Dell&minPrice=10000000&maxPrice=20000000&search=gaming&sortBy=price_asc
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `category` (number): Category ID filter
- `brand` (string): Brand name filter
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `search` (string): Search in name, description, brand
- `status` (string): Product status (available, out_of_stock, discontinued)
- `sortBy` (string): Sort order (price_asc, price_desc, name_asc, name_desc, newest)

**Response:**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 50,
    "totalPages": 5
  }
}
```

#### Get Product by ID
```http
GET /api/products/:id
```

**Response includes:**
- Product details
- Technical specifications (thong_so_ky_thuat)
- Category information (danh_muc)

### Shopping Cart

**Note:** All cart endpoints require authentication

#### Get Cart
```http
GET /api/cart
Authorization: Bearer <access_token>
```

#### Add Item to Cart
```http
POST /api/cart/items
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "ma_san_pham": 1,
  "so_luong": 2
}
```

#### Update Cart Item
```http
PUT /api/cart/items/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "so_luong": 3
}
```

#### Remove Item from Cart
```http
DELETE /api/cart/items/:id
Authorization: Bearer <access_token>
```

#### Clear Cart
```http
DELETE /api/cart
Authorization: Bearer <access_token>
```

### Orders

**Note:** All order endpoints require authentication

#### Create Order
```http
POST /api/orders
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "ma_dia_chi": 1,
  "phuong_thuc_thanh_toan": "cod",
  "ghi_chu": "Giao hàng giờ hành chính"
}
```

**Payment Methods:**
- `cod`: Cash on Delivery
- `banking`: Bank Transfer
- `e-wallet`: E-Wallet

#### Get User's Orders
```http
GET /api/orders
Authorization: Bearer <access_token>
```

#### Get Order by ID
```http
GET /api/orders/:id
Authorization: Bearer <access_token>
```

#### Cancel Order
```http
PUT /api/orders/:id/cancel
Authorization: Bearer <access_token>
```

**Note:** Only orders with status 'pending' or 'confirmed' can be cancelled

### Addresses

**Note:** All address endpoints require authentication

#### Get All Addresses
```http
GET /api/addresses
Authorization: Bearer <access_token>
```

#### Create Address
```http
POST /api/addresses
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "ho_ten": "Nguyen Van A",
  "so_dien_thoai": "0123456789",
  "dia_chi": "123 Nguyen Trai",
  "thanh_pho": "Ho Chi Minh",
  "quan_huyen": "Quan 1",
  "phuong_xa": "Phuong Ben Thanh",
  "loai_dia_chi": "home",
  "mac_dinh": false
}
```

#### Update Address
```http
PUT /api/addresses/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "ho_ten": "Nguyen Van A Updated",
  "mac_dinh": true
}
```

#### Delete Address
```http
DELETE /api/addresses/:id
Authorization: Bearer <access_token>
```

#### Set Default Address
```http
PUT /api/addresses/:id/default
Authorization: Bearer <access_token>
```

### Health Check

```http
GET /api/health
```

## 🗄️ Database Models

### TaiKhoan (Users)
- ma_tai_khoan (PK)
- ten_dang_nhap
- mat_khau (hashed)
- email
- ho_ten
- so_dien_thoai
- ngay_sinh
- gioi_tinh
- ma_vai_tro
- trang_thai

### SanPham (Products)
- ma_san_pham (PK)
- ten_san_pham
- mo_ta
- gia_ban
- gia_nhap
- so_luong_ton
- ma_danh_muc (FK)
- hinh_anh
- thuong_hieu
- xuat_xu
- bao_hanh
- trang_thai

### GioHang (Cart)
- ma_gio_hang (PK)
- ma_tai_khoan (FK)

### ChiTietGioHang (Cart Items)
- ma_chi_tiet (PK)
- ma_gio_hang (FK)
- ma_san_pham (FK)
- so_luong
- don_gia

### HoaDon (Orders)
- ma_hoa_don (PK)
- ma_tai_khoan (FK)
- ma_dia_chi (FK)
- tong_tien
- trang_thai
- phuong_thuc_thanh_toan
- ghi_chu
- ngay_dat
- ngay_giao

### ChiTietHoaDon (Order Items)
- ma_chi_tiet (PK)
- ma_hoa_don (FK)
- ma_san_pham (FK)
- so_luong
- don_gia

### DiaChi (Addresses)
- ma_dia_chi (PK)
- ma_tai_khoan (FK)
- ho_ten
- so_dien_thoai
- dia_chi
- thanh_pho
- quan_huyen
- phuong_xa
- loai_dia_chi
- mac_dinh

## 🔐 Authentication Flow

1. **Register/Login** → Nhận access_token & refresh_token
2. **Store tokens** → Frontend lưu vào localStorage
3. **API Requests** → Gửi access_token trong Authorization header
4. **Token Expiry** → Auto refresh khi access_token hết hạn
5. **Logout** → Clear tokens

## 🛡️ Error Handling

Tất cả errors trả về format chuẩn:

```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error description",
  "statusCode": 400
}
```

## 🔧 Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Database sync
npm run db:sync
```

## 📦 Tech Stack

- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Sequelize
- **Database**: MySQL 8+
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: express-validator

## 🚀 Deployment Notes

1. Set NODE_ENV=production
2. Configure production database
3. Set strong JWT_SECRET
4. Enable HTTPS
5. Configure CORS for production domain
6. Set up logging và monitoring

## 📞 Support

Nếu có vấn đề, vui lòng tạo issue hoặc liên hệ team development.
