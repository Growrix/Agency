import assert from "node:assert/strict";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, it } from "node:test";
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

const dataDirectory = path.join(process.cwd(), ".data");
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