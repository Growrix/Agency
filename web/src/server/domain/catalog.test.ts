import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, expect, it } from "vitest";
import {
  getPublicPortfolioProject,
  getPublicService,
  getPublicShopProduct,
  listPublicPortfolio,
  listPublicServices,
  listPublicShopCategories,
  listPublicShopProducts,
} from "./catalog.ts";

const dataDirectory = path.join(process.cwd(), ".data");
const databasePath = path.join(dataDirectory, "agency-db.json");

async function resetDatabase() {
  await mkdir(dataDirectory, { recursive: true });
  await rm(databasePath, { force: true });
}

describe.sequential("catalog domain", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  it("lists the seeded public services and details", async () => {
    const services = await listPublicServices();
    expect(services.length).toBeGreaterThan(0);
    expect(await getPublicService("websites")).toMatchObject({ slug: "websites" });
  });

  it("lists portfolio and product catalogs", async () => {
    const portfolio = await listPublicPortfolio();
    const categories = await listPublicShopCategories();
    const products = await listPublicShopProducts({ category: "ready-websites" });

    expect(portfolio.length).toBeGreaterThan(0);
    expect(await getPublicPortfolioProject("lumora-studio")).toMatchObject({ slug: "lumora-studio" });
    expect(categories.some((category) => category.slug === "ready-websites")).toBe(true);
    expect(products.length).toBeGreaterThan(0);
    expect(await getPublicShopProduct("booking-stripe-bundle")).toMatchObject({ slug: "booking-stripe-bundle" });
  });
});