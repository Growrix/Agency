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

export function formatCartItemDisplayName(item: Pick<CartItem, "product_name" | "product_slug">) {
  const explicit = item.product_name.trim();
  if (explicit.length > 0) {
    return explicit;
  }

  return item.product_slug
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
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

type ServerCartItem = {
  product_slug: string;
  product_name: string;
  product_variant_slug?: string | null;
  product_tier_name?: string | null;
  fulfillment_type?: string | null;
  quantity: number;
  unit_price_cents: number;
};

type ServerCartResponse = {
  data?: {
    items: ServerCartItem[];
    subtotal_cents: number;
    item_count: number;
  };
};

type ServerCartFetchResult =
  | { status: "ok"; items: CartItem[] }
  | { status: "unauthenticated" }
  | { status: "error" };

function localToServerInput(item: CartItem) {
  return {
    product_slug: item.product_slug,
    product_name: item.product_name,
    product_variant_slug: item.variant_slug,
    product_tier_name: item.tier_name,
    fulfillment_type: item.fulfillment_type,
    quantity: item.quantity,
    unit_price_cents: item.unit_price_cents,
  };
}

function serverToLocalItem(item: ServerCartItem): CartItem {
  return {
    product_slug: item.product_slug,
    product_name: item.product_name,
    variant_slug: item.product_variant_slug ?? undefined,
    tier_name: item.product_tier_name ?? undefined,
    fulfillment_type: item.fulfillment_type ?? undefined,
    quantity: item.quantity,
    unit_price_cents: item.unit_price_cents,
  };
}

async function fetchServerCart(): Promise<ServerCartFetchResult> {
  try {
    const response = await fetch("/api/v1/me/cart", { credentials: "same-origin" });
    if (response.status === 401 || response.status === 403) {
      return { status: "unauthenticated" };
    }
    if (!response.ok) {
      return { status: "error" };
    }
    const payload = (await response.json().catch(() => null)) as ServerCartResponse | null;
    if (!payload?.data) {
      return { status: "error" };
    }
    return { status: "ok", items: payload.data.items.map(serverToLocalItem) };
  } catch {
    return { status: "error" };
  }
}

async function mergeLocalIntoServerCart(localItems: CartItem[]): Promise<ServerCartFetchResult> {
  try {
    const response = await fetch("/api/v1/me/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({
        mode: "merge",
        items: localItems.map(localToServerInput),
      }),
    });
    if (response.status === 401 || response.status === 403) {
      return { status: "unauthenticated" };
    }
    if (!response.ok) {
      return { status: "error" };
    }
    const payload = (await response.json().catch(() => null)) as ServerCartResponse | null;
    if (!payload?.data) {
      return { status: "error" };
    }
    return { status: "ok", items: payload.data.items.map(serverToLocalItem) };
  } catch {
    return { status: "error" };
  }
}

let serverSyncEnabled = false;
let serverSyncTimer: ReturnType<typeof setTimeout> | null = null;
let serverSyncUnsubscribe: (() => void) | null = null;

function scheduleServerSync() {
  if (!serverSyncEnabled || typeof window === "undefined") {
    return;
  }
  if (serverSyncTimer) {
    clearTimeout(serverSyncTimer);
  }
  serverSyncTimer = setTimeout(() => {
    serverSyncTimer = null;
    const items = useCartStore.getState().items;
    void fetch("/api/v1/me/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({
        mode: "replace",
        items: items.map(localToServerInput),
      }),
    }).catch(() => {
      // Sync is best-effort; the local store remains the source of truth on failure.
    });
  }, 400);
}

export async function rehydrateCartStore() {
  await useCartStore.persist.rehydrate();

  if (typeof window === "undefined") {
    return;
  }

  const localItems = useCartStore.getState().items;
  const result = localItems.length > 0
    ? await mergeLocalIntoServerCart(localItems)
    : await fetchServerCart();

  if (result.status === "unauthenticated") {
    serverSyncEnabled = false;
    useCartStore.setState({ items: [] });
    return;
  }

  if (result.status !== "ok") {
    return;
  }

  serverSyncEnabled = false;
  useCartStore.setState({ items: result.items });
  serverSyncEnabled = true;

  if (!serverSyncUnsubscribe) {
    let lastSnapshot = JSON.stringify(result.items);
    serverSyncUnsubscribe = useCartStore.subscribe((state) => {
      const snapshot = JSON.stringify(state.items);
      if (snapshot === lastSnapshot) return;
      lastSnapshot = snapshot;
      scheduleServerSync();
    });
  }
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
