import { expect, test } from "@playwright/test";

async function getFirstPublicProductSlug(request: Parameters<typeof test>[0]["request"]) {
  const response = await request.get("/api/v1/shop/products");
  expect(response.ok()).toBeTruthy();
  const payload = (await response.json()) as { data?: Array<{ slug: string }> };
  const slug = payload.data?.[0]?.slug;
  expect(slug).toBeTruthy();
  return slug as string;
}

async function getFirstPublicPortfolioSlug(request: Parameters<typeof test>[0]["request"]) {
  const response = await request.get("/api/v1/portfolio");
  expect(response.ok()).toBeTruthy();
  const payload = (await response.json()) as { data?: Array<{ slug: string; name: string }> };
  const record = payload.data?.[0];
  expect(record?.slug).toBeTruthy();
  return record as { slug: string; name: string };
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
  await page.goto(`/portfolio/${portfolioRecord.slug}`, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1, name: new RegExp(portfolioRecord.name, "i") })).toBeVisible();
  await expect(page.getByRole("link", { name: /Visit live site/i })).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
});