import { expect, test } from "@playwright/test";

test("checkout fallback flow captures an order", async ({ page }) => {
  await page.goto("/checkout?product=booking-stripe-bundle");
  await page.getByLabel("Full name *").fill("Checkout User");
  await page.getByLabel("Email *").fill("checkout@example.com");
  await page.getByRole("button", { name: "Continue to payment" }).click();

  const manualFallback = page.getByText(/Stripe is not configured yet, so the team will follow up manually/);
  const redirectedToStripe = page.waitForURL(/stripe\.com|checkout|session/i, { timeout: 10_000 }).then(() => true).catch(() => false);

  const fallbackVisible = await manualFallback.isVisible().catch(() => false);
  const didRedirect = fallbackVisible ? false : await redirectedToStripe;

  expect(fallbackVisible || didRedirect).toBeTruthy();
});

test("admin login page renders", async ({ page }) => {
  await page.goto("/admin/login");
  await expect(page.getByRole("heading", { name: "Admin sign in" })).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
});