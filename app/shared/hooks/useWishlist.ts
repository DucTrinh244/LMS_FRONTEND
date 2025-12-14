import { useState, useEffect, useCallback } from 'react';
import { wishlistService } from '~/utils/localStorageService';
import type { WishlistItem } from '~/types/wishlist';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Load wishlist items from localStorage on mount
  useEffect(() => {
    const loadWishlist = () => {
      const items = wishlistService.getWishlistItems();
      setWishlistItems(items);
      setWishlistCount(items.length);
    };

    loadWishlist();

    // Listen for storage changes (for cross-tab synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'lms_wishlist') {
        loadWishlist();
      }
    };

    // Listen for custom wishlist-updated event (for same-tab synchronization)
    const handleWishlistUpdated = () => {
      loadWishlist();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wishlist-updated', handleWishlistUpdated);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlist-updated', handleWishlistUpdated);
    };
  }, []);

  const addToWishlist = useCallback((courseId: string): boolean => {
    const success = wishlistService.addToWishlist(courseId);
    if (success) {
      const items = wishlistService.getWishlistItems();
      setWishlistItems(items);
      setWishlistCount(items.length);
    }
    return success;
  }, []);

  const removeFromWishlist = useCallback((courseId: string): boolean => {
    const success = wishlistService.removeFromWishlist(courseId);
    if (success) {
      const items = wishlistService.getWishlistItems();
      setWishlistItems(items);
      setWishlistCount(items.length);
    }
    return success;
  }, []);

  const isInWishlist = useCallback((courseId: string): boolean => {
    return wishlistService.isInWishlist(courseId);
  }, []);

  const toggleWishlist = useCallback((courseId: string): boolean => {
    const success = wishlistService.toggleWishlist(courseId);
    if (success) {
      const items = wishlistService.getWishlistItems();
      setWishlistItems(items);
      setWishlistCount(items.length);
    }
    return success;
  }, []);

  const clearWishlist = useCallback(() => {
    wishlistService.clearWishlist();
    setWishlistItems([]);
    setWishlistCount(0);
  }, []);

  const refreshWishlist = useCallback(() => {
    const items = wishlistService.getWishlistItems();
    setWishlistItems(items);
    setWishlistCount(items.length);
  }, []);

  return {
    wishlistItems,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
    refreshWishlist,
  };
};

