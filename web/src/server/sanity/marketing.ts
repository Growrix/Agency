import "server-only";

import type { AccordionItem } from "@/components/sections/Accordion";
import type { Tier } from "@/components/sections/PricingTier";
import { getSanityClient, isSanityConfigured } from "@/server/sanity/client";

type SanityQueryOptions = {
  preview?: boolean;
};

type SanityLink = {
  label?: string;
  href?: string;
};

type SanityRichItem = {
  title?: string;
  description?: string;
  eyebrow?: string;
};

type SanityTier = {
  name?: string;
  price?: string;
  cadence?: string;
  description?: string;
  features?: string[];
  cta?: SanityLink;
  featured?: boolean;
  badge?: string;
};

type SanityStat = {
  value?: string;
  label?: string;
  hint?: string;
};

type SanityFaqItem = {
  category?: string;
  question?: string;
  answer?: string;
  featured?: boolean;
};

type SanityServiceDetail = {
  slug?: string;
  heroEyebrow?: string;
  heroHeadline?: string;
  heroDescription?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  builds?: SanityRichItem[];
  differentiators?: SanityRichItem[];
  tiers?: SanityTier[];
  faq?: SanityFaqItem[];
  stats?: SanityStat[];
};

type SanityHomePage = {
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;
  capabilityEyebrow?: string;
  capabilityTitle?: string;
  capabilityDescription?: string;
  featuredBuildsEyebrow?: string;
  featuredBuildsTitle?: string;
  featuredBuildsDescription?: string;
  featuredProjectSlugs?: string[];
  shopEyebrow?: string;
  shopTitle?: string;
  shopDescription?: string;
  featuredProductSlugs?: string[];
  liveSaasEyebrow?: string;
  liveSaasTitle?: string;
  liveSaasDescription?: string;
  featuredLiveSaasSlugs?: string[];
  aiEyebrow?: string;
  aiTitle?: string;
  aiDescription?: string;
  aiPrivacyNote?: string;
  pricingEyebrow?: string;
  pricingTitle?: string;
  pricingDescription?: string;
  pricingTiers?: SanityTier[];
  fieldNotesEyebrow?: string;
  fieldNotesTitle?: string;
  fieldNotesDescription?: string;
  finalCtaEyebrow?: string;
  finalCtaTitle?: string;
  finalCtaDescription?: string;
  finalPrimaryLabel?: string;
  finalSecondaryLabel?: string;
};

type SanityAboutPage = {
  heroTitle?: string;
  heroDescription?: string;
  heroQuote?: string;
  principles?: SanityRichItem[];
  founderEyebrow?: string;
  founderTitle?: string;
  founderDescription?: string;
  founderCards?: SanityRichItem[];
  processEyebrow?: string;
  processTitle?: string;
  beyondEyebrow?: string;
  beyondTitle?: string;
  beyondDescription?: string;
  partnerBullets?: string[];
  philosophyTitle?: string;
  philosophy?: string[];
  ctaTitle?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
};

export type MarketingFaqItem = {
  category: string;
  question: string;
  answer: string;
  featured: boolean;
};

export type ServiceDetailContent = {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroDescription?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  builds?: Array<{ title: string; description: string }>;
  differentiators?: Array<{ title: string; description: string }>;
  tiers?: Tier[];
  faq?: AccordionItem[];
  stats?: Array<{ value: string; label: string; hint?: string }>;
};

export type HomePageContent = {
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;
  capability?: { eyebrow?: string; title?: string; description?: string };
  featuredBuilds?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    projectSlugs?: string[];
  };
  shopSpotlight?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    productSlugs?: string[];
  };
  liveSaas?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    productSlugs?: string[];
  };
  ai?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    privacyNote?: string;
  };
  pricing?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    tiers?: Tier[];
  };
  fieldNotes?: {
    eyebrow?: string;
    title?: string;
    description?: string;
  };
  finalCta?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    primaryLabel?: string;
    secondaryLabel?: string;
  };
};

