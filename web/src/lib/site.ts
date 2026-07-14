/**
 * Canonical site configuration used by metadata, robots, and sitemap generation.
 *
 * The production host can be overridden with NEXT_PUBLIC_SITE_URL. Public search
 * indexing is gated behind SITE_INDEXING_ENABLED so the site can stay fully
 * blocked during the pre-launch phase and be opened with a single env flag once
 * the SEO readiness checklist passes.
 */

const DEFAULT_SITE_URL = "https://www.growrixos.com";
const LOCAL_DEV_DEFAULT = "http://localhost:5000";

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

function normalizeBaseUrl(value: string | undefined) {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  const trimmed = value.trim().replace(/\/+$/, "");
  return trimmed.length > 0 ? trimmed : DEFAULT_SITE_URL;
}

/**
 * Resolves the public app origin for outbound links (transactional email, Stripe redirects).
 * Production never emits loopback hosts even when NEXT_PUBLIC_SITE_URL is missing or mis-set.
 */
export function resolveAppBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const candidate = fromEnv
    ? normalizeBaseUrl(fromEnv)
    : process.env.NODE_ENV === "production"
      ? DEFAULT_SITE_URL
      : LOCAL_DEV_DEFAULT;

  if (process.env.NODE_ENV === "production") {
    try {
      const { hostname } = new URL(candidate);
      if (LOOPBACK_HOSTS.has(hostname)) {
        return DEFAULT_SITE_URL;
      }
    } catch {
      return DEFAULT_SITE_URL;
    }
  }

  return candidate;
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
  "/sign-in",
  "/sign-up",
  "/cart",
  "/complete-account",
  "/live-chat",
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

export const SITE_SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/growrixos" },
  { label: "X", href: "https://x.com/growrixos" },
  { label: "YouTube", href: "https://www.youtube.com/@growrixos" },
] as const;
