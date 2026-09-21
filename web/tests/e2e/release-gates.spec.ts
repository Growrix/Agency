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

  const homeNoRedirect = await request.get("/", { maxRedirects: 0 });
  expect(homeNoRedirect.status()).toBe(200);
  const homeLocation = homeNoRedirect.headers()["location"] ?? "";
  expect(homeLocation).not.toMatch(/clerk\.accounts\.dev/);

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
  expect(canonicalHref?.endsWith("/")).toBe(false);

  const response = await request.get("/services/technical-seo");
  const html = await response.text();
  expect(html).toContain('"@type":"Service"');
  expect(html).toContain('"@type":"FAQPage"');
  expect(html).toContain('"@type":"BreadcrumbList"');
  expect(html).toContain('property="og:url"');
  expect(html).toContain('href="/pricing"');
  expect(html).toContain('href="/portfolio"');
  expect(html).toContain('href="/contact"');
});

test("public service slugs expose Service FAQ and Breadcrumb JSON-LD", async ({ request }) => {
  const slugs = [
    "websites",
    "saas-applications",
    "mobile-apps",
    "ai-business-systems",
    "automation",
    "technical-seo",
  ];

  for (const slug of slugs) {
    const html = await (await request.get(`/services/${slug}`)).text();
    expect(html, slug).toContain('"@type":"Service"');
    expect(html, slug).toContain('"@type":"FAQPage"');
    expect(html, slug).toContain('"@type":"BreadcrumbList"');
  }
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

test("homepage ships SSR LCP poster hints", async ({ request }) => {
  const response = await request.get("/");
  const html = await response.text();

  expect(html).toMatch(/rel="preload"[^>]+as="image"[^>]+\/previews\/posters\//);
  expect(html).toMatch(/data-testid="home-hero-lcp-poster-mobile"|data-testid="home-hero-lcp-poster-desktop"/);
  expect(html).toMatch(/\/previews\/posters\/[^"]+-mobile\.png/);
});

test("homepage initial HTML has brand-first title and crawlable body content without JS", async ({ request }) => {
  const response = await request.get("/");
  const html = await response.text();

  // Brand-first <title>; the layout title.template does not apply to the same segment.
  expect(html).toMatch(/<title>Growrix OS \| [^<]+<\/title>/);

  // Below-fold sections are deferred client-side; the server-rendered summary must keep
  // real copy and internal links in the initial HTML for crawlers.
  expect(html).toContain("data-home-crawlable-summary");
  expect(html).toContain('href="/services/websites"');
  expect(html).toContain('href="/services/technical-seo"');
  expect(html).toContain('href="/digital-products/category/website-templates-html-preview"');
  expect(html).toContain('href="/digital-products/category/html-business-profiles"');
});

test("filtered catalog URLs are noindex and key pages use keyword-led titles", async ({ request }) => {
  const listing = await (await request.get("/digital-products")).text();
  expect(listing).toMatch(/<title>HTML Website Templates &amp; Business Profiles \| /);
  expect(listing).not.toContain("noindex");

  // Filter facets duplicate the category landing pages: keep them out of the index, keep links followable.
  const filtered = await (await request.get("/digital-products?category=html-business-profiles")).text();
  expect(filtered).toMatch(/<meta name="robots" content="noindex, follow"/);
  expect(filtered).toContain('<link rel="canonical" href="https://www.growrixos.com/digital-products"');

  const service = await (await request.get("/services/technical-seo")).text();
  expect(service).toMatch(/<title>Technical SEO Setup Services \| /);

  const sitemap = await (await request.get("/sitemap.xml")).text();
  // Only real dates: no blanket "now" stamps on every URL.
  expect(sitemap.match(/<lastmod>/g)?.length ?? 0).toBeLessThan(5);
});

test("mobile bottom nav chat is a crawlable link", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const chatLink = page.getByTestId("mobile-bottom-nav-chat");
  await expect(chatLink).toHaveAttribute("href", "/ai-concierge");
  await expect(chatLink).toHaveRole("link");
});

test("robots.txt and sitemap.xml are reachable", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  const robotsBody = await robots.text();
  expect(robotsBody).toMatch(/User-[Aa]gent:\s*\*/);
  // Next body must not emit Host: (Google-unsupported). Cloudflare may still
  // prepend managed Content-Signal blocks at the edge in production.
  expect(robotsBody).not.toMatch(/^Host:\s*/m);

  if (!robotsBody.includes("Disallow: /") || robotsBody.includes("Allow: /")) {
    expect(robotsBody).toContain("Sitemap:");
    for (const path of ["/admin", "/dashboard", "/api/", "/sign-in", "/cart"]) {
      expect(robotsBody).toContain(`Disallow: ${path}`);
    }
  }

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