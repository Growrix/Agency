export type HtmlBusinessProfileCategorySlug = "creative-marketing" | "local-services" | "corporate-enterprise";

export type HtmlBusinessProfileCategory = {
  slug: HtmlBusinessProfileCategorySlug;
  label: string;
  shortLabel: string;
  description: string;
  defaultPrice: string;
};

export type HtmlBusinessProfileTemplateRecord = {
  slug: string;
  fileName: string;
  title: string;
  profileNumber: number | null;
  categorySlug: HtmlBusinessProfileCategorySlug;
  categoryLabel: string;
  teaser: string;
  summary: string;
  suggestedPrice: string;
  audience: string;
  tag?: string;
};

export const HTML_BUSINESS_PROFILE_SHOP_CATEGORY = {
  label: "HTML Business Profiles",
  slug: "html-business-profiles",
} as const;

const CATEGORY_DETAILS: Record<HtmlBusinessProfileCategorySlug, HtmlBusinessProfileCategory> = {
  "creative-marketing": {
    slug: "creative-marketing",
    label: "Creative & Marketing",
    shortLabel: "Creative",
    description: "Agency, studio, creator, and design-forward business profile templates.",
    defaultPrice: "$19",
  },
  "local-services": {
    slug: "local-services",
    label: "Local Services",
    shortLabel: "Local Services",
    description: "Home-service and neighborhood-business templates tuned for local conversion.",
    defaultPrice: "$19",
  },
  "corporate-enterprise": {
    slug: "corporate-enterprise",
    label: "Corporate & Enterprise",
    shortLabel: "Corporate",
    description: "Professional and enterprise-style templates for consulting and corporate teams.",
    defaultPrice: "$19",
  },
};

const PROFILE_FILES = [
  "business-profiles-showcase.html",
  "profile-01-brew-and-bean.html",
  "profile-02-luminary-studio.html",
  "profile-03-nexus-digital.html",
  "profile-04-law-firm.html",
  "profile-05-yoga-studio.html",
  "profile-06-barbershop.html",
  "profile-07-real-estate.html",
  "profile-08-food-truck.html",
  "profile-09-dental-clinic.html",
  "profile-10-personal-trainer.html",
  "profile-11-flower-shop.html",
  "profile-12-tutoring.html",
  "profile-13-luxury-spa.html",
  "profile-14-japanese-restaurant.html",
  "profile-15-interior-design.html",
  "profile-16-fintech.html",
  "profile-17-wedding-planner.html",
  "profile-18-auto-garage.html",
  "profile-19-recording-studio.html",
  "profile-20-architecture.html",
  "profile-21-travel-agency.html",
  "profile-22-private-chef.html",
  "profile-25-plumbing.html",
  "profile-26-aircon.html",
  "profile-27-cleaning.html",
  "profile-28-pest-control.html",
  "profile-29-painting.html",
  "profile-30-cctv-security.html",
  "profile-31-moving.html",
  "profile-32-water-pump.html",
  "profile-33-generator.html",
  "profile-34-locksmith.html",
  "profile-35-carpet-cleaning.html",
  "profile-36-roofing.html",
  "profile-37-landscaping.html",
  "profile-51-venture-capital.html",
  "profile-52-executive-recruitment.html",
  "profile-53-brand-agency.html",
  "profile-54-corporate-finance.html",
  "profile-55-real-estate-investment.html",
  "profile-56-corporate-training.html",
  "profile-57-sustainability-esg.html",
  "profile-58-cybersecurity.html",
  "profile-59-corporate-law.html",
  "profile-60-executive-coaching.html",
  "profile-61-supply-chain.html",
  "profile-62-tech-accelerator.html",
  "profile-63-corporate-banking.html",
  "profile-64-bpo.html",
  "profile-65-healthcare-consulting.html",
  "templates-showcase-10.html",
  "templates-showcase-vol2.html",
  "templates-showcase-vol3-local-services.html",
  "templates-showcase-vol4-corporate.html",
] as const;

const SHOWCASE_TITLE_MAP: Record<string, string> = {
  "business-profiles-showcase": "Business Profiles Master Showcase",
  "templates-showcase-10": "Templates Showcase Vol 1",
  "templates-showcase-vol2": "Templates Showcase Vol 2",
  "templates-showcase-vol3-local-services": "Templates Showcase Vol 3 - Local Services",
  "templates-showcase-vol4-corporate": "Templates Showcase Vol 4 - Corporate",
};

const WORD_OVERRIDES: Record<string, string> = {
  bpo: "BPO",
  cctv: "CCTV",
  esg: "ESG",
};

function titleize(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((segment) => WORD_OVERRIDES[segment] ?? `${segment[0]?.toUpperCase() ?? ""}${segment.slice(1)}`)
    .join(" ");
}

