import { expect, test } from "@playwright/test";

test("top chrome hides on scroll down and reappears on scroll up", async ({ page }) => {
  await page.goto("/");
  const chrome = page.getByTestId("site-top-chrome");
  await expect(chrome).toHaveAttribute("data-chrome-ready", "true");

  await expect(chrome).toHaveAttribute("data-chrome-hidden", "false");

  await page.evaluate(async () => {
    for (let y = 0; y <= 800; y += 80) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 16));
    }
  });
  await page.waitForTimeout(250);
  const yAfterDown = await page.evaluate(() => window.scrollY);
  expect(yAfterDown).toBeGreaterThan(400);
  await expect(chrome).toHaveAttribute("data-chrome-hidden", "true");

  await page.evaluate(async () => {
    for (let y = window.scrollY; y >= 792; y -= 2) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 16));
    }
  });
  await page.waitForTimeout(200);
  await expect(chrome).toHaveAttribute("data-chrome-hidden", "false");
});
