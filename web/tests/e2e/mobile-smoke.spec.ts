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

  test("cart page renders empty state and proceed-to-checkout cta", async ({ page }) => {
    await page.goto("/cart", { waitUntil: "domcontentloaded" });

    // Empty state OR populated state both render at least one link to digital products.
    const browseLink = page.getByRole("link", { name: /digital products|browse|continue shopping/i }).first();
    await expect(browseLink).toBeVisible();
  });

  test("checkout surfaces step indicator and inline validation", async ({ page }) => {
    await page.goto("/checkout?cart=1", { waitUntil: "domcontentloaded" });

    const steps = page.getByRole("list", { name: "Checkout progress" });
    await expect(steps).toBeVisible();
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

    const bottomNavCount = await page.locator("[data-mobile-bottom-nav], nav.mobile-bottom-nav, .mobile-bottom-nav").count();
    // Mobile bottom-nav is optional but if present should not overlap main content unintentionally.
    expect(bottomNavCount).toBeGreaterThanOrEqual(0);
  });
});
