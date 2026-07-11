import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const localBaseUrl = (process.env.LOCAL_BASE_URL ?? "http://localhost:3100").replace(/\/$/, "");
const sourceBaselineMode = process.env.SOURCE_BASELINE_MODE ?? "snapshot-pages";
const sourceBaseUrl = (
  process.env.SOURCE_BASE_URL
  ?? (sourceBaselineMode === "snapshot-pages" ? `${localBaseUrl}/lumoria-pages` : "https://lumoria.wpengine.com")
).replace(/\/$/, "");
const parityThreshold = Number(process.env.PARITY_THRESHOLD ?? "0.03");
const saveImages = process.env.SAVE_PARITY_IMAGES === "1";

const routeMapPath = path.join(projectRoot, "DOC", "migration", "phase1.4", "route-map.json");
const reportRoot = path.join(projectRoot, "DOC", "migration", "phase1.4", "artifacts", "parity-live");

const viewports = [
  { name: "desktop", width: 1512, height: 982 },
  { name: "mobile", width: 390, height: 844 },
];

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function loadRoutes() {
  const raw = fs.readFileSync(routeMapPath, "utf8");
  const parsed = JSON.parse(raw);
  return (parsed.routes ?? []).map((entry) => ({
    path: entry.path,
    screenshot: entry.screenshot ?? null,
  }));
}

