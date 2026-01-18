'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartApi } from '@/lib/api';
import { Cart, CartItem, CartContextType } from '@/lib/types';
import { useAuth } from './AuthContext';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Fetch cart when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated, user]);

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await cartApi.get();
      if (response.success && response.data) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const addToCart = useCallback(async (productId: number, quantity: number) => {
    if (!isAuthenticated) {
      throw new Error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
    }

    try {
      setLoading(true);
      const response = await cartApi.add(productId, quantity);
      if (response.success && response.data) {
        setCart(response.data);
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      throw new Error(error.message || 'Không thể thêm sản phẩm vào giỏ hàng');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const removeFromCart = useCallback(async (itemId: number) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await cartApi.remove(itemId);
      if (response.success) {
        await refreshCart();
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw new Error('Không thể xóa sản phẩm khỏi giỏ hàng');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, refreshCart]);

  const updateCartItem = useCallback(async (itemId: number, quantity: number) => {
    if (!isAuthenticated) return;

    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      setLoading(true);
      const response = await cartApi.update(itemId, quantity);
      if (response.success && response.data) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw new Error('Không thể cập nhật số lượng');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, removeFromCart]);

  const clearCart = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const response = await cartApi.clear();
      if (response.success) {
        setCart(null);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw new Error('Không thể xóa giỏ hàng');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const getCartTotal = useCallback(() => {
    if (!cart || !cart.chi_tiet_gio_hang) return 0;
    return cart.chi_tiet_gio_hang.reduce(
      (total: number, item: any) => total + ((item.thongsokythuat?.gia_ban || 0) * item.soluong),
      0
    );
  }, [cart]);

  const getCartCount = useCallback(() => {
    if (!cart || !cart.chi_tiet_gio_hang) return 0;
    return cart.chi_tiet_gio_hang.reduce(
      (count: number, item: any) => count + item.soluong,
      0
    );
  }, [cart]);

  const value: CartContextType = {
    cart,
    cartItems: cart?.chi_tiet_gio_hang || [],
    loading,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    getCartTotal,
    getCartCount,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
