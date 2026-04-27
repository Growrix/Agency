import { expect, test } from "@playwright/test";

test("checkout placeholders remain visible", async ({ page }) => {
  await page.goto("/checkout?product=atelier-marketing-theme");

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

test("shop product pages do not overflow the mobile viewport", async ({ page }) => {
  for (const slug of ["atelier-marketing-theme", "mobile-app-landing-pack", "booking-stripe-bundle"]) {
    await page.goto(`/shop/${slug}`);
    await page.waitForLoadState("networkidle");

    const viewport = page.viewportSize();
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);

    const sidebarButton = page.getByRole("link", { name: /Talk to us first/i });
    await expect(sidebarButton).toBeVisible();

    const buttonBox = await sidebarButton.boundingBox();
    expect(buttonBox).not.toBeNull();
    expect((buttonBox?.x ?? 0) + (buttonBox?.width ?? 0)).toBeLessThanOrEqual((viewport?.width ?? dimensions.clientWidth) + 1);
  }
});