"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

// "Request Bag" item shape. Renamed from the old resale-era "order bag" --
// visitors choose a product/colour/size/quantity here, then submit one
// Request to Purchase covering everything in the bag. No payment happens here.
export interface OrderBagItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  colour: string;
  size: string;
  quantity: number;
}

interface OrderBagContextValue {
  items: OrderBagItem[];
  addItem: (item: Omit<OrderBagItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, size: string, colour?: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number, colour?: string) => void;
  clearBag: () => void;
  itemCount: number;
  estimatedTotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const STORAGE_KEY = "2fitty-order-bag";

const OrderBagContext = createContext<OrderBagContextValue | undefined>(undefined);

export function OrderBagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderBagItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load any previously saved bag from localStorage on mount (client only).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setItems(JSON.parse(raw));
      }
    } catch {
      // Ignore malformed/local storage errors -- start with an empty bag.
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist to localStorage whenever the bag changes.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage write errors (e.g. private browsing quota).
    }
  }, [items, hydrated]);

  const addItem = useCallback<OrderBagContextValue["addItem"]>((item) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === item.productId && i.size === item.size && i.colour === item.colour
      );
      const quantityToAdd = item.quantity ?? 1;
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantityToAdd,
        };
        return next;
      }
      return [...prev, { ...item, quantity: quantityToAdd }];
    });
  }, []);

  const removeItem = useCallback((productId: string, size: string, colour?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size && (colour === undefined || i.colour === colour)))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number, colour?: string) => {
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.size === size && (colour === undefined || i.colour === colour)
            ? { ...i, quantity: Math.max(1, quantity) }
            : i
        )
      );
    },
    []
  );

  const clearBag = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const estimatedTotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const value: OrderBagContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearBag,
    itemCount,
    estimatedTotal,
    isDrawerOpen,
    openDrawer: () => setIsDrawerOpen(true),
    closeDrawer: () => setIsDrawerOpen(false),
  };

  return (
    <OrderBagContext.Provider value={value}>{children}</OrderBagContext.Provider>
  );
}

export function useOrderBag() {
  const ctx = useContext(OrderBagContext);
  if (!ctx) {
    throw new Error("useOrderBag must be used within an OrderBagProvider");
  }
  return ctx;
}
