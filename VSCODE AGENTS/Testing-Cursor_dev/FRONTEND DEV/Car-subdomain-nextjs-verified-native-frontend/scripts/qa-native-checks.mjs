import fs from "node:fs";
import fsp from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { chromium, devices, request } from "playwright";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const APP_BASE_URL = process.env.APP_BASE_URL ?? "http://localhost:3103";
const SOURCE_PORT = Number(process.env.SOURCE_PORT ?? "3204");
const SOURCE_BASE_URL = process.env.SOURCE_BASE_URL ?? `http://localhost:${SOURCE_PORT}`;
const SOURCE_PUBLIC_DIR = process.env.SOURCE_PUBLIC_DIR
  ?? path.resolve(process.cwd(), "..", "Car-subdomain", "public");
const ROUTE_MANIFEST_PATH = path.join(process.cwd(), "src", "data", "native-route-list.json");
const ARTIFACTS_DIR = path.join(process.cwd(), "qa-artifacts");
const PARITY_THRESHOLD = Number(process.env.PARITY_THRESHOLD ?? "0.22");

const REQUIRED_FLOW_ROUTES = [
  "/",
  "/services",
  "/contact",
  "/appointment",
  "/shop",
  "/car-list",
  "/car-listing",
  "/blog",
];

const REDIRECT_EXPECTATIONS = [
  ["/index.html", "/"],
  ["/contact.html", "/contact"],
  ["/services.html", "/services"],
  ["/appointment.html", "/appointment"],
  ["/blog.html", "/blog"],
  ["/car-list.html", "/car-list"],
  ["/car-listing.html", "/car-listing"],
  ["/shop.html", "/shop"],
  ["/privacy.html", "/privacy"],
  ["/terms.html", "/terms"],
];

const VIEWPORTS = [
  {
    name: "desktop",
    contextOptions: {
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    },
  },
  {
    name: "mobile",
    contextOptions: {
      ...devices["iPhone 12"],
    },
  },
];

const normalizeConsoleMessage = (message) => {
  return message.replace(/\s+/g, " ").trim();
};

const shouldIgnoreRequestFailure = (url, errorText) => {
  if (!url) {
    return false;
  }
  if (url.startsWith("data:")) {
    return true;
  }
  if (url.startsWith("blob:")) {
    return true;
  }
  if (url.includes("googleapis") || url.includes("gstatic")) {
    return true;
  }
  return Boolean(errorText && errorText.includes("ERR_ABORTED"));
};

const pauseMotionStyle = `
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    caret-color: transparent !important;
    scroll-behavior: auto !important;
  }

  .swiper .swiper-wrapper {
    transform: translate3d(0px, 0px, 0px) !important;
    transition-duration: 0ms !important;
  }

  .swiper .swiper-slide {
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  .swiper .swiper-slide:first-child {
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
  }
`;

const REQUEST_TIMEOUT_MS = Number(process.env.QA_REQUEST_TIMEOUT_MS ?? "120000");

const requestWithRetry = async (requestContext, url, options = {}, attempts = 3) => {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await requestContext.get(url, {
        failOnStatusCode: false,
        timeout: REQUEST_TIMEOUT_MS,
        ...options,
      });
    } catch (error) {
      lastError = error;
      if (attempt === attempts) {
        throw error;
      }
    }
  }

  throw lastError;
};

const ensureDir = async (dirPath) => {
  await fsp.mkdir(dirPath, { recursive: true });
};

const contentTypeByExtension = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "application/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".gif", "image/gif"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".ttf", "font/ttf"],
  [".eot", "application/vnd.ms-fontobject"],
]);

