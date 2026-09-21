/**
 * Keyword-led <title> values for the public service pages.
 *
 * The service hero headlines ("Get discovered, tracked, and optimized from day one.")
 * are conversion copy, not search queries, and were being used as the page title. The
 * layout template appends " | Growrix OS".
 */
const SERVICE_SEO_TITLES: Record<string, string> = {
  websites: "Website Design & Development Services",
  "saas-applications": "SaaS Application Development Services",
  "mobile-apps": "Mobile App Development Services",
  automation: "Business Automation Services",
  "technical-seo": "Technical SEO Setup Services",
  "ai-business-systems": "AI Business System Development",
};

export function getServiceSeoTitle(slug: string, serviceTitle: string): string {
  return SERVICE_SEO_TITLES[slug] ?? `${serviceTitle} Services`;
}
