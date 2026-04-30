import "server-only";

import type {
  ManagedPortfolioRecord,
  ManagedProductRecord,
  ManagedServiceRecord,
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
    challenge?: string[];
    strategy?: string[];
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
  previewVariant?: ManagedProductRecord["previewVariant"];
  includes?: string[];
  stack?: string[];
  highlights?: SanityKeyValue[];
  image?: SanityImage;
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
    "challenge": coalesce(challenge, []),
    "strategy": coalesce(strategy, []),
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
  previewVariant,
  "includes": coalesce(includes, []),
  "stack": coalesce(stack, []),
  "highlights": coalesce(highlights, []),
  "image": {
    "url": mainImage.asset->url,
    "alt": coalesce(mainImage.alt, mainImageAlt, name, title)
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

function normalizeString(value: string | undefined, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function normalizeStringArray(values: string[] | undefined) {
  return (values ?? []).map((value) => value.trim()).filter(Boolean);
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
  mcp: "mcp-servers",
  "mcp-server": "mcp-servers",
  "mcp-servers": "mcp-servers",
  automation: "automation",
  automations: "automation",
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
    challenge: normalizeStringArray(detail.challenge),
    strategy: normalizeStringArray(detail.strategy),
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
    metric: normalizeString(item.metric, "Measured impact"),
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
  const highlights = normalizeKeyValueArray(item.highlights);

  return {
    slug,
    name,
    price: normalizeString(item.price, "$0"),
    livePreviewUrl: normalizeString(item.livePreviewUrl) || undefined,
    embeddedPreviewUrl: normalizeString(item.embeddedPreviewUrl) || undefined,
    category,
    categorySlug: normalizeString(item.categorySlug, slugify(category, "templates")),
    type,
    typeSlug: normalizeString(item.typeSlug, slugify(type, "website-product")),
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
    previewVariant: item.previewVariant ?? "marketing",
    includes: normalizeStringArray(item.includes),
    stack: normalizeStringArray(item.stack),
    highlights,
    image: normalizeImage(item.image, null),
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

async function fetchCatalogEntries<T>(query: string, options: SanityQueryOptions) {
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