"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import {
  formatUsdFromCents,
  rehydrateCartStore,
  useCartStore,
} from "@/lib/cart-store";

export function CartPage() {
  const [hydrated, setHydrated] = useState(false);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalCents = useCartStore((state) => state.totalCents());
  const itemCount = useCartStore((state) => state.itemCount());

  useEffect(() => {
    void rehydrateCartStore().finally(() => setHydrated(true));
  }, []);

  if (!hydrated) {
    return (
      <Section className="py-16">
        <Container>
          <p className="text-sm text-text-muted">Loading your cart…</p>
        </Container>
      </Section>
    );
  }

  if (items.length === 0) {
    return (
      <Section className="py-16">
        <Container width="reading">
          <Card>
            <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Cart</p>
            <h1 className="mt-3 font-display text-3xl tracking-tight">Your cart is empty</h1>
            <p className="mt-3 text-sm text-text-muted">
              Browse the digital catalog and add a template or product to get started.
            </p>
            <div className="mt-6">
              <LinkButton href="/digital-products">Browse digital products</LinkButton>
            </div>
          </Card>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="py-12">
      <Container>
        <header className="mb-8">
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Cart</p>
          <h1 className="mt-1 font-display text-3xl tracking-tight">
            {itemCount} item{itemCount === 1 ? "" : "s"} in your cart
          </h1>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <ul className="space-y-3">
            {items.map((item) => {
              const lineTotal = item.unit_price_cents * item.quantity;
              return (
                <li key={`${item.product_slug}::${item.variant_slug ?? ""}`}>
                  <Card>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                      </div>

                      <div className="flex items-center gap-3">
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

                        <div className="min-w-24 text-right text-sm font-medium tabular-nums">
                          {formatUsdFromCents(lineTotal)}
                        </div>

                        <button
                          type="button"
                          className="inline-flex size-9 items-center justify-center rounded-md text-text-muted hover:bg-inset hover:text-destructive"
                          aria-label="Remove item"
                          onClick={() => removeItem(item.product_slug, item.variant_slug)}
                        >
                          <TrashIcon className="size-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>

          <aside>
            <Card>
              <h2 className="font-display text-lg tracking-tight">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-text-muted">Subtotal</dt>
                  <dd className="font-medium tabular-nums">{formatUsdFromCents(totalCents)}</dd>
                </div>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <dt>Taxes</dt>
                  <dd>Calculated at checkout</dd>
                </div>
              </dl>
              <div className="mt-6 space-y-2">
                <LinkButton href="/checkout?cart=1" fullWidth>
                  Proceed to checkout
                </LinkButton>
                <LinkButton href="/digital-products" variant="outline" fullWidth>
                  Continue shopping
                </LinkButton>
              </div>
            </Card>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
