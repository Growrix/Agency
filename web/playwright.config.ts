import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  workers: 1,
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:5000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "node ./scripts/playwright-server.mjs",
    url: "http://127.0.0.1:5000",
    reuseExistingServer: true,
    timeout: 120_000,
    env: {
      AGENCY_DATA_DIRECTORY: path.join(__dirname, ".data", "playwright"),
      NEXT_PUBLIC_SITE_URL: "http://127.0.0.1:5000",
      AUTH_JWT_SECRET: "test-secret-key-123!",
      ADMIN_EMAIL: "admin@growrix.test",
      ADMIN_PASSWORD: "Admin123!",
    },
  },
  projects: [
    {
      name: "desktop-chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "tablet-safari",
      use: { ...devices["iPad (gen 7)"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
});