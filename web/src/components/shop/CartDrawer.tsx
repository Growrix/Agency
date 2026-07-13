"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { MinusIcon, PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { formatCartItemDisplayName, formatUsdFromCents, useCartStore } from "@/lib/cart-store";
import { isQuoteBasedCommerceItem } from "@/lib/commerce-pricing";
import { cn } from "@/lib/utils";

function getFocusable(container: HTMLElement | null) {
  if (!container) {
    return [] as HTMLElement[];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  );
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalCents = useCartStore((state) => state.totalCents());
  const itemCount = useCartStore((state) => state.itemCount());

  const headingText = useMemo(() => `Cart · ${itemCount} item${itemCount === 1 ? "" : "s"}`, [itemCount]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusable(drawerRef.current);
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!active || active === first) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (!active || active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/40 transition-opacity",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className={cn(
          "fixed inset-y-0 right-0 z-60 flex w-full max-w-md translate-x-full flex-col border-l border-border bg-surface shadow-2xl transition-transform duration-300",
          open && "translate-x-0"
        )}
      >
        <div ref={drawerRef} className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 id="cart-drawer-title" className="font-display text-xl font-semibold tracking-tight">
              {headingText}
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="rounded-md p-2 text-text-muted transition-colors hover:bg-inset hover:text-text"
              aria-label="Close cart"
            >
              <XMarkIcon className="size-5" />
            </button>
          </div>

          {items.length > 0 ? (
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={`${item.product_slug}::${item.variant_slug ?? "base"}`} className="rounded-xl border border-border bg-inset/30 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-text">{formatCartItemDisplayName(item)}</p>
                        <p className="text-xs text-text-muted">
                          {item.tier_name ?? "Base package"}
                          {item.fulfillment_type ? ` · ${item.fulfillment_type.replace(/_/g, " ")}` : ""}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product_slug, item.variant_slug)}
                        className="rounded-md p-1.5 text-text-muted hover:bg-surface hover:text-destructive"
                        aria-label={`Remove ${item.product_name} from cart`}
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-md border border-border bg-surface">
                        <button
                          type="button"
                          className="p-2 text-text-muted hover:text-text"
                          onClick={() => updateQuantity(item.product_slug, item.variant_slug, item.quantity - 1)}
                          aria-label={`Decrease quantity for ${item.product_name}`}
                        >
                          <MinusIcon className="size-4" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          className="p-2 text-text-muted hover:text-text"
                          onClick={() => updateQuantity(item.product_slug, item.variant_slug, item.quantity + 1)}
                          aria-label={`Increase quantity for ${item.product_name}`}
                        >
                          <PlusIcon className="size-4" />
                        </button>
                      </div>

                      <p className="font-medium text-text">
                        {isQuoteBasedCommerceItem({
                          fulfillmentType: item.fulfillment_type,
                          variantSlug: item.variant_slug,
                          tierName: item.tier_name,
                        })
                          ? "Quoted after discovery"
                          : formatUsdFromCents(item.unit_price_cents * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <p className="font-display text-2xl tracking-tight">Your cart is empty</p>
              <p className="mt-2 text-sm text-text-muted">Browse digital products and add items to continue.</p>
              <Link href="/digital-products" onClick={onClose} className="mt-5 text-sm font-medium text-primary hover:underline">
                Browse products
              </Link>
            </div>
          )}

          <div className="border-t border-border px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-text-muted">{totalCents > 0 ? "Subtotal" : "Pricing"}</p>
              <p className="font-display text-xl font-bold tracking-tight">
                {totalCents > 0 ? formatUsdFromCents(totalCents) : "Quoted after discovery"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <LinkButton href="/checkout?cart=1" onClick={onClose} fullWidth>
                Proceed to Checkout
              </LinkButton>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 items-center justify-center rounded-sm border border-border bg-inset px-4 text-sm font-medium text-text transition-colors hover:bg-inset/60"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
