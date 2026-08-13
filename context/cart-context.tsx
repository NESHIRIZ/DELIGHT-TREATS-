"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  useSyncExternalStore,
} from "react";
import { CartItem, CustomizationSelection, Product } from "@/types";
import { calculateUnitPrice, generateId } from "@/lib/utils";

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, customization: CustomizationSelection) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isMiniCartOpen: boolean;
  setMiniCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "delight-treats-cart";

// useSyncExternalStore lets us read sessionStorage as an external source of
// truth without the cascading-render issue of setState-in-effect, and
// without a hydration mismatch (server snapshot is always empty).
function subscribe() {
  return () => {};
}
function getClientSnapshot(): string {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}
function getServerSnapshot(): string {
  return "[]";
}

export function CartProvider({ children }: { children: ReactNode }) {
  const initialRaw = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const [items, setItemsState] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(initialRaw) as CartItem[];
    } catch {
      return [];
    }
  });
  const [isMiniCartOpen, setMiniCartOpen] = useState(false);

  const setItems = useCallback((updater: CartItem[] | ((prev: CartItem[]) => CartItem[])) => {
    setItemsState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // storage unavailable — cart just won't persist across reloads
      }
      return next;
    });
  }, []);

  const addItem = useCallback(
    (product: Product, customization: CustomizationSelection) => {
      const unitPrice = calculateUnitPrice(product, customization);
      const lineTotal = unitPrice * customization.quantity;
      const newItem: CartItem = {
        id: generateId(),
        productId: product.id,
        product,
        customization,
        unitPrice,
        lineTotal,
      };
      setItems((prev) => [...prev, newItem]);
      setMiniCartOpen(true);
    },
    [setItems]
  );

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === lineId
          ? { ...item, customization: { ...item.customization, quantity }, lineTotal: item.unitPrice * quantity }
          : item
      )
    );
  }, [setItems]);

  const removeItem = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== lineId));
  }, [setItems]);

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.lineTotal, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.customization.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    itemCount,
    isMiniCartOpen,
    setMiniCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
