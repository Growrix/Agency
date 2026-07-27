import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { getRuntimeConfig, resetRuntimeConfigForTests } from "@/server/config/runtime";

const env = process.env as Record<string, string | undefined>;

describe("runtime config contact email parsing", () => {
  const originalContactToEmail = env.CONTACT_TO_EMAIL;
  const originalContactFromEmail = env.CONTACT_FROM_EMAIL;
  const originalResendApiKey = env.RESEND_API_KEY;
  const originalNodeEnv = env.NODE_ENV;

  beforeEach(() => {
    env.NODE_ENV = "test";
  });

  afterEach(() => {
    env.NODE_ENV = "test";
    resetRuntimeConfigForTests();
    env.CONTACT_TO_EMAIL = originalContactToEmail;
    env.CONTACT_FROM_EMAIL = originalContactFromEmail;
    env.RESEND_API_KEY = originalResendApiKey;
    env.NODE_ENV = originalNodeEnv;
  });

  it("parses a single CONTACT_TO_EMAIL recipient", () => {
    env.CONTACT_TO_EMAIL = "Inquiry@growrixos.com";
    env.CONTACT_FROM_EMAIL = "Growrix <hello@growrixos.com>";
    env.RESEND_API_KEY = "re_test";

    const runtime = getRuntimeConfig();
    assert.deepEqual(runtime.contact.toEmails, ["Inquiry@growrixos.com"]);
    assert.equal(runtime.contact.toEmail, "Inquiry@growrixos.com");
  });

  it("parses comma-separated CONTACT_TO_EMAIL recipients and trims whitespace", () => {
    env.CONTACT_TO_EMAIL = "Inquiry@growrixos.com, growrixos@gmail.com";
    env.CONTACT_FROM_EMAIL = "Growrix <hello@growrixos.com>";
    env.RESEND_API_KEY = "re_test";

    const runtime = getRuntimeConfig();
    assert.deepEqual(runtime.contact.toEmails, ["Inquiry@growrixos.com", "growrixos@gmail.com"]);
    assert.equal(runtime.contact.toEmail, "Inquiry@growrixos.com");
  });

  it("deduplicates CONTACT_TO_EMAIL recipients case-insensitively", () => {
    env.CONTACT_TO_EMAIL = "Inquiry@growrixos.com, inquiry@growrixos.com, growrixos@gmail.com";
    env.CONTACT_FROM_EMAIL = "Growrix <hello@growrixos.com>";
    env.RESEND_API_KEY = "re_test";

    const runtime = getRuntimeConfig();
    assert.deepEqual(runtime.contact.toEmails, ["Inquiry@growrixos.com", "growrixos@gmail.com"]);
  });

  it("returns an empty recipient list when CONTACT_TO_EMAIL is unset", () => {
    delete env.CONTACT_TO_EMAIL;
    env.CONTACT_FROM_EMAIL = "Growrix <hello@growrixos.com>";
    env.RESEND_API_KEY = "re_test";

    const runtime = getRuntimeConfig();
    assert.deepEqual(runtime.contact.toEmails, []);
    assert.equal(runtime.contact.toEmail, undefined);
  });
});