const startStaticServer = (rootDir, port) => {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const rawPath = new URL(req.url ?? "/", `http://localhost:${port}`).pathname;
      const requestedPath = rawPath === "/" ? "/index.html" : rawPath;
      const normalizedPath = path.normalize(requestedPath).replace(/^([.][.][/\\])+/, "");
      const filePath = path.join(rootDir, normalizedPath);

      if (!filePath.startsWith(rootDir)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }

      fs.readFile(filePath, (error, data) => {
        if (error) {
          res.writeHead(404);
          res.end("Not Found");
          return;
        }

        const extension = path.extname(filePath).toLowerCase();
        const contentType = contentTypeByExtension.get(extension) ?? "application/octet-stream";
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      });
    });

    server.on("error", reject);
    server.listen(port, () => resolve(server));
  });
};

const gotoAndSettle = async (page, url) => {
  const response = await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: REQUEST_TIMEOUT_MS,
  });

  try {
    await page.waitForLoadState("networkidle", { timeout: 10_000 });
  } catch {
    // Some pages continuously poll; domcontentloaded is sufficient for these checks.
  }

  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const IMAGE_WAIT_TIMEOUT_MS = 8_000;
    const imagePromises = Array.from(document.images).map((image) => {
      if (image.complete) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        const complete = () => {
          window.clearTimeout(timeoutId);
          resolve();
        };

        const timeoutId = window.setTimeout(complete, IMAGE_WAIT_TIMEOUT_MS);
        image.addEventListener("load", complete, { once: true });
        image.addEventListener("error", complete, { once: true });
      });
    });

    await Promise.all(imagePromises);
  }).catch(() => {});

  await page.addStyleTag({ content: pauseMotionStyle }).catch(() => {});
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  }).catch(() => {});

  return response;
};

const cropPng = (png, width, height) => {
  if (png.width === width && png.height === height) {
    return png;
  }
  const output = new PNG({ width, height });
  PNG.bitblt(png, output, 0, 0, width, height, 0, 0);
  return output;
};

const loadRouteEntries = () => {
  if (!fs.existsSync(ROUTE_MANIFEST_PATH)) {
    throw new Error(`Route manifest not found: ${ROUTE_MANIFEST_PATH}`);
  }

  const routeEntries = JSON.parse(fs.readFileSync(ROUTE_MANIFEST_PATH, "utf8"));
  return routeEntries
    .slice()
    .sort((a, b) => a.fileName.localeCompare(b.fileName));
};

const verifyCanonicalAndNotFound = async (requestContext, routeEntries) => {
  const failures = [];
  console.log(`[routes] Checking ${routeEntries.length} canonical routes`);

  for (const entry of routeEntries) {
    const response = await requestWithRetry(requestContext, `${APP_BASE_URL}${entry.canonicalPath}`);
    if (response.status() !== 200) {
      failures.push(`${entry.canonicalPath} expected 200, got ${response.status()}`);
    }
  }

  const notFoundResponse = await requestWithRetry(requestContext, `${APP_BASE_URL}/does-not-exist`);

  if (notFoundResponse.status() !== 404) {
    failures.push(`/does-not-exist expected 404, got ${notFoundResponse.status()}`);
  }

  return failures;
};

const verifyRedirects = async (requestContext) => {
  const failures = [];
  console.log(`[redirects] Checking ${REDIRECT_EXPECTATIONS.length} legacy aliases`);

  for (const [legacyPath, expectedLocation] of REDIRECT_EXPECTATIONS) {
    const response = await requestWithRetry(requestContext, `${APP_BASE_URL}${legacyPath}`, {
      maxRedirects: 0,
    });

    const location = response.headers()["location"];
    const status = response.status();

    if (![307, 308, 301, 302].includes(status)) {
      failures.push(`${legacyPath} expected redirect status, got ${status}`);
      continue;
    }

    if (location !== expectedLocation) {
      failures.push(`${legacyPath} expected location ${expectedLocation}, got ${location ?? "<missing>"}`);
    }
  }

  return failures;
};

