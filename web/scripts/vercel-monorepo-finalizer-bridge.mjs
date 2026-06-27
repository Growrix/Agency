/**
 * Vercel Git Integration finalizer workaround for monorepo Root Directory = web/.
 *
 * Next.js 16 post-build validation can look for manifests at /vercel/path0/.next/
 * while the app builds into /vercel/path0/web/.next/. This script mirrors the
 * app output (and node_modules) to the repository root when running on Vercel.
 *
 * @see https://github.com/vercel/vercel/issues/15937
 */
import fs from "node:fs";
import path from "node:path";

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

function main() {
  if (process.env.VERCEL !== "1") {
    log("skip: VERCEL env not set");
    return;
  }

  const appRoot = process.cwd();
  const repoRoot = path.resolve(appRoot, "..");
  const appNext = path.join(appRoot, ".next");
  const repoNext = path.join(repoRoot, ".next");
  const appNodeModules = path.join(appRoot, "node_modules");
  const repoNodeModules = path.join(repoRoot, "node_modules");

  if (!fs.existsSync(appNext)) {
    console.error("[vercel-monorepo-bridge] error: .next missing after build");
    process.exit(1);
  }

  log(`appRoot=${appRoot}`);
  log(`repoRoot=${repoRoot}`);

  const symlinkedNext = symlinkDirectory(appNext, repoNext);
  if (!symlinkedNext) {
    const copied = copyCriticalFiles(appNext, repoNext);
    log(`copied ${copied} manifest file(s) into ${repoNext}`);
  } else {
    copyCriticalFiles(appNext, repoNext);
  }

  if (fs.existsSync(appNodeModules)) {
    symlinkDirectory(appNodeModules, repoNodeModules);
  } else {
    log("skip node_modules bridge: app node_modules missing");
  }

  log("bridge complete");
}

main();