export type AboutPageContent = {
  heroTitle?: string;
  heroDescription?: string;
  heroQuote?: string;
  principles?: Array<{ title: string; description: string }>;
  founder?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    cards?: Array<{ eyebrow?: string; title: string; description: string }>;
  };
  process?: {
    eyebrow?: string;
    title?: string;
  };
  beyond?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    bullets?: string[];
  };
  philosophy?: {
    title?: string;
    items?: string[];
  };
  finalCta?: {
    title?: string;
    primaryLabel?: string;
    secondaryLabel?: string;
  };
};

const SANITY_FAQ_ITEMS_QUERY = `*[
  _type == "faqItem" &&
  defined(question) &&
  defined(answer) &&
  ($preview || coalesce(published, true) == true)
] | order(coalesce(orderRank, 999), question asc) {
  category,
  question,
  answer,
  featured
}`;

const SANITY_SERVICE_DETAIL_QUERY = `*[
  _type == "servicePage" &&
  slug.current == $slug &&
  ($preview || coalesce(published, true) == true)
][0] {
  "slug": slug.current,
  heroEyebrow,
  heroHeadline,
  heroDescription,
  primaryCtaLabel,
  secondaryCtaLabel,
  secondaryCtaHref,
  "builds": coalesce(builds, []),
  "differentiators": coalesce(differentiators, []),
  "tiers": coalesce(tiers, []),
  "faq": coalesce(faq, []),
  "stats": coalesce(stats, [])
}`;

const SANITY_HOME_PAGE_QUERY = `*[
  _type == "homePage" &&
  ($preview || coalesce(published, true) == true)
][0] {
  heroBadge,
  heroTitle,
  heroDescription,
  capabilityEyebrow,
  capabilityTitle,
  capabilityDescription,
  featuredBuildsEyebrow,
  featuredBuildsTitle,
  featuredBuildsDescription,
  "featuredProjectSlugs": coalesce(featuredProjects[]->slug.current, featuredProjectSlugs, []),
  shopEyebrow,
  shopTitle,
  shopDescription,
  "featuredProductSlugs": coalesce(featuredProducts[]->slug.current, featuredProductSlugs, []),
  liveSaasEyebrow,
  liveSaasTitle,
  liveSaasDescription,
  "featuredLiveSaasSlugs": coalesce(featuredLiveSaas[]->slug.current, featuredLiveSaasSlugs, []),
  aiEyebrow,
  aiTitle,
  aiDescription,
  aiPrivacyNote,
  pricingEyebrow,
  pricingTitle,
  pricingDescription,
  "pricingTiers": coalesce(pricingTiers, []),
  fieldNotesEyebrow,
  fieldNotesTitle,
  fieldNotesDescription,
  finalCtaEyebrow,
  finalCtaTitle,
  finalCtaDescription,
  finalPrimaryLabel,
  finalSecondaryLabel
}`;

const SANITY_ABOUT_PAGE_QUERY = `*[
  _type == "aboutPage" &&
  ($preview || coalesce(published, true) == true)
][0] {
  heroTitle,
  heroDescription,
  heroQuote,
  "principles": coalesce(principles, []),
  founderEyebrow,
  founderTitle,
  founderDescription,
  "founderCards": coalesce(founderCards, []),
  processEyebrow,
  processTitle,
  beyondEyebrow,
  beyondTitle,
  beyondDescription,
  "partnerBullets": coalesce(partnerBullets, []),
  philosophyTitle,
  "philosophy": coalesce(philosophy, []),
  ctaTitle,
  ctaPrimaryLabel,
  ctaSecondaryLabel
}`;

