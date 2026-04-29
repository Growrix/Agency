import "server-only";

import { SERVICES, PORTFOLIO } from "@/lib/content";
import {
  CASE_STUDY_DETAILS,
  getPortfolioImage,
  getProductImage,
} from "@/lib/site-images";
import {
  PUBLISHED_SHOP_PRODUCTS,
  SHOP_CATEGORY_OPTIONS,
} from "@/lib/shop";
import type {
  ManagedPortfolioRecord,
  ManagedProductRecord,
  ManagedServiceRecord,
} from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import {
  getSanityCaseStudyBySlug,
  getSanityServicePageBySlug,
  getSanityShopItemBySlug,
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

function getDefaultPortfolio(): ManagedPortfolioRecord[] {
  return PORTFOLIO.map((project) => ({
    ...project,
    hero_image: getPortfolioImage(project.slug) ?? null,
    detail: CASE_STUDY_DETAILS[project.slug] ?? null,
  }));
}

function getDefaultProducts(): ManagedProductRecord[] {
  return PUBLISHED_SHOP_PRODUCTS.map((product) => ({
    ...product,
    image: getProductImage(product.name) ?? null,
  }));
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

function mergePortfolio(fallback: ManagedPortfolioRecord[], cms: ManagedPortfolioRecord[]) {
  if (cms.length === 0) {
    return fallback;
  }

  const merged = new Map(fallback.map((project) => [project.slug, project]));

  for (const project of cms) {
    const previous = merged.get(project.slug);
    merged.set(project.slug, {
      ...(previous ?? project),
      ...project,
      hero_image: project.hero_image ?? previous?.hero_image ?? null,
      detail: project.detail ?? previous?.detail ?? null,
    });
  }

  return Array.from(merged.values());
}

function mergeProducts(fallback: ManagedProductRecord[], cms: ManagedProductRecord[]) {
  if (cms.length === 0) {
    return fallback;
  }

  const merged = new Map(fallback.map((product) => [product.slug, product]));

  for (const product of cms) {
    const previous = merged.get(product.slug);
    merged.set(product.slug, {
      ...(previous ?? product),
      ...product,
      includes: product.includes.length > 0 ? product.includes : previous?.includes ?? [],
      stack: product.stack.length > 0 ? product.stack : previous?.stack ?? [],
      highlights: product.highlights.length > 0 ? product.highlights : previous?.highlights ?? [],
      image: product.image ?? previous?.image ?? null,
    });
  }

  return Array.from(merged.values());
}

async function ensureCatalogSeeded() {
  const database = await readDatabase();
  if (database.services.length || database.portfolio_projects.length || database.products.length) {
    return database;
  }

  const seeded = {
    ...database,
    services: getDefaultServices(),
    portfolio_projects: getDefaultPortfolio(),
    products: getDefaultProducts(),
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
  return mergePortfolio(database.portfolio_projects, cmsProjects).map((project) => ({
    slug: project.slug,
    name: project.name,
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
  const fallback = database.portfolio_projects.find((project) => project.slug === slug) ?? null;
  const cms = await getSanityCaseStudyBySlug(slug).catch(() => null);

  if (!cms) {
    return fallback;
  }

  return {
    ...(fallback ?? cms),
    ...cms,
    hero_image: cms.hero_image ?? fallback?.hero_image ?? null,
    detail: cms.detail ?? fallback?.detail ?? null,
  };
}

export async function listPublicShopCategories(): Promise<PublicShopCategoryRecord[]> {
  const database = await ensureCatalogSeeded();
  const cmsProducts = await listSanityShopItems().catch(() => []);
  const products = mergeProducts(database.products, cmsProducts);

  const categoryMap = new Map<string, string>();

  for (const product of products) {
    if (product.published === false) {
      continue;
    }

    categoryMap.set(product.categorySlug, product.category);
  }

  if (categoryMap.size === 0) {
    for (const category of SHOP_CATEGORY_OPTIONS) {
      categoryMap.set(category.value, category.label);
    }
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
  const products = mergeProducts(database.products, cmsProducts);
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
  const fallback = database.products.find((item) => item.slug === slug && item.published !== false) ?? null;
  const cms = await getSanityShopItemBySlug(slug).catch(() => null);
  const product = cms?.published === false
    ? null
    : cms
      ? {
          ...(fallback ?? cms),
          ...cms,
          includes: cms.includes.length > 0 ? cms.includes : fallback?.includes ?? [],
          stack: cms.stack.length > 0 ? cms.stack : fallback?.stack ?? [],
          highlights: cms.highlights.length > 0 ? cms.highlights : fallback?.highlights ?? [],
          image: cms.image ?? fallback?.image ?? null,
        }
      : fallback;

  if (!product) {
    return null;
  }

  return {
    ...product,
    image: product.image ?? getProductImage(product.name) ?? null,
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