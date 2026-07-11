import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const SOURCE_BASE = "http://127.0.0.1:3011";
const OUTPUT_BASE = "http://127.0.0.1:3012";
const PUBLIC_ROOT = path.join(process.cwd(), "public");
const REPORT_ROOT = path.join(process.cwd(), ".parity-report");
const HTML_FILE_PATTERN = /^[a-z0-9-]+\.html$/i;

const VIEWPORTS = [
  {
    name: "desktop",
    context: {
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
    },
    maxMismatchRatio: 0.18,
  },
  {
    name: "mobile",
    context: {
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    },
    maxMismatchRatio: 0.2,
  },
];

const STABILIZE_STYLE = `
* {
  animation: none !important;
  transition: none !important;
  caret-color: transparent !important;
}
*::before,
*::after {
  animation: none !important;
  transition: none !important;
}
video {
  visibility: hidden !important;
}
`;

function canonicalPathFromFile(fileName) {
  if (fileName.toLowerCase() === "index.html") {
    return "/";
  }
  return `/${fileName.replace(/\.html$/i, "")}`;
}

function toPng(buffer) {
  return PNG.sync.read(buffer);
}

function ratioToPercent(ratio) {
  return Number((ratio * 100).toFixed(3));
}

const htmlFiles = readdirSync(PUBLIC_ROOT)
  .filter((fileName) => HTML_FILE_PATTERN.test(fileName))
  .sort((a, b) => a.localeCompare(b));

mkdirSync(REPORT_ROOT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const records = [];
const failures = [];

for (const viewportConfig of VIEWPORTS) {
  const context = await browser.newContext(viewportConfig.context);

  for (const fileName of htmlFiles) {
    const sourceRoute = `/${fileName}`;
    const outputRoute = canonicalPathFromFile(fileName);

    const sourcePage = await context.newPage();
    await sourcePage.goto(`${SOURCE_BASE}${sourceRoute}`, { waitUntil: "load", timeout: 60000 });
    await sourcePage.addStyleTag({ content: STABILIZE_STYLE });
    await sourcePage.waitForTimeout(300);
    const sourceImage = await sourcePage.screenshot({ fullPage: false, type: "png" });
    await sourcePage.close();

    const outputPage = await context.newPage();
    await outputPage.goto(`${OUTPUT_BASE}${outputRoute}`, { waitUntil: "load", timeout: 60000 });
    await outputPage.addStyleTag({ content: STABILIZE_STYLE });
    await outputPage.waitForTimeout(300);
    const outputImage = await outputPage.screenshot({ fullPage: false, type: "png" });
    await outputPage.close();

    const sourcePng = toPng(sourceImage);
    const outputPng = toPng(outputImage);

    if (sourcePng.width !== outputPng.width || sourcePng.height !== outputPng.height) {
      const mismatch = {
        viewport: viewportConfig.name,
        fileName,
        sourceRoute,
        outputRoute,
        error: `dimension mismatch source=${sourcePng.width}x${sourcePng.height} output=${outputPng.width}x${outputPng.height}`,
      };
      failures.push(mismatch);
      records.push(mismatch);
      continue;
    }

    const diffPng = new PNG({ width: sourcePng.width, height: sourcePng.height });
    const mismatchPixels = pixelmatch(
      sourcePng.data,
      outputPng.data,
      diffPng.data,
      sourcePng.width,
      sourcePng.height,
      { threshold: 0.15 },
    );

    const mismatchRatio = mismatchPixels / (sourcePng.width * sourcePng.height);
    const record = {
      viewport: viewportConfig.name,
      fileName,
      sourceRoute,
      outputRoute,
      mismatchPixels,
      mismatchRatio,
      mismatchPercent: ratioToPercent(mismatchRatio),
      thresholdPercent: ratioToPercent(viewportConfig.maxMismatchRatio),
      pass: mismatchRatio <= viewportConfig.maxMismatchRatio,
    };

    records.push(record);

    if (!record.pass) {
      failures.push(record);
    }
  }

  await context.close();
}

await browser.close();

const reportPath = path.join(REPORT_ROOT, "visual-parity-report.json");
writeFileSync(reportPath, JSON.stringify({
  sourceBase: SOURCE_BASE,
  outputBase: OUTPUT_BASE,
  routeCount: htmlFiles.length,
  viewportCount: VIEWPORTS.length,
  checks: records.length,
  failures,
  records,
}, null, 2));

const totalChecks = records.filter((record) => !record.error).length;
const passCount = records.filter((record) => record.pass === true).length;
const failCount = failures.length;

console.log(`PARITY_REPORT=${reportPath}`);
console.log(`PARITY_TOTAL_CHECKS=${totalChecks}`);
console.log(`PARITY_PASS_COUNT=${passCount}`);
console.log(`PARITY_FAIL_COUNT=${failCount}`);

if (failCount > 0) {
  console.log("PARITY_STATUS=FAIL");
  process.exit(1);
}

console.log("PARITY_STATUS=PASS");
