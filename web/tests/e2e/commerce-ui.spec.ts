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

async function getJsonWithRetry<T>(request: APIRequestContext, url: string, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await request.get(url);
      if (!response.ok()) {
        throw new Error(`Request failed: ${url} -> ${response.status()}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
      if (attempt === attempts) {
        throw error;
      }
    }
  }

  throw lastError ?? new Error(`Request failed after retries: ${url}`);
}

async function getFirstPublicProductSlug(request: APIRequestContext) {
  let payload = await getJsonWithRetry<{ data?: Array<{ slug: string }> }>(
    request,
    "/api/v1/shop/products",
  );
  let slug = payload.data?.[0]?.slug;

  if (!slug) {
    await seedPlaywrightProductIfMissing();
    payload = await getJsonWithRetry<{ data?: Array<{ slug: string }> }>(
      request,
      "/api/v1/shop/products",
    );
    slug = payload.data?.[0]?.slug;
  }

  expect(slug).toBeTruthy();
  return slug as string;
}

async function getFirstPublicPortfolioSlug(request: APIRequestContext) {
  const payload = await getJsonWithRetry<{ data?: Array<{ slug: string; name: string }> }>(
    request,
    "/api/v1/portfolio",
  );
  return payload.data?.[0] ?? null;
}

test("checkout placeholders remain visible", async ({ page, request }) => {
  const productSlug = await getFirstPublicProductSlug(request);
  await page.goto(`/checkout?product=${productSlug}`, { waitUntil: "domcontentloaded" });

  const closeCart = page.getByRole("button", { name: /close cart/i });
  if (await closeCart.isVisible().catch(() => false)) {
    await closeCart.click();
  }

  const nameField = page.getByLabel("Full name *");
  const emailField = page.getByLabel("Email address *");

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
    const response = await page.goto(`/shop/${slug}`, { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBeTruthy();

    const main = page.locator("main");
    if (!(await main.isVisible().catch(() => false))) {
      await page.reload({ waitUntil: "domcontentloaded" });
    }
    await expect(main).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/page could not be found/i)).toHaveCount(0);

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