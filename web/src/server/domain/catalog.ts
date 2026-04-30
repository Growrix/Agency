import "server-only";

import { SERVICES } from "@/lib/content";
import type {
  ManagedPortfolioRecord,
  ManagedProductRecord,
  ManagedServiceRecord,
} from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import {
  getSanityServicePageBySlug,
  listSanityCaseStudies,
  listSanityServicePages,
  listSanityShopItems,
} from "@/server/sanity/catalog";
import {
  deleteSanityCaseStudy,
  deleteSanityServicePage,
  deleteSanityShopItem,
  upsertSanityCaseStudy,
  upsertSanityServicePage,
  upsertSanityShopItem,
} from "@/server/sanity/management";

export type PublicServiceRecord = ManagedServiceRecord;

export type PublicPortfolioRecord = Omit<ManagedPortfolioRecord, "detail">;

export type PublicPortfolioDetailRecord = ManagedPortfolioRecord;

export type PublicShopCategoryRecord = {
  slug: string;
  name: string;
  product_count: number;
};

export type PublicShopProductRecord = ManagedProductRecord & { price_cents: number };

const LEGACY_MOCK_PORTFOLIO_SLUGS = new Set([
  "lumora-studio",
  "tideline-health",
  "helix-research-portal",
  "glasswing-onboarding",
  "northcrest-mcp",
  "beacon-route-engine",
]);

const LEGACY_MOCK_PRODUCT_SLUGS = new Set([
  "concierge-mcp-starter",
  "atelier-marketing-theme",
  "operator-dashboard-kit",
  "inquiry-to-crm-automation",
  "mobile-app-landing-pack",
  "booking-stripe-bundle",
  "new-product",
]);

const LEGACY_MOCK_PORTFOLIO_PLACEHOLDER_SLUGS = new Set(["new-project"]);

function isLikelyPlaceholderUrl(value: string | undefined) {
  if (!value) {
    return false;
  }

  return /demo\.example\.com|project\.example\.com/i.test(value);
}

function isPlaceholderProduct(product: ManagedProductRecord) {
  if (LEGACY_MOCK_PRODUCT_SLUGS.has(product.slug)) {
    return true;
  }

  if (isLikelyPlaceholderUrl(product.livePreviewUrl) || isLikelyPlaceholderUrl(product.embeddedPreviewUrl)) {
    return true;
  }

  return (
    product.name.trim().toLowerCase() === "new product" &&
    product.summary.trim().toLowerCase() === "product summary"
  );
}

function isPlaceholderPortfolioProject(project: ManagedPortfolioRecord) {
  if (LEGACY_MOCK_PORTFOLIO_PLACEHOLDER_SLUGS.has(project.slug)) {
    return true;
  }

  if (isLikelyPlaceholderUrl(project.livePreviewUrl) || isLikelyPlaceholderUrl(project.embeddedPreviewUrl)) {
    return true;
  }

  return project.name.trim().toLowerCase() === "new project";
}

