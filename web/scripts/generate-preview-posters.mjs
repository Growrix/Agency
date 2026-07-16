import { chromium } from "@playwright/test";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const publicRoot = path.join(webRoot, "public");
const catalogPath = path.join(__dirname, "data/website-template-html-previews.json");
const previewRoot = path.join(publicRoot, "previews/html-template-websites");
const outputDir = path.join(publicRoot, "previews/posters");
const manifestPath = path.join(publicRoot, "previews/preview-posters.manifest.json");

const PREVIEW_ROOT = "html-template-websites";
const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const MOBILE_VIEWPORT = { width: 390, height: 844 };
const SETTLE_MS = 800;
const POSTER_EXTENSION = "png";
const WEBP_EXTENSION = "webp";
const WEBP_QUALITY = 82;
const forceRegenerate = process.argv.includes("--force");

/** @type {Array<{ slug: string; fileName: string; title: string }>} */
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));

const onlySlugs = process.argv
  .find((arg) => arg.startsWith("--only="))
  ?.slice("--only=".length)
  .split(",")
  .map((slug) => slug.trim())
  .filter(Boolean);

const templates = onlySlugs?.length
  ? catalog.filter((entry) => onlySlugs.includes(entry.slug))
  : catalog;

fs.mkdirSync(outputDir, { recursive: true });

const server = await startStaticServer(publicRoot);
const baseUrl = `http://127.0.0.1:${server.port}`;

/** @type {Record<string, { desktop: string; mobile: string; desktopWebp?: string; mobileWebp?: string; generatedAt: string; sourceFile: string }>} */
const manifest = {};

let generated = 0;
let skipped = 0;

const browser = await chromium.launch();
const context = await browser.newContext({ deviceScaleFactor: 1 });

try {
  for (const template of templates) {
    const htmlPath = path.join(previewRoot, template.fileName);
    if (!fs.existsSync(htmlPath)) {
      console.warn(`Skipping ${template.slug}: missing ${template.fileName}`);
      continue;
    }

    const htmlMtime = fs.statSync(htmlPath).mtimeMs;
    const desktopOut = path.join(outputDir, `${template.slug}-desktop.${POSTER_EXTENSION}`);
    const mobileOut = path.join(outputDir, `${template.slug}-mobile.${POSTER_EXTENSION}`);
    const desktopWebpOut = path.join(outputDir, `${template.slug}-desktop.${WEBP_EXTENSION}`);
    const mobileWebpOut = path.join(outputDir, `${template.slug}-mobile.${WEBP_EXTENSION}`);

    const desktopFresh =
      !forceRegenerate && fs.existsSync(desktopOut) && fs.statSync(desktopOut).mtimeMs >= htmlMtime;
    const mobileFresh =
      !forceRegenerate && fs.existsSync(mobileOut) && fs.statSync(mobileOut).mtimeMs >= htmlMtime;
    const desktopWebpFresh =
      !forceRegenerate &&
      fs.existsSync(desktopWebpOut) &&
      fs.existsSync(desktopOut) &&
      fs.statSync(desktopWebpOut).mtimeMs >= fs.statSync(desktopOut).mtimeMs;
    const mobileWebpFresh =
      !forceRegenerate &&
      fs.existsSync(mobileWebpOut) &&
      fs.existsSync(mobileOut) &&
      fs.statSync(mobileWebpOut).mtimeMs >= fs.statSync(mobileOut).mtimeMs;

    if (desktopFresh && mobileFresh && desktopWebpFresh && mobileWebpFresh) {
      skipped += 1;
      manifest[template.slug] = {
        desktop: `/previews/posters/${template.slug}-desktop.${POSTER_EXTENSION}`,
        mobile: `/previews/posters/${template.slug}-mobile.${POSTER_EXTENSION}`,
        desktopWebp: `/previews/posters/${template.slug}-desktop.${WEBP_EXTENSION}`,
        mobileWebp: `/previews/posters/${template.slug}-mobile.${WEBP_EXTENSION}`,
        generatedAt: new Date(fs.statSync(desktopOut).mtimeMs).toISOString(),
        sourceFile: template.fileName,
      };
      continue;
    }

    const previewUrl = `${baseUrl}/previews/${PREVIEW_ROOT}/${encodeURIComponent(template.fileName)}`;
    console.log(`Capturing ${template.slug} …`);

    if (!desktopFresh || !desktopWebpFresh) {
      if (desktopFresh && !desktopWebpFresh) {
        await convertPngPosterToWebp(desktopOut, desktopWebpOut);
      } else {
        await captureVariant(context, previewUrl, {
          viewport: DESKTOP_VIEWPORT,
          pngOutputPath: desktopOut,
          webpOutputPath: desktopWebpOut,
        });
      }
    }

    if (!mobileFresh || !mobileWebpFresh) {
      if (mobileFresh && !mobileWebpFresh) {
        await convertPngPosterToWebp(mobileOut, mobileWebpOut);
      } else {
        await captureVariant(context, previewUrl, {
          viewport: MOBILE_VIEWPORT,
          pngOutputPath: mobileOut,
          webpOutputPath: mobileWebpOut,
        });
      }
    }

    generated += 1;
    manifest[template.slug] = {
      desktop: `/previews/posters/${template.slug}-desktop.${POSTER_EXTENSION}`,
      mobile: `/previews/posters/${template.slug}-mobile.${POSTER_EXTENSION}`,
      desktopWebp: `/previews/posters/${template.slug}-desktop.${WEBP_EXTENSION}`,
      mobileWebp: `/previews/posters/${template.slug}-mobile.${WEBP_EXTENSION}`,
      generatedAt: new Date().toISOString(),
      sourceFile: template.fileName,
    };
  }
} finally {
  await browser.close();
  await stopStaticServer(server);
}

const existingManifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  : {};

fs.writeFileSync(
  manifestPath,
  JSON.stringify({ ...existingManifest, ...manifest }, null, 2),
  "utf8",
);

console.log(
  `Preview poster generation finished (${generated} updated, ${skipped} skipped, ${Object.keys(manifest).length} manifest entries).`,
);

/**
 * @param {string} pngPath
 * @param {string} webpPath
 */
async function convertPngPosterToWebp(pngPath, webpPath) {
  try {
    const sharpModule = await import("sharp");
    const sharp = sharpModule.default;
    await sharp(pngPath).webp({ quality: WEBP_QUALITY }).toFile(webpPath);
    console.log(`Converted ${path.basename(pngPath)} → ${path.basename(webpPath)}`);
  } catch (error) {
    console.warn(`WebP conversion failed for ${pngPath}:`, error);
  }
}

/**
 * @param {import("@playwright/test").BrowserContext} context
 * @param {string} previewUrl
 * @param {{ viewport: { width: number; height: number }; pngOutputPath: string; webpOutputPath: string }} options
 */
async function captureVariant(context, previewUrl, options) {
  const page = await context.newPage();

  try {
    await page.setViewportSize(options.viewport);
    await page.goto(previewUrl, { waitUntil: "networkidle", timeout: 120_000 });
    await page
      .waitForFunction(() => document.fonts?.ready?.then(() => true) ?? true, undefined, {
        timeout: 30_000,
      })
      .catch(() => undefined);
    await page.waitForSelector("header, section, main", { timeout: 20_000 }).catch(() => undefined);
    await delay(SETTLE_MS);

    await page.screenshot({
      path: options.pngOutputPath,
      type: "png",
      fullPage: false,
    });

    await page.screenshot({
      path: options.webpOutputPath,
      type: "webp",
      quality: WEBP_QUALITY,
      fullPage: false,
    });
  } finally {
    await page.close();
  }
}

/**
 * @param {string} rootDir
 */
function startStaticServer(rootDir) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (request, response) => {
      try {
        const requestUrl = new URL(request.url ?? "/", "http://127.0.0.1");
        const relativePath = decodeURIComponent(requestUrl.pathname);
        const filePath = path.join(rootDir, relativePath);

        if (!filePath.startsWith(rootDir)) {
          response.writeHead(403);
          response.end("Forbidden");
          return;
        }

        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
          response.writeHead(404);
          response.end("Not found");
          return;
        }

        const extension = path.extname(filePath).toLowerCase();
        const contentType =
          extension === ".html"
            ? "text/html; charset=utf-8"
            : extension === ".webp"
              ? "image/webp"
              : "application/octet-stream";

        response.writeHead(200, { "Content-Type": contentType, "Cache-Control": "no-store" });
        fs.createReadStream(filePath).pipe(response);
      } catch (error) {
        response.writeHead(500);
        response.end(String(error));
      }
    });

    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("Failed to bind preview poster static server."));
        return;
      }

      resolve({ server, port: address.port });
    });
  });
}

/**
 * @param {{ server: import("node:http").Server; port: number }} serverState
 */
function stopStaticServer(serverState) {
  return new Promise((resolve, reject) => {
    serverState.server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(undefined);
    });
  });
}
