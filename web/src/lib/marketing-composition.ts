/**
 * Shared marketing page section rhythm — extends homepage rules sitewide.
 */

import type {
  HomeSectionConfig,
  HomeSectionLayout,
  HomeSectionSize,
  HomeSectionSpacing,
  HomeSectionTone,
} from "@/lib/homepage-composition";

export type MarketingPageId =
  | "about"
  | "services"
  | "service-detail"
  | "service-detail-websites"
  | "service-detail-saas-applications"
  | "service-detail-mobile-apps"
  | "service-detail-automation"
  | "service-detail-technical-seo"
  | "service-detail-ai-business-systems"
  | "pricing"
  | "contact"
  | "book-appointment"
  | "faq"
  | "blog"
  | "portfolio"
  | "additional-services"
  | "category-website-templates-preview"
  | "category-website-templates"
  | "category-business-profiles"
  | "category-product-type";

export type MarketingSectionConfig = HomeSectionConfig;

export const MARKETING_RULES = {
  heroLayout: "viewport" as HomeSectionLayout,
  sectionLayout: "content" as HomeSectionLayout,
  standardSpacing: "split" as HomeSectionSpacing,
} as const;

function section(
  tone: HomeSectionTone,
  size: HomeSectionSize = "standard",
  overrides?: Partial<MarketingSectionConfig>,
): MarketingSectionConfig {
  return {
    tone,
    size,
    layout: size === "hero" ? MARKETING_RULES.heroLayout : MARKETING_RULES.sectionLayout,
    spacing: size === "hero" || size === "compact" ? "default" : MARKETING_RULES.standardSpacing,
    ...overrides,
  };
}

export const MARKETING_SECTIONS: Record<
  MarketingPageId,
  Record<string, MarketingSectionConfig>
> = {
  about: {
    hero: section("default", "hero"),
    principles: section("default"),
    founder: section("inset"),
    whyExist: section("default"),
    process: section("inset"),
    ecosystem: section("default"),
    businessFirst: section("inset"),
    howWeWork: section("default"),
    clientValue: section("inset"),
    reviews: section("default"),
    cta: section("default", "compact"),
  },
  services: {
    hero: section("default", "hero"),
    highlights: section("default"),
    compare: section("inset"),
    ecosystem: section("default"),
    process: section("inset"),
    stack: section("default"),
    proof: section("inset"),
    faq: section("default"),
    cta: section("default", "compact"),
  },
  "service-detail": {
    hero: section("default", "hero"),
    overview: section("inset"),
    deliverables: section("default"),
    process: section("inset"),
    proof: section("default"),
    reviews: section("inset"),
    faq: section("default"),
    cta: section("default", "compact"),
  },
  "service-detail-websites": {
    hero: section("default", "hero"),
    "featured-templates": section("inset"),
    preview: section("inset"),
    engagement: section("default"),
    overview: section("inset"),
    deliverables: section("default"),
    process: section("inset"),
    proof: section("default"),
    faq: section("inset"),
    cta: section("default", "compact"),
  },
  "service-detail-saas-applications": {
    hero: section("default", "hero"),
    "product-types": section("inset"),
    stack: section("default"),
    overview: section("inset"),
    deliverables: section("default"),
    process: section("inset"),
    engagement: section("default"),
    faq: section("inset"),
    cta: section("default", "compact"),
  },
  "service-detail-mobile-apps": {
    hero: section("default", "hero"),
    "product-types": section("inset"),
    overview: section("default"),
    deliverables: section("inset"),
    process: section("default"),
    engagement: section("inset"),
    faq: section("default"),
    cta: section("default", "compact"),
  },
  "service-detail-automation": {
    hero: section("default", "hero"),
    "workflow-showcase": section("inset"),
    "automation-types": section("default"),
    overview: section("inset"),
    deliverables: section("default"),
    process: section("inset"),
    engagement: section("default"),
    faq: section("inset"),
    cta: section("default", "compact"),
  },
  "service-detail-technical-seo": {
    hero: section("default", "hero"),
    "search-foundation": section("inset"),
    "setup-categories": section("default"),
    overview: section("inset"),
    deliverables: section("default"),
    "whats-included": section("inset"),
    process: section("default"),
    engagement: section("inset"),
    faq: section("default"),
    cta: section("default", "compact"),
  },
  "service-detail-ai-business-systems": {
    hero: section("default", "hero"),
    "ai-solutions": section("inset"),
    overview: section("default"),
    deliverables: section("inset"),
    process: section("default"),
    engagement: section("inset"),
    faq: section("default"),
    cta: section("default", "compact"),
  },
  pricing: {
    hero: section("default", "hero"),
    startingPoints: section("default"),
    serviceRanges: section("inset"),
    deliveryComparison: section("default"),
    scoping: section("inset"),
    journeys: section("default"),
    faq: section("inset"),
    cta: section("default", "compact"),
  },
  contact: {
    hero: section("default", "hero"),
    channels: section("default", "compact"),
    process: section("inset"),
    routes: section("default"),
    form: section("inset"),
    explore: section("default"),
    faq: section("inset"),
  },
  "book-appointment": {
    hero: section("default", "hero"),
    form: section("inset"),
    alternatives: section("default", "compact"),
  },
  faq: {
    hero: section("default", "hero"),
    quick: section("default", "compact"),
    topics: section("inset"),
    cta: section("default", "compact"),
  },
  blog: {
    hero: section("default", "hero"),
    listing: section("default"),
  },
  portfolio: {
    hero: section("default", "hero"),
    filters: section("default", "compact"),
    grid: section("inset"),
    capabilities: section("default"),
    delivery: section("inset"),
    reviews: section("default"),
    faq: section("inset"),
    cta: section("default", "compact"),
  },
  "additional-services": {
    hero: section("default", "hero"),
    categories: section("inset"),
    deliverables: section("default"),
    process: section("inset"),
    proof: section("default"),
    cta: section("default", "compact"),
  },
  "category-website-templates-preview": {
    hero: section("default", "hero"),
    showcase: section("inset"),
    catalog: section("default"),
    pricing: section("inset"),
    faq: section("default"),
    cta: section("inset"),
  },
  "category-website-templates": {
    hero: section("default", "hero"),
    catalog: section("inset"),
    pricing: section("default"),
    faq: section("inset"),
    cta: section("default"),
  },
  "category-business-profiles": {
    hero: section("default", "hero"),
    catalog: section("inset"),
    pricing: section("default"),
    why: section("inset"),
    included: section("default"),
    customization: section("inset"),
    upgrade: section("default"),
    consultation: section("inset"),
    faq: section("default"),
    cta: section("inset", "compact"),
  },
  "category-product-type": {
    hero: section("default", "hero"),
    grid: section("inset"),
  },
};

export function marketingSection(
  pageId: MarketingPageId,
  sectionId: string,
): MarketingSectionConfig {
  const page = MARKETING_SECTIONS[pageId];
  const config = page[sectionId];
  if (!config) {
    return section("default");
  }
  return config;
}

export type MarketingSectionShellProps = MarketingSectionConfig;
