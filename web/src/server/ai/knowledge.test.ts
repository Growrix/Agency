import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { SERVICES } from "@/lib/content";
import { buildStaticKnowledgeDocuments, PUBLIC_SERVICE_SLUGS } from "@/lib/concierge-knowledge-sources";
import { FAQ_QUESTIONS } from "@/lib/faq-content";
import { composeKnowledgeDocuments, searchKnowledgeDocuments } from "@/server/ai/knowledge";

function buildTestDocuments() {
  const serviceDocs = SERVICES.filter((service) =>
    (PUBLIC_SERVICE_SLUGS as readonly string[]).includes(service.slug),
  ).map((service) => ({
    id: `service-${service.slug}`,
    label: service.name,
    sourcePath: `/services/${service.slug}`,
    sourceType: "service" as const,
    content: `${service.name}. ${service.short} ${service.long}`,
  }));

  return composeKnowledgeDocuments({
    serviceDocs,
    portfolio: [],
    products: [],
    faqQuestions: FAQ_QUESTIONS,
    whatsappHref: "https://wa.me/8801986925425",
  });
}

function topContent(query: string) {
  return searchKnowledgeDocuments(query, buildTestDocuments(), 3)
    .map((document) => document.content)
    .join(" ");
}

function hasMatch(query: string, pattern: RegExp) {
  return searchKnowledgeDocuments(query, buildTestDocuments(), 5).some((document) =>
    pattern.test(`${document.id} ${document.content}`),
  );
}

describe("concierge knowledge sources", () => {
  it("includes canonical marketplace pricing documents", () => {
    const documents = buildStaticKnowledgeDocuments("https://wa.me/8801986925425");
    const htmlProfiles = documents.find((document) => document.id === "pricing-html-business-profiles");
    assert.match(htmlProfiles?.content ?? "", /\$19/);
    assert.match(htmlProfiles?.content ?? "", /\$49/);

    const livePreview = documents.find((document) => document.id === "pricing-website-templates-live-preview");
    assert.match(livePreview?.content ?? "", /\$149/);
    assert.match(livePreview?.content ?? "", /\$499/);
  });
});

describe("searchKnowledgeDocuments", () => {
  it("returns HTML business profile canonical pricing", () => {
    const content = topContent("How much is an HTML business profile?");
    assert.match(content, /\$19/);
    assert.match(content, /\$49/);
    assert.match(content, /\$299/);
  });

  it("returns website template pricing", () => {
    assert.equal(hasMatch("Website Templates price", /\$149/), true);
    assert.equal(hasMatch("Website Templates price", /\$499/), true);
  });

  it("returns current SaaS MVP pricing", () => {
    const content = topContent("SaaS MVP cost");
    assert.match(content, /\$1,?500|1 500/i);
    assert.doesNotMatch(content, /\$24,?000|24k/i);
  });

  it("returns current automation audit pricing", () => {
    const content = topContent("Automation audit price");
    assert.match(content, /\$300\b|300/i);
    assert.doesNotMatch(content, /\$3,?500|3\.5k/i);
  });

  it("surfaces the six public services including AI business systems", () => {
    const content = topContent("What services do you offer?");
    assert.match(content, /AI Business Systems/i);
    assert.match(content, /Technical SEO/i);
    assert.match(content, /Mobile Apps/i);
  });

  it("surfaces booking expectations for discovery calls", () => {
    const content = topContent("Book a discovery call");
    assert.match(content, /30 minutes/i);
    assert.match(content, /\/book-appointment/);
  });
});
