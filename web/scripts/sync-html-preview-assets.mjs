import { cp, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(webRoot, "..");

const syncTargets = [
  {
    label: "website-templates-html",
    source: path.join(repoRoot, "Shop", "website-templates-html"),
    destination: path.join(webRoot, "data", "website-templates-html"),
  },
  {
    label: "html-business-profiles",
    source: path.join(repoRoot, "Shop", "business-professional", "business-profile-pages"),
    destination: path.join(webRoot, "data", "html-business-profiles"),
  },
];

async function copyHtmlFiles(sourceDir, destinationDir) {
  await mkdir(destinationDir, { recursive: true });
  const entries = await readdir(sourceDir, { withFileTypes: true });
  let copied = 0;

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const destinationPath = path.join(destinationDir, entry.name);

    if (entry.isDirectory()) {
      copied += await copyHtmlFiles(sourcePath, destinationPath);
      continue;
    }

    if (!entry.name.endsWith(".html")) {
      continue;
    }

    await cp(sourcePath, destinationPath);
    copied += 1;
  }

  return copied;
}

async function main() {
  for (const target of syncTargets) {
    if (!existsSync(target.source)) {
      console.warn(`[sync-html-preview-assets] skipped ${target.label}: source missing at ${target.source}`);
      continue;
    }

    const copied = await copyHtmlFiles(target.source, target.destination);
    console.log(`[sync-html-preview-assets] synced ${copied} ${target.label} file(s) to ${target.destination}`);
  }
}

main().catch((error) => {
  console.error("[sync-html-preview-assets] failed:", error);
  process.exit(1);
});
