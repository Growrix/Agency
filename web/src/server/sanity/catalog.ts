import "server-only";

import { HTML_BUSINESS_PROFILE_SHOP_CATEGORY } from "@/lib/html-business-profiles";
import { getProductTypeDefinition, PRODUCT_PARENT_CATEGORY_LABELS } from "@/lib/product-taxonomy";
import type {
  ManagedPortfolioRecord,
  ManagedProductRecord,
  ManagedServiceRecord,
  ProductFaqRecord,
  ProductUpsellRecord,
  ProductVariantRecord,
} from "@/server/data/schema";
import type { CaseStudyDetail, StockImage } from "@/lib/site-images";
import { getSanityClient, isSanityConfigured } from "@/server/sanity/client";

type SanityQueryOptions = {
  preview?: boolean;
};

type SanityImage = {
  url?: string;
  alt?: string;
};

type SanityKeyValue = {
  label?: string;
  value?: string;
  hint?: string;
};

type SanityProductVariant = {
  slug?: string;
  tierName?: string;
  title?: string;
  price?: string;
  fulfillmentType?: string;
  includes?: string[];
  comparisonPoints?: string[];
  recommended?: boolean;
};

type SanityFaqItem = {
  question?: string;
  answer?: string;
};

type SanityCustomizationUpsell = {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type SanityCaseStudy = {
  slug?: string;
  name?: string;
  livePreviewUrl?: string;
  embeddedPreviewUrl?: string;
  industry?: string;
  service?: string;
  summary?: string;
  metric?: string;
  accent?: string;
  heroImage?: SanityImage;
  detail?: {
    client?: string;
    year?: string;
    duration?: string;
    team?: string;
    deliveryStory?: string;
    process?: string[];
    challenge?: string[];
    strategy?: string[];
    integrations?: string[];
    seo?: string[];
    standards?: string[];
    build?: SanityKeyValue[];
    results?: SanityKeyValue[];
    gallery?: SanityImage[];
  };
};

type SanityShopItem = {
  slug?: string;
  name?: string;
  price?: string;
  livePreviewUrl?: string;
  embeddedPreviewUrl?: string;
  parentCategoryLabel?: string;
  parentCategorySlug?: string;
  category?: string;
  categorySlug?: string;
  type?: string;
  typeSlug?: string;
  industry?: string;
  industrySlug?: string;
  tag?: string;
  published?: boolean;
  rating?: number;
  reviewCount?: string;
  salesCount?: string;
  teaser?: string;
  summary?: string;
  audience?: string;
  features?: string[];
  variants?: SanityProductVariant[];
  faqs?: SanityFaqItem[];
  relatedProductSlugs?: string[];
  relatedServiceSlugs?: string[];
  customizationUpsells?: SanityCustomizationUpsell[];
  previewVariant?: ManagedProductRecord["previewVariant"];
  includes?: string[];
  inScope?: string[];
  outOfScope?: string[];
  enhancementPlan?: string[];
  stack?: string[];
  highlights?: SanityKeyValue[];
  image?: SanityImage;
  gallery?: SanityImage[];
};

type SanityServicePage = {
  slug?: string;
  title?: string;
  short?: string;
  long?: string;
  typical?: string;
  timeline?: string;
  pillars?: string[];
};

type SanityHtmlBusinessProfileTemplate = {
  slug?: string;
  name?: string;
  price?: string;
  livePreviewUrl?: string;
  embeddedPreviewUrl?: string;
  profileCategoryLabel?: string;
  profileCategorySlug?: string;
  profileNumber?: number;
  tag?: string;
  published?: boolean;
  teaser?: string;
  summary?: string;
  audience?: string;
  features?: string[];
  variants?: SanityProductVariant[];
  faqs?: SanityFaqItem[];
  relatedProductSlugs?: string[];
  relatedServiceSlugs?: string[];
  customizationUpsells?: SanityCustomizationUpsell[];
  previewVariant?: ManagedProductRecord["previewVariant"];
  includes?: string[];
  inScope?: string[];
  outOfScope?: string[];
  enhancementPlan?: string[];
  stack?: string[];
  highlights?: SanityKeyValue[];
  htmlTemplateFileUrl?: string;
  deliveryBundleFileUrl?: string;
  image?: SanityImage;
  gallery?: SanityImage[];
};

const SANITY_CASE_STUDIES_QUERY = `*[
  _type == "caseStudy" &&
  defined(slug.current) &&
  ($preview || coalesce(published, true) == true)
] | order(coalesce(featuredRank, 999), coalesce(_updatedAt, _createdAt) desc) {
  "slug": slug.current,
  "name": coalesce(name, title),
  livePreviewUrl,
  embeddedPreviewUrl,
  industry,
  "service": coalesce(category->slug.current, categorySlug, serviceSlug, servicePage->slug.current, service, "websites"),
  summary,
  metric,
  accent,
  "heroImage": {
    "url": heroImage.asset->url,
    "alt": coalesce(heroImage.alt, heroImageAlt, name, title)
  },
  "detail": {
    client,
    year,
    duration,
    team,
    deliveryStory,
    "process": coalesce(process, []),
    "challenge": coalesce(challenge, []),
    "strategy": coalesce(strategy, []),
    "integrations": coalesce(integrations, []),
    "seo": coalesce(seo, []),
    "standards": coalesce(standards, []),
    "build": coalesce(build, []),
    "results": coalesce(results, []),
    "gallery": coalesce(gallery, [])[]{
      "url": asset->url,
      "alt": coalesce(alt, name, title)
    }
  }
}`;

const SANITY_SHOP_ITEMS_QUERY = `*[
  _type == "shopItem" &&
  defined(slug.current) &&
  ($preview || coalesce(published, true) == true)
] | order(coalesce(featuredRank, 999), coalesce(name, title) asc) {
  "slug": slug.current,
  "name": coalesce(name, title),
  price,
  livePreviewUrl,
  embeddedPreviewUrl,
  parentCategoryLabel,
  parentCategorySlug,
  "category": coalesce(category->title, categoryLabel, category, "Templates"),
  "categorySlug": coalesce(category->slug.current, categorySlug),
  type,
  typeSlug,
  industry,
  industrySlug,
  tag,
  published,
  rating,
  reviewCount,
  salesCount,
  teaser,
  summary,
  audience,
  "features": coalesce(features, []),
  "variants": coalesce(variants, [])[]{
    slug,
    tierName,
    title,
    price,
    fulfillmentType,
    "includes": coalesce(includes, []),
    "comparisonPoints": coalesce(comparisonPoints, []),
    recommended
  },
  "faqs": coalesce(faqs, [])[]{
    question,
    answer
  },
  "relatedProductSlugs": coalesce(relatedProductSlugs, []),
  "relatedServiceSlugs": coalesce(relatedServiceSlugs, []),
  "customizationUpsells": coalesce(customizationUpsells, [])[]{
    title,
    description,
    ctaLabel,
    ctaHref
  },
  previewVariant,
  "includes": coalesce(includes, []),
  "inScope": coalesce(inScope, []),
  "outOfScope": coalesce(outOfScope, []),
  "enhancementPlan": coalesce(enhancementPlan, []),
  "stack": coalesce(stack, []),
  "highlights": coalesce(highlights, []),
  "image": {
    "url": mainImage.asset->url,
    "alt": coalesce(mainImage.alt, mainImageAlt, name, title)
  },
  "gallery": coalesce(gallery, [])[]{
    "url": asset->url,
    "alt": coalesce(alt, name, title)
  }
}`;

const SANITY_SERVICE_PAGES_QUERY = `*[
  _type == "servicePage" &&
  defined(slug.current) &&
  ($preview || coalesce(published, true) == true)
] | order(coalesce(orderRank, 999), coalesce(title, name) asc) {
  "slug": slug.current,
  "title": coalesce(title, name),
  short,
  long,
  typical,
  timeline,
  "pillars": coalesce(pillars, [])
}`;

const SANITY_HTML_BUSINESS_PROFILE_TEMPLATES_QUERY = `*[
  _type == "htmlBusinessProfileTemplate" &&
  defined(slug.current) &&
  ($preview || coalesce(published, true) == true)
] | order(coalesce(orderRank, featuredRank, 999), coalesce(profileNumber, 999), coalesce(name, title) asc) {
  "slug": slug.current,
  "name": coalesce(name, title),
  price,
  livePreviewUrl,
  embeddedPreviewUrl,
  "profileCategoryLabel": coalesce(profileCategoryLabel, category),
  "profileCategorySlug": coalesce(profileCategorySlug, categorySlug),
  profileNumber,
  tag,
  published,
  teaser,
  summary,
  audience,
  "features": coalesce(features, []),
  "variants": coalesce(variants, [])[]{
    slug,
    tierName,
    title,
    price,
    fulfillmentType,
    "includes": coalesce(includes, []),
    "comparisonPoints": coalesce(comparisonPoints, []),
    recommended
  },
  "faqs": coalesce(faqs, [])[]{
    question,
    answer
  },
  "relatedProductSlugs": coalesce(relatedProductSlugs, []),
  "relatedServiceSlugs": coalesce(relatedServiceSlugs, []),
  "customizationUpsells": coalesce(customizationUpsells, [])[]{
    title,
    description,
    ctaLabel,
    ctaHref
  },
  previewVariant,
  "includes": coalesce(includes, []),
  "inScope": coalesce(inScope, []),
  "outOfScope": coalesce(outOfScope, []),
  "enhancementPlan": coalesce(enhancementPlan, []),
  "stack": coalesce(stack, []),
  "highlights": coalesce(highlights, []),
  "htmlTemplateFileUrl": coalesce(htmlTemplateFile.asset->url, templateFile.asset->url),
  "deliveryBundleFileUrl": deliveryBundleFile.asset->url,
  "image": {
    "url": previewImage.asset->url,
    "alt": coalesce(previewImage.alt, previewImageAlt, name, title)
  },
  "gallery": coalesce(gallery, [])[]{
    "url": asset->url,
    "alt": coalesce(alt, name, title)
  }
}`;

function normalizeString(value: string | undefined, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function normalizeStringArray(values: string[] | undefined) {
  return (values ?? []).map((value) => value.trim()).filter(Boolean);
}

function normalizeVariantTierName(value: string | undefined): ProductVariantRecord["tier_name"] {
  const normalized = normalizeString(value, "Standard").toLowerCase();

  if (normalized === "premium") {
    return "Premium";
  }

  if (normalized === "done-for-you" || normalized === "done for you" || normalized === "done_for_you") {
    return "Done-For-You";
  }

  return "Standard";
}

function normalizeVariantFulfillmentType(value: string | undefined): ProductVariantRecord["fulfillment_type"] {
  const normalized = normalizeString(value, "digital_download")
    .toLowerCase()
    .replace(/[^a-z]+/g, "_")
    .replace(/^_+|_+$/g, "");

  if (normalized === "hybrid_support") {
    return "hybrid_support";
  }

  if (normalized === "done_for_you_service" || normalized === "done_for_you") {
    return "done_for_you_service";
  }

  return "digital_download";
}

function normalizeProductVariants(values: SanityProductVariant[] | undefined): ProductVariantRecord[] {
  const variants = (values ?? [])
    .map((value, index) => {
      const tierName = normalizeVariantTierName(value.tierName);
      const title = normalizeString(value.title, tierName);
      const price = normalizeString(value.price);
      const includes = normalizeStringArray(value.includes);

      if (!price || includes.length === 0) {
        return null;
      }

      return {
        slug: normalizeString(value.slug, slugify(tierName, `variant-${index + 1}`)),
        tier_name: tierName,
        title,
        price,
        fulfillment_type: normalizeVariantFulfillmentType(value.fulfillmentType),
        includes,
        comparison_points: normalizeStringArray(value.comparisonPoints),
        recommended: value.recommended === true ? true : undefined,
      } satisfies ProductVariantRecord;
    })
    .filter((value) => value !== null) as ProductVariantRecord[];

  return Array.from(new Map(variants.map((variant) => [variant.slug, variant])).values());
}

function normalizeProductFaqs(values: SanityFaqItem[] | undefined): ProductFaqRecord[] {
  return (values ?? [])
    .map((value) => ({
      question: normalizeString(value.question),
      answer: normalizeString(value.answer),
    }))
    .filter((value) => value.question && value.answer);
}

function normalizeCustomizationUpsells(values: SanityCustomizationUpsell[] | undefined): ProductUpsellRecord[] {
  return (values ?? [])
    .map((value) => ({
      title: normalizeString(value.title),
      description: normalizeString(value.description),
      cta_label: normalizeString(value.ctaLabel),
      cta_href: normalizeString(value.ctaHref),
    }))
    .filter((value) => value.title && value.description && value.cta_label && value.cta_href);
}

function getDefaultHtmlBusinessProfileVariants(name: string): ProductVariantRecord[] {
  return [
    {
      slug: "standard",
      tier_name: "Standard",
      title: `${name} Standard`,
      price: "$19",
      fulfillment_type: "digital_download",
      includes: ["1-page HTML template", "Responsive baseline", "Basic docs"],
      comparison_points: ["Single template", "Basic docs"],
      recommended: true,
    },
    {
      slug: "premium",
      tier_name: "Premium",
      title: `${name} Premium`,
      price: "$49",
      fulfillment_type: "hybrid_support",
      includes: ["3-5 sections", "Color variants", "Contact form UI", "SEO meta setup"],
      comparison_points: ["Extended sections", "Color variants", "SEO meta setup"],
    },
    {
      slug: "done-for-you",
      tier_name: "Done-For-You",
      title: `${name} Done-For-You`,
      price: "$299-$799",
      fulfillment_type: "done_for_you_service",
      includes: ["Custom branding", "Deployment", "Contact form integration"],
      comparison_points: ["Custom branding", "Deployment support", "Integration setup"],
    },
  ];
}

function normalizeImage(image: SanityImage | undefined, fallback: StockImage | null) {
  if (image?.url) {
    return {
      src: image.url,
      alt: normalizeString(image.alt, fallback?.alt ?? "Editorial image"),
    } satisfies StockImage;
  }

  return fallback;
}

function normalizeKeyValueArray(values: SanityKeyValue[] | undefined) {
  return (values ?? [])
    .map((value) => ({
      label: normalizeString(value.label),
      value: normalizeString(value.value),
      hint: normalizeString(value.hint),
    }))
    .filter((value) => value.label && value.value);
}

function slugify(value: string, fallback: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || fallback;
}

const SERVICE_SLUG_ALIASES: Record<string, string> = {
  website: "websites",
  websites: "websites",
  saas: "saas-applications",
  "saas-app": "saas-applications",
  "saas-application": "saas-applications",
  "saas-applications": "saas-applications",
  html: "html-business-profiles",
  "html-profile": "html-business-profiles",
  "html-profiles": "html-business-profiles",
  "html-business-profile": "html-business-profiles",
  "html-business-profiles": "html-business-profiles",
  automation: "automation",
  automations: "automation",
  mobile: "mobile-apps",
  "mobile-app": "mobile-apps",
  "mobile-apps": "mobile-apps",
  seo: "technical-seo",
  "technical-seo": "technical-seo",
};

function normalizeServiceSlug(value: string | undefined) {
  const slug = slugify(normalizeString(value, "websites"), "websites");
  return SERVICE_SLUG_ALIASES[slug] ?? slug;
}

function normalizeCaseStudyDetail(
  slug: string,
  detail: SanityCaseStudy["detail"] | undefined,
): CaseStudyDetail | null {
  const gallery = (detail?.gallery ?? [])
    .map((image) => normalizeImage(image, null))
    .filter((image): image is StockImage => image !== null);

  if (!detail) {
    return null;
  }

  return {
    client: normalizeString(detail.client, "Client"),
    year: normalizeString(detail.year, "TBD"),
    duration: normalizeString(detail.duration, "TBD"),
    team: normalizeString(detail.team, "Growrix OS"),
    deliveryStory: normalizeString(detail.deliveryStory) || undefined,
    process: normalizeStringArray(detail.process),
    challenge: normalizeStringArray(detail.challenge),
    strategy: normalizeStringArray(detail.strategy),
    integrations: normalizeStringArray(detail.integrations),
    seo: normalizeStringArray(detail.seo),
    standards: normalizeStringArray(detail.standards),
    build: normalizeKeyValueArray(detail.build),
    results: normalizeKeyValueArray(detail.results),
    gallery,
  };
}

function normalizeCaseStudy(item: SanityCaseStudy): ManagedPortfolioRecord | null {
  const slug = normalizeString(item.slug);
  const name = normalizeString(item.name);

  if (!slug || !name) {
    return null;
  }

  return {
    slug,
    name,
    livePreviewUrl: normalizeString(item.livePreviewUrl) || undefined,
    embeddedPreviewUrl: normalizeString(item.embeddedPreviewUrl) || undefined,
    industry: normalizeString(item.industry, "Editorial"),
    service: normalizeServiceSlug(item.service),
    summary: normalizeString(item.summary),
    metric: normalizeString(item.metric) || undefined,
    accent: normalizeString(item.accent, "from-teal-500 to-emerald-500"),
    hero_image: normalizeImage(item.heroImage, null),
    detail: normalizeCaseStudyDetail(slug, item.detail),
  };
}

function normalizeProduct(item: SanityShopItem): ManagedProductRecord | null {
  const slug = normalizeString(item.slug);
  const name = normalizeString(item.name);

  if (!slug || !name) {
    return null;
  }

  const category = normalizeString(item.category, "Templates");
  const type = normalizeString(item.type, "Website Product");
  const industry = normalizeString(item.industry, "General");
  const typeSlug = normalizeString(item.typeSlug, slugify(type, "website-product"));
  const typeDefinition = getProductTypeDefinition(typeSlug);
  const parentCategorySlug = normalizeString(
    item.parentCategorySlug,
    typeDefinition?.parentCategorySlug ?? "business-professional",
  );
  const parentCategoryLabel = normalizeString(
    item.parentCategoryLabel,
    PRODUCT_PARENT_CATEGORY_LABELS[parentCategorySlug as keyof typeof PRODUCT_PARENT_CATEGORY_LABELS]
      ?? "Business & Professional",
  );
  const highlights = normalizeKeyValueArray(item.highlights);
  const variants = normalizeProductVariants(item.variants);
  const faqs = normalizeProductFaqs(item.faqs);
  const relatedProductSlugs = normalizeStringArray(item.relatedProductSlugs);
  const relatedServiceSlugs = normalizeStringArray(item.relatedServiceSlugs);
  const customizationUpsells = normalizeCustomizationUpsells(item.customizationUpsells);
  const gallery = (item.gallery ?? [])
    .map((image) => normalizeImage(image, null))
    .filter((image): image is StockImage => image !== null);

  return {
    slug,
    name,
    price: normalizeString(item.price, "$0"),
    livePreviewUrl: normalizeString(item.livePreviewUrl) || undefined,
    embeddedPreviewUrl: normalizeString(item.embeddedPreviewUrl) || undefined,
    parentCategoryLabel,
    parentCategorySlug,
    category,
    categorySlug: normalizeString(item.categorySlug, slugify(category, "templates")),
    type,
    typeSlug,
    industry,
    industrySlug: normalizeString(item.industrySlug, slugify(industry, "general")),
    tag: normalizeString(item.tag) || undefined,
    published: item.published ?? true,
    rating: typeof item.rating === "number" ? item.rating : undefined,
    reviewCount: normalizeString(item.reviewCount) || undefined,
    salesCount: normalizeString(item.salesCount) || undefined,
    teaser: normalizeString(item.teaser),
    summary: normalizeString(item.summary),
    audience: normalizeString(item.audience),
    features: normalizeStringArray(item.features),
    variants: variants.length > 0 ? variants : undefined,
    faqs: faqs.length > 0 ? faqs : undefined,
    related_product_slugs: relatedProductSlugs.length > 0 ? relatedProductSlugs : undefined,
    related_service_slugs: relatedServiceSlugs.length > 0 ? relatedServiceSlugs : undefined,
    customization_upsells: customizationUpsells.length > 0 ? customizationUpsells : undefined,
    previewVariant: item.previewVariant ?? "marketing",
    includes: normalizeStringArray(item.includes),
    inScope: normalizeStringArray(item.inScope),
    outOfScope: normalizeStringArray(item.outOfScope),
    enhancementPlan: normalizeStringArray(item.enhancementPlan),
    stack: normalizeStringArray(item.stack),
    highlights,
    image: normalizeImage(item.image, null),
    gallery,
  };
}

function normalizeHtmlBusinessProfileTemplate(item: SanityHtmlBusinessProfileTemplate): ManagedProductRecord | null {
  const slug = normalizeString(item.slug);
  const name = normalizeString(item.name);

  if (!slug || !name) {
    return null;
  }

  const profileCategory = normalizeString(item.profileCategoryLabel, "Creative Business");
  const profileCategorySlug = normalizeString(item.profileCategorySlug, "creative-business");
  const htmlTemplateUrl = normalizeString(item.htmlTemplateFileUrl) || undefined;
  const livePreviewUrl = normalizeString(item.livePreviewUrl) || htmlTemplateUrl;
  const embeddedPreviewUrl = normalizeString(item.embeddedPreviewUrl) || htmlTemplateUrl;
  const highlights = normalizeKeyValueArray(item.highlights);
  const normalizedStack = normalizeStringArray(item.stack);
  const variants = normalizeProductVariants(item.variants);
  const faqs = normalizeProductFaqs(item.faqs);
  const relatedProductSlugs = normalizeStringArray(item.relatedProductSlugs);
  const relatedServiceSlugs = normalizeStringArray(item.relatedServiceSlugs);
  const customizationUpsells = normalizeCustomizationUpsells(item.customizationUpsells);
  const gallery = (item.gallery ?? [])
    .map((image) => normalizeImage(image, null))
    .filter((image): image is StockImage => image !== null);

  if (highlights.length === 0 && typeof item.profileNumber === "number") {
    highlights.push({ label: "Profile", value: `#${item.profileNumber}`, hint: "Template number" });
  }

  if (highlights.length === 0) {
    highlights.push({ label: "Delivery", value: "Digital", hint: "HTML template" });
  }

  return {
    slug,
    name,
    price: normalizeString(item.price, "$19"),
    livePreviewUrl,
    embeddedPreviewUrl,
    parentCategoryLabel: PRODUCT_PARENT_CATEGORY_LABELS["business-professional"],
    parentCategorySlug: "business-professional",
    category: HTML_BUSINESS_PROFILE_SHOP_CATEGORY.label,
    categorySlug: HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug,
    type: profileCategory,
    typeSlug: slugify(profileCategorySlug, "creative-marketing"),
    industry: profileCategory,
    industrySlug: slugify(profileCategorySlug, "creative-marketing"),
    tag: normalizeString(item.tag) || undefined,
    published: item.published ?? true,
    teaser: normalizeString(item.teaser, "Category-ready HTML business profile template."),
    summary: normalizeString(item.summary, "A digital HTML business profile template available for direct purchase."),
    audience: normalizeString(item.audience, "Businesses that need fast profile website launches."),
    features: normalizeStringArray(item.features),
    variants: variants.length > 0 ? variants : getDefaultHtmlBusinessProfileVariants(name),
    faqs: faqs.length > 0 ? faqs : undefined,
    related_product_slugs: relatedProductSlugs.length > 0 ? relatedProductSlugs : undefined,
    related_service_slugs: relatedServiceSlugs.length > 0 ? relatedServiceSlugs : undefined,
    customization_upsells: customizationUpsells.length > 0 ? customizationUpsells : undefined,
    previewVariant: item.previewVariant ?? "marketing",
    includes: normalizeStringArray(item.includes),
    inScope: normalizeStringArray(item.inScope),
    outOfScope: normalizeStringArray(item.outOfScope),
    enhancementPlan: normalizeStringArray(item.enhancementPlan),
    stack: normalizedStack.length > 0
      ? normalizedStack
      : ["HTML5", "CSS3", "JavaScript"],
    highlights,
    image: normalizeImage(item.image, null),
    gallery,
  };
}

function normalizeService(item: SanityServicePage): ManagedServiceRecord | null {
  const slug = normalizeString(item.slug);
  const title = normalizeString(item.title);

  if (!slug || !title) {
    return null;
  }

  return {
    id: slug,
    slug,
    title,
    description: normalizeString(item.long),
    short_description: normalizeString(item.short),
    service_type: slug,
    pricing_model: "contact",
    delivery_timeline: normalizeString(item.timeline),
    pillars: normalizeStringArray(item.pillars),
  };
}

const SANITY_FETCH_TIMEOUT_MS = 10_000;
const SANITY_MAX_ATTEMPTS = 3;
const SANITY_INITIAL_BACKOFF_MS = 250;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchCatalogEntries<T>(query: string, options: SanityQueryOptions) {
  if (!isSanityConfigured()) {
    return [] as T[];
  }

  const client = getSanityClient({ preview: options.preview });
  let lastError: unknown;

  for (let attempt = 1; attempt <= SANITY_MAX_ATTEMPTS; attempt += 1) {
    try {
      const result = await Promise.race<T[]>([
        client.fetch<T[]>(query, { preview: options.preview === true }),
        new Promise<T[]>((_, reject) =>
          setTimeout(
            () => reject(new Error("sanity_fetch_timeout")),
            SANITY_FETCH_TIMEOUT_MS,
          ),
        ),
      ]);
      return result;
    } catch (error) {
      lastError = error;
      if (attempt < SANITY_MAX_ATTEMPTS) {
        const backoffMs = SANITY_INITIAL_BACKOFF_MS * 2 ** (attempt - 1);
        if (process.env.NODE_ENV !== "test") {
          const reason = error instanceof Error ? error.message : String(error);
          console.warn(
            `[sanity] catalog fetch attempt ${attempt}/${SANITY_MAX_ATTEMPTS} failed (${reason}); retrying in ${backoffMs}ms`,
          );
        }
        await sleep(backoffMs);
      }
    }
  }

  if (process.env.NODE_ENV !== "test") {
    const reason = lastError instanceof Error ? lastError.message : String(lastError);
    console.warn(`[sanity] catalog fetch failed after ${SANITY_MAX_ATTEMPTS} attempts: ${reason}`);
  }
  return [] as T[];
}

export async function listSanityCaseStudies(options: SanityQueryOptions = {}): Promise<ManagedPortfolioRecord[]> {
  const entries = await fetchCatalogEntries<SanityCaseStudy>(SANITY_CASE_STUDIES_QUERY, options);
  return entries.map(normalizeCaseStudy).filter((entry): entry is ManagedPortfolioRecord => entry !== null);
}

export async function getSanityCaseStudyBySlug(
  slug: string,
  options: SanityQueryOptions = {},
): Promise<ManagedPortfolioRecord | null> {
  const entries = await listSanityCaseStudies(options);
  return entries.find((entry) => entry.slug === slug) ?? null;
}

export async function listSanityShopItems(options: SanityQueryOptions = {}): Promise<ManagedProductRecord[]> {
  const entries = await fetchCatalogEntries<SanityShopItem>(SANITY_SHOP_ITEMS_QUERY, options);
  return entries.map(normalizeProduct).filter((entry): entry is ManagedProductRecord => entry !== null);
}

export async function getSanityShopItemBySlug(
  slug: string,
  options: SanityQueryOptions = {},
): Promise<ManagedProductRecord | null> {
  const entries = await listSanityShopItems(options);
  return entries.find((entry) => entry.slug === slug) ?? null;
}

export async function listSanityHtmlBusinessProfileTemplates(
  options: SanityQueryOptions = {},
): Promise<ManagedProductRecord[]> {
  const entries = await fetchCatalogEntries<SanityHtmlBusinessProfileTemplate>(
    SANITY_HTML_BUSINESS_PROFILE_TEMPLATES_QUERY,
    options,
  );
  return entries
    .map(normalizeHtmlBusinessProfileTemplate)
    .filter((entry): entry is ManagedProductRecord => entry !== null);
}

export async function listSanityServicePages(options: SanityQueryOptions = {}): Promise<ManagedServiceRecord[]> {
  const entries = await fetchCatalogEntries<SanityServicePage>(SANITY_SERVICE_PAGES_QUERY, options);
  return entries.map(normalizeService).filter((entry): entry is ManagedServiceRecord => entry !== null);
}

export async function getSanityServicePageBySlug(
  slug: string,
  options: SanityQueryOptions = {},
): Promise<ManagedServiceRecord | null> {
  const entries = await listSanityServicePages(options);
  return entries.find((entry) => entry.slug === slug) ?? null;
}