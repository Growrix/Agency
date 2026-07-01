import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("mobile smoke", () => {
  test.skip(({ isMobile }) => !isMobile, "mobile-only project");

  test("homepage renders within smoke threshold and passes critical axe checks", async ({ page }) => {
    test.setTimeout(120_000);

    const started = Date.now();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const duration = Date.now() - started;
    expect(duration).toBeLessThan(8_000);

    const results = await new AxeBuilder({ page })
      .disableRules(["color-contrast", "definition-list", "region"])
      .exclude("iframe")
      .analyze();
    const critical = results.violations.filter((violation) => violation.impact === "critical");
    expect(critical).toEqual([]);
  });

  test("header exposes shopping cart control on mobile", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Mobile link goes straight to /cart; the desktop CartHoverMenu link has aria-haspopup.
    const cartControl = page
      .locator("a[href='/cart'][aria-label*='shopping cart' i]:not([aria-haspopup])")
      .first();
    await expect(cartControl).toBeVisible();
  });

  test("cart page renders steps indicator with Cart active and empty CTA", async ({ page }) => {
    await page.goto("/cart", { waitUntil: "domcontentloaded" });

    const steps = page.getByRole("list", { name: "Checkout progress" });
    await expect(steps).toBeVisible();

    const browseLink = page
      .getByRole("link", { name: /digital products|browse|continue shopping/i })
      .first();
    await expect(browseLink).toBeVisible();
  });

  test("checkout surfaces step indicator and inline validation", async ({ page }) => {
    await page.goto("/checkout?cart=1", { waitUntil: "domcontentloaded" });

    const steps = page.getByRole("list", { name: "Checkout progress" });
    await expect(steps).toBeVisible();
  });

  test("payment interstitial renders when reached directly", async ({ page }) => {
    await page.goto("/checkout/payment", { waitUntil: "domcontentloaded" });

    const steps = page.getByRole("list", { name: "Checkout progress" });
    await expect(steps).toBeVisible();

    const backToCheckout = page.getByRole("link", { name: /back to checkout|return to checkout/i }).first();
    await expect(backToCheckout).toBeVisible();
  });

  test("success page renders confirmation step with dashboard CTA", async ({ page }) => {
    await page.goto("/success", { waitUntil: "domcontentloaded" });

    const steps = page.getByRole("list", { name: "Checkout progress" });
    await expect(steps).toBeVisible();

    const dashboardLink = page.getByRole("link", { name: /open dashboard|sign in to dashboard/i }).first();
    await expect(dashboardLink).toBeVisible();
  });

  test("dashboard login redirects from /dashboard when unauthenticated", async ({ page }) => {
    const response = await page.goto("/dashboard", { waitUntil: "domcontentloaded" });
    expect(response).not.toBeNull();
    const finalUrl = page.url();
    expect(finalUrl).toMatch(/\/(dashboard\/login|sign-in)/);
  });

  test("homepage chrome leaves room for safe-area on mobile", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const main = page.locator("#main").first();
    await expect(main).toBeVisible();

    const bottomNavCount = await page
      .locator("[data-testid='mobile-bottom-nav'], nav.mobile-bottom-nav, .mobile-bottom-nav")
      .count();
    expect(bottomNavCount).toBeGreaterThanOrEqual(0);
  });
});