const verifyRuntimeQuality = async (browser, routeEntries) => {
  const runtimeFailures = [];
  const mediaFailures = [];
  const accessibilityFailures = [];

  console.log(`[runtime] Checking console, request, media, and accessibility across ${routeEntries.length} routes`);

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  for (const entry of routeEntries) {
    console.log(`[runtime] ${entry.canonicalPath}`);
    const page = await context.newPage();
    const consoleErrors = [];
    const requestFailures = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        const text = normalizeConsoleMessage(message.text());
        if (
          text.length > 0
          && !text.includes("favicon")
          && !text.includes("ERR_NAME_NOT_RESOLVED")
        ) {
          consoleErrors.push(text);
        }
      }
    });

    page.on("requestfailed", (request) => {
      const failure = request.failure();
      const errorText = failure?.errorText ?? "unknown";
      if (!shouldIgnoreRequestFailure(request.url(), errorText)) {
        requestFailures.push(`${request.method()} ${request.url()} :: ${errorText}`);
      }
    });

    const response = await gotoAndSettle(page, `${APP_BASE_URL}${entry.canonicalPath}`);
    if (!response || response.status() !== 200) {
      runtimeFailures.push(`${entry.canonicalPath} expected 200 in browser navigation, got ${response?.status() ?? "no response"}`);
    }

    const diagnostics = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll("img"));
      const brokenImages = images
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.getAttribute("src") || "<unknown>");

      return {
        hasLang: Boolean(document.documentElement.getAttribute("lang")),
        headingCount: document.querySelectorAll("h1, h2, h3, h4, h5, h6").length,
        brokenImages,
      };
    });

    if (consoleErrors.length > 0) {
      runtimeFailures.push(`${entry.canonicalPath} console errors: ${consoleErrors.slice(0, 3).join(" | ")}`);
    }

    if (requestFailures.length > 0) {
      runtimeFailures.push(`${entry.canonicalPath} request failures: ${requestFailures.slice(0, 3).join(" | ")}`);
    }

    if (diagnostics.brokenImages.length > 0) {
      mediaFailures.push(`${entry.canonicalPath} broken images: ${diagnostics.brokenImages.slice(0, 5).join(", ")}`);
    }

    if (!diagnostics.hasLang) {
      accessibilityFailures.push(`${entry.canonicalPath} missing html[lang]`);
    }

    if (diagnostics.headingCount === 0) {
      accessibilityFailures.push(`${entry.canonicalPath} missing heading structure`);
    }

    await page.close();
  }

  await context.close();

  return {
    runtimeFailures,
    mediaFailures,
    accessibilityFailures,
  };
};

const verifyFormContracts = async (browser) => {
  const failures = [];
  console.log("[forms] Verifying contact and appointment form contracts");
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const contactPage = await context.newPage();
  await gotoAndSettle(contactPage, `${APP_BASE_URL}/contact`);

  const contactForm = contactPage.locator("form[data-native-form='contact']");
  await contactForm.locator("button[type='submit']").click();
  const contactErrorCount = await contactForm.locator(".error_input").count();
  if (contactErrorCount < 4) {
    failures.push(`/contact expected validation highlighting, got ${contactErrorCount} invalid markers`);
  }

  await contactForm.locator("input[placeholder='Your Name']").fill("Test User");
  await contactForm.locator("input[placeholder='Your Email']").fill("test@example.com");
  await contactForm.locator("input[placeholder='Your Phone']").fill("+12135550199");
  await contactForm.locator("textarea[placeholder='Your Message']").fill("Testing contact contract state.");
  await contactForm.locator("button[type='submit']").click();

  const contactBoundary = contactPage.getByText("Contact endpoint is not configured yet", { exact: false });
  if (!(await contactBoundary.isVisible())) {
    failures.push("/contact expected not-configured integration boundary message after valid submit");
  }

  await contactPage.close();

  const bookingPage = await context.newPage();
  await gotoAndSettle(bookingPage, `${APP_BASE_URL}/appointment`);

  const bookingForm = bookingPage.locator("form[data-native-form='booking']");
  await bookingForm.locator("button[type='submit']").click();
  const bookingErrorCount = await bookingForm.locator(".error_input").count();
  if (bookingErrorCount < 6) {
    failures.push(`/appointment expected validation highlighting, got ${bookingErrorCount} invalid markers`);
  }

  await bookingForm.locator("select").nth(0).selectOption({ index: 1 });
  await bookingForm.locator("input[type='date']").fill("2026-06-15");
  await bookingForm.locator("select").nth(1).selectOption({ index: 1 });
  await bookingForm.locator("input[placeholder='Name']").fill("Test User");
  await bookingForm.locator("input[placeholder='Email']").fill("test@example.com");
  await bookingForm.locator("input[placeholder='Phone']").fill("+12135550199");
  await bookingForm.locator("textarea[placeholder='Message']").fill("Testing booking contract state.");
  await bookingForm.locator("button[type='submit']").click();

  const bookingBoundary = bookingPage.getByText("Booking endpoint is not configured yet", { exact: false });
  if (!(await bookingBoundary.isVisible())) {
    failures.push("/appointment expected not-configured integration boundary message after valid submit");
  }

  await bookingPage.close();
  await context.close();

  return failures;
};

