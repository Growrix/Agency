import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { resolveAppBaseUrl } from "@/lib/site";
import { getRuntimeConfig, resetRuntimeConfigForTests } from "@/server/config/runtime";

const testEnv = process.env as NodeJS.ProcessEnv & Record<string, string | undefined>;

function setTestEnv(key: string, value: string | undefined) {
  if (value === undefined) {
    delete testEnv[key];
    return;
  }

  testEnv[key] = value;
}

describe("resolveAppBaseUrl", () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    setTestEnv("NODE_ENV", originalNodeEnv);
    setTestEnv("NEXT_PUBLIC_SITE_URL", originalSiteUrl);
    resetRuntimeConfigForTests();
  });

  it("uses production domain when env is unset in production", () => {
    setTestEnv("NODE_ENV", "production");
    setTestEnv("NEXT_PUBLIC_SITE_URL", undefined);
    assert.equal(resolveAppBaseUrl(), "https://www.growrixos.com");
  });

  it("rejects loopback hosts in production even when env is set", () => {
    setTestEnv("NODE_ENV", "production");
    setTestEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:5000");
    assert.equal(resolveAppBaseUrl(), "https://www.growrixos.com");
  });

  it("allows localhost in non-production when env is set", () => {
    setTestEnv("NODE_ENV", "development");
    setTestEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:5000");
    assert.equal(resolveAppBaseUrl(), "http://localhost:5000");
  });

  it("defaults to localhost in development when env is unset", () => {
    setTestEnv("NODE_ENV", "development");
    setTestEnv("NEXT_PUBLIC_SITE_URL", undefined);
    assert.equal(resolveAppBaseUrl(), "http://localhost:5000");
  });

  it("feeds runtime config appBaseUrl in production", () => {
    setTestEnv("NODE_ENV", "production");
    setTestEnv("NEXT_PUBLIC_SITE_URL", undefined);
    resetRuntimeConfigForTests();
    assert.equal(getRuntimeConfig().appBaseUrl, "https://www.growrixos.com");
  });
});
