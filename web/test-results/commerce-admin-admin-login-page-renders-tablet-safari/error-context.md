# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: commerce-admin.spec.ts >> admin login page renders
- Location: tests\e2e\commerce-admin.spec.ts:27:5

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: page.goto: Test timeout of 45000ms exceeded.
Call log:
  - navigating to "http://127.0.0.1:5000/admin/login", waiting until "domcontentloaded"

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
  13 |   await page.goto(`/checkout?product=${productSlug}`, { waitUntil: "domcontentloaded" });
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
> 28 |   await page.goto("/admin/login", { waitUntil: "domcontentloaded" });
     |              ^ Error: page.goto: Test timeout of 45000ms exceeded.
  29 |   await expect(page.getByRole("heading", { name: "Admin sign in" })).toBeVisible();
  30 |   await expect(page.locator('input[name="email"]')).toBeVisible();
  31 |   await expect(page.locator('input[name="password"]')).toBeVisible();
  32 | });
```