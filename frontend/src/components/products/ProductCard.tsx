'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { formatCurrency, getProductImageUrl, getProductStatusLabel } from '@/lib/auth';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  // Get product ID (handle both formats)
  const productId = product.id_sanpham || product.ma_san_pham || 0;
  
  // Get product name (handle both formats)
  const productName = product.ten_sanpham || product.ten_san_pham || '';
  
  // Get brand (handle both formats)
  const brand = product.thuonghieu || product.thuong_hieu;
  
  // Get image (handle both formats)
  const image = product.anh_daidien || product.hinh_anh;
  
  // Get first spec if available for price and stock
  const firstSpec = product.thongsokythuats?.[0];
  const price = firstSpec?.gia_ban || product.gia_ban || 0;
  const stock = firstSpec?.ton_kho || product.so_luong_ton || 0;
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    if (!firstSpec?.id_thongsokythuat) {
      alert('Sản phẩm chưa có thông số kỹ thuật');
      return;
    }

    try {
      setLoading(true);
      await addToCart(firstSpec.id_thongsokythuat, 1);
      alert('Đã thêm vào giỏ hàng!');
    } catch (error: unknown) {
      alert(error instanceof Error ? error.message : 'Không thể thêm vào giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  const isOutOfStock = product.trang_thai === 'out_of_stock' || stock === 0;
  const isOnSale = false; // Temporarily disable until we have proper price logic

  return (
    <Link href={`/products/${productId}`}>
      <Card hover padding="none" className="h-full overflow-hidden group">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={getProductImageUrl(image)}
            alt={productName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Status Badge */}
          {isOutOfStock && (
            <div className="absolute top-2 left-2">
              <Badge variant="danger">Hết hàng</Badge>
            </div>
          )}
          
          {isOnSale && !isOutOfStock && (
            <div className="absolute top-2 left-2">
              <Badge variant="danger">Giảm giá</Badge>
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button aria-label="Yêu thích" className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-50 transition-colors">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button aria-label="Xem nhanh" className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-blue-50 transition-colors">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Brand */}
          {brand && (
            <p className="text-xs text-gray-500 mb-1">{brand}</p>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors">
            {productName}
          </h3>

          {/* Specs Preview */}
          {firstSpec && (
            <div className="space-y-1 mb-3">
              <div className="text-xs text-gray-600 flex justify-between">
                <span className="font-medium">CPU:</span>
                <span className="truncate ml-2">{firstSpec.cpu}</span>
              </div>
              <div className="text-xs text-gray-600 flex justify-between">
                <span className="font-medium">RAM:</span>
                <span className="truncate ml-2">{firstSpec.ram}</span>
              </div>
            </div>
          )}

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-blue-600">
                {formatCurrency(price)}
              </span>
            </div>
          </div>

          {/* Stock Status */}
          {!isOutOfStock && stock < 10 && stock > 0 && (
            <p className="text-xs text-orange-600 mb-3">
              Chỉ còn {stock} sản phẩm
            </p>
          )}

          {/* Add to Cart Button */}
          <Button
            variant="primary"
            size="sm"
            fullWidth
            disabled={isOutOfStock}
            loading={loading}
            onClick={handleAddToCart}
          >
            {isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