function normalizeString(value: string | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeStringArray(values: string[] | undefined) {
  return (values ?? []).map((value) => value.trim()).filter(Boolean);
}

function normalizeRichItems(items: SanityRichItem[] | undefined) {
  return (items ?? [])
    .map((item) => ({
      eyebrow: normalizeString(item.eyebrow) || undefined,
      title: normalizeString(item.title),
      description: normalizeString(item.description),
    }))
    .filter((item) => item.title && item.description);
}

function normalizeFaqItems(items: SanityFaqItem[] | undefined) {
  return (items ?? [])
    .map((item) => ({
      category: normalizeString(item.category) || "general",
      question: normalizeString(item.question),
      answer: normalizeString(item.answer),
      featured: item.featured === true,
    }))
    .filter((item) => item.question && item.answer);
}

function normalizeTiers(items: SanityTier[] | undefined): Tier[] {
  return (items ?? []).reduce<Tier[]>((acc, item) => {
    const name = normalizeString(item.name);
    const price = normalizeString(item.price);
    const description = normalizeString(item.description);
    const features = normalizeStringArray(item.features);
    const ctaLabel = normalizeString(item.cta?.label);
    const ctaHref = normalizeString(item.cta?.href);

    if (!(name && price && description && features.length > 0 && ctaLabel && ctaHref)) {
      return acc;
    }

    const cadence = normalizeString(item.cadence);
    const badge = normalizeString(item.badge);

    acc.push({
      name,
      price,
      ...(cadence ? { cadence } : {}),
      description,
      features,
      cta: {
        label: ctaLabel,
        href: ctaHref,
      },
      ...(item.featured === true ? { featured: true } : {}),
      ...(badge ? { badge } : {}),
    });

    return acc;
  }, []);
}

function normalizeStats(items: SanityStat[] | undefined) {
  return (items ?? [])
    .map((item) => ({
      value: normalizeString(item.value),
      label: normalizeString(item.label),
      hint: normalizeString(item.hint) || undefined,
    }))
    .filter((item) => item.value && item.label);
}

async function fetchSingle<T>(query: string, params: Record<string, unknown>, options: SanityQueryOptions) {
  if (!isSanityConfigured()) {
    return null as T | null;
  }

  const client = getSanityClient({ preview: options.preview });
  try {
    return await client.fetch<T | null>(query, { ...params, preview: options.preview === true });
  } catch {
    return null;
  }
}

async function fetchList<T>(query: string, options: SanityQueryOptions) {
  if (!isSanityConfigured()) {
    return [] as T[];
  }

  const client = getSanityClient({ preview: options.preview });
  try {
    return await client.fetch<T[]>(query, { preview: options.preview === true });
  } catch {
    return [] as T[];
  }
}

export async function listSanityFaqItems(options: SanityQueryOptions = {}): Promise<MarketingFaqItem[]> {
  const items = await fetchList<SanityFaqItem>(SANITY_FAQ_ITEMS_QUERY, options);
  return normalizeFaqItems(items);
}

export async function getSanityServiceDetailContent(
  slug: string,
  options: SanityQueryOptions = {},
): Promise<ServiceDetailContent | null> {
  const item = await fetchSingle<SanityServiceDetail>(SANITY_SERVICE_DETAIL_QUERY, { slug }, options);
  if (!item) {
    return null;
  }

  const builds = normalizeRichItems(item.builds);
  const differentiators = normalizeRichItems(item.differentiators);
  const tiers = normalizeTiers(item.tiers);
  const faq = normalizeFaqItems(item.faq).map(({ question, answer }) => ({ question, answer }));
  const stats = normalizeStats(item.stats);

  return {
    heroEyebrow: normalizeString(item.heroEyebrow) || undefined,
    heroHeadline: normalizeString(item.heroHeadline) || undefined,
    heroDescription: normalizeString(item.heroDescription) || undefined,
    primaryCtaLabel: normalizeString(item.primaryCtaLabel) || undefined,
    secondaryCtaLabel: normalizeString(item.secondaryCtaLabel) || undefined,
    secondaryCtaHref: normalizeString(item.secondaryCtaHref) || undefined,
    builds: builds.length > 0 ? builds : undefined,
    differentiators: differentiators.length > 0 ? differentiators : undefined,
    tiers: tiers.length > 0 ? tiers : undefined,
    faq: faq.length > 0 ? faq : undefined,
    stats: stats.length > 0 ? stats : undefined,
  };
}

export async function getSanityHomePageContent(options: SanityQueryOptions = {}): Promise<HomePageContent | null> {
  const page = await fetchSingle<SanityHomePage>(SANITY_HOME_PAGE_QUERY, {}, options);
  if (!page) {
    return null;
  }

  const pricingTiers = normalizeTiers(page.pricingTiers);

  return {
    heroBadge: normalizeString(page.heroBadge) || undefined,
    heroTitle: normalizeString(page.heroTitle) || undefined,
    heroDescription: normalizeString(page.heroDescription) || undefined,
    capability: {
      eyebrow: normalizeString(page.capabilityEyebrow) || undefined,
      title: normalizeString(page.capabilityTitle) || undefined,
      description: normalizeString(page.capabilityDescription) || undefined,
    },
    featuredBuilds: {
      eyebrow: normalizeString(page.featuredBuildsEyebrow) || undefined,
      title: normalizeString(page.featuredBuildsTitle) || undefined,
      description: normalizeString(page.featuredBuildsDescription) || undefined,
      projectSlugs: normalizeStringArray(page.featuredProjectSlugs),
    },
    shopSpotlight: {
      eyebrow: normalizeString(page.shopEyebrow) || undefined,
      title: normalizeString(page.shopTitle) || undefined,
      description: normalizeString(page.shopDescription) || undefined,
      productSlugs: normalizeStringArray(page.featuredProductSlugs),
    },
    liveSaas: {
      eyebrow: normalizeString(page.liveSaasEyebrow) || undefined,
      title: normalizeString(page.liveSaasTitle) || undefined,
      description: normalizeString(page.liveSaasDescription) || undefined,
      productSlugs: normalizeStringArray(page.featuredLiveSaasSlugs),
    },
    ai: {
      eyebrow: normalizeString(page.aiEyebrow) || undefined,
      title: normalizeString(page.aiTitle) || undefined,
      description: normalizeString(page.aiDescription) || undefined,
      privacyNote: normalizeString(page.aiPrivacyNote) || undefined,
    },
    pricing: {
      eyebrow: normalizeString(page.pricingEyebrow) || undefined,
      title: normalizeString(page.pricingTitle) || undefined,
      description: normalizeString(page.pricingDescription) || undefined,
      tiers: pricingTiers.length > 0 ? pricingTiers : undefined,
    },
    fieldNotes: {
      eyebrow: normalizeString(page.fieldNotesEyebrow) || undefined,
      title: normalizeString(page.fieldNotesTitle) || undefined,
      description: normalizeString(page.fieldNotesDescription) || undefined,
    },
    finalCta: {
      eyebrow: normalizeString(page.finalCtaEyebrow) || undefined,
      title: normalizeString(page.finalCtaTitle) || undefined,
      description: normalizeString(page.finalCtaDescription) || undefined,
      primaryLabel: normalizeString(page.finalPrimaryLabel) || undefined,
      secondaryLabel: normalizeString(page.finalSecondaryLabel) || undefined,
    },
  };
}

export async function getSanityAboutPageContent(options: SanityQueryOptions = {}): Promise<AboutPageContent | null> {
  const page = await fetchSingle<SanityAboutPage>(SANITY_ABOUT_PAGE_QUERY, {}, options);
  if (!page) {
    return null;
  }

  const principles = normalizeRichItems(page.principles).map((item) => ({
    title: item.title,
    description: item.description,
  }));
  const founderCards = normalizeRichItems(page.founderCards);

  return {
    heroTitle: normalizeString(page.heroTitle) || undefined,
    heroDescription: normalizeString(page.heroDescription) || undefined,
    heroQuote: normalizeString(page.heroQuote) || undefined,
    principles: principles.length > 0 ? principles : undefined,
    founder: {
      eyebrow: normalizeString(page.founderEyebrow) || undefined,
      title: normalizeString(page.founderTitle) || undefined,
      description: normalizeString(page.founderDescription) || undefined,
      cards: founderCards.length > 0 ? founderCards : undefined,
    },
    process: {
      eyebrow: normalizeString(page.processEyebrow) || undefined,
      title: normalizeString(page.processTitle) || undefined,
    },
    beyond: {
      eyebrow: normalizeString(page.beyondEyebrow) || undefined,
      title: normalizeString(page.beyondTitle) || undefined,
      description: normalizeString(page.beyondDescription) || undefined,
      bullets: normalizeStringArray(page.partnerBullets),
    },
    philosophy: {
      title: normalizeString(page.philosophyTitle) || undefined,
      items: normalizeStringArray(page.philosophy),
    },
    finalCta: {
      title: normalizeString(page.ctaTitle) || undefined,
      primaryLabel: normalizeString(page.ctaPrimaryLabel) || undefined,
      secondaryLabel: normalizeString(page.ctaSecondaryLabel) || undefined,
    },
  };
}