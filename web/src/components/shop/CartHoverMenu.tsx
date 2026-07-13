"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PhotoIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { formatCartItemDisplayName, formatUsdFromCents, useCartStore } from "@/lib/cart-store";
import { isQuoteBasedCommerceItem } from "@/lib/commerce-pricing";
import { getCheckoutHref } from "@/lib/shop";
import { cn } from "@/lib/utils";

const OPEN_DELAY_MS = 100;
const CLOSE_DELAY_MS = 180;
const MAX_PREVIEW_ITEMS = 4;

type CartHoverMenuProps = {
  cartHydrated: boolean;
  className?: string;
};

export function CartHoverMenu({ cartHydrated, className }: CartHoverMenuProps) {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalCents = useCartStore((state) => state.totalCents());
  const itemCount = useCartStore((state) => state.itemCount());

  const [open, setOpen] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleOpen = useCallback(() => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
  }, [clearTimers]);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [clearTimers]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const previewItems = items.slice(0, MAX_PREVIEW_ITEMS);
  const overflowCount = Math.max(0, items.length - previewItems.length);

  const checkoutHref = useMemo(() => {
    if (items.length === 1) {
      const [only] = items;
      return getCheckoutHref(only.product_slug, {
        variantSlug: only.variant_slug,
        tierName: only.tier_name,
        fulfillmentType: only.fulfillment_type,
      });
    }
    return "/checkout?cart=1";
  }, [items]);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
      onFocusCapture={scheduleOpen}
      onBlurCapture={(event) => {
        // Only close if focus leaves the whole subtree.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          scheduleClose();
        }
      }}
    >
      <Link
        href="/cart"
        aria-label={
          cartHydrated && itemCount > 0
            ? `Open shopping cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`
            : "Open shopping cart"
        }
        aria-haspopup="dialog"
        aria-expanded={open}
        className="relative inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-inset focus-visible:outline-2 focus-visible:outline-primary/60"
      >
        <ShoppingBagIcon className="size-5" aria-hidden />
        {cartHydrated && itemCount > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-surface">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        ) : null}
      </Link>

      {open ? (
        <div
          role="dialog"
          aria-label="Cart preview"
          className="absolute right-0 top-full z-50 mt-2 hidden w-80 origin-top-right rounded-md border border-border bg-surface p-3 shadow-(--shadow-3) lg:block"
        >
          <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-2">
            <p className="text-sm font-semibold text-text">
              Cart <span className="text-text-muted">·</span>{" "}
              <span className="text-primary">
                {itemCount} item{itemCount === 1 ? "" : "s"}
              </span>
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-7 items-center justify-center rounded-full text-text-muted hover:bg-inset hover:text-text"
              aria-label="Close cart preview"
            >
              <XMarkIcon className="size-4" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-6 text-center">
              <span
                aria-hidden
                className="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                <ShoppingBagIcon className="size-5" />
              </span>
              <p className="text-sm text-text">Your cart is empty</p>
              <LinkButton href="/digital-products" variant="outline" size="sm">
                Browse products
              </LinkButton>
            </div>
          ) : (
            <>
              <ul className="max-h-80 space-y-2 overflow-y-auto py-2">
                {previewItems.map((item) => {
                  const quoteItem = isQuoteBasedCommerceItem({
                    fulfillmentType: item.fulfillment_type,
                    variantSlug: item.variant_slug,
                    tierName: item.tier_name,
                  });
                  const lineCents = item.unit_price_cents * item.quantity;
                  const itemTitle = formatCartItemDisplayName(item);
                  return (
                    <li
                      key={`${item.product_slug}::${item.variant_slug ?? "base"}::${item.tier_name ?? ""}`}
                      className="flex items-start gap-3 rounded-sm border border-border/40 bg-inset/25 px-2.5 py-2"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-border/60 bg-surface">
                        {item.product_image_src ? (
                          <div
                            aria-hidden
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url("${item.product_image_src}")` }}
                          />
                        ) : (
                          <span
                            className="inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary"
                            aria-hidden
                          >
                            <PhotoIcon className="size-4" />
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/digital-products/${item.product_slug}`}
                          className="block truncate text-sm font-medium text-text hover:text-primary"
                        >
                          {itemTitle}
                        </Link>
                        <p className="mt-0.5 text-[11px] text-text-muted">
                          {item.tier_name ? `${item.tier_name} · ` : ""}
                          {item.fulfillment_type
                            ? `${item.fulfillment_type.replace(/_/g, " ")} · `
                            : ""}
                          Qty {item.quantity}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-sm font-semibold tabular-nums">
                          {quoteItem ? "Quoted after discovery" : formatUsdFromCents(lineCents)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.product_slug, item.variant_slug)}
                          className="text-[11px] text-text-muted transition-colors hover:text-destructive"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
                {overflowCount > 0 ? (
                  <li className="rounded-sm bg-inset/20 px-2.5 py-2 text-center text-[11px] text-text-muted">
                    + {overflowCount} more item{overflowCount === 1 ? "" : "s"} — see full cart
                  </li>
                ) : null}
              </ul>

              <div className="flex items-center justify-between border-t border-border/50 pt-2 text-sm">
                <span className="text-text-muted">{totalCents > 0 ? "Subtotal" : "Pricing"}</span>
                <span className="font-semibold tabular-nums">
                  {totalCents > 0 ? formatUsdFromCents(totalCents) : "Quoted after discovery"}
                </span>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                <LinkButton
                  href={checkoutHref}
                  size="sm"
                  fullWidth
                  className="justify-center"
                >
                  Proceed to Checkout
                </LinkButton>
                <div className="flex items-center gap-2">
                  <LinkButton href="/cart" variant="outline" size="sm" fullWidth>
                    View cart
                  </LinkButton>
                  <LinkButton
                    href="/digital-products"
                    variant="ghost"
                    size="sm"
                    fullWidth
                  >
                    Continue Shopping
                  </LinkButton>
                </div>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
