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
  "src/lib/commerce-pricing.test.ts",
  "src/server/auth/users.test.ts",
  "src/server/auth/clerk-sync.test.ts",
  "src/server/domain/catalog.test.ts",
  "src/server/domain/orders.test.ts",
  "src/server/domain/email-templates.test.ts",
  "src/server/domain/invoices.test.ts",
  "src/server/domain/leads.test.ts",
  "src/server/data/store.test.ts",
  "src/server/ai/knowledge.test.ts",
];

const result = spawnSync(tsxBinary, ["--test", ...testFiles], {
  cwd: webRoot,
  stdio: "inherit",
  env: process.env,
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
