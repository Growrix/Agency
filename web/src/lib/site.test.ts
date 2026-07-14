import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { resolveAppBaseUrl } from "@/lib/site";
import { getRuntimeConfig, resetRuntimeConfigForTests } from "@/server/config/runtime";

describe("resolveAppBaseUrl", () => {
  const env = process.env as Record<string, string | undefined>;
  const originalNodeEnv = env.NODE_ENV;
  const originalSiteUrl = env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    env.NODE_ENV = originalNodeEnv;
    env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    resetRuntimeConfigForTests();
  });

  it("uses production domain when env is unset in production", () => {
    env.NODE_ENV = "production";
    delete env.NEXT_PUBLIC_SITE_URL;
    assert.equal(resolveAppBaseUrl(), "https://www.growrixos.com");
  });

  it("rejects loopback hosts in production even when env is set", () => {
    env.NODE_ENV = "production";
    env.NEXT_PUBLIC_SITE_URL = "http://localhost:5000";
    assert.equal(resolveAppBaseUrl(), "https://www.growrixos.com");
  });

  it("allows localhost in non-production when env is set", () => {
    env.NODE_ENV = "development";
    env.NEXT_PUBLIC_SITE_URL = "http://localhost:5000";
    assert.equal(resolveAppBaseUrl(), "http://localhost:5000");
  });

  it("defaults to localhost in development when env is unset", () => {
    env.NODE_ENV = "development";
    delete env.NEXT_PUBLIC_SITE_URL;
    assert.equal(resolveAppBaseUrl(), "http://localhost:5000");
  });

  it("feeds runtime config appBaseUrl in production", () => {
    env.NODE_ENV = "production";
    delete env.NEXT_PUBLIC_SITE_URL;
    resetRuntimeConfigForTests();
    assert.equal(getRuntimeConfig().appBaseUrl, "https://www.growrixos.com");
  });
});
