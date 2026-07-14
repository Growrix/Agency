import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home and contact pages pass accessibility smoke checks", async ({ page }) => {
  test.setTimeout(120_000);
  for (const route of ["/", "/contact"]) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const results = await new AxeBuilder({ page })
      .disableRules(["color-contrast", "definition-list", "region"])
      // Embedded HTML template previews are separate deliverables; smoke a11y covers the app shell only.
      .exclude("iframe")
      .analyze();
    const criticalViolations = results.violations.filter((violation) => violation.impact === "critical");
    expect(criticalViolations).toEqual([]);
  }
});

test("security headers and auth protection are present", async ({ request }) => {
  const response = await request.get("/");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-frame-options"]).toBe("DENY");
  expect(response.headers()["strict-transport-security"]).toContain("max-age=31536000");

  const adminApi = await request.get("/api/v1/admin/analytics", { maxRedirects: 0 });
  expect([401, 307, 308]).toContain(adminApi.status());
  if ([307, 308].includes(adminApi.status())) {
    const location = adminApi.headers()["location"] ?? "";
    expect(location).toMatch(/\/admin\/login|\/sign-in/);
  }

  const adminPageResponse = await request.get("/admin", { maxRedirects: 0 });
  expect([307, 308]).toContain(adminPageResponse.status());
  expect(adminPageResponse.headers()["location"] ?? "").toMatch(/\/admin\/login|\/sign-in/);
});

test("health endpoints respond and homepage loads within smoke threshold", async ({ request, page }) => {
  test.setTimeout(120_000);
  const health = await request.get("/api/health");
  const ready = await request.get("/api/ready");
  expect(health.ok()).toBeTruthy();
  expect(ready.ok()).toBeTruthy();

  const started = Date.now();
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const duration = Date.now() - started;
  // Local Playwright server cold start adds headroom; production ISR target remains sub-4s.
  expect(duration).toBeLessThan(5_000);
});

test("homepage resource budget stays within performance guardrails", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const resourceCount = await page.evaluate(
    () => performance.getEntriesByType("resource").length,
  );
  expect(resourceCount).toBeLessThanOrEqual(30);
});

test("homepage renders without client runtime errors", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);

  expect(pageErrors).toEqual([]);
  await expect(page.locator(".hero-section")).toBeVisible();
});

test("preview iframe budget stays constrained on homepage and category page", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const homePreviewIframeCount = await page.evaluate(() =>
    document.querySelectorAll(
      'iframe[src*="/previews/website-templates-html/"], iframe[src*="/api/website-templates-html-preview/"], iframe[src*="/previews/html-business-profiles/"]',
    ).length,
  );
  expect(homePreviewIframeCount).toBeLessThanOrEqual(2);

  await page.goto("/digital-products/category/website-templates-html-preview", { waitUntil: "domcontentloaded" });
  const categoryPreviewIframeCount = await page.evaluate(() =>
    document.querySelectorAll(
      'iframe[src*="/previews/website-templates-html/"], iframe[src*="/api/website-templates-html-preview/"]',
    ).length,
  );
  expect(categoryPreviewIframeCount).toBeLessThanOrEqual(3);
});

test("technical SEO baseline metadata exists on key category route", async ({ page, request }) => {
  await page.goto("/digital-products/category/website-templates-html-preview", { waitUntil: "domcontentloaded" });

  const canonicalHref = await page
    .locator('head link[rel="canonical"]')
    .first()
    .getAttribute("href");
  expect(canonicalHref).toContain("/digital-products/category/website-templates-html-preview");

  const categoryResponse = await request.get("/digital-products/category/website-templates-html-preview");
  const categoryHtml = await categoryResponse.text();
  expect(categoryHtml).toContain("CollectionPage");
  expect(categoryHtml).toContain("BreadcrumbList");
  expect(categoryHtml).toContain("/digital-products/category/website-templates-html-preview");
});

test("homepage keeps canonical and Organization schema", async ({ page, request }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const canonicalHref = await page
    .locator('head link[rel="canonical"]')
    .first()
    .getAttribute("href");
  expect(canonicalHref).toContain("/");

  const homeResponse = await request.get("/");
  const homeHtml = await homeResponse.text();
  expect(homeHtml).toContain("WebSite");
  expect(homeHtml).toContain("Organization");
  expect(homeHtml).not.toContain("SearchAction");
});

test("services route exposes self-canonical metadata and Service schema", async ({ page, request }) => {
  await page.goto("/services/technical-seo", { waitUntil: "domcontentloaded" });

  const canonicalHref = await page
    .locator('head link[rel="canonical"]')
    .first()
    .getAttribute("href");
  expect(canonicalHref).toContain("/services/technical-seo");

  const response = await request.get("/services/technical-seo");
  const html = await response.text();
  expect(html).toContain('"@type":"Service"');
  expect(html).toContain('property="og:url"');
});

test("blog index exposes self-canonical metadata", async ({ page }) => {
  await page.goto("/blog", { waitUntil: "domcontentloaded" });

  const canonicalHref = await page
    .locator('head link[rel="canonical"]')
    .first()
    .getAttribute("href");
  expect(canonicalHref).toContain("/blog");
});

test("portfolio index exposes self-canonical metadata", async ({ page }) => {
  await page.goto("/portfolio", { waitUntil: "domcontentloaded" });

  const canonicalHref = await page
    .locator('head link[rel="canonical"]')
    .first()
    .getAttribute("href");
  expect(canonicalHref).toContain("/portfolio");
});

test("faq page exposes FAQPage schema and self-canonical metadata", async ({ page, request }) => {
  await page.goto("/faq", { waitUntil: "domcontentloaded" });

  const canonicalHref = await page
    .locator('head link[rel="canonical"]')
    .first()
    .getAttribute("href");
  expect(canonicalHref).toContain("/faq");

  const response = await request.get("/faq");
  const html = await response.text();
  expect(html).toContain("FAQPage");
});

test("robots.txt and sitemap.xml are reachable", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("User-Agent");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("<urlset");
  expect(await sitemap.text()).toContain("/services/technical-seo");
});

test("transactional routes advertise noindex robots metadata", async ({ request }) => {
  for (const route of ["/sign-in", "/sign-up", "/cart", "/complete-account", "/live-chat"]) {
    const response = await request.get(route);
    const html = await response.text();
    expect(html).toMatch(/noindex/i);
  }
});

test("legacy legal URLs redirect to canonical legal routes", async ({ request }) => {
  const privacy = await request.get("/privacy-policy", { maxRedirects: 0 });
  expect([301, 308]).toContain(privacy.status());
  expect(privacy.headers()["location"] ?? "").toContain("/legal/privacy");

  const terms = await request.get("/terms-of-service", { maxRedirects: 0 });
  expect([301, 308]).toContain(terms.status());
  expect(terms.headers()["location"] ?? "").toContain("/legal/terms");
});