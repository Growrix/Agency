import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { resolveAppBaseUrl } from "@/lib/site";
import { getRuntimeConfig, resetRuntimeConfigForTests } from "@/server/config/runtime";

describe("resolveAppBaseUrl", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
    resetRuntimeConfigForTests();
  });

  it("uses production domain when env is unset in production", () => {
    process.env.NODE_ENV = "production";
    delete process.env.NEXT_PUBLIC_SITE_URL;
    assert.equal(resolveAppBaseUrl(), "https://www.growrixos.com");
  });

  it("rejects loopback hosts in production even when env is set", () => {
    process.env.NODE_ENV = "production";
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:5000";
    assert.equal(resolveAppBaseUrl(), "https://www.growrixos.com");
  });

  it("allows localhost in non-production when env is set", () => {
    process.env.NODE_ENV = "development";
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:5000";
    assert.equal(resolveAppBaseUrl(), "http://localhost:5000");
  });

  it("defaults to localhost in development when env is unset", () => {
    process.env.NODE_ENV = "development";
    delete process.env.NEXT_PUBLIC_SITE_URL;
    assert.equal(resolveAppBaseUrl(), "http://localhost:5000");
  });

  it("feeds runtime config appBaseUrl in production", () => {
    process.env.NODE_ENV = "production";
    delete process.env.NEXT_PUBLIC_SITE_URL;
    resetRuntimeConfigForTests();
    assert.equal(getRuntimeConfig().appBaseUrl, "https://www.growrixos.com");
  });
});
