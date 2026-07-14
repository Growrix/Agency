import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { resetRuntimeConfigForTests } from "@/server/config/runtime";
import {
  EMAIL_BRAND,
  buildBrandedEmailHtml,
  buildHighlightedCallout,
  formatEmailDate,
  resolveTransactionalFromEmail,
} from "@/server/domain/email-layout";

describe("email layout", () => {
  const env = process.env as Record<string, string | undefined>;
  const originalNodeEnv = env.NODE_ENV;
  const originalSiteUrl = env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    env.NODE_ENV = originalNodeEnv;
    env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    resetRuntimeConfigForTests();
  });

  it("uses production domain in branded footer links when env is unset", () => {
    env.NODE_ENV = "production";
    delete env.NEXT_PUBLIC_SITE_URL;
    resetRuntimeConfigForTests();

    const html = buildBrandedEmailHtml({
      title: "Payment invoice ready",
      bodyHtml: "<p>Body</p>",
    });

    assert.match(html, /href="https:\/\/www\.growrixos\.com"/);
    assert.doesNotMatch(html, /localhost/);
  });

  it("normalizes sender display name to Growrix OS", () => {
    assert.equal(resolveTransactionalFromEmail("Growrix <hello@growrixos.com>"), "Growrix OS <hello@growrixos.com>");
    assert.equal(resolveTransactionalFromEmail("hello@growrixos.com"), "Growrix OS <hello@growrixos.com>");
  });

  it("builds branded html with highlighted callout", () => {
    const html = buildBrandedEmailHtml({
      title: "Payment invoice ready",
      preheader: "Invoice ready",
      bodyHtml: `${buildHighlightedCallout("Our team will contact you soon for further procedures.")}<p>Body</p>`,
    });

    assert.match(html, /Growrix OS/);
    assert.match(html, /Our team will contact you soon for further procedures\./);
    assert.ok(html.includes(EMAIL_BRAND.primary));
  });

  it("formats due dates for customer-facing emails", () => {
    const formatted = formatEmailDate("2026-07-27T16:34:03.580Z");
    assert.match(formatted, /2026/);
    assert.doesNotMatch(formatted, /T16:34:03\.580Z/);
  });
});
