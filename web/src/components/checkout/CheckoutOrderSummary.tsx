"use client";

import Image from "next/image";
import type { ProductUpsellRecord } from "@/server/data/schema";
import type { CheckoutSelection } from "@/lib/shop";
import type { PublicShopProductRecord } from "@/server/domain/catalog";
import { CheckoutGuaranteeCard } from "@/components/checkout/CheckoutGuaranteeCard";
import { CheckoutTrustRow } from "@/components/checkout/CheckoutTrustRow";
import { CheckoutUpsellsCard } from "@/components/checkout/CheckoutUpsellsCard";
import {
  formatCentsAsUsd,
  parsePriceStringToCents,
} from "@/components/checkout/checkout-utils";
import { Card } from "@/components/primitives/Card";

type CheckoutOrderSummaryProps = {
  product: PublicShopProductRecord;
  selection: CheckoutSelection;
  upsells: ProductUpsellRecord[];
  selectedUpsells: Set<string>;
  onToggleUpsell: (title: string) => void;
  discountCode: string | null;
  discountCents: number;
  taxCents?: number;
};

export function CheckoutOrderSummary({
  product,
  selection,
  upsells,
  selectedUpsells,
  onToggleUpsell,
  discountCode,
  discountCents,
  taxCents = 0,
}: CheckoutOrderSummaryProps) {
  const productCents = parsePriceStringToCents(product.price);
  const upsellsCents = upsells
    .filter((upsell) => selectedUpsells.has(upsell.title))
    .reduce((sum, upsell) => sum + parsePriceStringToCents(upsell.price), 0);

  const subtotalCents = productCents + upsellsCents;
  const totalCents = Math.max(0, subtotalCents - discountCents + taxCents);

  return (
    <div className="space-y-4">
      <Card variant="inset" className="p-4 sm:p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
          Order summary
        </p>

        <div className="mt-4 flex items-start gap-4">
          {product.image ? (
            <div className="relative size-20 shrink-0 overflow-hidden rounded-md border border-border/60 bg-inset/40 sm:size-24">
              <Image
                src={product.image.src}
                alt={product.image.alt || product.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-md border border-border/60 bg-inset/40 font-display text-2xl sm:size-24">
              {product.name.slice(0, 1)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <p className="min-w-0 text-base font-semibold text-text">{product.name}</p>
              <p className="shrink-0 font-display text-xl tracking-tight">{product.price}</p>
            </div>
            <p className="mt-1 text-xs text-text-muted">
              {product.category}
              {product.type ? ` · ${product.type}` : ""}
            </p>
            {selection.tierName ? (
              <span className="mt-2 inline-flex items-center rounded-sm bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                {selection.tierName}
              </span>
            ) : null}
          </div>
        </div>

        {(selection.variantSlug || selection.fulfillmentType) && (
          <dl className="mt-4 space-y-1.5 text-xs">
            {selection.variantSlug ? (
              <div className="flex justify-between gap-2">
                <dt className="text-text-muted">Variant:</dt>
                <dd className="text-text">{selection.variantSlug}</dd>
              </div>
            ) : null}
            {selection.fulfillmentType ? (
              <div className="flex justify-between gap-2">
                <dt className="text-text-muted">Fulfillment:</dt>
                <dd className="text-text">{selection.fulfillmentType}</dd>
              </div>
            ) : null}
          </dl>
        )}

        <p className="mt-4 text-xs leading-5 text-text-muted">{product.summary}</p>

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

      <CheckoutUpsellsCard
        upsells={upsells}
        selected={selectedUpsells}
        onToggle={onToggleUpsell}
      />

      <CheckoutGuaranteeCard />
      <CheckoutTrustRow />
    </div>
  );
}
