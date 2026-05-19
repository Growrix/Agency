import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { expect, test, type APIRequestContext } from "@playwright/test";

const E2E_SEED_PRODUCT = {
  slug: "e2e-mobile-sample-template",
  name: "E2E Mobile Sample Template",
  price: "$999",
  livePreviewUrl: "https://example.com/e2e-template",
  embeddedPreviewUrl: "https://example.com/e2e-template",
  category: "Templates",
  categorySlug: "templates",
  type: "Marketing Site",
  typeSlug: "marketing-site",
  industry: "Service",
  industrySlug: "service",
  published: true,
  teaser: "E2E seed template used for checkout and mobile layout validation.",
  summary: "A deterministic product fixture to keep commerce browser tests stable.",
  audience: "QA validation",
  previewVariant: "marketing",
  includes: ["Homepage"],
  stack: ["Next.js"],
  highlights: [{ label: "Pages", value: "1" }],
  image: null,
};

async function seedPlaywrightProductIfMissing() {
  const candidateDataDirectories = new Set<string>([
    path.join(process.cwd(), ".data"),
    path.join(process.cwd(), ".data", "playwright"),
    path.join(process.cwd(), "web", ".data"),
    path.join(process.cwd(), "web", ".data", "playwright"),
    path.join(process.cwd(), "On Going DOCS", "Growrixos", "web", ".data"),
    path.join(process.cwd(), "On Going DOCS", "Growrixos", "web", ".data", "playwright"),
  ]);

  const configuredDataDirectory = process.env.AGENCY_DATA_DIRECTORY?.trim();
  if (configuredDataDirectory) {
    candidateDataDirectories.add(configuredDataDirectory);
  }

  for (const dataDirectory of candidateDataDirectories) {
    const databasePath = path.join(dataDirectory, "agency-db.json");
    await mkdir(dataDirectory, { recursive: true });

    let database: Record<string, unknown> = {};

    try {
      const content = await readFile(databasePath, "utf8");
      database = JSON.parse(content) as Record<string, unknown>;
    } catch {
      database = {};
    }

    const existingProducts = Array.isArray(database.products) ? database.products : [];
    const hasSeed = existingProducts.some(
      (product) =>
        typeof product === "object" &&
        product !== null &&
        "slug" in product &&
        (product as { slug?: string }).slug === E2E_SEED_PRODUCT.slug,
    );

    if (hasSeed) {
      continue;
    }

    const nextDatabase = {
      ...database,
      products: [E2E_SEED_PRODUCT, ...existingProducts],
    };

    await writeFile(databasePath, JSON.stringify(nextDatabase, null, 2), "utf8");
  }
}

async function getFirstPublicProductSlug(request: APIRequestContext) {
  const response = await request.get("/api/v1/shop/products");
  expect(response.ok()).toBeTruthy();

  let payload = (await response.json()) as { data?: Array<{ slug: string }> };
  let slug = payload.data?.[0]?.slug;

  if (!slug) {
    await seedPlaywrightProductIfMissing();
    const retryResponse = await request.get("/api/v1/shop/products");
    expect(retryResponse.ok()).toBeTruthy();
    payload = (await retryResponse.json()) as { data?: Array<{ slug: string }> };
    slug = payload.data?.[0]?.slug;
  }

  expect(slug).toBeTruthy();
  return slug as string;
}

async function getFirstPublicPortfolioSlug(request: APIRequestContext) {
  const response = await request.get("/api/v1/portfolio");
  expect(response.ok()).toBeTruthy();
  const payload = (await response.json()) as { data?: Array<{ slug: string; name: string }> };
  return payload.data?.[0] ?? null;
}

test("checkout placeholders remain visible", async ({ page, request }) => {
  const productSlug = await getFirstPublicProductSlug(request);
  await page.goto(`/checkout?product=${productSlug}`, { waitUntil: "domcontentloaded" });

  const nameField = page.locator('input[name="customer_name"]');
  const emailField = page.locator('input[name="customer_email"]');

  await expect(nameField).toBeVisible();
  await expect(emailField).toBeVisible();

  const namePlaceholder = await nameField.evaluate((node) => ({
    color: getComputedStyle(node, "::placeholder").color,
    opacity: getComputedStyle(node, "::placeholder").opacity,
  }));

  const emailPlaceholder = await emailField.evaluate((node) => ({
    color: getComputedStyle(node, "::placeholder").color,
    opacity: getComputedStyle(node, "::placeholder").opacity,
  }));

  expect(namePlaceholder.color).not.toBe("rgba(0, 0, 0, 0)");
  expect(emailPlaceholder.color).not.toBe("rgba(0, 0, 0, 0)");
  expect(Number(namePlaceholder.opacity || "0")).toBeGreaterThan(0.9);
  expect(Number(emailPlaceholder.opacity || "0")).toBeGreaterThan(0.9);
});

test("shop product pages do not overflow the mobile viewport", async ({ page, request }) => {
  const productSlug = await getFirstPublicProductSlug(request);

  for (const slug of [productSlug]) {
    await page.goto(`/shop/${slug}`, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const viewport = page.viewportSize();
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);

    const sidebarButton = page.getByRole("link", { name: /Need flexible payment/i });
    await expect(sidebarButton).toBeVisible();
    await sidebarButton.scrollIntoViewIfNeeded();

    const buttonBox = await sidebarButton.boundingBox();
    expect(buttonBox).not.toBeNull();
    expect((buttonBox?.x ?? 0) + (buttonBox?.width ?? 0)).toBeLessThanOrEqual((viewport?.width ?? dimensions.clientWidth) + 1);
  }
});

test("portfolio detail pages render CMS-driven live preview actions without mobile overflow", async ({ page, request }) => {
  const portfolioRecord = await getFirstPublicPortfolioSlug(request);
  test.skip(!portfolioRecord, "No public portfolio records are available in this environment.");

  if (!portfolioRecord) {
    return;
  }

  await page.goto(`/portfolio/${portfolioRecord.slug}`, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1, name: new RegExp(portfolioRecord.name, "i") })).toBeVisible();
  await expect(page.getByRole("link", { name: /Visit live site/i })).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
});