function parseUsdPriceToCents(price: string) {
  const normalized = price.replace(/[^\d.]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? Math.round(parsed * 100) : 0;
}

function getDefaultServices(): ManagedServiceRecord[] {
  return SERVICES.map((service) => ({
    id: service.slug,
    slug: service.slug,
    title: service.name,
    description: service.long,
    short_description: service.short,
    service_type: service.slug,
    pricing_model: "contact",
    delivery_timeline: service.timeline,
    pillars: [...service.pillars],
  }));
}

function getEffectiveServices(databaseServices: ManagedServiceRecord[]) {
  return mergeServices(getDefaultServices(), databaseServices);
}

function stripLegacyMockCatalog(database: Awaited<ReturnType<typeof readDatabase>>) {
  return {
    ...database,
    portfolio_projects: database.portfolio_projects.filter((project) => !LEGACY_MOCK_PORTFOLIO_SLUGS.has(project.slug)),
    products: database.products.filter((product) => !LEGACY_MOCK_PRODUCT_SLUGS.has(product.slug)),
  };
}

function mergeServices(fallback: ManagedServiceRecord[], cms: ManagedServiceRecord[]) {
  if (cms.length === 0) {
    return fallback;
  }

  const merged = new Map(fallback.map((service) => [service.slug, service]));

  for (const service of cms) {
    const previous = merged.get(service.slug);
    merged.set(service.slug, {
      ...(previous ?? service),
      ...service,
      pillars: service.pillars.length > 0 ? service.pillars : previous?.pillars ?? [],
    });
  }

  return Array.from(merged.values());
}

async function ensureCatalogSeeded() {
  const database = stripLegacyMockCatalog(await readDatabase());
  if (database.services.length) {
    return database;
  }

  const seeded = {
    ...database,
    services: getDefaultServices(),
  };

  await writeDatabase(() => seeded);
  return seeded;
}

export async function listPublicServices(): Promise<PublicServiceRecord[]> {
  const database = await ensureCatalogSeeded();
  const fallbackServices = getEffectiveServices(database.services);
  const cmsServices = await listSanityServicePages().catch(() => []);
  return mergeServices(fallbackServices, cmsServices);
}

export async function getPublicService(serviceId: string): Promise<PublicServiceRecord | null> {
  const database = await ensureCatalogSeeded();
  const fallbackServices = getEffectiveServices(database.services);
  const fallback = fallbackServices.find((service) => service.slug === serviceId || service.id === serviceId) ?? null;
  const cms = await getSanityServicePageBySlug(serviceId).catch(() => null);

  if (!cms) {
    return fallback;
  }

  return {
    ...(fallback ?? cms),
    ...cms,
    pillars: cms.pillars.length > 0 ? cms.pillars : fallback?.pillars ?? [],
  };
}

export async function listPublicPortfolio(): Promise<PublicPortfolioRecord[]> {
  const database = await ensureCatalogSeeded();
  const cmsProjects = await listSanityCaseStudies().catch(() => []);
  const publicProjects = cmsProjects.length > 0 ? cmsProjects : database.portfolio_projects;

  return publicProjects
    .filter((project) => !isPlaceholderPortfolioProject(project))
    .map((project) => ({
    slug: project.slug,
    name: project.name,
    livePreviewUrl: project.livePreviewUrl,
    embeddedPreviewUrl: project.embeddedPreviewUrl,
    industry: project.industry,
    service: project.service,
    summary: project.summary,
    metric: project.metric,
    accent: project.accent,
    hero_image: project.hero_image,
  }));
}

export async function getPublicPortfolioProject(slug: string): Promise<PublicPortfolioDetailRecord | null> {
  const database = await ensureCatalogSeeded();
  const cmsProjects = await listSanityCaseStudies().catch(() => []);

  if (cmsProjects.length > 0) {
    const cmsProject = cmsProjects.find((project) => project.slug === slug) ?? null;
    return cmsProject && !isPlaceholderPortfolioProject(cmsProject) ? cmsProject : null;
  }

  const fallback = database.portfolio_projects.find((project) => project.slug === slug) ?? null;
  return fallback && !isPlaceholderPortfolioProject(fallback) ? fallback : null;
}

export async function listPublicShopCategories(): Promise<PublicShopCategoryRecord[]> {
  const database = await ensureCatalogSeeded();
  const cmsProducts = await listSanityShopItems().catch(() => []);
  const products = (cmsProducts.length > 0 ? cmsProducts : database.products).filter(
    (product) => !isPlaceholderProduct(product),
  );

  const categoryMap = new Map<string, string>();

  for (const product of products) {
    if (product.published === false) {
      continue;
    }

    categoryMap.set(product.categorySlug, product.category);
  }

  return Array.from(categoryMap.entries()).map(([slug, name]) => ({
    slug,
    name,
    product_count: products.filter((product) => product.published !== false && product.categorySlug === slug).length,
  }));
}

export async function listPublicShopProducts(filters?: {
  category?: string;
  type?: string;
  industry?: string;
  search?: string;
}) {
  const database = await ensureCatalogSeeded();
  const cmsProducts = await listSanityShopItems().catch(() => []);
  const products = (cmsProducts.length > 0 ? cmsProducts : database.products).filter(
    (product) => !isPlaceholderProduct(product),
  );
  const q = filters?.search?.trim().toLowerCase();

  return products.filter((product) => {
    if (product.published === false) {
      return false;
    }

    if (filters?.category && product.categorySlug !== filters.category) {
      return false;
    }

    if (filters?.type && product.typeSlug !== filters.type) {
      return false;
    }

    if (filters?.industry && product.industrySlug !== filters.industry) {
      return false;
    }

    if (
      q &&
      !`${product.name} ${product.category} ${product.type} ${product.industry} ${product.summary}`
        .toLowerCase()
        .includes(q)
    ) {
      return false;
    }

    return true;
  }).map((product) => ({
    ...product,
    price_cents: parseUsdPriceToCents(product.price),
  }));
}

export async function getPublicShopProduct(slug: string): Promise<PublicShopProductRecord | null> {
  const database = await ensureCatalogSeeded();
  const cmsProducts = await listSanityShopItems().catch(() => []);

  const product = cmsProducts.length > 0
    ? cmsProducts.find((item) => item.slug === slug && item.published !== false) ?? null
    : database.products.find((item) => item.slug === slug && item.published !== false) ?? null;

  if (!product || isPlaceholderProduct(product)) {
    return null;
  }

  return {
    ...product,
    image: product.image ?? null,
    price_cents: parseUsdPriceToCents(product.price),
  };
}

export async function listManagedServices() {
  const cmsServices = await listSanityServicePages({ preview: true }).catch(() => []);
  if (cmsServices.length > 0) {
    return cmsServices;
  }

  const database = await ensureCatalogSeeded();
  return database.services;
}

export async function upsertManagedService(input: ManagedServiceRecord) {
  const nextRecord = {
    ...input,
    pillars: input.pillars.filter(Boolean),
  };

  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    services: [nextRecord, ...database.services.filter((service) => service.id !== input.id && service.slug !== input.slug)],
  }));

  await upsertSanityServicePage(nextRecord).catch(() => false);

  return nextRecord;
}

