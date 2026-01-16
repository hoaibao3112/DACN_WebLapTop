# Laptop Shop Backend

Node.js backend with Sequelize ORM for Laptop Shop Management System.

## Features

- ✅ **Express.js** + **TypeScript** for type-safe backend development
- ✅ **Sequelize ORM** with MySQL support
- ✅ **JWT Authentication** with access & refresh tokens
- ✅ **RBAC** (Role-Based Access Control) with permissions
- ✅ **RESTful APIs** for all business modules
- ✅ **Request Validation** using express-validator
- ✅ **Error Handling** middleware
- ✅ **Password Hashing** with bcrypt

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Sequelize
- **Database**: MySQL
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files (DB, env)
│   ├── models/           # Sequelize models
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Helper functions
│   ├── types/            # TypeScript types
│   ├── app.ts            # Express app setup
│   └── server.ts         # Entry point
├── .env                  # Environment variables
├── .env.example          # Env template
├── package.json          # Dependencies
└── tsconfig.json         # TS config
```

## Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=laptop_shop
DB_USER=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 3. Import Database

Import the SQL dump file:

```bash
mysql -u root -p laptop_shop < ../Dump20260116.sql
```

### 4. Run Development Server

```bash
npm run dev
```

Server will start on `http://localhost:5000`

### 5. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/profile` - Get user profile (requires auth)

### Products

- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get product by ID (public)
- `POST /api/products` - Create product (requires `product.create` permission)
- `PUT /api/products/:id` - Update product (requires `product.create` permission)
- `DELETE /api/products/:id` - Delete product (requires `product.create` permission)

### Health Check

- `GET /api/health` - API health check

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your_access_token>
```

### Example Register Request

```bash
POST /api/auth/register
Content-Type: application/json

{
  "hoten": "Nguyen Van A",
  "email": "user@example.com",
  "matkhau": "password123"
}
```

### Example Login Request

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "matkhau": "password123"
}
```

## RBAC System

The system includes Role-Based Access Control:

### Roles
- **Admin** - Full access
- **Sale** - Sales operations
- **Customer** - Customer operations

### Permissions
- `product.create` - Create/update products
- `product.view` - View products
- `order.create` - Create orders
- `order.view` - View orders
- `inventory.import` - Import inventory

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run typecheck` - Type check without emitting

## Database Models

The backend includes Sequelize models for all database tables:

- **User Management**: `TaiKhoan`, `VaiTro`, `Quyen`
- **Products**: `SanPham`, `ThongSoKyThuat`, `DanhMuc`
- **Sales**: `HoaDon`, `ChiTietHoaDon`, `GioHang`, `ChiTietGioHang`
- **Inventory**: `PhieuNhap`, `ChiTietPhieuNhap`, `NhaCungCap`
- **Chatbot**: `HoiThoai`, `TinNhan`
- **Other**: `DiaChi`

## Error Handling

All errors are handled centrally and return JSON responses:

```json
{
  "success": false,
  "message": "Error message"
}
```

## License

ISC
