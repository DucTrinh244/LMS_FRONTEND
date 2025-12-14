import { useState, useEffect, useCallback } from 'react';
import { cartService } from '~/utils/localStorageService';
import type { CartItem } from '~/types/cart';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart items from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      const items = cartService.getCartItems();
      setCartItems(items);
      setCartCount(items.length);
    };

    loadCart();

    // Listen for storage changes (for cross-tab synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'lms_cart') {
        loadCart();
      }
    };

    // Listen for custom cart-updated event (for same-tab synchronization)
    const handleCartUpdated = () => {
      loadCart();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cart-updated', handleCartUpdated);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cart-updated', handleCartUpdated);
    };
  }, []);

  const addToCart = useCallback((courseId: string): boolean => {
    const success = cartService.addToCart(courseId);
    if (success) {
      const items = cartService.getCartItems();
      setCartItems(items);
      setCartCount(items.length);
    }
    return success;
  }, []);

  const removeFromCart = useCallback((courseId: string): boolean => {
    const success = cartService.removeFromCart(courseId);
    if (success) {
      const items = cartService.getCartItems();
      setCartItems(items);
      setCartCount(items.length);
    }
    return success;
  }, []);

  const isInCart = useCallback((courseId: string): boolean => {
    return cartService.isInCart(courseId);
  }, []);

  const clearCart = useCallback(() => {
    cartService.clearCart();
    setCartItems([]);
    setCartCount(0);
  }, []);

  const refreshCart = useCallback(() => {
    const items = cartService.getCartItems();
    setCartItems(items);
    setCartCount(items.length);
  }, []);

  return {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    isInCart,
    clearCart,
    refreshCart,
  };
};

