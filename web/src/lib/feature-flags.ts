// Temporary content controls for launch-phase stability.
export const FORCE_HERO_STATS_SITEWIDE = false;
export const SHOW_GOOGLE_REVIEWS = false;

/** Service detail pages excluded from nav, sitemap, and public catalog. */
export const HIDDEN_SERVICE_SLUGS = new Set(["mcp-servers"]);

/** Product category pages excluded from nav, sitemap, and public catalog. */
export const HIDDEN_PRODUCT_CATEGORY_SLUGS = new Set(["website-templates"]);

export function isHiddenServiceSlug(slug: string): boolean {
  return HIDDEN_SERVICE_SLUGS.has(slug);
}

export function isHiddenProductCategorySlug(slug: string): boolean {
  return HIDDEN_PRODUCT_CATEGORY_SLUGS.has(slug);
}
