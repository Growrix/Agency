import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["tests/**/*.test.ts", "src/**/*.test.ts"],
    fileParallelism: false,
    alias: [
      { find: /^@\//, replacement: `${path.resolve(projectRoot, "src")}/` },
      { find: "server-only", replacement: path.resolve(projectRoot, "tests/mocks/server-only.ts") },
    ],
  },
  resolve: {
    tsconfigPaths: true,
    alias: [
      { find: /^@\//, replacement: `${path.resolve(projectRoot, "src")}/` },
      { find: "server-only", replacement: path.resolve(projectRoot, "tests/mocks/server-only.ts") },
    ],
  },
});
