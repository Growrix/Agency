import { existsSync } from "node:fs";
import { spawnSync, spawn } from "node:child_process";
import path from "node:path";

const REQUIRED_NODE_MAJOR = 20;
const studioRoot = process.cwd();

function fail(message) {
  console.error(message);
  process.exit(1);
}

function runInstallIfNeeded() {
  const requiredPkgFiles = [
    "sanity/package.json",
    "react/package.json",
    "react-dom/package.json",
    "@sanity/vision/package.json",
    "date-fns/package.json",
  ].map((rel) => path.join(studioRoot, "node_modules", ...rel.split("/")));

  const missing = requiredPkgFiles.filter((pkgFile) => !existsSync(pkgFile));

  if (missing.length === 0) {
    return;
  }

  console.log("[studio] Missing dependencies detected. Running npm install...");
  const install = spawnSync("npm", ["install"], {
    cwd: studioRoot,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (install.status !== 0) {
    fail("[studio] npm install failed. Fix install issues and retry `npm run dev`.");
  }
}

const currentNodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
if (currentNodeMajor !== REQUIRED_NODE_MAJOR) {
  fail(
    `[studio] Node ${REQUIRED_NODE_MAJOR}.x is required. Current: ${process.version}. Run fnm use 20 and retry.`,
  );
}

runInstallIfNeeded();

const sanityCommand = "npm";
const sanityArgs = ["exec", "sanity", "--", "dev", "--host", "0.0.0.0", "--port", "3333"];

const child = spawn(sanityCommand, sanityArgs, {
  cwd: studioRoot,
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
