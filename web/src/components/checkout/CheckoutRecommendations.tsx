"use client";

import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/outline";
import type { ProductUpsellRecord } from "@/server/data/schema";
import {
  computeSavingsPercent,
  formatCentsAsUsd,
  parsePriceStringToCents,
} from "@/components/checkout/checkout-utils";

type CheckoutRecommendationsProps = {
  upsells: ProductUpsellRecord[];
};

export function CheckoutRecommendations({ upsells }: CheckoutRecommendationsProps) {
  if (upsells.length === 0) return null;

  return (
    <section
      aria-labelledby="checkout-recommendations-heading"
      className="rounded-md border border-border/60 bg-surface"
    >
      <header className="flex items-center justify-between gap-3 border-b border-border/50 px-4 py-3">
        <h3
          id="checkout-recommendations-heading"
          className="text-sm font-semibold text-text"
        >
          Recommended for you
        </h3>
        <p className="hidden text-xs text-text-muted sm:block">
          Add more value to your website
        </p>
      </header>

      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto p-3">
        {upsells.map((upsell) => {
          const priceCents = parsePriceStringToCents(upsell.price);
          const compareCents = parsePriceStringToCents(upsell.compare_at_price);
          const savingsPercent = computeSavingsPercent(priceCents, compareCents);
          const savingsLabel =
            upsell.savings_label ??
            (savingsPercent !== null ? `Save ${savingsPercent}%` : null);

          return (
            <Link
              key={upsell.title}
              href={upsell.cta_href}
              className="group flex w-56 shrink-0 snap-start flex-col gap-2 rounded-md border border-border/55 bg-inset/25 p-3 transition-colors hover:border-primary/40 hover:bg-inset/40"
            >
              <span
                aria-hidden
                className="inline-flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary"
              >
                <SparklesIcon className="size-4" />
              </span>
              <p className="text-sm font-medium text-text">{upsell.title}</p>
              <p className="line-clamp-2 text-[11px] text-text-muted">{upsell.description}</p>
              {upsell.price ? (
                <div className="mt-auto flex items-baseline gap-2 pt-2 text-sm">
                  <span className="font-semibold text-text">
                    {formatCentsAsUsd(priceCents)}
                  </span>
                  {upsell.compare_at_price ? (
                    <span className="text-xs text-text-muted line-through">
                      {formatCentsAsUsd(compareCents)}
                    </span>
                  ) : null}
                  {savingsLabel ? (
                    <span className="ml-auto rounded-full bg-success/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-success">
                      {savingsLabel}
                    </span>
                  ) : null}
                </div>
              ) : (
                <p className="mt-auto text-xs font-medium text-primary pt-2 group-hover:underline">
                  {upsell.cta_label} →
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
