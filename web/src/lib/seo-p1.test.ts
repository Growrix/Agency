import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildProductSeoTitle } from "@/lib/product-seo";
import { getServiceSeoTitle } from "@/lib/service-seo-titles";
import { buildShopFilterOptions } from "@/lib/shop-filters";

describe("buildProductSeoTitle", () => {
  it("turns profile storefront names into keyword-led titles", () => {
    assert.equal(
      buildProductSeoTitle({ name: "Profile 04 - Law Firm", categorySlug: "html-business-profiles" }),
      "Law Firm HTML Business Profile Template",
    );
  });

  it("appends the product type to website template names", () => {
    assert.equal(
      buildProductSeoTitle({ name: "AquaVerde Pool", categorySlug: "website-templates-html-preview" }),
      "AquaVerde Pool HTML Website Template",
    );
  });

  it("does not double up when the name already says template", () => {
    assert.equal(
      buildProductSeoTitle({ name: "Starter Template", categorySlug: "website-templates-html-preview" }),
      "Starter Template",
    );
  });

  it("leaves other categories untouched", () => {
    assert.equal(buildProductSeoTitle({ name: "SEO Toolkit", categorySlug: "seo-toolkits" }), "SEO Toolkit");
  });
});

describe("getServiceSeoTitle", () => {
  it("uses a keyword-led title for known services", () => {
    assert.equal(getServiceSeoTitle("technical-seo", "Technical SEO"), "Technical SEO Setup Services");
  });

  it("falls back to the service title for unknown slugs", () => {
    assert.equal(getServiceSeoTitle("new-service", "Brand Design"), "Brand Design Services");
  });
});

describe("buildShopFilterOptions", () => {
  const template = (type: string, industry: string) => ({
    category: "Website Templates",
    categorySlug: "website-templates-html-preview",
    type,
    typeSlug: "website-template-html",
    industry,
    industrySlug: "website-templates",
  });

  it("does not label a shared slug with whichever product came last", () => {
    const options = buildShopFilterOptions([
      template("Healthcare", "Dentistry"),
      template("Construction & Trades", "Construction"),
      template("Real Estate", "Realty"),
    ]);

    assert.deepEqual(options.types, [{ value: "website-template-html", label: "Website Templates" }]);
    assert.deepEqual(options.industries, [{ value: "website-templates", label: "Website Templates" }]);
  });

  it("keeps the real label when every product with a slug agrees", () => {
    const options = buildShopFilterOptions([
      {
        category: "HTML Business Profiles",
        categorySlug: "html-business-profiles",
        type: "Local Services",
        typeSlug: "local-services",
        industry: "Legal",
        industrySlug: "legal",
      },
      {
        category: "HTML Business Profiles",
        categorySlug: "html-business-profiles",
        type: "Local Services",
        typeSlug: "local-services",
        industry: "Legal",
        industrySlug: "legal",
      },
    ]);

    assert.deepEqual(options.types, [{ value: "local-services", label: "Local Services" }]);
    assert.deepEqual(options.industries, [{ value: "legal", label: "Legal" }]);
  });
});
