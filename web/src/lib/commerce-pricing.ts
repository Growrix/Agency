export const DFY_PRICING_NOTICE =
  "Final pricing for Done-For-You work is confirmed after we review your goals together. No payment is collected at checkout—we'll follow up to align scope and quote.";

export const DFY_PRICE_DISPLAY_LABEL = "Quoted after discovery";

type CommercePricingInput = {
  fulfillmentType?: string | null;
  variantSlug?: string | null;
  tierName?: string | null;
  priceLabel?: string | null;
};

function normalizeToken(value: string | null | undefined) {
  return value?.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_") ?? "";
}

export function isDoneForYouFulfillment(value?: string | null) {
  const normalized = normalizeToken(value);
  return normalized === "done_for_you_service" || normalized === "done_for_you" || normalized.includes("done_for_you");
}

export function isDoneForYouVariantSlug(value?: string | null) {
  const normalized = value?.trim().toLowerCase() ?? "";
  return normalized === "done-for-you" || normalized === "done_for_you";
}

export function isDoneForYouTierName(value?: string | null) {
  const normalized = value?.trim().toLowerCase() ?? "";
  return normalized === "done-for-you" || normalized.includes("done for you");
}

export function isQuoteBasedPriceLabel(price?: string | null) {
  if (!price?.trim()) {
    return false;
  }

  const label = price.trim().toLowerCase();
  if (
    label.includes("custom pricing") ||
    label.includes("custom price") ||
    label.includes("quote") ||
    label.includes("contact us") ||
    label.includes("tbd") ||
    label.includes("upon request")
  ) {
    return true;
  }

  const moneyMatches = price.match(/\$?\s*\d[\d,]*(?:\.\d{2})?/g);
  return Boolean(moneyMatches && moneyMatches.length > 1);
}

export function isQuoteBasedCommerceItem(input: CommercePricingInput) {
  return (
    isDoneForYouFulfillment(input.fulfillmentType) ||
    isDoneForYouVariantSlug(input.variantSlug) ||
    isDoneForYouTierName(input.tierName) ||
    isQuoteBasedPriceLabel(input.priceLabel)
  );
}

export function parseFixedUsdPriceToCents(price?: string | null) {
  if (!price?.trim() || isQuoteBasedPriceLabel(price)) {
    return 0;
  }

  const normalized = price.replace(/[^\d.]/g, "");
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 0;
  }

  return Math.round(parsed * 100);
}

export function formatPriceLabelForDisplay(price: string | undefined, input: CommercePricingInput) {
  if (isQuoteBasedCommerceItem({ ...input, priceLabel: price })) {
    return DFY_PRICE_DISPLAY_LABEL;
  }

  return price?.trim() || DFY_PRICE_DISPLAY_LABEL;
}

export function formatOrderMoneyFromCents(cents: number, currency = "USD") {
  if (cents <= 0) {
    return null;
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      maximumFractionDigits: 2,
    }).format(cents / 100);
  } catch {
    return `${(cents / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
}

export function isQuoteBasedOrder(input: {
  selected_fulfillment_type?: string | null;
  selected_variant_slug?: string | null;
  selected_tier_name?: string | null;
  items?: Array<{
    fulfillment_type?: string | null;
    product_variant_slug?: string | null;
    product_tier_name?: string | null;
    unit_price_cents?: number;
    total_cents?: number;
  }>;
}) {
  if (
    isQuoteBasedCommerceItem({
      fulfillmentType: input.selected_fulfillment_type,
      variantSlug: input.selected_variant_slug,
      tierName: input.selected_tier_name,
    })
  ) {
    return true;
  }

  return (
    input.items?.some((item) =>
      isQuoteBasedCommerceItem({
        fulfillmentType: item.fulfillment_type,
        variantSlug: item.product_variant_slug,
        tierName: item.product_tier_name,
      }),
    ) ?? false
  );
}

export function formatOrderMoneyDisplay(
  cents: number,
  currency = "USD",
  quoteBased = false,
) {
  if (quoteBased || cents <= 0) {
    return DFY_PRICE_DISPLAY_LABEL;
  }

  return formatOrderMoneyFromCents(cents, currency) ?? DFY_PRICE_DISPLAY_LABEL;
}
