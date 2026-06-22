import fs from "node:fs";
import path from "node:path";

const PROJECT_ROOT = process.cwd();
const PREVIEW_DIRECTORIES = [
  "public/previews/html-template-websites",
  "public/previews/html-business-profiles",
  "public/previews/website-templates-html",
];

const UNSPLASH_URL_PATTERN = /https:\/\/images\.unsplash\.com\/[^\s"'()<>]+/g;
const IMG_TAG_PATTERN = /<img\b([^>]*)>/gi;

const limits = {
  w: 1280,
  q: 70,
};

function optimizePreviewHtml(html) {
  const withOptimizedUnsplashImages = html.replace(UNSPLASH_URL_PATTERN, (rawUrl) => {
    try {
      const parsed = new URL(rawUrl);
      const currentWidth = Number(parsed.searchParams.get("w") ?? "0");
      if (Number.isFinite(currentWidth) && currentWidth > 0) {
        parsed.searchParams.set("w", String(Math.min(currentWidth, limits.w)));
      }

      const currentQuality = Number(parsed.searchParams.get("q") ?? "0");
      if (Number.isFinite(currentQuality) && currentQuality > 0) {
        parsed.searchParams.set("q", String(Math.min(currentQuality, limits.q)));
      }

      return parsed.toString();
    } catch {
      return rawUrl;
    }
  });

  return withOptimizedUnsplashImages.replace(
    /<img(?![^>]*\bloading=)([^>]*)>/gi,
    '<img loading="lazy" decoding="async"$1>',
  );
}

let optimizedFiles = 0;

for (const relativeDirectory of PREVIEW_DIRECTORIES) {
  const absoluteDirectory = path.join(PROJECT_ROOT, relativeDirectory);
  if (!fs.existsSync(absoluteDirectory)) {
    continue;
  }

  const files = fs.readdirSync(absoluteDirectory).filter((entry) => entry.endsWith(".html"));
  for (const fileName of files) {
    const filePath = path.join(absoluteDirectory, fileName);
    const original = fs.readFileSync(filePath, "utf8");
    const optimized = optimizePreviewHtml(original);

    if (optimized !== original) {
      fs.writeFileSync(filePath, optimized, "utf8");
      optimizedFiles += 1;
    }
  }
}

console.log(`Preview HTML optimizer finished (${optimizedFiles} files updated).`);
