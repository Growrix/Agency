/**
 * Returns `YYYY-MM-DD` for an ISO date or datetime string, or `undefined` when the
 * value is missing or not a real calendar date. Used for blog publish dates, which
 * feed the visible date, the sitemap `lastModified`, and BlogPosting `datePublished`.
 */
export function toIsoDateOnly(value?: string | null): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value.trim());
  if (!match) {
    return undefined;
  }

  const [, year, month, day] = match;
  const parsed = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  const isRealDate =
    parsed.getUTCFullYear() === Number(year) &&
    parsed.getUTCMonth() === Number(month) - 1 &&
    parsed.getUTCDate() === Number(day);

  return isRealDate ? `${year}-${month}-${day}` : undefined;
}
