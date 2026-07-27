import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const tsxBinary =
  process.platform === "win32"
    ? path.join(webRoot, "node_modules", ".bin", "tsx.cmd")
    : path.join(webRoot, "node_modules", ".bin", "tsx");

const testFiles = [
  "tests/integration/intake-email-flow.test.ts",
  "tests/integration/api-flows.test.ts",
];

const result = spawnSync(tsxBinary, ["--test", "--test-concurrency=1", ...testFiles], {
  cwd: webRoot,
  stdio: "inherit",
  env: process.env,
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
