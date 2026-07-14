import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
const MOBILE_VIEWPORT = { width: 390, height: 844, isMobile: true };

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: MOBILE_VIEWPORT });
  const page = await context.newPage();
  const logs = [];

  const allConsole = [];
  page.on("console", (msg) => {
    const text = msg.text();
    allConsole.push({ type: msg.type(), text, time: Date.now() });
    if (text.includes("[DEBUG")) {
      const entry = { type: msg.type(), text, time: Date.now() };
      logs.push(entry);
      console.log(`${new Date().toISOString()} | ${msg.type()} | ${text}`);
    }
  });

  page.on("pageerror", (err) => {
    console.log(`PAGEERROR: ${err.message}`);
  });

  page.on("requestfailed", (req) => {
    console.log(`REQUESTFAILED: ${req.url()} | ${req.failure()?.errorText}`);
  });

  console.log(`Navigating to ${BASE_URL}/ ...`);
  await page.goto(`${BASE_URL}/`, { waitUntil: "load", timeout: 180000 });

  console.log(`Page loaded. Title: ${await page.title()}`);
  const heroCount = await page.locator(".hero-section").count();
  console.log(`Hero sections found: ${heroCount}`);

  // Wait for the deferred hero bundle to render.
  try {
    await page.waitForSelector(".hero-section", { state: "visible", timeout: 120000 });
    console.log("Hero section is visible.");
  } catch (e) {
    console.log("Hero section did not become visible:", e.message);
  }

  // Give ambient layers, GSAP, and ScrollTrigger time to initialize.
  await page.waitForTimeout(15000);

  console.log("Starting scroll...");
  const start = Date.now();
  // Smooth-ish scroll down the page in 10 steps.
  for (let i = 0; i <= 10; i++) {
    await page.evaluate((pct) => {
      window.scrollTo(0, document.body.scrollHeight * (pct / 10));
    }, i);
    await page.waitForTimeout(300);
  }
  const elapsed = Date.now() - start;
  console.log(`Scroll done in ${elapsed}ms`);

  // Allow any trailing logs to flush.
  await page.waitForTimeout(2000);

  console.log(`\nTotal debug logs: ${logs.length}`);
  const summary = {};
  for (const log of logs) {
    const hypothesis = log.text.match(/\[DEBUG ([A-Z])\]/)?.[1] || "unknown";
    summary[hypothesis] = (summary[hypothesis] || 0) + 1;
  }
  console.log("Summary by hypothesis:", summary);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
