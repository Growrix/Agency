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
  return database.services;
}

export async function getPublicService(serviceId: string): Promise<PublicServiceRecord | null> {
  const database = await ensureCatalogSeeded();
  return database.services.find((service) => service.slug === serviceId || service.id === serviceId) ?? null;
}

export async function listPublicPortfolio(): Promise<PublicPortfolioRecord[]> {
  const database = await ensureCatalogSeeded();
  return database.portfolio_projects.map((project) => {
    const publicProject = { ...project };
    delete publicProject.detail;
    return publicProject;
  });
}

export async function getPublicPortfolioProject(slug: string): Promise<PublicPortfolioDetailRecord | null> {
  const database = await ensureCatalogSeeded();
  return database.portfolio_projects.find((project) => project.slug === slug) ?? null;
}

export async function listPublicShopCategories(): Promise<PublicShopCategoryRecord[]> {
  const database = await ensureCatalogSeeded();

  return SHOP_CATEGORY_OPTIONS.map((category) => ({
    slug: category.value,
    name: category.label,
    product_count: database.products.filter((product) => product.published !== false && product.categorySlug === category.value).length,
  }));
}

export async function listPublicShopProducts(filters?: {
  category?: string;
  type?: string;
  industry?: string;
  search?: string;
}) {
  const database = await ensureCatalogSeeded();
  const q = filters?.search?.trim().toLowerCase();

  return database.products.filter((product) => {
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
  const product = database.products.find((item) => item.slug === slug && item.published !== false);
  if (!product) {
    return null;
  }

  return {
    ...product,
    image: getProductImage(product.name) ?? null,
    price_cents: parseUsdPriceToCents(product.price),
  };
}

export async function listManagedServices() {
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

  return nextRecord;
}

export async function deleteManagedService(serviceId: string) {
  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    services: database.services.filter((service) => service.id !== serviceId && service.slug !== serviceId),
  }));
}

export async function listManagedProducts() {
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

  return nextRecord;
}

export async function deleteManagedProduct(productSlug: string) {
  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    products: database.products.filter((product) => product.slug !== productSlug),
  }));
}

export async function listManagedPortfolioProjects() {
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

  return nextRecord;
}

export async function deleteManagedPortfolioProject(projectSlug: string) {
  await ensureCatalogSeeded();
  await writeDatabase((database) => ({
    ...database,
    portfolio_projects: database.portfolio_projects.filter((project) => project.slug !== projectSlug),
  }));
}