function parseProfileFile(fileName: string) {
  const slug = fileName.replace(/\.html$/i, "");
  const profileMatch = /^profile-(\d+)-(.+)$/i.exec(slug);

  if (profileMatch) {
    const profileNumber = Number.parseInt(profileMatch[1] ?? "", 10);
    const titleSeed = profileMatch[2] ?? slug;
    return {
      slug,
      profileNumber: Number.isFinite(profileNumber) ? profileNumber : null,
      title: `Profile ${profileMatch[1]} - ${titleize(titleSeed)}`,
    };
  }

  return {
    slug,
    profileNumber: null,
    title: SHOWCASE_TITLE_MAP[slug] ?? titleize(slug),
  };
}

function resolveCategory(fileName: string, profileNumber: number | null): HtmlBusinessProfileCategorySlug {
  if (fileName.includes("vol3-local-services")) {
    return "local-services";
  }

  if (fileName.includes("vol4-corporate")) {
    return "corporate-enterprise";
  }

  if (profileNumber !== null) {
    if (profileNumber >= 25 && profileNumber <= 37) {
      return "local-services";
    }

    if (profileNumber >= 51 && profileNumber <= 65) {
      return "corporate-enterprise";
    }
  }

  return "creative-marketing";
}

function resolvePrice(category: HtmlBusinessProfileCategorySlug, profileNumber: number | null) {
  void category;
  void profileNumber;
  return "$19";
}

function buildTemplateRecord(fileName: string): HtmlBusinessProfileTemplateRecord {
  const parsed = parseProfileFile(fileName);
  const categorySlug = resolveCategory(fileName, parsed.profileNumber);
  const category = CATEGORY_DETAILS[categorySlug];
  const suggestedPrice = resolvePrice(categorySlug, parsed.profileNumber);
  const isShowcase = parsed.profileNumber === null;

  return {
    slug: parsed.slug,
    fileName,
    title: parsed.title,
    profileNumber: parsed.profileNumber,
    categorySlug,
    categoryLabel: category.label,
    teaser: isShowcase
      ? `${category.shortLabel} collection preview with multiple HTML business profile layouts.`
      : `${category.shortLabel} HTML business profile template ready for quick launch and customization.`,
    summary: isShowcase
      ? `This showcase groups multiple ${category.label.toLowerCase()} business profile templates in a single preview experience.`
      : `A category-focused business profile HTML template for ${category.label.toLowerCase()} use cases with launch-ready structure and conversion sections.`,
    suggestedPrice,
    audience: isShowcase
      ? `Buyers reviewing ${category.label.toLowerCase()} template options before choosing a final profile.`
      : `Founders, agencies, and service teams that need a ${category.shortLabel.toLowerCase()} profile website quickly.`,
    tag: isShowcase ? "Bundle" : undefined,
  };
}

export const HTML_BUSINESS_PROFILE_CATEGORIES = Object.values(CATEGORY_DETAILS);

export const HTML_BUSINESS_PROFILE_TEMPLATES = PROFILE_FILES
  .map((fileName) => buildTemplateRecord(fileName))
  .sort((a, b) => {
    const first = a.profileNumber ?? 9999;
    const second = b.profileNumber ?? 9999;
    return first - second || a.slug.localeCompare(b.slug);
  });

export const HTML_BUSINESS_PROFILES_SERVICE = {
  slug: "html-business-profiles",
  name: "HTML Business Profiles",
  short: "Category-based HTML business profile templates ready for fast launch.",
  long: "A dedicated catalog of ready-to-buy HTML business profile templates grouped by business category so teams can preview quickly and purchase from the shop.",
  typical: "Template selection + optional customization",
  timeline: "1-7 days",
  pillars: ["Category-structured profiles", "Fast customization", "Shop-ready delivery", "CMS extensibility"],
} as const;

export function getHtmlBusinessProfilePreviewUrl(templateSlug: string) {
  const normalizedTemplateSlug = templateSlug.replace(/^html-business-profile-/, "");
  const template = getHtmlBusinessProfileBySlug(normalizedTemplateSlug);
  if (!template) {
    return `/previews/html-business-profiles/${normalizedTemplateSlug}.html`;
  }

  return `/previews/html-business-profiles/${template.fileName}`;
}

export function getHtmlBusinessProfilesCategoryPath(categorySlug: HtmlBusinessProfileCategorySlug) {
  return `/digital-products?category=html-business-profiles&type=${categorySlug}`;
}

export function getHtmlBusinessProfileBySlug(templateSlug: string) {
  return HTML_BUSINESS_PROFILE_TEMPLATES.find((template) => template.slug === templateSlug) ?? null;
}
