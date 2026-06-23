import { chromium } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:5000";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.resolve(__dirname, "../../.cursor/tmp-mobile-hero-built.png");

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
await page.emulateMedia({ colorScheme: "dark" });
await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded", timeout: 300_000 });
  await page.waitForSelector(".home-hero-mobile__title", { timeout: 120_000 });
  await page.waitForSelector(".home-hero-mobile__phone-overlay", { timeout: 30_000 }).catch(() => undefined);
  await page.waitForTimeout(2500);
await page.screenshot({ path: OUTPUT, fullPage: false });
await browser.close();
console.log(`Saved screenshot to ${OUTPUT}`);