const runVisualParityChecks = async (browser, routeEntries) => {
  const parityFailures = [];
  const parityRatios = [];

  console.log(`[parity] Comparing ${routeEntries.length} routes across ${VIEWPORTS.length} viewports`);

  for (const viewport of VIEWPORTS) {
    console.log(`[parity] Viewport ${viewport.name}`);
    const viewportArtifactDir = path.join(ARTIFACTS_DIR, "parity", viewport.name);
    await ensureDir(viewportArtifactDir);

    for (const entry of routeEntries) {
      console.log(`[parity:${viewport.name}] ${entry.canonicalPath}`);
      const sourceHtmlPath = path.join(SOURCE_PUBLIC_DIR, entry.fileName);
      if (!fs.existsSync(sourceHtmlPath)) {
        parityFailures.push(`${entry.fileName} missing in source public directory`);
        continue;
      }

      let context;
      let sourcePage;
      let targetPage;

      try {
        context = await browser.newContext(viewport.contextOptions);
        await context.route("**/*", (route) => {
          const requestUrl = route.request().url();
          if (requestUrl.includes("fonts.googleapis.com") || requestUrl.includes("fonts.gstatic.com")) {
            return route.abort();
          }
          return route.continue();
        });
        sourcePage = await context.newPage();
        targetPage = await context.newPage();

        const sourceUrl = `${SOURCE_BASE_URL}/${entry.fileName}`;
        const targetUrl = `${APP_BASE_URL}${entry.canonicalPath}`;

        await gotoAndSettle(sourcePage, sourceUrl);
        await gotoAndSettle(targetPage, targetUrl);

        const sourceBuffer = await sourcePage.screenshot({ fullPage: false });
        const targetBuffer = await targetPage.screenshot({ fullPage: false });

        const sourcePng = PNG.sync.read(sourceBuffer);
        const targetPng = PNG.sync.read(targetBuffer);

        const width = Math.min(sourcePng.width, targetPng.width);
        const height = Math.min(sourcePng.height, targetPng.height);

        const sourceCropped = cropPng(sourcePng, width, height);
        const targetCropped = cropPng(targetPng, width, height);
        const diffPng = new PNG({ width, height });

        const mismatchedPixels = pixelmatch(
          sourceCropped.data,
          targetCropped.data,
          diffPng.data,
          width,
          height,
          { threshold: 0.1 },
        );

        const ratio = mismatchedPixels / (width * height);
        parityRatios.push(ratio);

        const artifactBase = `${entry.fileName.replace(/\.html$/, "")}-${viewport.name}`;
        await fsp.writeFile(path.join(viewportArtifactDir, `${artifactBase}-source.png`), PNG.sync.write(sourceCropped));
        await fsp.writeFile(path.join(viewportArtifactDir, `${artifactBase}-target.png`), PNG.sync.write(targetCropped));
        await fsp.writeFile(path.join(viewportArtifactDir, `${artifactBase}-diff.png`), PNG.sync.write(diffPng));

        if (ratio > PARITY_THRESHOLD) {
          parityFailures.push(
            `${entry.canonicalPath} (${viewport.name}) diff ratio ${ratio.toFixed(4)} exceeds threshold ${PARITY_THRESHOLD.toFixed(2)}`,
          );
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        parityFailures.push(`${entry.canonicalPath} (${viewport.name}) parity capture error: ${message}`);
      } finally {
        await sourcePage?.close().catch(() => {});
        await targetPage?.close().catch(() => {});
        await context?.close().catch(() => {});
      }
    }
  }

  const maxRatio = parityRatios.length > 0 ? Math.max(...parityRatios) : 0;
  const avgRatio = parityRatios.length > 0
    ? parityRatios.reduce((sum, value) => sum + value, 0) / parityRatios.length
    : 0;

  return {
    parityFailures,
    maxRatio,
    avgRatio,
  };
};

const main = async () => {
  await ensureDir(ARTIFACTS_DIR);

  const routeEntries = loadRouteEntries();
  console.log(`[qa] Loaded ${routeEntries.length} routes from ${ROUTE_MANIFEST_PATH}`);
  const canonicalPaths = new Set(routeEntries.map((entry) => entry.canonicalPath));

  for (const requiredPath of REQUIRED_FLOW_ROUTES) {
    if (!canonicalPaths.has(requiredPath)) {
      throw new Error(`Required flow route missing from migration set: ${requiredPath}`);
    }
  }

  const sourceServer = await startStaticServer(SOURCE_PUBLIC_DIR, SOURCE_PORT);
  console.log(`[qa] Source baseline server started at ${SOURCE_BASE_URL}`);

  const browser = await chromium.launch({ headless: true });
  const requestContext = await request.newContext({ timeout: REQUEST_TIMEOUT_MS });

  const canonicalFailures = await verifyCanonicalAndNotFound(requestContext, routeEntries);
  const redirectFailures = await verifyRedirects(requestContext);
  const runtimeResults = await verifyRuntimeQuality(browser, routeEntries);
  const formFailures = await verifyFormContracts(browser);
  const parityResults = await runVisualParityChecks(browser, routeEntries);

  await requestContext.dispose();
  await browser.close();
  await new Promise((resolve, reject) => {
    sourceServer.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });

  const allFailures = [
    ...canonicalFailures,
    ...redirectFailures,
    ...runtimeResults.runtimeFailures,
    ...runtimeResults.mediaFailures,
    ...runtimeResults.accessibilityFailures,
    ...formFailures,
    ...parityResults.parityFailures,
  ];

  console.log("QA summary:");
  console.log(`- Route ownership checks: ${routeEntries.length} canonical routes validated`);
  console.log(`- Legacy redirect checks: ${REDIRECT_EXPECTATIONS.length} aliases validated`);
  console.log(`- Runtime checks: ${routeEntries.length} routes scanned for console/request failures`);
  console.log(`- Form contract checks: contact and appointment validated`);
  console.log(`- Visual parity checks: ${routeEntries.length * VIEWPORTS.length} screenshots compared`);
  console.log(`- Parity max diff ratio: ${parityResults.maxRatio.toFixed(4)}`);
  console.log(`- Parity avg diff ratio: ${parityResults.avgRatio.toFixed(4)}`);

  if (allFailures.length > 0) {
    console.error("\nQA failures:");
    for (const failure of allFailures.slice(0, 50)) {
      console.error(`- ${failure}`);
    }

    if (allFailures.length > 50) {
      console.error(`- ...and ${allFailures.length - 50} more`);
    }

    process.exitCode = 1;
    return;
  }

  console.log("\nAll native frontend QA checks passed.");
};

main().catch((error) => {
  console.error("QA execution failed:", error);
  process.exitCode = 1;
});
