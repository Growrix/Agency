"use client";

import { SparklesIcon } from "@heroicons/react/24/outline";
import type { ProductUpsellRecord } from "@/server/data/schema";
import {
  computeSavingsPercent,
  formatCentsAsUsd,
  parsePriceStringToCents,
} from "@/components/checkout/checkout-utils";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

type CheckoutUpsellsCardProps = {
  upsells: ProductUpsellRecord[];
  selected: Set<string>;
  onToggle: (title: string) => void;
  onAddSelected?: () => void;
};

export function CheckoutUpsellsCard({
  upsells,
  selected,
  onToggle,
  onAddSelected,
}: CheckoutUpsellsCardProps) {
  if (upsells.length === 0) {
    return null;
  }

  const bestValueUpsell = upsells.find((upsell) => upsell.best_value);
  const selectedCount = upsells.filter((upsell) => selected.has(upsell.title)).length;

  return (
    <section
      aria-labelledby="checkout-upsells-heading"
      className="rounded-md border border-border/60 bg-surface"
    >
      <header className="flex items-center justify-between gap-3 border-b border-border/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <SparklesIcon className="size-4 text-primary" aria-hidden />
          <h3
            id="checkout-upsells-heading"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted"
          >
            Add more with exclusive offers
          </h3>
        </div>
        {bestValueUpsell ? (
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            Best value
          </span>
        ) : null}
      </header>

      <ul className="divide-y divide-border/40">
        {upsells.map((upsell) => {
          const priceCents = parsePriceStringToCents(upsell.price);
          const compareCents = parsePriceStringToCents(upsell.compare_at_price);
          const savingsPercent = computeSavingsPercent(priceCents, compareCents);
          const inputId = `upsell-${upsell.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          const isSelected = selected.has(upsell.title);
          const savingsLabel =
            upsell.savings_label ??
            (savingsPercent !== null ? `${savingsPercent}% OFF` : null);

          return (
            <li key={upsell.title} className="flex items-start gap-3 px-4 py-3">
              <input
                id={inputId}
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(upsell.title)}
                className="mt-1 size-4 shrink-0 rounded-sm border-border"
              />
              <label htmlFor={inputId} className="min-w-0 flex-1 cursor-pointer">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium text-text">{upsell.title}</p>
                  {upsell.price ? (
                    <div className="flex shrink-0 items-baseline gap-2 text-sm">
                      <span className="font-semibold text-text">
                        {formatCentsAsUsd(priceCents)}
                      </span>
                      {upsell.compare_at_price ? (
                        <span className="text-xs text-text-muted line-through">
                          {formatCentsAsUsd(compareCents)}
                        </span>
                      ) : null}
                      {savingsLabel ? (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                            "bg-success/15 text-success",
                          )}
                        >
                          {savingsLabel}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-text-muted">{upsell.description}</p>
              </label>
            </li>
          );
        })}
      </ul>

      <footer className="flex items-center justify-between gap-3 border-t border-border/40 bg-inset/25 px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text">Add items and save more!</p>
          <p className="text-[11px] text-text-muted">
            These exclusive offers are only available here.
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <Button
            type="button"
            size="sm"
            variant={selectedCount > 0 ? "primary" : "outline"}
            disabled={selectedCount === 0 || !onAddSelected}
            onClick={onAddSelected}
          >
            Add Selected
          </Button>
          <span className="text-[11px] text-text-muted">
            {selectedCount} item{selectedCount === 1 ? "" : "s"}
          </span>
        </div>
      </footer>
    </section>
  );
}
