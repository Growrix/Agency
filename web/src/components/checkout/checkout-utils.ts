export function parsePriceStringToCents(value: string | undefined): number {
  if (!value) return 0;
  const normalized = value.replace(/[^\d.]/g, "");
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) return 0;
  return Math.round(parsed * 100);
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
