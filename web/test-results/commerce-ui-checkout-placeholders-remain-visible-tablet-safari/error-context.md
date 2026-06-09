# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: commerce-ui.spec.ts >> checkout placeholders remain visible
- Location: tests\e2e\commerce-ui.spec.ts:104:5

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: page.goto: Test timeout of 45000ms exceeded.
Call log:
  - navigating to "http://127.0.0.1:5000/checkout?product=html-business-profile-profile-01-brew-and-bean", waiting until "domcontentloaded"

```

# Test source

```ts
  6   |   slug: "e2e-mobile-sample-template",
  7   |   name: "E2E Mobile Sample Template",
  8   |   price: "$999",
  9   |   livePreviewUrl: "https://example.com/e2e-template",
  10  |   embeddedPreviewUrl: "https://example.com/e2e-template",
  11  |   category: "Templates",
  12  |   categorySlug: "templates",
  13  |   type: "Marketing Site",
  14  |   typeSlug: "marketing-site",
  15  |   industry: "Service",
  16  |   industrySlug: "service",
  17  |   published: true,
  18  |   teaser: "E2E seed template used for checkout and mobile layout validation.",
  19  |   summary: "A deterministic product fixture to keep commerce browser tests stable.",
  20  |   audience: "QA validation",
  21  |   previewVariant: "marketing",
  22  |   includes: ["Homepage"],
  23  |   stack: ["Next.js"],
  24  |   highlights: [{ label: "Pages", value: "1" }],
  25  |   image: null,
  26  | };
  27  | 
  28  | async function seedPlaywrightProductIfMissing() {
  29  |   const candidateDataDirectories = new Set<string>([
  30  |     path.join(process.cwd(), ".data"),
  31  |     path.join(process.cwd(), ".data", "playwright"),
  32  |     path.join(process.cwd(), "web", ".data"),
  33  |     path.join(process.cwd(), "web", ".data", "playwright"),
  34  |     path.join(process.cwd(), "On Going DOCS", "Growrixos", "web", ".data"),
  35  |     path.join(process.cwd(), "On Going DOCS", "Growrixos", "web", ".data", "playwright"),
  36  |   ]);
  37  | 
  38  |   const configuredDataDirectory = process.env.AGENCY_DATA_DIRECTORY?.trim();
  39  |   if (configuredDataDirectory) {
  40  |     candidateDataDirectories.add(configuredDataDirectory);
  41  |   }
  42  | 
  43  |   for (const dataDirectory of candidateDataDirectories) {
  44  |     const databasePath = path.join(dataDirectory, "agency-db.json");
  45  |     await mkdir(dataDirectory, { recursive: true });
  46  | 
  47  |     let database: Record<string, unknown> = {};
  48  | 
  49  |     try {
  50  |       const content = await readFile(databasePath, "utf8");
  51  |       database = JSON.parse(content) as Record<string, unknown>;
  52  |     } catch {
  53  |       database = {};
  54  |     }
  55  | 
  56  |     const existingProducts = Array.isArray(database.products) ? database.products : [];
  57  |     const hasSeed = existingProducts.some(
  58  |       (product) =>
  59  |         typeof product === "object" &&
  60  |         product !== null &&
  61  |         "slug" in product &&
  62  |         (product as { slug?: string }).slug === E2E_SEED_PRODUCT.slug,
  63  |     );
  64  | 
  65  |     if (hasSeed) {
  66  |       continue;
  67  |     }
  68  | 
  69  |     const nextDatabase = {
  70  |       ...database,
  71  |       products: [E2E_SEED_PRODUCT, ...existingProducts],
  72  |     };
  73  | 
  74  |     await writeFile(databasePath, JSON.stringify(nextDatabase, null, 2), "utf8");
  75  |   }
  76  | }
  77  | 
  78  | async function getFirstPublicProductSlug(request: APIRequestContext) {
  79  |   const response = await request.get("/api/v1/shop/products");
  80  |   expect(response.ok()).toBeTruthy();
  81  | 
  82  |   let payload = (await response.json()) as { data?: Array<{ slug: string }> };
  83  |   let slug = payload.data?.[0]?.slug;
  84  | 
  85  |   if (!slug) {
  86  |     await seedPlaywrightProductIfMissing();
  87  |     const retryResponse = await request.get("/api/v1/shop/products");
  88  |     expect(retryResponse.ok()).toBeTruthy();
  89  |     payload = (await retryResponse.json()) as { data?: Array<{ slug: string }> };
  90  |     slug = payload.data?.[0]?.slug;
  91  |   }
  92  | 
  93  |   expect(slug).toBeTruthy();
  94  |   return slug as string;
  95  | }
  96  | 
  97  | async function getFirstPublicPortfolioSlug(request: APIRequestContext) {
  98  |   const response = await request.get("/api/v1/portfolio");
  99  |   expect(response.ok()).toBeTruthy();
  100 |   const payload = (await response.json()) as { data?: Array<{ slug: string; name: string }> };
  101 |   return payload.data?.[0] ?? null;
  102 | }
  103 | 
  104 | test("checkout placeholders remain visible", async ({ page, request }) => {
  105 |   const productSlug = await getFirstPublicProductSlug(request);
> 106 |   await page.goto(`/checkout?product=${productSlug}`, { waitUntil: "domcontentloaded" });
      |              ^ Error: page.goto: Test timeout of 45000ms exceeded.
  107 | 
  108 |   const nameField = page.locator('input[name="customer_name"]');
  109 |   const emailField = page.locator('input[name="customer_email"]');
  110 | 
  111 |   await expect(nameField).toBeVisible();
  112 |   await expect(emailField).toBeVisible();
  113 | 
  114 |   const namePlaceholder = await nameField.evaluate((node) => ({
  115 |     color: getComputedStyle(node, "::placeholder").color,
  116 |     opacity: getComputedStyle(node, "::placeholder").opacity,
  117 |   }));
  118 | 
  119 |   const emailPlaceholder = await emailField.evaluate((node) => ({
  120 |     color: getComputedStyle(node, "::placeholder").color,
  121 |     opacity: getComputedStyle(node, "::placeholder").opacity,
  122 |   }));
  123 | 
  124 |   expect(namePlaceholder.color).not.toBe("rgba(0, 0, 0, 0)");
  125 |   expect(emailPlaceholder.color).not.toBe("rgba(0, 0, 0, 0)");
  126 |   expect(Number(namePlaceholder.opacity || "0")).toBeGreaterThan(0.9);
  127 |   expect(Number(emailPlaceholder.opacity || "0")).toBeGreaterThan(0.9);
  128 | });
  129 | 
  130 | test("shop product pages do not overflow the mobile viewport", async ({ page, request }) => {
  131 |   const productSlug = await getFirstPublicProductSlug(request);
  132 | 
  133 |   for (const slug of [productSlug]) {
  134 |     await page.goto(`/shop/${slug}`, { waitUntil: "domcontentloaded" });
  135 |     await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  136 | 
  137 |     const viewport = page.viewportSize();
  138 |     const dimensions = await page.evaluate(() => ({
  139 |       clientWidth: document.documentElement.clientWidth,
  140 |       scrollWidth: document.documentElement.scrollWidth,
  141 |     }));
  142 | 
  143 |     expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  144 | 
  145 |     const sidebarButton = page.getByRole("link", { name: /Need flexible payment/i });
  146 |     await expect(sidebarButton).toBeVisible();
  147 |     await sidebarButton.scrollIntoViewIfNeeded();
  148 | 
  149 |     const buttonBox = await sidebarButton.boundingBox();
  150 |     expect(buttonBox).not.toBeNull();
  151 |     expect((buttonBox?.x ?? 0) + (buttonBox?.width ?? 0)).toBeLessThanOrEqual((viewport?.width ?? dimensions.clientWidth) + 1);
  152 |   }
  153 | });
  154 | 
  155 | test("portfolio detail pages render CMS-driven live preview actions without mobile overflow", async ({ page, request }) => {
  156 |   const portfolioRecord = await getFirstPublicPortfolioSlug(request);
  157 |   test.skip(!portfolioRecord, "No public portfolio records are available in this environment.");
  158 | 
  159 |   if (!portfolioRecord) {
  160 |     return;
  161 |   }
  162 | 
  163 |   await page.goto(`/portfolio/${portfolioRecord.slug}`, { waitUntil: "domcontentloaded" });
  164 |   await expect(page.getByRole("heading", { level: 1, name: new RegExp(portfolioRecord.name, "i") })).toBeVisible();
  165 |   await expect(page.getByRole("link", { name: /Visit live site/i })).toBeVisible();
  166 | 
  167 |   const dimensions = await page.evaluate(() => ({
  168 |     clientWidth: document.documentElement.clientWidth,
  169 |     scrollWidth: document.documentElement.scrollWidth,
  170 |   }));
  171 | 
  172 |   expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  173 | });
```