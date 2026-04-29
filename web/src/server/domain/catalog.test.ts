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

async function seedManagedCatalog() {
  await writeFile(
    databasePath,
    JSON.stringify(
      {
        portfolio_projects: [
          {
            slug: "three-circles",
            name: "Three Circles",
            livePreviewUrl: "https://threecircles.com",
            embeddedPreviewUrl: "https://demo.threecircles.com",
            industry: "Interior Design",
            service: "websites",
            summary: "A premium company website for an interior design brand.",
            metric: "+37% qualified inquiries",
            accent: "from-stone-500 to-amber-700",
            hero_image: { src: "https://cdn.sanity.io/images/test/production/hero.jpg", alt: "Three Circles homepage" },
            detail: {
              client: "Three Circles",
              year: "2026",
              duration: "4 weeks",
              team: "Strategy, Design, Frontend, CMS",
              challenge: ["Generic previous site"],
              strategy: ["Improved structure and proof"],
              build: [{ label: "Platform", value: "Next.js + Sanity" }],
              results: [{ label: "Qualified inquiries", value: "+37%", hint: "First 60 days" }],
              gallery: [{ src: "https://cdn.sanity.io/images/test/production/gallery.jpg", alt: "Service page screenshot" }],
            },
          },
        ],
        products: [
          {
            slug: "three-circles-template",
            name: "Three Circles Template",
            price: "$999",
            livePreviewUrl: "https://three-circles-demo.vercel.app",
            embeddedPreviewUrl: "https://three-circles-demo.vercel.app",
            category: "Interior Designer Company",
            categorySlug: "interior-designer-company",
            type: "SaaS",
            typeSlug: "saas",
            industry: "Service",
            industrySlug: "service",
            tag: "New",
            published: true,
            teaser: "Premium website template for interior design brands.",
            summary: "A polished website template built for premium service businesses.",
            audience: "Interior design studios",
            previewVariant: "marketing",
            includes: ["Homepage", "Services page"],
            stack: ["Next.js", "Sanity"],
            highlights: [{ label: "Pages", value: "12" }],
            image: { src: "https://cdn.sanity.io/images/test/production/product.jpg", alt: "Three Circles template preview" },
          },
        ],
      },
      null,
      2
    ),
    "utf8"
  );
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
    await seedManagedCatalog();

    const portfolio = await listPublicPortfolio();
    const categories = await listPublicShopCategories();
    const products = await listPublicShopProducts({ category: "interior-designer-company" });
    const project = await getPublicPortfolioProject("three-circles");
    const product = await getPublicShopProduct("three-circles-template");

    assert.ok(portfolio.length > 0);
    assert.equal(project?.slug, "three-circles");
    assert.equal(categories.some((category) => category.slug === "interior-designer-company"), true);
    assert.ok(products.length > 0);
    assert.equal(product?.slug, "three-circles-template");
  });
});