import { describe, expect, it } from "vitest";
import { isSanityCdnImage, sanityThumbSrc, toSanityCdnImageSrc } from "@/lib/sanity-image";

const SAMPLE =
  "https://cdn.sanity.io/images/1tk4ulcx/production/27005b25e072812a31afdad797eac599f5b4eb21-1907x913.png";

describe("sanity-image", () => {
  it("detects Sanity CDN hosts", () => {
    expect(isSanityCdnImage(SAMPLE)).toBe(true);
    expect(isSanityCdnImage("/images/local.jpg")).toBe(false);
  });

  it("appends width and format params for Sanity URLs", () => {
    const url = toSanityCdnImageSrc(SAMPLE, 96);
    expect(url).toContain("w=96");
    expect(url).toContain("auto=format");
    expect(url).toContain("fit=max");
  });

  it("passes through non-Sanity URLs unchanged", () => {
    expect(toSanityCdnImageSrc("/images/foo.jpg", 640)).toBe("/images/foo.jpg");
  });

  it("doubles thumb display width for retina", () => {
    expect(sanityThumbSrc(SAMPLE, 44)).toContain("w=88");
  });
});
