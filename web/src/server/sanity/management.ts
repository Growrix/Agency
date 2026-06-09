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

function htmlBusinessProfileTemplateDocumentId(slug: string) {
  return `htmlBusinessProfileTemplate.${slug}`;
}

function normalizeHtmlBusinessProfileTemplateSlug(slug: string) {
  return slug.replace(/^html-business-profile-/, "");
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
    embeddedPreviewUrl: record.embeddedPreviewUrl,
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
    features: record.features ?? [],
    variants: (record.variants ?? []).map((variant) => ({
      slug: variant.slug,
      tierName: variant.tier_name,
      title: variant.title,
      price: variant.price,
      fulfillmentType: variant.fulfillment_type,
      includes: variant.includes,
      comparisonPoints: variant.comparison_points ?? [],
      recommended: variant.recommended ?? false,
    })),
    faqs: (record.faqs ?? []).map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
    relatedProductSlugs: record.related_product_slugs ?? [],
    relatedServiceSlugs: record.related_service_slugs ?? [],
    customizationUpsells: (record.customization_upsells ?? []).map((upsell) => ({
      title: upsell.title,
      description: upsell.description,
      ctaLabel: upsell.cta_label,
      ctaHref: upsell.cta_href,
    })),
    previewVariant: record.previewVariant,
    includes: record.includes,
    inScope: record.inScope ?? [],
    outOfScope: record.outOfScope ?? [],
    enhancementPlan: record.enhancementPlan ?? [],
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

export async function upsertSanityHtmlBusinessProfileTemplate(record: ManagedProductRecord) {
  if (!isSanityWriteConfigured()) {
    return false;
  }

  const client = getSanityClient({ preview: true });
  const normalizedSlug = normalizeHtmlBusinessProfileTemplateSlug(record.slug);
  const profileMatch = /^profile-(\d+)-/i.exec(normalizedSlug);
  const parsedProfileNumber = profileMatch ? Number.parseInt(profileMatch[1] ?? "", 10) : undefined;
  const profileNumber = Number.isFinite(parsedProfileNumber) ? parsedProfileNumber : undefined;

  await client.createOrReplace({
    _id: htmlBusinessProfileTemplateDocumentId(normalizedSlug),
    _type: "htmlBusinessProfileTemplate",
    name: record.name,
    slug: { _type: "slug", current: normalizedSlug },
    profileNumber,
    teaser: record.teaser,
    summary: record.summary,
    audience: record.audience,
    features: record.features ?? [],
    variants: (record.variants ?? []).map((variant) => ({
      slug: variant.slug,
      tierName: variant.tier_name,
      title: variant.title,
      price: variant.price,
      fulfillmentType: variant.fulfillment_type,
      includes: variant.includes,
      comparisonPoints: variant.comparison_points ?? [],
      recommended: variant.recommended ?? false,
    })),
    faqs: (record.faqs ?? []).map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
    relatedProductSlugs: record.related_product_slugs ?? [],
    relatedServiceSlugs: record.related_service_slugs ?? [],
    customizationUpsells: (record.customization_upsells ?? []).map((upsell) => ({
      title: upsell.title,
      description: upsell.description,
      ctaLabel: upsell.cta_label,
      ctaHref: upsell.cta_href,
    })),
    includes: record.includes,
    inScope: record.inScope ?? [],
    outOfScope: record.outOfScope ?? [],
    enhancementPlan: record.enhancementPlan ?? [],
    stack: record.stack,
    highlights: record.highlights,
    category: record.type,
    categorySlug: record.typeSlug,
    published: record.published ?? true,
    price: record.price,
    orderRank: 100,
    livePreviewUrl: record.livePreviewUrl,
    embeddedPreviewUrl: record.embeddedPreviewUrl,
    previewImageAlt: record.image?.alt,
  });

  return true;
}

export async function deleteSanityHtmlBusinessProfileTemplate(slug: string) {
  if (!isSanityWriteConfigured()) {
    return false;
  }

  const client = getSanityClient({ preview: true });
  const normalizedSlug = normalizeHtmlBusinessProfileTemplateSlug(slug);
  await client.delete(htmlBusinessProfileTemplateDocumentId(normalizedSlug));
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
    livePreviewUrl: record.livePreviewUrl,
    embeddedPreviewUrl: record.embeddedPreviewUrl,
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
    deliveryStory: record.detail?.deliveryStory,
    process: record.detail?.process ?? [],
    challenge: record.detail?.challenge ?? [],
    strategy: record.detail?.strategy ?? [],
    integrations: record.detail?.integrations ?? [],
    seo: record.detail?.seo ?? [],
    standards: record.detail?.standards ?? [],
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
