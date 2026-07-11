import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";

const SOURCE_ORIGIN = "https://lumoria.wpenginepowered.com";
const SOURCE_HOSTS = new Set(["lumoria.wpenginepowered.com", "lumoria.wpengine.com"]);
const PAGE_LIMIT = 90;
const ASSET_PREFIX = "/lumoria-assets";

const START_ROUTES = [
  "/",
  "/404",
  "/about",
  "/blog",
  "/career-listing",
  "/contact-us",
  "/core-values",
  "/faq",
  "/listings/designing-tomorrows-cities",
  "/our-awards",
  "/our-history",
  "/our-process",
  "/our-services",
  "/our-team",
  "/portfolio-style-2",
  "/portfolio-style1",
  "/pricing-plan",
  "/sustainable-construction-for-long-term-living",
  "/urban-development-for-the-next-generation",
  "/wdt-careers/project-assistant",
  "/wdt-services/custom-construction",
  "/with-left-sidebar",
  "/with-right-sidebar",
  "/home-2",
  "/home-3",
  "/home-4",
];

const ASSET_EXTENSION_REGEX =
  /\.(?:css|js|mjs|png|jpe?g|webp|gif|svg|ico|woff2?|ttf|eot|otf|avif|mp4|webm|mp3|wav|pdf|map|json)$/i;

const PAGE_OUTPUT_ROOT = path.join(process.cwd(), "public", "lumoria-pages");
const ASSET_OUTPUT_ROOT = path.join(process.cwd(), "public", "lumoria-assets");

function normalizePagePath(input) {
  const withoutHash = input.split("#")[0] ?? "";
  const withoutQuery = withoutHash.split("?")[0] ?? "";
  const clean = withoutQuery.trim();

  if (!clean || clean === "/") {
    return "/";
  }

  return `/${clean.replace(/^\/+|\/+$/g, "")}/`;
}

function isSameDomain(url) {
  return SOURCE_HOSTS.has(url.hostname.toLowerCase());
}

function toAbsoluteUrl(rawValue, baseUrl) {
  if (!rawValue) {
    return null;
  }

  if (
    rawValue.startsWith("#") ||
    rawValue.startsWith("mailto:") ||
    rawValue.startsWith("tel:") ||
    rawValue.startsWith("javascript:") ||
    rawValue.startsWith("data:")
  ) {
    return null;
  }

  try {
    if (rawValue.startsWith("//")) {
      return new URL(`https:${rawValue}`);
    }

    return new URL(rawValue, baseUrl);
  } catch {
    return null;
  }
}

function isAssetPath(pathname) {
  if (ASSET_EXTENSION_REGEX.test(pathname)) {
    return true;
  }

  return (
    pathname.startsWith("/wp-content/") ||
    pathname.startsWith("/wp-includes/") ||
    pathname.startsWith("/wp-admin/")
  );
}

function shouldCrawlPage(pagePath) {
  if (pagePath === "/") {
    return true;
  }

  if (pagePath.length > 140) {
    return false;
  }

  const decoded = decodeURIComponent(pagePath);

  if (decoded.includes(" ") || decoded.includes(",") || decoded.includes("=")) {
    return false;
  }

  if (pagePath.includes("/feed/") || pagePath.includes("/page/")) {
    return false;
  }

  const blockedPrefixes = [
    "/feed/",
    "/comments/",
    "/wp-json/",
    "/wp-admin/",
    "/wp-content/",
    "/wp-includes/",
    "/author/",
    "/category/",
    "/tag/",
    "/?",
    "/xmlrpc.php",
    "/rtl-demo/",
  ];

  if (blockedPrefixes.some((prefix) => pagePath.startsWith(prefix))) {
    return false;
  }

  const pathWithoutTrailingSlash = pagePath.endsWith("/")
    ? pagePath.slice(0, -1)
    : pagePath;

  return !ASSET_EXTENSION_REGEX.test(pathWithoutTrailingSlash);
}

function toLocalAssetPath(absoluteUrl) {
  return `${ASSET_PREFIX}${absoluteUrl.pathname}`;
}

function routeToSnapshotFile(routePath) {
  if (routePath === "/") {
    return path.join(PAGE_OUTPUT_ROOT, "index.html");
  }

  const parts = routePath.slice(1, -1).split("/");
  return path.join(PAGE_OUTPUT_ROOT, ...parts, "index.html");
}

function resolveAssetFilePath(assetUrl) {
  const relative = assetUrl.pathname.replace(/^\/+/, "");
  return path.join(ASSET_OUTPUT_ROOT, ...relative.split("/"));
}

function rewriteSrcset(srcsetValue, baseUrl, pageLinks, assetUrls) {
  const entries = srcsetValue
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  const rewritten = entries.map((entry) => {
    const [urlToken, ...descriptor] = entry.split(/\s+/);
    const absolute = toAbsoluteUrl(urlToken, baseUrl);

    if (!absolute || !isSameDomain(absolute)) {
      return entry;
    }

    assetUrls.add(absolute.toString());
    const localAsset = toLocalAssetPath(absolute);

    return descriptor.length > 0
      ? `${localAsset} ${descriptor.join(" ")}`
      : localAsset;
  });

  return rewritten.join(", ");
}

