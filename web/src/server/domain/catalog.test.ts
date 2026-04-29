import assert from "node:assert/strict";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
import { SERVICES } from "@/lib/content";
import {
  getPublicPortfolioProject,
  getPublicService,
  getPublicShopProduct,
  listPublicPortfolio,
  listPublicServices,
  listPublicShopCategories,
  listPublicShopProducts,
} from "@/server/domain/catalog";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";
testEnv.AGENCY_DATA_DIRECTORY = path.join(process.cwd(), ".data", "catalog-domain-test");

const dataDirectory = testEnv.AGENCY_DATA_DIRECTORY;
const databasePath = path.join(dataDirectory, "agency-db.json");

async function resetDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  await rm(databasePath, { force: true });
}

describe("catalog domain", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  it("lists the seeded public services and details", async () => {
    const services = await listPublicServices();
    const websites = await getPublicService("websites");

    assert.ok(services.length > 0);
    assert.equal(websites?.slug, "websites");
  });

  it("restores canonical services from stale persisted catalog state", async () => {
    const staleServices = SERVICES.filter((service) => service.slug !== "automation").map((service) => ({
      id: service.slug,
      slug: service.slug,
      title: service.name,
      description: service.long,
      short_description: service.short,
      service_type: service.slug,
      pricing_model: "contact" as const,
      delivery_timeline: service.timeline,
      pillars: [...service.pillars],
    }));

    await writeFile(databasePath, JSON.stringify({ services: staleServices }, null, 2), "utf8");

    const services = await listPublicServices();
    const automation = await getPublicService("automation");

    assert.equal(services.some((service) => service.slug === "automation"), true);
    assert.equal(automation?.title, "Automation");
  });

  it("lists portfolio and product catalogs", async () => {
    const portfolio = await listPublicPortfolio();
    const categories = await listPublicShopCategories();
    const products = await listPublicShopProducts({ category: "ready-websites" });
    const project = await getPublicPortfolioProject("lumora-studio");
    const product = await getPublicShopProduct("booking-stripe-bundle");

    assert.ok(portfolio.length > 0);
    assert.equal(project?.slug, "lumora-studio");
    assert.equal(categories.some((category) => category.slug === "ready-websites"), true);
    assert.ok(products.length > 0);
    assert.equal(product?.slug, "booking-stripe-bundle");
  });
});