/**
 * Keyword-led SEO titles for product detail pages.
 *
 * Product names are storefront names ("AquaVerde Pool", "Profile 04 - Law Firm"), which
 * do not match how people search ("pool website template", "law firm html template").
 * The visible H1 and Product schema keep the storefront name; only the <title> changes.
 */

const HTML_BUSINESS_PROFILES_CATEGORY = "html-business-profiles";
const WEBSITE_TEMPLATES_CATEGORY = "website-templates-html-preview";

export function buildProductSeoTitle(product: { name: string; categorySlug: string }): string {
  const name = product.name.trim();

  if (product.categorySlug === HTML_BUSINESS_PROFILES_CATEGORY) {
    const subject = /^Profile\s+\d+\s*[-–—]\s*(.+)$/i.exec(name)?.[1]?.trim() ?? name;
    return /template|profile/i.test(subject) ? subject : `${subject} HTML Business Profile Template`;
  }

  if (product.categorySlug === WEBSITE_TEMPLATES_CATEGORY) {
    return /template/i.test(name) ? name : `${name} HTML Website Template`;
  }

  return name;
}
