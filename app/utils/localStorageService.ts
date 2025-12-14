import type { CartItem } from '~/types/cart';
import type { WishlistItem } from '~/types/wishlist';

// LocalStorage Keys
export const STORAGE_KEYS = {
  CART: 'lms_cart',
  WISHLIST: 'lms_wishlist',
} as const;

// Cart Service
export const cartService = {
  /**
   * Get all cart items from localStorage
   */
  getCartItems(): CartItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      if (!data) return [];
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      return [];
    }
  },

  /**
   * Add a course to cart
   */
  addToCart(courseId: string): boolean {
    try {
      const items = this.getCartItems();
      
      // Check if course already exists in cart
      if (items.some(item => item.courseId === courseId)) {
        return false; // Already in cart
      }

      const newItem: CartItem = {
        courseId,
        addedAt: new Date().toISOString(),
      };

      items.push(newItem);
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
      // Dispatch custom event to notify all components
      window.dispatchEvent(new Event('cart-updated'));
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  },

  /**
   * Remove a course from cart
   */
  removeFromCart(courseId: string): boolean {
    try {
      const items = this.getCartItems();
      const filteredItems = items.filter(item => item.courseId !== courseId);
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(filteredItems));
      // Dispatch custom event to notify all components
      window.dispatchEvent(new Event('cart-updated'));
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  },

  /**
   * Check if a course is in cart
   */
  isInCart(courseId: string): boolean {
    const items = this.getCartItems();
    return items.some(item => item.courseId === courseId);
  },

  /**
   * Get cart count
   */
  getCartCount(): number {
    return this.getCartItems().length;
  },

  /**
   * Clear all items from cart
   */
  clearCart(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.CART);
      // Dispatch custom event to notify all components
      window.dispatchEvent(new Event('cart-updated'));
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  },
};

// Wishlist Service
export const wishlistService = {
  /**
   * Get all wishlist items from localStorage
   */
  getWishlistItems(): WishlistItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (!data) return [];
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading wishlist from localStorage:', error);
      return [];
    }
  },

  /**
   * Add a course to wishlist
   */
  addToWishlist(courseId: string): boolean {
    try {
      const items = this.getWishlistItems();
      
      // Check if course already exists in wishlist
      if (items.some(item => item.courseId === courseId)) {
        return false; // Already in wishlist
      }

      const newItem: WishlistItem = {
        courseId,
        addedAt: new Date().toISOString(),
      };

      items.push(newItem);
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(items));
      // Dispatch custom event to notify all components
      window.dispatchEvent(new Event('wishlist-updated'));
      return true;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return false;
    }
  },

  /**
   * Remove a course from wishlist
   */
  removeFromWishlist(courseId: string): boolean {
    try {
      const items = this.getWishlistItems();
      const filteredItems = items.filter(item => item.courseId !== courseId);
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(filteredItems));
      // Dispatch custom event to notify all components
      window.dispatchEvent(new Event('wishlist-updated'));
      return true;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return false;
    }
  },

  /**
   * Check if a course is in wishlist
   */
  isInWishlist(courseId: string): boolean {
    const items = this.getWishlistItems();
    return items.some(item => item.courseId === courseId);
  },

  /**
   * Get wishlist count
   */
  getWishlistCount(): number {
    return this.getWishlistItems().length;
  },

  /**
   * Clear all items from wishlist
   */
  clearWishlist(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.WISHLIST);
      // Dispatch custom event to notify all components
      window.dispatchEvent(new Event('wishlist-updated'));
    } catch (error) {
      console.error('Error clearing wishlist:', error);
    }
  },

  /**
   * Toggle wishlist item (add if not exists, remove if exists)
   */
  toggleWishlist(courseId: string): boolean {
    if (this.isInWishlist(courseId)) {
      return this.removeFromWishlist(courseId);
    } else {
      return this.addToWishlist(courseId);
    }
  },
};

