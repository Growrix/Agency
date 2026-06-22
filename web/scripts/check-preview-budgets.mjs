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
const PARAM_PATTERN = /(?:\?|&)(w|q)=(\d+)/g;

const limits = {
  w: 1280,
  q: 70,
};

const violations = [];
let scannedFiles = 0;

for (const relativeDirectory of PREVIEW_DIRECTORIES) {
  const absoluteDirectory = path.join(PROJECT_ROOT, relativeDirectory);
  if (!fs.existsSync(absoluteDirectory)) {
    continue;
  }

  const files = fs.readdirSync(absoluteDirectory).filter((entry) => entry.endsWith(".html"));
  for (const fileName of files) {
    scannedFiles += 1;
    const filePath = path.join(absoluteDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");

    for (const match of fileContents.matchAll(UNSPLASH_URL_PATTERN)) {
      const url = match[0];
      for (const paramMatch of url.matchAll(PARAM_PATTERN)) {
        const key = paramMatch[1];
        const rawValue = Number.parseInt(paramMatch[2], 10);
        const ceiling = limits[key];
        if (Number.isFinite(rawValue) && rawValue > ceiling) {
          violations.push(`${relativeDirectory}/${fileName}: ${key}=${rawValue} exceeds ${ceiling}`);
        }
      }
    }

    for (const tagMatch of fileContents.matchAll(IMG_TAG_PATTERN)) {
      const attrs = tagMatch[1] ?? "";
      const lowered = attrs.toLowerCase();
      if (!lowered.includes(" loading=")) {
        violations.push(`${relativeDirectory}/${fileName}: <img> missing loading attribute`);
      }
      if (!lowered.includes(" decoding=")) {
        violations.push(`${relativeDirectory}/${fileName}: <img> missing decoding attribute`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error("Preview performance budget check failed.");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log(`Preview performance budgets passed across ${scannedFiles} files.`);
