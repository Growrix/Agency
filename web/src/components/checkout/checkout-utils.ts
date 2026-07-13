import type { CheckoutSelection } from "@/lib/shop";
import { parseFixedUsdPriceToCents } from "@/lib/commerce-pricing";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

export function parsePriceStringToCents(value: string | undefined): number {
  return parseFixedUsdPriceToCents(value);
}

export function formatCentsAsUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export function computeSavingsPercent(priceCents: number, compareAtCents: number): number | null {
  if (compareAtCents <= 0 || priceCents <= 0 || priceCents >= compareAtCents) return null;
  return Math.round(((compareAtCents - priceCents) / compareAtCents) * 100);
}

function normalizeVariantSlug(value: string | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

function normalizeTier(value: string | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

export function resolveSelectedVariant(
  product: PublicShopProductRecord,
  selection: CheckoutSelection,
) {
  const variants = product.variants ?? [];
  if (variants.length === 0) {
    return null;
  }

  const variantSlug = normalizeVariantSlug(selection.variantSlug);
  const tierName = normalizeTier(selection.tierName);

  return (
    variants.find((entry) => normalizeVariantSlug(entry.slug) === variantSlug) ??
    variants.find((entry) => normalizeTier(entry.tier_name) === tierName) ??
    null
  );
}
