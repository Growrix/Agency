"use client";

import { CheckoutGuaranteeCard } from "@/components/checkout/CheckoutGuaranteeCard";
import { CheckoutTrustRow } from "@/components/checkout/CheckoutTrustRow";
import { formatCentsAsUsd } from "@/components/checkout/checkout-utils";
import { Card } from "@/components/primitives/Card";
import type { CartItem } from "@/lib/cart-store";

type CartOrderSummaryProps = {
  items: CartItem[];
  discountCode: string | null;
  discountCents: number;
  taxCents?: number;
};

export function CartOrderSummary({
  items,
  discountCode,
  discountCents,
  taxCents = 0,
}: CartOrderSummaryProps) {
  const subtotalCents = items.reduce(
    (sum, item) => sum + item.unit_price_cents * item.quantity,
    0,
  );
  const totalCents = Math.max(0, subtotalCents - discountCents + taxCents);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-4">
      <Card variant="inset" className="p-4 sm:p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
          Order summary
        </p>

        <div className="mt-4 flex items-baseline justify-between gap-2">
          <p className="min-w-0 text-base font-semibold text-text">
            Cart <span className="text-text-muted">·</span>{" "}
            <span className="text-primary">
              {itemCount} item{itemCount === 1 ? "" : "s"}
            </span>
          </p>
        </div>

        <ul className="mt-4 space-y-2">
          {items.map((item) => {
            const lineCents = item.unit_price_cents * item.quantity;
            return (
              <li
                key={`${item.product_slug}::${item.variant_slug ?? "base"}::${item.tier_name ?? ""}`}
                className="flex items-start justify-between gap-3 rounded-sm border border-border/45 bg-surface/40 px-3 py-2 text-sm"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-text">{item.product_name}</p>
                  <p className="mt-0.5 text-[11px] text-text-muted">
                    {item.tier_name ? `${item.tier_name} · ` : ""}Qty {item.quantity}
                  </p>
                </div>
                <span className="shrink-0 font-semibold tabular-nums">
                  {formatCentsAsUsd(lineCents)}
                </span>
              </li>
            );
          })}
        </ul>

        <dl className="mt-5 space-y-2 border-t border-border/50 pt-4 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-text-muted">Subtotal</dt>
            <dd className="tabular-nums">{formatCentsAsUsd(subtotalCents)}</dd>
          </div>
          {discountCents > 0 ? (
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-2 text-text-muted">
                Discount
                {discountCode ? (
                  <span className="rounded-full bg-inset/40 px-2 py-0.5 text-[10px] font-mono text-text">
                    {discountCode}
                  </span>
                ) : null}
              </dt>
              <dd className="tabular-nums text-success">
                -{formatCentsAsUsd(discountCents)}
              </dd>
            </div>
          ) : null}
          <div className="flex items-center justify-between text-xs text-text-muted">
            <dt>Tax</dt>
            <dd className="tabular-nums">
              {taxCents > 0 ? formatCentsAsUsd(taxCents) : "$0.00"}
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex items-baseline justify-between border-t border-border/50 pt-4">
          <p className="font-display text-lg tracking-tight">Total</p>
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-text-muted">USD</span>
            <span className="font-display text-3xl tracking-tight text-text sm:text-4xl">
              {formatCentsAsUsd(totalCents)}
            </span>
          </div>
        </div>
      </Card>

      <CheckoutGuaranteeCard />
      <CheckoutTrustRow />
    </div>
  );
}
