import "server-only";

import type { ManagedPortfolioRecord, ManagedProductRecord, ManagedServiceRecord } from "@/server/data/schema";
import { getSanityClient, isSanityConfigured } from "@/server/sanity/client";

function isSanityWriteConfigured() {
  return isSanityConfigured() && Boolean(process.env.SANITY_API_TOKEN);
}

function shopItemDocumentId(slug: string) {
  return `shopItem.${slug}`;
}

function caseStudyDocumentId(slug: string) {
  return `caseStudy.${slug}`;
}

function servicePageDocumentId(slug: string) {
  return `servicePage.${slug}`;
}

export async function upsertSanityShopItem(record: ManagedProductRecord) {
  if (!isSanityWriteConfigured()) {
    return false;
  }

  const client = getSanityClient({ preview: true });
  await client.createOrReplace({
    _id: shopItemDocumentId(record.slug),
    _type: "shopItem",
    name: record.name,
    slug: { _type: "slug", current: record.slug },
    price: record.price,
    livePreviewUrl: record.livePreviewUrl,
    categoryLabel: record.category,
    categorySlug: record.categorySlug,
    type: record.type,
    typeSlug: record.typeSlug,
    industry: record.industry,
    industrySlug: record.industrySlug,
    tag: record.tag,
    published: record.published ?? true,
    rating: record.rating,
    reviewCount: record.reviewCount,
    salesCount: record.salesCount,
    teaser: record.teaser,
    summary: record.summary,
    audience: record.audience,
    previewVariant: record.previewVariant,
    includes: record.includes,
    stack: record.stack,
    highlights: record.highlights,
    mainImageAlt: record.image?.alt,
  });

  return true;
}

export async function deleteSanityShopItem(slug: string) {
  if (!isSanityWriteConfigured()) {
    return false;
  }

  const client = getSanityClient({ preview: true });
  await client.delete(shopItemDocumentId(slug));
  return true;
}

export async function upsertSanityCaseStudy(record: ManagedPortfolioRecord) {
  if (!isSanityWriteConfigured()) {
    return false;
  }

  const client = getSanityClient({ preview: true });
  await client.createOrReplace({
    _id: caseStudyDocumentId(record.slug),
    _type: "caseStudy",
    name: record.name,
    slug: { _type: "slug", current: record.slug },
    industry: record.industry,
    serviceSlug: record.service,
    summary: record.summary,
    metric: record.metric,
    accent: record.accent,
    published: true,
    heroImageAlt: record.hero_image?.alt,
    client: record.detail?.client,
    year: record.detail?.year,
    duration: record.detail?.duration,
    team: record.detail?.team,
    challenge: record.detail?.challenge ?? [],
    strategy: record.detail?.strategy ?? [],
    build: record.detail?.build ?? [],
    results: record.detail?.results ?? [],
  });

  return true;
}

export async function deleteSanityCaseStudy(slug: string) {
  if (!isSanityWriteConfigured()) {
    return false;
  }

  const client = getSanityClient({ preview: true });
  await client.delete(caseStudyDocumentId(slug));
  return true;
}

export async function upsertSanityServicePage(record: ManagedServiceRecord) {
  if (!isSanityWriteConfigured()) {
    return false;
  }

  const client = getSanityClient({ preview: true });
  await client.createOrReplace({
    _id: servicePageDocumentId(record.slug),
    _type: "servicePage",
    title: record.title,
    slug: { _type: "slug", current: record.slug },
    short: record.short_description,
    long: record.description,
    timeline: record.delivery_timeline,
    pillars: record.pillars,
    published: true,
  });

  return true;
}

export async function deleteSanityServicePage(slug: string) {
  if (!isSanityWriteConfigured()) {
    return false;
  }

  const client = getSanityClient({ preview: true });
  await client.delete(servicePageDocumentId(slug));
  return true;
}
