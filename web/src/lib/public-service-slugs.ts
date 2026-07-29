/**
 * Service slugs that have a local fallback COPY map in
 * `web/src/app/services/[slug]/page.tsx` and can render without 404.
 *
 * CMS may return additional service slugs via `listPublicServices()`. Those
 * must NOT appear in the sitemap until they also have COPY (or CMS-driven
 * rendering) — otherwise Google crawls a sitemap URL and gets a 404.
 *
 * Redirected slugs (`html-business-profiles`, `template-customization`) are
 * intentionally excluded here; they are filtered separately in sitemap.ts.
 */
export const PUBLIC_SERVICE_SLUGS = [
  "websites",
  "saas-applications",
  "mobile-apps",
  "ai-business-systems",
  "automation",
  "technical-seo",
] as const;

export type PublicServiceSlug = (typeof PUBLIC_SERVICE_SLUGS)[number];

export const PUBLIC_SERVICE_SLUG_SET = new Set<string>(PUBLIC_SERVICE_SLUGS);

export function isPublicServiceSlug(slug: string): slug is PublicServiceSlug {
  return PUBLIC_SERVICE_SLUG_SET.has(slug);
}