function rewriteUrlValue(rawValue, baseUrl, pageLinks, assetUrls, forceAsset = false) {
  const absolute = toAbsoluteUrl(rawValue, baseUrl);

  if (!absolute || !isSameDomain(absolute)) {
    return rawValue;
  }

  if (forceAsset || isAssetPath(absolute.pathname)) {
    assetUrls.add(absolute.toString());
    return toLocalAssetPath(absolute);
  }

  const pagePath = normalizePagePath(absolute.pathname);

  if (shouldCrawlPage(pagePath)) {
    pageLinks.add(pagePath);
  }

  return pagePath;
}

function rewriteStyleUrls(styleValue, baseUrl, assetUrls) {
  return styleValue.replace(/url\(([^)]+)\)/gi, (full, token) => {
    const cleaned = token.trim().replace(/^['"]|['"]$/g, "");
    const absolute = toAbsoluteUrl(cleaned, baseUrl);

    if (!absolute || !isSameDomain(absolute)) {
      return full;
    }

    assetUrls.add(absolute.toString());

    const quote = token.includes('"') ? '"' : token.includes("'") ? "'" : "";
    return `url(${quote}${toLocalAssetPath(absolute)}${quote})`;
  });
}

function rewriteEscapedDomainStrings(content) {
  return content
    .replace(/https?:\/\/lumoria\.wpenginepowered\.com/gi, "")
    .replace(/https?:\/\/lumoria\.wpengine\.com/gi, "")
    .replace(/\/\/lumoria\.wpenginepowered\.com/gi, "")
    .replace(/\/\/lumoria\.wpengine\.com/gi, "")
    .replace(/https:\\\/\\\/lumoria\.wpenginepowered\.com/gi, "")
    .replace(/https:\\\/\\\/lumoria\.wpengine\.com/gi, "");
}

function rewriteCssContent(cssText, cssUrl, assetQueue) {
  const rewrittenDomains = rewriteEscapedDomainStrings(cssText);

  return rewrittenDomains.replace(/url\(([^)]+)\)/gi, (full, token) => {
    const cleaned = token.trim().replace(/^['"]|['"]$/g, "");

    if (
      !cleaned ||
      cleaned.startsWith("data:") ||
      cleaned.startsWith("#") ||
      cleaned.startsWith("var(")
    ) {
      return full;
    }

    const absolute = toAbsoluteUrl(cleaned, cssUrl);

    if (!absolute || !isSameDomain(absolute)) {
      return full;
    }

    assetQueue.add(absolute.toString());

    const quote = token.includes('"') ? '"' : token.includes("'") ? "'" : "";
    return `url(${quote}${toLocalAssetPath(absolute)}${quote})`;
  });
}

async function ensureDirForFile(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function resetOutputDirs() {
  await fs.rm(PAGE_OUTPUT_ROOT, { recursive: true, force: true });
  await fs.rm(ASSET_OUTPUT_ROOT, { recursive: true, force: true });
  await fs.mkdir(PAGE_OUTPUT_ROOT, { recursive: true });
  await fs.mkdir(ASSET_OUTPUT_ROOT, { recursive: true });
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "LumoriaLocalReplicaBot/1.0",
      accept: "text/html,application/xhtml+xml",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
}

async function fetchBinary(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "LumoriaLocalReplicaBot/1.0",
      accept: "*/*",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch asset ${url}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  return {
    buffer,
    contentType: response.headers.get("content-type") ?? "",
  };
}

async function generatePageSnapshots() {
  const queue = [...new Set(START_ROUTES.map(normalizePagePath))];
  const processed = new Set();
  const assetUrls = new Set();

  while (queue.length > 0 && processed.size < PAGE_LIMIT) {
    const routePath = queue.shift();

    if (!routePath || processed.has(routePath)) {
      continue;
    }

    processed.add(routePath);

    const sourceUrl = new URL(routePath, SOURCE_ORIGIN).toString();
    console.log(`- Page ${processed.size}: ${routePath}`);

    let html;

    try {
      html = await fetchText(sourceUrl);
    } catch (error) {
      console.warn(`  Skipped page ${routePath}: ${error.message}`);
      continue;
    }

    const $ = load(html, { decodeEntities: false });
    const discoveredPages = new Set();

    $("a[href]").each((_, node) => {
      const element = $(node);
      const current = element.attr("href");

      if (!current) {
        return;
      }

      const rewritten = rewriteUrlValue(current, sourceUrl, discoveredPages, assetUrls, false);
      element.attr("href", rewritten);
    });

    $("link[href]").each((_, node) => {
      const element = $(node);
      const current = element.attr("href");

      if (!current) {
        return;
      }

      const rel = (element.attr("rel") ?? "").toLowerCase();
      const forceAsset = rel.includes("stylesheet") || rel.includes("icon") || rel.includes("preload");
      const rewritten = rewriteUrlValue(current, sourceUrl, discoveredPages, assetUrls, forceAsset);
      element.attr("href", rewritten);
    });

    $(
      "script[src], img[src], img[data-src], img[data-lazy-src], source[src], video[src], video[poster], iframe[src]"
    ).each((_, node) => {
      const element = $(node);

      ["src", "data-src", "data-lazy-src", "poster"].forEach((attr) => {
        const value = element.attr(attr);

        if (!value) {
          return;
        }

        const rewritten = rewriteUrlValue(value, sourceUrl, discoveredPages, assetUrls, true);
        element.attr(attr, rewritten);
      });
    });

    $("meta[property='og:image'][content], meta[name='twitter:image'][content]").each((_, node) => {
      const element = $(node);
      const current = element.attr("content");

      if (!current) {
        return;
      }

      const rewritten = rewriteUrlValue(current, sourceUrl, discoveredPages, assetUrls, true);
      element.attr("content", rewritten);
    });

    $("source[srcset], img[srcset]").each((_, node) => {
      const element = $(node);
      const value = element.attr("srcset");

      if (!value) {
        return;
      }

      element.attr("srcset", rewriteSrcset(value, sourceUrl, discoveredPages, assetUrls));
    });

    $("form[action]").each((_, node) => {
      const element = $(node);

      ["action"].forEach((attr) => {
        const value = element.attr(attr);

        if (!value) {
          return;
        }

        const rewritten = rewriteUrlValue(value, sourceUrl, discoveredPages, assetUrls, false);
        element.attr(attr, rewritten);
      });
    });

    $("[style]").each((_, node) => {
      const element = $(node);
      const style = element.attr("style");

      if (!style) {
        return;
      }

      element.attr("style", rewriteStyleUrls(style, sourceUrl, assetUrls));
    });

    const canonical = $("link[rel='canonical']");

    if (canonical.length > 0) {
      canonical.attr("href", routePath);
    }

    let rewrittenHtml = $.html();
    rewrittenHtml = rewriteEscapedDomainStrings(rewrittenHtml);

    const outputFile = routeToSnapshotFile(routePath);
    await ensureDirForFile(outputFile);
    await fs.writeFile(outputFile, rewrittenHtml, "utf8");

    for (const discovered of discoveredPages) {
      if (!processed.has(discovered) && !queue.includes(discovered) && shouldCrawlPage(discovered)) {
        queue.push(discovered);
      }
    }
  }

  return {
    pageCount: processed.size,
    assetUrls,
  };
}

async function ensureNotFoundSnapshot() {
  const outputFile = routeToSnapshotFile("/404/");

  try {
    await fs.access(outputFile);
    return;
  } catch {
    // Continue and create it.
  }

  const response = await fetch(
    "https://lumoria.wpenginepowered.com/this-path-should-trigger-404-template/",
    {
      headers: {
        "user-agent": "LumoriaLocalReplicaBot/1.0",
        accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    }
  );

  const html = await response.text();
  const rewritten = rewriteEscapedDomainStrings(html);

  await ensureDirForFile(outputFile);
  await fs.writeFile(outputFile, rewritten, "utf8");
}

async function downloadAssets(initialAssets) {
  const queue = [...initialAssets];
  const seen = new Set();
  let downloadedCount = 0;

  for (let index = 0; index < queue.length; index += 1) {
    const assetUrl = queue[index];

    if (!assetUrl || seen.has(assetUrl)) {
      continue;
    }

    seen.add(assetUrl);

    let parsed;

    try {
      parsed = new URL(assetUrl);
    } catch {
      continue;
    }

    if (!isSameDomain(parsed) || parsed.pathname.endsWith("/")) {
      continue;
    }

    try {
      const { buffer, contentType } = await fetchBinary(assetUrl);
      const outputPath = resolveAssetFilePath(parsed);
      await ensureDirForFile(outputPath);

      const isCss =
        parsed.pathname.toLowerCase().endsWith(".css") || contentType.toLowerCase().includes("text/css");

      if (isCss) {
        const cssText = buffer.toString("utf8");
        const rewritten = rewriteCssContent(cssText, assetUrl, {
          add: (value) => {
            if (!seen.has(value) && !queue.includes(value)) {
              queue.push(value);
            }
          },
        });

        await fs.writeFile(outputPath, rewritten, "utf8");
      } else {
        await fs.writeFile(outputPath, buffer);
      }

      downloadedCount += 1;
    } catch (error) {
      console.warn(`  Asset skipped: ${assetUrl} (${error.message})`);
    }
  }

  return downloadedCount;
}

async function main() {
  console.log("Preparing output folders...");
  await resetOutputDirs();

  console.log("Generating local page snapshots...");
  const { pageCount, assetUrls } = await generatePageSnapshots();

  console.log("Downloading localized assets...");
  const assetCount = await downloadAssets(assetUrls);

  console.log("Ensuring local 404 snapshot...");
  await ensureNotFoundSnapshot();

  console.log("Done.");
  console.log(`Pages generated: ${pageCount}`);
  console.log(`Assets localized: ${assetCount}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
