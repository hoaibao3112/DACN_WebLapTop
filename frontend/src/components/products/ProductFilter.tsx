'use client';

import React, { useState } from 'react';
import { ProductFilters } from '@/lib/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface ProductFilterProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState<ProductFilters>(filters);

  const brands = [
    'Dell', 'HP', 'Lenovo', 'Asus', 'Acer',
    'MSI', 'Apple', 'LG', 'Samsung', 'Razer'
  ];

  const priceRanges = [
    { label: 'Dưới 10 triệu', min: 0, max: 10000000 },
    { label: '10 - 15 triệu', min: 10000000, max: 15000000 },
    { label: '15 - 20 triệu', min: 15000000, max: 20000000 },
    { label: '20 - 30 triệu', min: 20000000, max: 30000000 },
    { label: 'Trên 30 triệu', min: 30000000, max: undefined },
  ];

  const handleBrandChange = (brand: string) => {
    const newFilters = {
      ...localFilters,
      brand: localFilters.brand === brand ? undefined : brand,
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (min: number, max?: number) => {
    const newFilters = {
      ...localFilters,
      minPrice: min,
      maxPrice: max,
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    const emptyFilters: ProductFilters = {};
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters = localFilters.brand || localFilters.minPrice !== undefined;

  return (
    <Card className="sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Bộ lọc</h3>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-sm mb-3 text-gray-700">Thương hiệu</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={localFilters.brand === brand}
                onChange={() => handleBrandChange(brand)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 group-hover:text-blue-600">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-sm mb-3 text-gray-700">Khoảng giá</h4>
        <div className="space-y-2">
          {priceRanges.map((range, index) => {
            const isActive = 
              localFilters.minPrice === range.min && 
              localFilters.maxPrice === range.max;
            
            return (
              <button
                key={index}
                onClick={() => handlePriceRangeChange(range.min, range.max)}
                className={`
                  w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-sm mb-3 text-gray-700">Khoảng giá tùy chỉnh</h4>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Giá tối thiểu"
            value={localFilters.minPrice || ''}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : undefined;
              const newFilters = { ...localFilters, minPrice: value };
              setLocalFilters(newFilters);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Giá tối đa"
            value={localFilters.maxPrice || ''}
            onChange={(e) => {
              const value = e.target.value ? parseInt(e.target.value) : undefined;
              const newFilters = { ...localFilters, maxPrice: value };
              setLocalFilters(newFilters);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => onFilterChange(localFilters)}
          >
            Áp dụng
          </Button>
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h4 className="font-medium text-sm mb-3 text-gray-700">Sắp xếp</h4>
        <select
          value={localFilters.sortBy || ''}
          onChange={(e) => {
            const newFilters = {
              ...localFilters,
              sortBy: e.target.value as ProductFilters['sortBy'],
            };
            setLocalFilters(newFilters);
            onFilterChange(newFilters);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Mặc định</option>
          <option value="price_asc">Giá tăng dần</option>
          <option value="price_desc">Giá giảm dần</option>
          <option value="name_asc">Tên A-Z</option>
          <option value="name_desc">Tên Z-A</option>
          <option value="newest">Mới nhất</option>
        </select>
      </div>
    </Card>
  );
};

export default ProductFilter;
