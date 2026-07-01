"use client";

import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import {
  ArrowPathIcon,
  ArrowUpRightIcon,
  EnvelopeIcon,
  PaintBrushIcon,
  SparklesIcon,
  StarIcon,
  TrophyIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import type { ProductUpsellRecord } from "@/server/data/schema";
import {
  computeSavingsPercent,
  formatCentsAsUsd,
  parsePriceStringToCents,
} from "@/components/checkout/checkout-utils";
import { cn } from "@/lib/utils";

type UpsellIconTone = "primary" | "warning" | "info" | "accent" | "secondary";

const ICON_TONE_CLASSES: Record<UpsellIconTone, string> = {
  primary: "bg-primary/15 text-primary",
  warning: "bg-warning/15 text-warning",
  info: "bg-info/15 text-info",
  accent: "bg-accent/15 text-accent",
  secondary: "bg-secondary/15 text-secondary",
};

/**
 * Assign an icon + accent tone per upsell using its title as a stable key.
 * Keeps the visual differentiation from the design mock without requiring
 * operator input for every new upsell.
 */
export function pickUpsellIcon(title: string): {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: UpsellIconTone;
} {
  const key = title.toLowerCase();
  if (key.includes("seo") || key.includes("ranking")) {
    return { Icon: SparklesIcon, tone: "primary" };
  }
  if (key.includes("email") || key.includes("newsletter") || key.includes("marketing")) {
    return { Icon: EnvelopeIcon, tone: "warning" };
  }
  if (key.includes("maintenance") || key.includes("support") || key.includes("monitor")) {
    return { Icon: ArrowPathIcon, tone: "info" };
  }
  if (key.includes("logo") || key.includes("brand") || key.includes("identity")) {
    return { Icon: PaintBrushIcon, tone: "accent" };
  }
  if (key.includes("premium") || key.includes("upgrade")) {
    return { Icon: TrophyIcon, tone: "secondary" };
  }
  if (key.includes("setup") || key.includes("install") || key.includes("wrench")) {
    return { Icon: WrenchScrewdriverIcon, tone: "info" };
  }
  return { Icon: StarIcon, tone: "primary" };
}

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
        <div className="min-w-0">
          <h3 id="checkout-recommendations-heading" className="text-sm font-semibold text-text">
            Recommended for you
          </h3>
          <p className="text-xs text-text-muted">Add more value to your website</p>
        </div>
        <span aria-hidden className="text-text-muted">
          <ArrowUpRightIcon className="size-4" />
        </span>
      </header>

      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto p-3">
        {upsells.map((upsell) => {
          const priceCents = parsePriceStringToCents(upsell.price);
          const compareCents = parsePriceStringToCents(upsell.compare_at_price);
          const savingsPercent = computeSavingsPercent(priceCents, compareCents);
          const savingsLabel =
            upsell.savings_label ??
            (savingsPercent !== null ? `Save ${savingsPercent}%` : null);
          const { Icon, tone } = pickUpsellIcon(upsell.title);

          return (
            <Link
              key={upsell.title}
              href={upsell.cta_href}
              className="group flex w-56 shrink-0 snap-start flex-col gap-2 rounded-md border border-border/55 bg-inset/25 p-3 transition-colors hover:border-primary/40 hover:bg-inset/40"
            >
              <span
                aria-hidden
                className={cn(
                  "inline-flex size-8 items-center justify-center rounded-full",
                  ICON_TONE_CLASSES[tone],
                )}
              >
                <Icon className="size-4" />
              </span>
              <p className="text-sm font-medium text-text">{upsell.title}</p>
              <p className="line-clamp-2 text-[11px] text-text-muted">{upsell.description}</p>
              {upsell.price ? (
                <div className="mt-auto flex flex-wrap items-baseline gap-2 pt-2 text-sm">
                  <span className="font-semibold text-text">{formatCentsAsUsd(priceCents)}</span>
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
                <p className="mt-auto pt-2 text-xs font-medium text-primary group-hover:underline">
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
