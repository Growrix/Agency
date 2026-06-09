# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: commerce-admin.spec.ts >> checkout fallback flow captures an order
- Location: tests\e2e\commerce-admin.spec.ts:10:5

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: page.goto: Test timeout of 45000ms exceeded.
Call log:
  - navigating to "http://127.0.0.1:5000/checkout?product=html-business-profile-profile-01-brew-and-bean", waiting until "domcontentloaded"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main"
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]: Booking discovery calls for Q2
      - generic [ref=e8]:
        - img [ref=e9]
        - text: Avg response under 2 business hours
    - generic [ref=e11]:
      - link "WhatsApp" [ref=e12] [cursor=pointer]:
        - /url: https://wa.me/8801986925425
        - img [ref=e13]
        - text: WhatsApp
      - 'link "Spring bundle: 20% off MCP starters →" [ref=e15] [cursor=pointer]':
        - /url: /products
  - banner [ref=e16]:
    - generic [ref=e17]:
      - link "Growrix logo" [ref=e18] [cursor=pointer]:
        - /url: /
        - img "Growrix logo" [ref=e19]
      - navigation [ref=e20]:
        - link "Home" [ref=e21] [cursor=pointer]:
          - /url: /
        - button "Services" [ref=e23]:
          - text: Services
          - img [ref=e24]
        - link "Products" [ref=e26] [cursor=pointer]:
          - /url: /products
        - button "Solutions" [ref=e28]:
          - text: Solutions
          - img [ref=e29]
        - link "Portfolio" [ref=e31] [cursor=pointer]:
          - /url: /portfolio
        - link "Pricing" [ref=e32] [cursor=pointer]:
          - /url: /pricing
        - link "Blog" [ref=e33] [cursor=pointer]:
          - /url: /blog
        - link "About" [ref=e34] [cursor=pointer]:
          - /url: /about
        - link "Contact" [ref=e35] [cursor=pointer]:
          - /url: /contact
      - generic [ref=e36]:
        - button "Open chat" [ref=e37]:
          - img [ref=e38]
        - link "Browse products" [ref=e40] [cursor=pointer]:
          - /url: /products
          - img [ref=e41]
        - button "Toggle theme" [ref=e43]:
          - img [ref=e44]
        - link "Book Appointment" [ref=e46] [cursor=pointer]:
          - /url: /book-appointment
  - main [ref=e47]:
    - generic [ref=e49]:
      - link "Back to product" [ref=e50] [cursor=pointer]:
        - /url: /products/html-business-profile-profile-01-brew-and-bean
        - img [ref=e51]
        - text: Back to product
      - generic [ref=e54]:
        - generic [ref=e55]: Checkout preview
        - heading "Checkout for Profile 01 - Brew And Bean" [level=1] [ref=e56]
```

# Test source

```ts
  1  | import { expect, test, type APIRequestContext } from "@playwright/test";
  2  | 
  3  | async function getFirstProductSlug(request: APIRequestContext): Promise<string | null> {
  4  |   const response = await request.get("/api/v1/shop/products");
  5  |   if (!response.ok()) return null;
  6  |   const payload = (await response.json()) as { data?: Array<{ slug: string }> };
  7  |   return payload.data?.[0]?.slug ?? null;
  8  | }
  9  | 
  10 | test("checkout fallback flow captures an order", async ({ page, request }) => {
  11 |   const productSlug = await getFirstProductSlug(request);
  12 |   test.skip(!productSlug, "No products available in the current data environment");
> 13 |   await page.goto(`/checkout?product=${productSlug}`, { waitUntil: "domcontentloaded" });
     |              ^ Error: page.goto: Test timeout of 45000ms exceeded.
  14 |   await page.getByLabel("Full name *").fill("Checkout User");
  15 |   await page.getByLabel("Email *").fill("checkout@example.com");
  16 |   await page.getByRole("button", { name: "Continue to payment" }).click();
  17 | 
  18 |   const manualFallback = page.getByText(/Stripe is not configured yet, so the team will follow up manually/);
  19 |   const redirectedToStripe = page.waitForURL(/stripe\.com|checkout|session/i, { timeout: 10_000 }).then(() => true).catch(() => false);
  20 | 
  21 |   const fallbackVisible = await manualFallback.isVisible().catch(() => false);
  22 |   const didRedirect = fallbackVisible ? false : await redirectedToStripe;
  23 | 
  24 |   expect(fallbackVisible || didRedirect).toBeTruthy();
  25 | });
  26 | 
  27 | test("admin login page renders", async ({ page }) => {
  28 |   await page.goto("/admin/login", { waitUntil: "domcontentloaded" });
  29 |   await expect(page.getByRole("heading", { name: "Admin sign in" })).toBeVisible();
  30 |   await expect(page.locator('input[name="email"]')).toBeVisible();
  31 |   await expect(page.locator('input[name="password"]')).toBeVisible();
  32 | });
```