import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { HomeCrawlableSummary } from "@/components/marketing/HomeCrawlableSummary";
import type { BlogPost } from "@/lib/content";
import type { PublicServiceRecord, PublicShopProductRecord } from "@/server/domain/catalog";

function service(slug: string, title: string): PublicServiceRecord {
  return {
    id: slug,
    slug,
    title,
    description: `${title} description`,
    short_description: `${title} short description`,
    service_type: "service",
    pricing_model: "contact",
    delivery_timeline: "2 weeks",
    pillars: [],
  };
}

function product(slug: string, name: string): PublicShopProductRecord {
  return { slug, name, price: "$149", type: "Website Templates" } as unknown as PublicShopProductRecord;
}

function post(slug: string, title: string): BlogPost {
  return { slug, title, excerpt: `${title} excerpt` } as unknown as BlogPost;
}

describe("HomeCrawlableSummary", () => {
  const html = renderToStaticMarkup(
    <HomeCrawlableSummary
      services={[service("websites", "Websites"), service("technical-seo", "Technical SEO"), service("not-public", "Hidden")]}
      featuredTemplates={[product("website-template-html-preview-bedrock-construction", "Bedrock Construction")]}
      latestBlogPosts={[post("first-post", "First post")]}
    />,
  );

  it("renders crawlable links to public services only", () => {
    assert.match(html, /href="\/services\/websites"/);
    assert.match(html, /href="\/services\/technical-seo"/);
    assert.doesNotMatch(html, /not-public/);
  });

  it("renders product, category, and blog links", () => {
    assert.match(html, /href="\/digital-products\/website-template-html-preview-bedrock-construction"/);
    assert.match(html, /href="\/digital-products\/category\/website-templates-html-preview"/);
    assert.match(html, /href="\/blog\/first-post"/);
  });

  it("does not add another h1", () => {
    assert.doesNotMatch(html, /<h1/);
  });

  it("omits the blog section when there are no posts", () => {
    const empty = renderToStaticMarkup(
      <HomeCrawlableSummary services={[]} featuredTemplates={[]} latestBlogPosts={[]} />,
    );
    assert.doesNotMatch(empty, /Latest field notes/);
  });
});
