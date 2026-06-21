import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { HTML_BUSINESS_PROFILE_SHOP_CATEGORY } from "@/lib/html-business-profiles";
import { WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG } from "@/lib/website-templates-html-preview";
import {
  buildReadyMadeSolutionTabs,
  pickPreviewProducts,
} from "@/lib/ready-made-solutions";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

function mockProduct(
  partial: Partial<PublicShopProductRecord> & Pick<PublicShopProductRecord, "slug" | "name" | "categorySlug">,
): PublicShopProductRecord {
  return {
    price: "$19",
    price_cents: 1900,
    livePreviewUrl: "/previews/test.html",
    embeddedPreviewUrl: "/previews/test.html",
    parentCategoryLabel: "Business",
    parentCategorySlug: "business-professional",
    category: "Test",
    type: "Test",
    typeSlug: "test",
    industry: "Test",
    industrySlug: "test",
    published: true,
    teaser: "Teaser",
    summary: "Summary",
    audience: "Audience",
    previewVariant: "marketing",
    includes: [],
    stack: [],
    highlights: [],
    image: null,
    gallery: [],
    ...partial,
  };
}

describe("ready-made-solutions", () => {
  it("picks tail html business profiles with preview URLs", () => {
    const products = [
      mockProduct({
        slug: "html-business-profile-profile-62-tech-accelerator",
        name: "Profile 62 - Tech Accelerator",
        categorySlug: HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug,
      }),
      mockProduct({
        slug: "html-business-profile-profile-01-brew-and-bean",
        name: "Profile 01 - Brew And Bean",
        categorySlug: HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug,
      }),
    ];

    const picked = pickPreviewProducts(products, HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug, 1, "end");
    assert.equal(picked.length, 1);
    assert.equal(picked[0]?.slug, "html-business-profile-profile-62-tech-accelerator");
  });

  it("buildReadyMadeSolutionTabs includes html profiles tab when products exist", () => {
    const products = [
      mockProduct({
        slug: "website-template-html-preview-18-mint-pearl-dental",
        name: "Mint Pearl Dental",
        categorySlug: WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
        embeddedPreviewUrl: "/api/website-templates-html-preview/18-mint-pearl-dental",
        livePreviewUrl: "/api/website-templates-html-preview/18-mint-pearl-dental",
      }),
      mockProduct({
        slug: "html-business-profile-profile-65-healthcare-consulting",
        name: "Profile 65 - Healthcare Consulting",
        categorySlug: HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug,
      }),
    ];

    const result = buildReadyMadeSolutionTabs(products);
    assert.ok(result.tabs.some((tab) => tab.id === "html-business-profiles"));
    assert.equal(result.productsByTabId["html-business-profiles"]?.length, 1);
  });
});
