/**
 * Vercel Git Integration finalizer workaround for monorepo Root Directory = web/.
 *
 * Next.js 16 post-build validation can resolve paths from the repository root
 * (/vercel/path0/) instead of the app root (/vercel/path0/web/), causing ENOENT
 * for .next manifests, public assets, and node_modules.
 *
 * @see https://github.com/vercel/vercel/issues/15937
 */
import fs from "node:fs";
import path from "node:path";

const BRIDGE_DIRECTORIES = [".next", "node_modules", "public"];

const CRITICAL_NEXT_FILES = [
  "routes-manifest.json",
  "routes-manifest-deterministic.json",
  "BUILD_ID",
  "prerender-manifest.json",
  "build-manifest.json",
  "app-path-routes-manifest.json",
  "app-paths-manifest.json",
  "required-server-files.json",
  "export-marker.json",
  "images-manifest.json",
  "react-loadable-manifest.json",
];

function log(message) {
  console.log(`[vercel-monorepo-bridge] ${message}`);
}

function symlinkDirectory(source, target) {
  if (fs.existsSync(target)) {
    const stat = fs.lstatSync(target);
    if (stat.isSymbolicLink()) {
      const resolved = fs.realpathSync(target);
      if (resolved === source) {
        log(`symlink already present: ${target} -> ${source}`);
        return true;
      }
      fs.unlinkSync(target);
    } else {
      log(`skip symlink; path exists and is not a symlink: ${target}`);
      return false;
    }
  }

  const linkType = process.platform === "win32" ? "junction" : "dir";
  fs.symlinkSync(source, target, linkType);
  log(`symlink created: ${target} -> ${source}`);
  return true;
}

function copyCriticalFiles(sourceDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });

  let copied = 0;
  for (const fileName of CRITICAL_NEXT_FILES) {
    const sourcePath = path.join(sourceDir, fileName);
    if (!fs.existsSync(sourcePath)) {
      continue;
    }

    const targetPath = path.join(targetDir, fileName);
    fs.copyFileSync(sourcePath, targetPath);
    copied += 1;
    log(`copied ${fileName}`);
  }

  return copied;
}

/**
 * Merge files from web/public into repo-root public when a symlink is blocked.
 * web/public is the canonical superset; only missing or newer files are copied.
 */
function mergePublicAssets(sourceDir, targetDir) {
  let copied = 0;
  let updated = 0;

  function walk(relativePath = "") {
    const sourcePath = path.join(sourceDir, relativePath);
    const entries = fs.readdirSync(sourcePath, { withFileTypes: true });

    for (const entry of entries) {
      const rel = relativePath ? path.join(relativePath, entry.name) : entry.name;
      const src = path.join(sourceDir, rel);
      const tgt = path.join(targetDir, rel);

      if (entry.isDirectory()) {
        fs.mkdirSync(tgt, { recursive: true });
        walk(rel);
        continue;
      }

      if (!fs.existsSync(tgt)) {
        fs.mkdirSync(path.dirname(tgt), { recursive: true });
        fs.copyFileSync(src, tgt);
        copied += 1;
        continue;
      }

      const srcStat = fs.statSync(src);
      const tgtStat = fs.statSync(tgt);
      if (srcStat.size !== tgtStat.size || srcStat.mtimeMs > tgtStat.mtimeMs) {
        fs.copyFileSync(src, tgt);
        updated += 1;
      }
    }
  }

  fs.mkdirSync(targetDir, { recursive: true });
  walk();
  return { copied, updated };
}

function bridgePublicDirectory(appRoot, repoRoot) {
  const source = path.join(appRoot, "public");
  const target = path.join(repoRoot, "public");

  if (!fs.existsSync(source)) {
    log(`skip public bridge: source missing at ${source}`);
    return;
  }

  if (symlinkDirectory(source, target)) {
    return;
  }

  // A real repo-root public/ directory (legacy duplicate tree) blocks symlinks.
  // web/public is the canonical superset — replace the blocker so finalizer resolves assets once.
  log(`replacing blocking directory at ${target} for public symlink bridge`);
  fs.rmSync(target, { recursive: true, force: true });

  if (symlinkDirectory(source, target)) {
    return;
  }

  log("public symlink still blocked; merging canonical assets into repo-root public");
  fs.mkdirSync(target, { recursive: true });
  const { copied, updated } = mergePublicAssets(source, target);
  log(`merged public assets: ${copied} copied, ${updated} updated`);
}

function bridgeDirectory(appRoot, repoRoot, directoryName) {
  if (directoryName === "public") {
    bridgePublicDirectory(appRoot, repoRoot);
    return;
  }

  const source = path.join(appRoot, directoryName);
  const target = path.join(repoRoot, directoryName);

  if (!fs.existsSync(source)) {
    log(`skip ${directoryName} bridge: source missing at ${source}`);
    return;
  }

  symlinkDirectory(source, target);
}

function main() {
  if (process.env.VERCEL !== "1") {
    log("skip: VERCEL env not set");
    return;
  }

  const appRoot = process.cwd();
  const repoRoot = path.resolve(appRoot, "..");
  const appNext = path.join(appRoot, ".next");
  const repoNext = path.join(repoRoot, ".next");

  if (!fs.existsSync(appNext)) {
    console.error("[vercel-monorepo-bridge] error: .next missing after build");
    process.exit(1);
  }

  log(`appRoot=${appRoot}`);
  log(`repoRoot=${repoRoot}`);

  for (const directoryName of BRIDGE_DIRECTORIES) {
    if (directoryName === ".next") {
      const symlinkedNext = symlinkDirectory(appNext, repoNext);
      if (!symlinkedNext) {
        const copied = copyCriticalFiles(appNext, repoNext);
        log(`copied ${copied} manifest file(s) into ${repoNext}`);
      } else {
        copyCriticalFiles(appNext, repoNext);
      }
      continue;
    }

    bridgeDirectory(appRoot, repoRoot, directoryName);
  }

  log("bridge complete");
}

main();
