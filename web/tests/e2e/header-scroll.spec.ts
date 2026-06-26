import { expect, test } from "@playwright/test";

async function scrollDown(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    window.scrollTo(0, 900);
    window.dispatchEvent(new Event("scroll"));
  });
  await page.waitForTimeout(200);
}

async function scrollUpPartial(page: import("@playwright/test").Page, minY = 120) {
  await page.evaluate((stopY) => {
    window.scrollTo(0, stopY);
    window.dispatchEvent(new Event("scroll"));
  }, minY);
  await page.waitForTimeout(200);
}

test("top chrome hides on scroll down and reappears on scroll up", async ({ page }) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-scroll-listener-ready='true']", { state: "attached", timeout: 15_000 });

  const chrome = page.getByTestId("site-top-chrome");
  await expect(chrome).toHaveAttribute("data-chrome-visible", "true");
  await expect(chrome).toHaveAttribute("data-chrome-hidden", "false");

  await scrollDown(page);
  await expect(chrome).toHaveAttribute("data-chrome-hidden", "true", { timeout: 5000 });

  await scrollUpPartial(page);
  await expect(chrome).toHaveAttribute("data-chrome-hidden", "false", { timeout: 5000 });
  await expect(chrome).toHaveAttribute("data-chrome-visible", "true");
});

test("mobile bottom nav hides on scroll down and reappears on scroll up", async ({ page }) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-scroll-listener-ready='true']", { state: "attached", timeout: 15_000 });

  const nav = page.getByTestId("mobile-bottom-nav");
  await expect(nav).toHaveAttribute("data-nav-visible", "false");

  await scrollDown(page);
  await expect(nav).toHaveAttribute("data-nav-visible", "false", { timeout: 5000 });

  await scrollUpPartial(page);
  await expect(nav).toHaveAttribute("data-nav-visible", "true", { timeout: 5000 });
});
