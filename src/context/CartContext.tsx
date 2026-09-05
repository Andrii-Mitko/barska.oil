"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { cartStore } from "@/lib/cart/cartStore";
import type { CartItem } from "@/types/cart";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (productSlug: string, quantity: number) => void;
  removeItem: (productSlug: string) => void;
  clearCart: () => void;
  totalSum: number;
  totalItems: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );

  const totalSum = items.reduce(
    (sum, item) => sum + item.pricePerUnit * item.quantity,
    0,
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem: cartStore.addItem,
        updateQuantity: cartStore.updateQuantity,
        removeItem: cartStore.removeItem,
        clearCart: cartStore.clearCart,
        totalSum,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart має використовуватись всередині CartProvider");
  }
  return context;
}