export async function deleteManagedService(serviceId: string) {
  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    services: database.services.filter((service) => service.id !== serviceId && service.slug !== serviceId),
  }));

  await deleteSanityServicePage(serviceId).catch(() => false);
}

export async function listManagedProducts() {
  const cmsProducts = await listSanityShopItems({ preview: true }).catch(() => []);
  if (cmsProducts.length > 0) {
    return cmsProducts;
  }

  const database = await ensureCatalogSeeded();
  return database.products;
}

export async function upsertManagedProduct(input: ManagedProductRecord) {
  const nextRecord = {
    ...input,
    includes: input.includes.filter(Boolean),
    stack: input.stack.filter(Boolean),
    highlights: input.highlights.filter((item) => item.label && item.value),
  };

  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    products: [nextRecord, ...database.products.filter((product) => product.slug !== input.slug)],
  }));

  await upsertSanityShopItem(nextRecord).catch(() => false);

  return nextRecord;
}

export async function deleteManagedProduct(productSlug: string) {
  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    products: database.products.filter((product) => product.slug !== productSlug),
  }));

  await deleteSanityShopItem(productSlug).catch(() => false);
}

export async function listManagedPortfolioProjects() {
  const cmsProjects = await listSanityCaseStudies({ preview: true }).catch(() => []);
  if (cmsProjects.length > 0) {
    return cmsProjects;
  }

  const database = await ensureCatalogSeeded();
  return database.portfolio_projects;
}

export async function upsertManagedPortfolioProject(input: ManagedPortfolioRecord) {
  const nextRecord = {
    ...input,
    hero_image: input.hero_image ?? null,
    detail: input.detail ?? null,
  };

  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    portfolio_projects: [nextRecord, ...database.portfolio_projects.filter((project) => project.slug !== input.slug)],
  }));

  await upsertSanityCaseStudy(nextRecord).catch(() => false);

  return nextRecord;
}

export async function deleteManagedPortfolioProject(projectSlug: string) {
  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    portfolio_projects: database.portfolio_projects.filter((project) => project.slug !== projectSlug),
  }));

  await deleteSanityCaseStudy(projectSlug).catch(() => false);
}