function sanitizeRoute(routePath) {
  if (routePath === "/") {
    return "home";
  }

  return routePath.replace(/^\//, "").replace(/\//g, "__").replace(/[^a-zA-Z0-9_-]/g, "-");
}

function composeUrl(baseUrl, routePath) {
  const normalized = routePath.startsWith("/") ? routePath : `/${routePath}`;
  return `${baseUrl}${normalized}`;
}

function composeSourceUrl(routePath) {
  if (sourceBaselineMode === "snapshot-pages") {
    if (routePath === "/") {
      return `${sourceBaseUrl}/index.html`;
    }

    const normalized = routePath.startsWith("/") ? routePath : `/${routePath}`;
    return `${sourceBaseUrl}${normalized}/index.html`;
  }

  return composeUrl(sourceBaseUrl, routePath);
}

function ensureExpectedStatus(response, routePath, url, role) {
  const status = response?.status() ?? null;

  if (status === null) {
    throw new Error(`${role} navigation missing response for ${url}`);
  }

  if (role === "source" && sourceBaselineMode === "snapshot-pages" && status >= 400) {
    throw new Error(`${role} status ${status} for ${url}`);
  }

  if (routePath !== "/404" && status >= 400) {
    throw new Error(`${role} status ${status} for ${url}`);
  }
}

async function stabilizePage(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
      html { scroll-behavior: auto !important; }
      .wdt-heading-subtitle-wrapper .wdt-heading-subtitle-animate:not(:first-child) {
        display: none !important;
      }
    `,
  }).catch(() => undefined);

  await page.evaluate(async () => {
    if (document?.fonts?.ready) {
      await document.fonts.ready;
    }

    for (const counter of document.querySelectorAll(".wdt-content-counter-number")) {
      const targetValue = counter.getAttribute("data-to");
      if (typeof targetValue === "string") {
        const normalized = targetValue.trim();
        if (normalized) {
          counter.textContent = normalized;
        }
      }
    }

    window.scrollTo(0, 0);
  }).catch(() => undefined);

  await page.waitForTimeout(350);
}

async function navigateForCapture(page, url) {
  const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => undefined);
  return response;
}

function cropPng(inputPng, width, height) {
  const output = new PNG({ width, height });
  PNG.bitblt(inputPng, output, 0, 0, width, height, 0, 0);
  return output;
}

function compareScreenshots(sourceBuffer, localBuffer) {
  const sourceImage = PNG.sync.read(sourceBuffer);
  const localImage = PNG.sync.read(localBuffer);

  const width = Math.min(sourceImage.width, localImage.width);
  const height = Math.min(sourceImage.height, localImage.height);

  if (width <= 0 || height <= 0) {
    throw new Error("Invalid compare geometry for parity images");
  }

  const sourceCrop = cropPng(sourceImage, width, height);
  const localCrop = cropPng(localImage, width, height);
  const diffImage = new PNG({ width, height });

  const diffPixels = pixelmatch(sourceCrop.data, localCrop.data, diffImage.data, width, height, {
    threshold: 0.1,
    includeAA: true,
  });

  const ratio = diffPixels / (width * height);

  return {
    sourceImage,
    localImage,
    width,
    height,
    diffPixels,
    ratio,
    diffImage,
  };
}

function formatRatio(ratio) {
  return Number(ratio.toFixed(6));
}

function writeMarkdown(results, outputPath) {
  const lines = [];
  lines.push("# Phase 1.4 Live Visual Parity");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`PARITY_THRESHOLD: ${parityThreshold}`);
  lines.push(`SOURCE_BASELINE_MODE: ${sourceBaselineMode}`);
  lines.push(`SOURCE_BASE_URL: ${sourceBaseUrl}`);
  lines.push(`LOCAL_BASE_URL: ${localBaseUrl}`);
  lines.push("");

  const completed = results.filter((item) => !item.error);
  const passing = completed.filter((item) => item.pass);
  const failed = results.filter((item) => item.error || !item.pass);
  const worst = [...completed].sort((a, b) => b.ratio - a.ratio)[0];

  lines.push(`Total checks: ${results.length}`);
  lines.push(`Completed checks: ${completed.length}`);
  lines.push(`Passing checks: ${passing.length}`);
  lines.push(`Failed checks: ${failed.length}`);
  lines.push(`Worst ratio: ${worst ? worst.ratio.toFixed(6) : "n/a"}`);
  lines.push("");

  lines.push("| Route | Viewport | Ratio | Pass | Notes |");
  lines.push("|---|---:|---:|---:|---|");

  for (const item of results) {
    if (item.error) {
      lines.push(`| ${item.route} | ${item.viewport} | n/a | no | ${item.error.replace(/\|/g, " ")} |`);
      continue;
    }

    lines.push(
      `| ${item.route} | ${item.viewport} | ${item.ratio.toFixed(6)} | ${item.pass ? "yes" : "no"} | source ${item.sourceSize.width}x${item.sourceSize.height}, local ${item.localSize.width}x${item.localSize.height}, compare ${item.compareSize.width}x${item.compareSize.height} |`,
    );
  }

  fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");
}

async function run() {
  ensureDirectory(reportRoot);

  const sourceDir = path.join(reportRoot, "source");
  const localDir = path.join(reportRoot, "local");
  const diffDir = path.join(reportRoot, "diff");

  if (saveImages) {
    ensureDirectory(sourceDir);
    ensureDirectory(localDir);
    ensureDirectory(diffDir);
  }

  const routes = loadRoutes();
  if (!routes.length) {
    throw new Error("No routes found in route-map.json");
  }

  const browser = await chromium.launch({ headless: true });
  const results = [];

  try {
    for (const viewport of viewports) {
      const sourceContext = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
      const localContext = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });

      const sourcePage = await sourceContext.newPage();
      const localPage = await localContext.newPage();

      for (const route of routes) {
        const routeKey = sanitizeRoute(route.path);
        const sourceShot = path.join(sourceDir, `${routeKey}__${viewport.name}.png`);
        const localShot = path.join(localDir, `${routeKey}__${viewport.name}.png`);
        const diffShot = path.join(diffDir, `${routeKey}__${viewport.name}.png`);

        const sourceUrl = composeSourceUrl(route.path);
        const localUrl = composeUrl(localBaseUrl, route.path);

        try {
          const sourceResponse = await navigateForCapture(sourcePage, sourceUrl);
          ensureExpectedStatus(sourceResponse, route.path, sourceUrl, "source");
          await stabilizePage(sourcePage);
          const sourceBuffer = await sourcePage.screenshot({ fullPage: true });

          if (saveImages) {
            fs.writeFileSync(sourceShot, sourceBuffer);
          }

          const localResponse = await navigateForCapture(localPage, localUrl);
          ensureExpectedStatus(localResponse, route.path, localUrl, "local");
          await stabilizePage(localPage);
          const localBuffer = await localPage.screenshot({ fullPage: true });

          if (saveImages) {
            fs.writeFileSync(localShot, localBuffer);
          }

          const compare = compareScreenshots(sourceBuffer, localBuffer);
          const pass = compare.ratio <= parityThreshold;

          if (saveImages) {
            fs.writeFileSync(diffShot, PNG.sync.write(compare.diffImage));
          }

          results.push({
            route: route.path,
            viewport: viewport.name,
            ratio: formatRatio(compare.ratio),
            pass,
            sourceSize: { width: compare.sourceImage.width, height: compare.sourceImage.height },
            localSize: { width: compare.localImage.width, height: compare.localImage.height },
            compareSize: { width: compare.width, height: compare.height },
          });

          console.log(`[parity] ${viewport.name} ${route.path} ratio=${compare.ratio.toFixed(6)} pass=${pass}`);
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          results.push({
            route: route.path,
            viewport: viewport.name,
            error: message,
            pass: false,
          });
          console.log(`[parity] ${viewport.name} ${route.path} error=${message}`);
        }
      }

      await sourceContext.close();
      await localContext.close();
    }
  } finally {
    await browser.close();
  }

  const jsonPath = path.join(reportRoot, "parity-summary.json");
  const mdPath = path.join(reportRoot, "parity-summary.md");

  const overallPass = results.every((item) => item.pass && !item.error);

  const payload = {
    generatedAt: new Date().toISOString(),
    parityThreshold,
    sourceBaselineMode,
    localBaseUrl,
    sourceBaseUrl,
    overallPass,
    results,
  };

  fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  writeMarkdown(results, mdPath);

  console.log(`[parity] wrote ${path.relative(projectRoot, jsonPath)}`);
  console.log(`[parity] wrote ${path.relative(projectRoot, mdPath)}`);
  console.log(`[parity] overallPass=${overallPass}`);

  if (!overallPass) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
