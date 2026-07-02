"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  LockClosedIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { CheckoutGuaranteeCard } from "@/components/checkout/CheckoutGuaranteeCard";
import { CheckoutSteps, type CheckoutStepId } from "@/components/checkout/CheckoutSteps";
import { CheckoutTrustRow } from "@/components/checkout/CheckoutTrustRow";
import { CheckoutUpsellsCard } from "@/components/checkout/CheckoutUpsellsCard";
import {
  formatUsdFromCents,
  rehydrateCartStore,
  useCartStore,
} from "@/lib/cart-store";
import { getCheckoutHref } from "@/lib/shop";
import type { ProductUpsellRecord } from "@/server/data/schema";

type ProductFetchEnvelope = {
  data?: {
    customization_upsells?: ProductUpsellRecord[] | null;
  } | null;
};

export function CartPage() {
  const [hydrated, setHydrated] = useState(false);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalCents = useCartStore((state) => state.totalCents());
  const itemCount = useCartStore((state) => state.itemCount());

  const [upsells, setUpsells] = useState<ProductUpsellRecord[]>([]);
  const [selectedUpsells, setSelectedUpsells] = useState<Set<string>>(() => new Set());
  const primaryProductSlug = items[0]?.product_slug;

  useEffect(() => {
    void rehydrateCartStore().finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled) return;
      if (!hydrated || !primaryProductSlug) {
        setUpsells([]);
        return;
      }

      void fetch(`/api/v1/shop/products/${encodeURIComponent(primaryProductSlug)}`, {
        credentials: "same-origin",
      })
        .then(async (response) => (response.ok ? ((await response.json()) as ProductFetchEnvelope) : null))
        .then((payload) => {
          if (cancelled) return;
          const list = payload?.data?.customization_upsells ?? [];
          setUpsells(list.filter((entry) => Boolean(entry?.title)));
        })
        .catch(() => {
          if (!cancelled) setUpsells([]);
        });
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [hydrated, primaryProductSlug]);

  function toggleUpsell(title: string) {
    setSelectedUpsells((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  }

  // Route the "Proceed to checkout" CTA + Information step tab to the right
  // checkout URL: single-item express when the cart has one item, otherwise
  // cart-driven checkout via ?cart=1.
  const checkoutHref = useMemo(() => {
    if (!hydrated || items.length === 0) return "/checkout?cart=1";
    if (items.length === 1) {
      const [only] = items;
      return getCheckoutHref(only.product_slug, {
        variantSlug: only.variant_slug,
        tierName: only.tier_name,
        fulfillmentType: only.fulfillment_type,
      });
    }
    return "/checkout?cart=1";
  }, [hydrated, items]);

  const stepHrefOverrides = useMemo<Partial<Record<CheckoutStepId, string>>>(() => {
    // When the cart is empty, only /cart is reachable — everything downstream
    // is a dead end until items are added. When populated, the Information
    // tab picks up the same cart-aware href as the Proceed CTA.
    return {
      cart: "/cart",
      information: hydrated && items.length > 0 ? checkoutHref : undefined,
      payment: undefined,
      confirmation: undefined,
    };
  }, [checkoutHref, hydrated, items.length]);

  return (
    <Section size="compact" className="pb-16">
      <Container>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/digital-products"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary"
          >
            <ArrowLeftIcon className="size-4" />
            Continue shopping
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <LockClosedIcon className="size-3.5" aria-hidden />
            Secure cart
          </span>
        </div>

        <header className="mb-8 max-w-2xl">
          <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            {hydrated && itemCount > 0 ? (
              <>
                <span className="text-primary">{itemCount}</span> item
                {itemCount === 1 ? "" : "s"} in your cart
              </>
            ) : (
              "Your cart"
            )}
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-muted sm:text-base">
            Review the items you added, then continue to checkout for secure payment.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="min-w-0 space-y-6">
            <CheckoutSteps active="cart" hrefOverrides={stepHrefOverrides} />

            {!hydrated ? (
              <Card>
                <p className="text-sm text-text-muted">Loading your cart…</p>
              </Card>
            ) : items.length === 0 ? (
              <Card>
                <div className="flex flex-col items-center gap-4 py-6 text-center">
                  <span
                    aria-hidden
                    className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    <ShoppingBagIcon className="size-6" />
                  </span>
                  <div>
                    <p className="font-display text-xl tracking-tight">Your cart is empty</p>
                    <p className="mt-2 text-sm text-text-muted">
                      Browse the digital catalog and add a template or service to get started.
                    </p>
                  </div>
                  <LinkButton href="/digital-products" size="lg">
                    Browse digital products
                  </LinkButton>
                </div>
              </Card>
            ) : (
              <>
                <ul className="space-y-3">
                  {items.map((item) => {
                    const lineTotal = item.unit_price_cents * item.quantity;
                    return (
                      <li key={`${item.product_slug}::${item.variant_slug ?? ""}`}>
                        <Card className="p-4 sm:p-5">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0 flex-1">
                              <Link
                                href={`/digital-products/${item.product_slug}`}
                                className="block truncate font-medium text-text hover:text-primary"
                              >
                                {item.product_name}
                              </Link>
                              {item.tier_name ? (
                                <p className="mt-1 text-xs text-text-muted">{item.tier_name}</p>
                              ) : null}
                              {item.variant_slug ? (
                                <p className="mt-1 font-mono text-[11px] text-text-muted">
                                  {item.variant_slug}
                                </p>
                              ) : null}
                              <p className="mt-3 text-xs text-text-muted">
                                Unit {formatUsdFromCents(item.unit_price_cents)}
                              </p>
                            </div>

                            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                              <div className="inline-flex items-center rounded-md border border-border bg-surface">
                                <button
                                  type="button"
                                  className="inline-flex size-9 items-center justify-center text-text hover:bg-inset"
                                  aria-label="Decrease quantity"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product_slug,
                                      item.variant_slug,
                                      item.quantity - 1,
                                    )
                                  }
                                >
                                  <MinusIcon className="size-4" />
                                </button>
                                <span className="min-w-8 px-2 text-center text-sm font-medium tabular-nums">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  className="inline-flex size-9 items-center justify-center text-text hover:bg-inset"
                                  aria-label="Increase quantity"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product_slug,
                                      item.variant_slug,
                                      item.quantity + 1,
                                    )
                                  }
                                >
                                  <PlusIcon className="size-4" />
                                </button>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold tabular-nums">
                                  {formatUsdFromCents(lineTotal)}
                                </span>
                                <button
                                  type="button"
                                  className="inline-flex size-9 items-center justify-center rounded-md text-text-muted hover:bg-inset hover:text-destructive"
                                  aria-label="Remove item"
                                  onClick={() =>
                                    removeItem(item.product_slug, item.variant_slug)
                                  }
                                >
                                  <TrashIcon className="size-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => clearCart()}
                    disabled={items.length === 0}
                  >
                    Clear cart
                  </Button>
                  <p className="text-xs text-text-muted">
                    Prices are shown in USD. Taxes calculated at checkout.
                  </p>
                </div>
              </>
            )}
          </div>

          <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-4">
              <Card variant="inset" className="p-4 sm:p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
                  Order summary
                </p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-text-muted">Subtotal</dt>
                    <dd className="tabular-nums">{formatUsdFromCents(totalCents)}</dd>
                  </div>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <dt>Tax</dt>
                    <dd>Calculated at checkout</dd>
                  </div>
                </dl>
                <div className="mt-4 flex items-baseline justify-between border-t border-border/50 pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    Estimated total
                  </p>
                  <span className="font-display text-2xl tracking-tight">
                    {formatUsdFromCents(totalCents)}
                  </span>
                </div>
                <div className="mt-6 space-y-2">
                  <LinkButton
                    href={checkoutHref}
                    fullWidth
                    className={items.length === 0 ? "pointer-events-none opacity-60" : ""}
                  >
                    Proceed to checkout
                  </LinkButton>
                  <LinkButton href="/digital-products" variant="outline" fullWidth>
                    Continue shopping
                  </LinkButton>
                </div>
              </Card>

              {hydrated && items.length > 0 && upsells.length > 0 ? (
                <CheckoutUpsellsCard
                  upsells={upsells}
                  selected={selectedUpsells}
                  onToggle={toggleUpsell}
                />
              ) : null}

              <CheckoutGuaranteeCard />
              <CheckoutTrustRow />
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
