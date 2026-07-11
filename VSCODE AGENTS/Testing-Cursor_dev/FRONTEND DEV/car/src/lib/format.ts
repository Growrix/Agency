export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseCurrency(value: string) {
  const num = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? num : 0;
}

export function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

export function humanizeSlug(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
