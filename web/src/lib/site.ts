/**
 * Canonical site configuration used by metadata, robots, and sitemap generation.
 *
 * The production host can be overridden with NEXT_PUBLIC_SITE_URL. Public search
 * indexing defaults ON for Vercel Production (and generic NODE_ENV=production
 * when not a preview). Preview/dev stay blocked unless explicitly enabled.
 * Set SITE_INDEXING_ENABLED=false to force a full crawl/index block.
 */

const DEFAULT_SITE_URL = "https://www.growrixos.com";
const LOCAL_DEV_DEFAULT = "http://localhost:5000";
const PRODUCTION_APEX_HOST = "growrixos.com";
const PRODUCTION_WWW_HOST = "www.growrixos.com";

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

function normalizeBaseUrl(value: string | undefined) {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  const trimmed = value.trim().replace(/\/+$/, "");
  return trimmed.length > 0 ? trimmed : DEFAULT_SITE_URL;
}

/**
 * Production canonical host is always www. Mis-set apex env values must not leak into
 * sitemap, robots Host, or per-page canonical metadata.
 */
function enforceProductionWwwHost(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === PRODUCTION_APEX_HOST) {
      parsed.hostname = PRODUCTION_WWW_HOST;
      return normalizeBaseUrl(parsed.toString());
    }
  } catch {
    return DEFAULT_SITE_URL;
  }

  return url;
}

function resolvePublicSiteUrl(): string {
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

    return enforceProductionWwwHost(candidate);
  }

  return candidate;
}

/**
 * Resolves the public app origin for outbound links (transactional email, Stripe redirects).
 * Production never emits loopback hosts even when NEXT_PUBLIC_SITE_URL is missing or mis-set.
 */
export function resolveAppBaseUrl(): string {
  return resolvePublicSiteUrl();
}

export const SITE_URL = resolvePublicSiteUrl();

export const SITE_NAME = "Growrix OS";

function parseIndexingFlag(raw: string | undefined): boolean | null {
  if (raw === undefined) {
    return null;
  }

  const normalized = raw.trim().toLowerCase();
  if (normalized === "") {
    return null;
  }

  if (["1", "true", "yes", "on"].includes(normalized)) {
    return true;
  }

  if (["0", "false", "no", "off"].includes(normalized)) {
    return false;
  }

  return null;
}

/**
 * Decide whether public routes may be crawled/indexed.
 *
 * Priority:
 * 1. Explicit SITE_INDEXING_ENABLED=true|false (and common aliases)
 * 2. Vercel preview / non-production → blocked
 * 3. Vercel production (or NODE_ENV=production outside preview) → allowed
 *
 * Exportable for unit tests.
 */
export function resolveSiteIndexingEnabled(
  env: Partial<NodeJS.ProcessEnv> = process.env,
): boolean {
  const explicit = parseIndexingFlag(env.SITE_INDEXING_ENABLED);
  if (explicit !== null) {
    return explicit;
  }

  const vercelEnv = (env.VERCEL_ENV ?? "").trim().toLowerCase();
  if (vercelEnv === "preview" || vercelEnv === "development") {
    return false;
  }

  if (vercelEnv === "production") {
    return true;
  }

  // Generic production builds (non-Vercel) default to indexable so a missing
  // env flag cannot silently emit Disallow:/ + sitewide noindex again.
  return env.NODE_ENV === "production";
}

/**
 * When false, robots.txt disallows `/` and root metadata emits noindex.
 * Production defaults ON; set SITE_INDEXING_ENABLED=false to kill-switch.
 */
export const SITE_INDEXING_ENABLED = resolveSiteIndexingEnabled();

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
