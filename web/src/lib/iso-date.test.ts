import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { toIsoDateOnly } from "@/lib/iso-date";
import { buildBlogPostingSchema } from "@/lib/seo-structured-data";

describe("toIsoDateOnly", () => {
  it("trims an ISO datetime to a date", () => {
    assert.equal(toIsoDateOnly("2026-09-16T11:05:57.000Z"), "2026-09-16");
  });

  it("keeps a plain date", () => {
    assert.equal(toIsoDateOnly("2026-01-05"), "2026-01-05");
  });

  it("rejects missing, malformed, and impossible dates", () => {
    assert.equal(toIsoDateOnly(undefined), undefined);
    assert.equal(toIsoDateOnly(null), undefined);
    assert.equal(toIsoDateOnly(""), undefined);
    assert.equal(toIsoDateOnly("Date TBD"), undefined);
    assert.equal(toIsoDateOnly("2026-13-40"), undefined);
    assert.equal(toIsoDateOnly("2026-02-30"), undefined);
  });
});

describe("buildBlogPostingSchema", () => {
  const base = {
    title: "Post",
    description: "Desc",
    slug: "post",
    authorName: "Author",
  };

  it("emits datePublished for a valid date", () => {
    const schema = buildBlogPostingSchema({ ...base, publishedAt: "2026-09-16" }) as Record<string, unknown>;
    assert.equal(schema.datePublished, "2026-09-16");
  });

  it("omits datePublished instead of emitting an empty or invalid value", () => {
    const schema = buildBlogPostingSchema({ ...base, publishedAt: "" }) as Record<string, unknown>;
    assert.equal("datePublished" in schema, false);
  });
});
