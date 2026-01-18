# Laptop Shop Frontend

Modern, responsive e-commerce frontend built with Next.js 16, TypeScript, and TailwindCSS.

## 🚀 Features

### Core Features
- **Product Browsing**: Advanced filtering, search, and sorting
- **Product Details**: Comprehensive product information with technical specifications
- **Shopping Cart**: Real-time cart management with quantity updates
- **User Authentication**: Secure login/register with JWT tokens
- **User Profile**: Profile management and order history
- **Responsive Design**: Mobile-first, works seamlessly on all devices

### Technical Highlights
- ⚡ **Next.js 16 App Router**: Modern routing with layouts and server components
- 🎨 **TailwindCSS 4**: Beautiful, customizable UI with modern design system
- 🔐 **JWT Authentication**: Secure token-based auth with auto-refresh
- 🛒 **Context API**: Global state management for cart and auth
- 📱 **Responsive**: Mobile-first design with smooth animations
- 🎯 **TypeScript**: Full type safety across the application
- 🔄 **API Integration**: Clean API client with error handling

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running (default: http://localhost:3000)

### Setup Steps

1. **Install dependencies**
```bash
cd frontend
npm install
```

2. **Configure environment variables**
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. **Run development server**
```bash
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001)

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server (port 3001)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3B82F6 → #6366F1)
- **Secondary**: Purple accent (#8B5CF6)
- **Success**: Green (#10B981)
- **Danger**: Red (#EF4444)

### Components
All UI components follow consistent patterns:
- **Button**: 3 variants (primary, secondary, outline)
- **Input**: With label, error states, and icons
- **Card**: Hover effects and customizable padding
- **Badge**: Status indicators with color variants

## 🔌 API Integration

### API Client
```typescript
import { productsApi, authApi, cartApi } from '@/lib/api';

// Fetch products
const products = await productsApi.getAll({ limit: 10 });

// Login
await authApi.login({ ten_dang_nhap: 'user', mat_khau: 'pass' });

// Add to cart
await cartApi.add(productId, quantity);
```

## 📱 Pages

- `/` - Home page with featured products
- `/products` - Product listing with filters
- `/products/[id]` - Product detail page
- `/cart` - Shopping cart
- `/login` - Authentication
- `/profile` - User profile & orders

## 🚀 Deployment

```bash
npm run build
npm run start
```

For Vercel deployment, simply push to your repository and connect via Vercel dashboard.

## 📄 License

This project is private and confidential.
