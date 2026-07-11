"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/site";

type CartItem = {
  slug: string;
  qty: number;
};

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
};

type ShopAction =
  | { type: "hydrate"; payload: ShopState }
  | { type: "add_to_cart"; slug: string; qty?: number }
  | { type: "set_qty"; slug: string; qty: number }
  | { type: "remove_from_cart"; slug: string }
  | { type: "toggle_wishlist"; slug: string }
  | { type: "clear_cart" };

type ShopContextValue = {
  state: ShopState;
  cartCount: number;
  wishlistCount: number;
  addToCart: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeFromCart: (slug: string) => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  clearCart: () => void;
  findProduct: (slug: string) => Product | undefined;
};

const STORAGE_KEY = "velocare_shop_state_v2";

const initialState: ShopState = {
  cart: [],
  wishlist: [],
};

function reducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case "hydrate":
      return action.payload;
    case "add_to_cart": {
      const qty = Math.max(1, action.qty ?? 1);
      const existing = state.cart.find((item) => item.slug === action.slug);
      if (!existing) {
        return {
          ...state,
          cart: [...state.cart, { slug: action.slug, qty }],
        };
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.slug === action.slug ? { ...item, qty: item.qty + qty } : item,
        ),
      };
    }
    case "set_qty": {
      if (action.qty <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.slug !== action.slug),
        };
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.slug === action.slug ? { ...item, qty: action.qty } : item,
        ),
      };
    }
    case "remove_from_cart":
      return {
        ...state,
        cart: state.cart.filter((item) => item.slug !== action.slug),
      };
    case "toggle_wishlist": {
      const exists = state.wishlist.includes(action.slug);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((slug) => slug !== action.slug)
          : [...state.wishlist, action.slug],
      };
    }
    case "clear_cart":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
}

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as ShopState;
      if (!parsed || !Array.isArray(parsed.cart) || !Array.isArray(parsed.wishlist)) {
        return;
      }
      dispatch({ type: "hydrate", payload: parsed });
    } catch {
      // ignore hydration errors and start from defaults
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addToCart = useCallback((slug: string, qty?: number) => {
    dispatch({ type: "add_to_cart", slug, qty });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    dispatch({ type: "set_qty", slug, qty });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    dispatch({ type: "remove_from_cart", slug });
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    dispatch({ type: "toggle_wishlist", slug });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "clear_cart" });
  }, []);

  const isWishlisted = useCallback(
    (slug: string) => state.wishlist.includes(slug),
    [state.wishlist],
  );

  const findProduct = useCallback((slug: string) => products.find((product) => product.slug === slug), []);

  const value = useMemo<ShopContextValue>(() => {
    const cartCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
    return {
      state,
      cartCount,
      wishlistCount: state.wishlist.length,
      addToCart,
      setQty,
      removeFromCart,
      toggleWishlist,
      isWishlisted,
      clearCart,
      findProduct,
    };
  }, [addToCart, clearCart, findProduct, isWishlisted, removeFromCart, setQty, state, toggleWishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }
  return context;
}
