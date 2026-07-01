"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { DesktopHeaderNav } from "@/components/shell/DesktopHeaderNav";
import { PublicAuthControls } from "@/components/shell/PublicAuthControls";
import { ThemeToggle, ThemeToggleButton } from "@/components/shell/ThemeToggle";
import { HeaderMobileNav } from "@/components/shell/HeaderMobileNav";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { CONTAINER_X_CLASS } from "@/components/primitives/Container";
import { rehydrateCartStore, useCartStore, useCartUiStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { useConciergeStore } from "@/lib/concierge-store";

type HeaderProps = {
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  scrolled?: boolean;
};

export function Header({
  mobileOpen: mobileOpenProp,
  onMobileOpenChange,
  scrolled: scrolledProp,
}: HeaderProps = {}) {
  const openConcierge = useConciergeStore((state) => state.open);
  const cartOpen = useCartUiStore((state) => state.isOpen);
  const openCart = useCartUiStore((state) => state.open);
  const closeCart = useCartUiStore((state) => state.close);
  const cartItems = useCartStore((state) => state.items);
  const [cartHydrated, setCartHydrated] = useState(false);
  const [scrolledInternal, setScrolledInternal] = useState(false);
  const [mobileOpenInternal, setMobileOpenInternal] = useState(false);
  const mobileOpen = mobileOpenProp ?? mobileOpenInternal;
  const setMobileOpen = onMobileOpenChange ?? setMobileOpenInternal;
  const scrolled = scrolledProp ?? scrolledInternal;

  useEffect(() => {
    void rehydrateCartStore().finally(() => setCartHydrated(true));
  }, []);

  useEffect(() => {
    if (scrolledProp !== undefined) {
      return;
    }

    const onScroll = () => setScrolledInternal(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolledProp]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, setMobileOpen]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className={cn(
        "border-0 shadow-none transition-all duration-300",
        scrolled ? "bg-surface/85 backdrop-blur" : "bg-transparent",
      )}
    >
      <div className={cn("mx-auto flex h-16 max-w-shell items-center gap-2 lg:h-18 lg:gap-6", CONTAINER_X_CLASS)}>
        <Link href="/" className="group flex min-w-0 flex-1 items-center gap-2.5 lg:flex-none lg:shrink-0">
          <Image
            src="/website logo main.svg"
            alt="Growrix logo"
            width={180}
            height={44}
            priority
            unoptimized
            className="h-8 w-auto object-contain sm:h-9"
          />
        </Link>

        <DesktopHeaderNav />

        <div className="ml-auto flex shrink-0 items-center gap-1 lg:gap-2">
          <button
            type="button"
            onClick={() => openConcierge()}
            className="hidden size-10 items-center justify-center rounded-full transition-colors hover:bg-inset lg:inline-flex"
            aria-label="Open chat"
          >
            <ChatBubbleLeftRightIcon className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => openCart()}
            className="relative hidden size-10 items-center justify-center rounded-full transition-colors hover:bg-inset lg:inline-flex"
            aria-label="Open shopping cart"
          >
            <ShoppingBagIcon className="size-5" aria-hidden />
            {cartHydrated && cartCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-surface">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => openCart()}
            className="relative inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-inset lg:hidden"
            aria-label={
              cartHydrated && cartCount > 0
                ? `Open shopping cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`
                : "Open shopping cart"
            }
          >
            <ShoppingBagIcon className="size-5" aria-hidden />
            {cartHydrated && cartCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-surface">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            ) : null}
          </button>
          <ThemeToggleButton className="lg:hidden" />
          <ThemeToggle className="hidden lg:inline-flex" />
          <PublicAuthControls />
          <button
            type="button"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-inset lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <XMarkIcon className="size-5" /> : <Bars3Icon className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "site-mobile-nav__panel lg:hidden",
          mobileOpen && "site-mobile-nav__panel--open",
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="site-mobile-nav__panel-inner">
          <HeaderMobileNav
            onClose={() => setMobileOpen(false)}
            onOpenConcierge={() => openConcierge()}
            cartCount={cartCount}
            cartHydrated={cartHydrated}
          />
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={closeCart} />
    </header>
  );
}
