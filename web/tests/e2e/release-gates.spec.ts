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

  const adminApi = await request.get("/api/v1/admin/analytics");
  expect(adminApi.status()).toBe(401);

  const adminPageResponse = await request.get("/admin", { maxRedirects: 0 });
  expect([307, 308]).toContain(adminPageResponse.status());
  expect(adminPageResponse.headers()["location"] ?? "").toContain("/admin/login");
});

test("health endpoints respond and homepage loads within smoke threshold", async ({ request, page }) => {
  const health = await request.get("/api/health");
  const ready = await request.get("/api/ready");
  expect(health.ok()).toBeTruthy();
  expect(ready.ok()).toBeTruthy();

  const started = Date.now();
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const duration = Date.now() - started;
  // Homepage embeds multiple HTML preview iframes; allow headroom for SSR + first paint in CI.
  expect(duration).toBeLessThan(15_000);
});

test("preview iframe budget stays constrained on homepage and category page", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const homePreviewIframeCount = await page.evaluate(() =>
    document.querySelectorAll('iframe[src*="/api/website-templates-html-preview/"]').length,
  );
  expect(homePreviewIframeCount).toBeLessThanOrEqual(2);

  await page.goto("/digital-products/category/website-templates-html-preview", { waitUntil: "domcontentloaded" });
  const categoryPreviewIframeCount = await page.evaluate(() =>
    document.querySelectorAll('iframe[src*="/api/website-templates-html-preview/"]').length,
  );
  expect(categoryPreviewIframeCount).toBeLessThanOrEqual(3);
});

test("technical SEO baseline metadata exists on key category route", async ({ page }) => {
  await page.goto("/digital-products/category/website-templates-html-preview", { waitUntil: "domcontentloaded" });

  const canonicalHref = await page
    .locator('head link[rel="canonical"]')
    .first()
    .getAttribute("href");
  expect(canonicalHref).toContain("/digital-products/category/website-templates-html-preview");

  const hasCollectionPageJsonLd = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    return scripts.some((script) => {
      try {
        const parsed = JSON.parse(script.textContent || "null");
        const entries = Array.isArray(parsed) ? parsed : [parsed];
        return entries.some(
          (entry) =>
            entry &&
            typeof entry === "object" &&
            entry["@type"] === "CollectionPage" &&
            String(entry.url || "").includes("/digital-products/category/website-templates-html-preview"),
        );
      } catch {
        return false;
      }
    });
  });
  expect(hasCollectionPageJsonLd).toBeTruthy();
});