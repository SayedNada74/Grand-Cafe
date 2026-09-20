import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { MenuItem, AddOn } from '../data/menuData';

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedAddOns: AddOn[];
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, addOns?: AddOn[]) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  getItemQuantityInCart: (itemId: string) => number;
}

const CART_STORAGE_KEY = 'grand_cafe_cart_items';

const generateCartItemId = (itemId: string, addOns?: AddOn[]): string => {
  if (!addOns || addOns.length === 0) return itemId;
  const sortedIds = [...addOns].map(a => a.id).sort().join('+');
  return `${itemId}::${sortedIds}`;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
    return [];
  });
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  // Auto-sync cart items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [items]);

  const addItem = useCallback((item: MenuItem, addOns?: AddOn[]) => {
    const cartItemId = generateCartItemId(item.id, addOns);
    setItems(prev => {
      const existing = prev.find(ci => ci.cartItemId === cartItemId);
      if (existing) {
        return prev.map(ci =>
          ci.cartItemId === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { cartItemId, item, quantity: 1, selectedAddOns: addOns || [] }];
    });
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems(prev => prev.filter(ci => ci.cartItemId !== cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(ci => ci.cartItemId !== cartItemId));
      return;
    }
    setItems(prev => prev.map(ci =>
      ci.cartItemId === cartItemId ? { ...ci, quantity } : ci
    ));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getItemQuantityInCart = useCallback((itemId: string): number => {
    return items.filter(ci => ci.item.id === itemId).reduce((sum, ci) => sum + ci.quantity, 0);
  }, [items]);

  const totalItems = useMemo(() => items.reduce((s, ci) => s + ci.quantity, 0), [items]);

  const totalPrice = useMemo(() => items.reduce((s, ci) => {
    const addOnTotal = ci.selectedAddOns.reduce((a, addon) => a + addon.price, 0);
    return s + (ci.item.price + addOnTotal) * ci.quantity;
  }, 0), [items]);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      totalItems, totalPrice,
      isCartOpen, setCartOpen,
      isCheckoutOpen, setCheckoutOpen,
      getItemQuantityInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
