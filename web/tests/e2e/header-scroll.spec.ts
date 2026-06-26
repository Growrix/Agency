import { expect, test } from "@playwright/test";

async function scrollDown(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    for (let y = 0; y <= 1200; y += 40) {
      window.scrollTo(0, y);
      window.dispatchEvent(new Event("scroll"));
      await new Promise((resolve) => setTimeout(resolve, 8));
    }
  });
}

async function scrollUp(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    for (let y = window.scrollY; y >= 0; y -= 4) {
      window.scrollTo(0, y);
      window.dispatchEvent(new Event("scroll"));
      await new Promise((resolve) => setTimeout(resolve, 8));
    }
  });
}

test("top chrome hides on scroll down and reappears on scroll up", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForSelector("[data-scroll-listener-ready='true']", { state: "attached", timeout: 15_000 });

  const chrome = page.getByTestId("site-top-chrome");
  await expect(chrome).toHaveAttribute("data-chrome-visible", "true");
  await expect(chrome).toHaveAttribute("data-chrome-hidden", "false");

  await scrollDown(page);
  await expect(chrome).toHaveAttribute("data-chrome-hidden", "true", { timeout: 5000 });

  await scrollUp(page);
  await expect(chrome).toHaveAttribute("data-chrome-hidden", "false", { timeout: 5000 });
  await expect(chrome).toHaveAttribute("data-chrome-visible", "true");
});

test("mobile bottom nav hides on scroll down and reappears on scroll up", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForSelector("[data-scroll-listener-ready='true']", { state: "attached", timeout: 15_000 });

  const nav = page.getByTestId("mobile-bottom-nav");
  await expect(nav).toHaveAttribute("data-nav-visible", "false");

  await scrollDown(page);
  await expect(nav).toHaveAttribute("data-nav-visible", "false", { timeout: 5000 });

  await scrollUp(page);
  await expect(nav).toHaveAttribute("data-nav-visible", "true", { timeout: 5000 });
});
