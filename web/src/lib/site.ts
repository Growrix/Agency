/**
 * Canonical site configuration used by metadata, robots, and sitemap generation.
 *
 * The production host can be overridden with NEXT_PUBLIC_SITE_URL. Public search
 * indexing is gated behind SITE_INDEXING_ENABLED so the site can stay fully
 * blocked during the pre-launch phase and be opened with a single env flag once
 * the SEO readiness checklist passes.
 */

const DEFAULT_SITE_URL = "https://www.growrixos.com";

function normalizeBaseUrl(value: string | undefined) {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  const trimmed = value.trim().replace(/\/+$/, "");
  return trimmed.length > 0 ? trimmed : DEFAULT_SITE_URL;
}

export const SITE_URL = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const SITE_NAME = "Growrix OS";

/**
 * When false (the default), the site advertises itself as non-indexable through
 * robots.txt and per-page robots metadata. Set SITE_INDEXING_ENABLED=true to
 * open the site to search engines after the launch checklist is complete.
 */
export const SITE_INDEXING_ENABLED = process.env.SITE_INDEXING_ENABLED === "true";

/** Route prefixes that must never be indexed even after indexing is enabled. */
export const DISALLOWED_CRAWL_PATHS = [
  "/previews/",
  "/api/",
  "/admin",
  "/dashboard",
  "/checkout",
  "/success",
  "/Business-profile",
  "/business-profile",
  "/businessprofile",
] as const;

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
