"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  product_slug: string;
  product_name: string;
  variant_slug?: string;
  tier_name?: string;
  fulfillment_type?: string;
  quantity: number;
  unit_price_cents: number;
};

type CartStoreState = {
  items: CartItem[];
};

type CartStoreActions = {
  addItem: (item: CartItem) => void;
  removeItem: (productSlug: string, variantSlug?: string) => void;
  updateQuantity: (productSlug: string, variantSlug: string | undefined, quantity: number) => void;
  clearCart: () => void;
  totalCents: () => number;
  itemCount: () => number;
};

export type CartStore = CartStoreState & CartStoreActions;

function getItemKey(item: Pick<CartItem, "product_slug" | "variant_slug">) {
  return `${item.product_slug}::${item.variant_slug ?? "base"}`;
}

export function parseUsdPriceToCents(value: string) {
  const normalized = value.replace(/[^\d.]/g, "");
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return Math.round(parsed * 100);
}

export function formatUsdFromCents(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const nextQuantity = Number.isFinite(item.quantity) ? Math.max(1, Math.floor(item.quantity)) : 1;
          const key = getItemKey(item);
          const existing = state.items.find((entry) => getItemKey(entry) === key);

          if (!existing) {
            return {
              items: [
                ...state.items,
                {
                  ...item,
                  quantity: nextQuantity,
                },
              ],
            };
          }

          return {
            items: state.items.map((entry) =>
              getItemKey(entry) === key
                ? {
                    ...entry,
                    quantity: entry.quantity + nextQuantity,
                  }
                : entry
            ),
          };
        }),
      removeItem: (productSlug, variantSlug) =>
        set((state) => ({
          items: state.items.filter((entry) => !(entry.product_slug === productSlug && (entry.variant_slug ?? "") === (variantSlug ?? ""))),
        })),
      updateQuantity: (productSlug, variantSlug, quantity) =>
        set((state) => {
          const normalizedQuantity = Number.isFinite(quantity) ? Math.max(0, Math.floor(quantity)) : 0;
          if (normalizedQuantity <= 0) {
            return {
              items: state.items.filter((entry) => !(entry.product_slug === productSlug && (entry.variant_slug ?? "") === (variantSlug ?? ""))),
            };
          }

          return {
            items: state.items.map((entry) =>
              entry.product_slug === productSlug && (entry.variant_slug ?? "") === (variantSlug ?? "")
                ? {
                    ...entry,
                    quantity: normalizedQuantity,
                  }
                : entry
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
      totalCents: () => get().items.reduce((sum, item) => sum + item.unit_price_cents * item.quantity, 0),
      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "growrix-cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export async function rehydrateCartStore() {
  await useCartStore.persist.rehydrate();
}

type CartUiState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useCartUiStore = create<CartUiState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
