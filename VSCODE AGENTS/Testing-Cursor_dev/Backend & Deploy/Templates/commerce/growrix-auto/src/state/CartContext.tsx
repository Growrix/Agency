"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { getProductBySlug } from "@/data/catalog";

export type CartItem = {
  productSlug: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (productSlug: string, quantity?: number) => void;
  updateQuantity: (productSlug: string, quantity: number) => void;
  removeFromCart: (productSlug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (productSlug: string, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productSlug === productSlug);

      if (existing) {
        return current.map((item) =>
          item.productSlug === productSlug
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...current, { productSlug, quantity }];
    });
  };

  const updateQuantity = (productSlug: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.productSlug === productSlug
            ? { ...item, quantity: Math.max(0, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productSlug: string) => {
    setItems((current) => current.filter((item) => item.productSlug !== productSlug));
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => {
    const product = getProductBySlug(item.productSlug);

    if (!product) return acc;

    return acc + product.price * item.quantity;
  }, 0);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [items, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
