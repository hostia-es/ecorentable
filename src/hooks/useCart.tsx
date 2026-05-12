import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export interface CartItem {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  image?: string;
  quantity: number;
  notes?: string;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  setNotes: (slug: string, notes: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "ecorentable.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = useCallback<CartContextValue["add"]>((item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.slug === item.slug);
      if (existing) {
        return prev.map((p) =>
          p.slug === item.slug ? { ...p, quantity: Math.min(99, p.quantity + quantity) } : p,
        );
      }
      return [...prev, { ...item, quantity: Math.max(1, Math.min(99, quantity)) }];
    });
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((p) => (p.slug === slug ? { ...p, quantity: Math.max(0, Math.min(99, quantity)) } : p))
        .filter((p) => p.quantity > 0),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const setNotes = useCallback((slug: string, notes: string) => {
    setItems((prev) => prev.map((p) => (p.slug === slug ? { ...p, notes } : p)));
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((acc, p) => acc + p.quantity, 0),
      add,
      setQuantity,
      remove,
      clear,
      setNotes,
    }),
    [items, add, setQuantity, remove, clear, setNotes],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
