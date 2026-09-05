import type { CartItem } from "@/types/cart";

const STORAGE_KEY = "barska-oliya-cart";

const EMPTY_ITEMS: CartItem[] = [];

function readFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeToStorage(next: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

let items: CartItem[] = readFromStorage();
const listeners = new Set<() => void>();

function emitChange(): void {
  listeners.forEach((listener) => listener());
}

export const cartStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getSnapshot(): CartItem[] {
    return items;
  },

  getServerSnapshot(): CartItem[] {
    return EMPTY_ITEMS;
  },

  addItem(newItem: CartItem): void {
    const existing = items.find(
      (item) => item.productSlug === newItem.productSlug,
    );

    items = existing
      ? items.map((item) =>
          item.productSlug === newItem.productSlug
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        )
      : [...items, newItem];

    writeToStorage(items);
    emitChange();
  },

  updateQuantity(productSlug: string, quantity: number): void {
    items = items.map((item) =>
      item.productSlug === productSlug ? { ...item, quantity } : item,
    );
    writeToStorage(items);
    emitChange();
  },

  removeItem(productSlug: string): void {
    items = items.filter((item) => item.productSlug !== productSlug);
    writeToStorage(items);
    emitChange();
  },

  clearCart(): void {
    items = [];
    writeToStorage(items);
    emitChange();
  },
};
