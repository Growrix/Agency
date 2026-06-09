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
  upsertManagedProduct,
} from "@/server/domain/catalog";

const testEnv = process.env as Record<string, string | undefined>;
testEnv.NODE_ENV = "test";
testEnv.AGENCY_DATA_DIRECTORY = path.join(process.cwd(), ".data", "catalog-domain-test");
testEnv.SANITY_PROJECT_ID = "";
testEnv.SANITY_DATASET = "";
testEnv.SANITY_API_TOKEN = "";

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

  it("keeps html business profiles in the public shop", async () => {
    const htmlProducts = await listPublicShopProducts({ category: "html-business-profiles" });

    assert.ok(htmlProducts.length > 0);
    assert.equal(htmlProducts.every((product) => product.slug.startsWith("html-business-profile-")), true);
  });

  it("seeds anchor catalog products with explicit variants, bundle, and free offers", async () => {
    const products = await listPublicShopProducts();
    const bundle = products.find((product) => product.slug === "business-launch-bundle");
    const freeStarter = products.find((product) => product.slug === "free-conversion-landing-starter");
    const starter = products.find((product) => product.slug === "saas-launchpad-nextjs");
    const emailPack = products.find((product) => product.slug === "email-pack-saas-lifecycle");

    assert.equal(Boolean(bundle), true);
    assert.equal(Boolean(freeStarter), true);
    assert.equal(Boolean(emailPack), true);
    assert.equal(starter?.variants?.length, 3);
    assert.equal(starter?.variants?.some((variant) => variant.tier_name === "Done-For-You"), true);
  });

  it("uses planned pricing tiers for html business profiles and email packs", async () => {
    const htmlProfiles = await listPublicShopProducts({ category: "html-business-profiles" });
    const emailPacks = await listPublicShopProducts({ type: "email-templates" });
    const firstProfile = htmlProfiles[0];
    const firstEmailPack = emailPacks[0];

    assert.equal(Boolean(firstProfile), true);
    assert.equal(firstProfile?.price, "$19");
    assert.equal(firstProfile?.variants?.find((variant) => variant.tier_name === "Premium")?.price, "$49");
    assert.equal(firstProfile?.variants?.find((variant) => variant.tier_name === "Done-For-You")?.price, "$299-$799");

    assert.equal(Boolean(firstEmailPack), true);
    assert.equal(firstEmailPack?.price, "$15");
    assert.equal(firstEmailPack?.variants?.find((variant) => variant.tier_name === "Premium")?.price, "$39");
    assert.equal(firstEmailPack?.variants?.find((variant) => variant.tier_name === "Done-For-You")?.price, "$199-$499");
  });

  it("rejects reserved product slugs that conflict with /products routes", async () => {
    await assert.rejects(
      upsertManagedProduct({
        slug: "free",
        name: "Reserved Slug Product",
        price: "$99",
        livePreviewUrl: "https://example.com/free",
        embeddedPreviewUrl: "https://example.com/free",
        category: "SaaS Templates",
        categorySlug: "saas-templates",
        type: "Next.js Starter",
        typeSlug: "nextjs-starter",
        industry: "SaaS",
        industrySlug: "saas",
        published: true,
        teaser: "Reserved slug test product.",
        summary: "Should fail because reserved /products route segment is blocked.",
        audience: "Test audience",
        previewVariant: "marketing",
        includes: ["Starter files"],
        stack: ["Next.js"],
        highlights: [{ label: "Tier", value: "Test" }],
        image: null,
        gallery: [],
      }),
      /RESERVED_PRODUCT_SLUG/,
    );
  });

  it("rejects slug collisions when two products resolve to the same public product path", async () => {
    await upsertManagedProduct({
      slug: "html-business-profile-collision-demo",
      name: "Collision Base Product",
      price: "$99",
      livePreviewUrl: "https://example.com/base",
      embeddedPreviewUrl: "https://example.com/base",
      category: "SaaS Templates",
      categorySlug: "saas-templates",
      type: "Next.js Starter",
      typeSlug: "nextjs-starter",
      industry: "SaaS",
      industrySlug: "saas",
      published: true,
      teaser: "Base product for collision test.",
      summary: "Creates /products/html-business-profile-collision-demo path as non-html category.",
      audience: "Test audience",
      previewVariant: "marketing",
      includes: ["Starter files"],
      stack: ["Next.js"],
      highlights: [{ label: "Tier", value: "Test" }],
      image: null,
      gallery: [],
    });

    await assert.rejects(
      upsertManagedProduct({
        slug: "collision-demo",
        name: "HTML Collision Product",
        price: "$19",
        livePreviewUrl: "https://example.com/html",
        embeddedPreviewUrl: "https://example.com/html",
        category: "HTML Business Profiles",
        categorySlug: "html-business-profiles",
        type: "Creative & Marketing",
        typeSlug: "creative-marketing",
        industry: "Creative & Marketing",
        industrySlug: "creative-marketing",
        published: true,
        teaser: "HTML profile collision test product.",
        summary: "Should fail because public slug collides with existing product path.",
        audience: "Test audience",
        previewVariant: "marketing",
        includes: ["Template files"],
        stack: ["HTML"],
        highlights: [{ label: "Tier", value: "Test" }],
        image: null,
        gallery: [],
      }),
      /DUPLICATE_PRODUCT_SLUG/,
    );
  });

  it("filters known mock shop products from managed sources", async () => {
    await writeFile(
      databasePath,
      JSON.stringify(
        {
          products: [
            {
              slug: "atelier-marketing-theme",
              name: "Atelier Marketing Theme",
              price: "$790",
              livePreviewUrl: "https://atelier.example.com",
              embeddedPreviewUrl: "https://atelier.example.com",
              category: "Templates",
              categorySlug: "templates",
              type: "Marketing Site",
              typeSlug: "marketing-site",
              industry: "Studios & SaaS",
              industrySlug: "studios-saas",
              published: true,
              teaser: "Mock template",
              summary: "Mock template",
              audience: "Mock audience",
              previewVariant: "marketing",
              includes: ["Homepage"],
              stack: ["Next.js"],
              highlights: [{ label: "Pages", value: "10" }],
              image: null,
              gallery: [],
            },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );

    const products = await listPublicShopProducts();

    assert.equal(products.some((product) => product.slug === "atelier-marketing-theme"), false);
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