import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowTopRightOnSquareIcon,
  ShoppingBagIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";
import {
  HTML_BUSINESS_PROFILE_CATEGORIES,
  HTML_BUSINESS_PROFILE_SHOP_CATEGORY,
  getHtmlBusinessProfileBySlug,
} from "@/lib/html-business-profiles";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { getCheckoutHref } from "@/lib/shop";
import { listPublicShopProducts } from "@/server/domain/catalog";

export const metadata: Metadata = {
  title: "HTML Business Profiles | Preview By Category",
  description:
    "Browse and preview every built HTML Business Profile template by category, then purchase directly from the shop.",
};

type SearchParams = Promise<{
  category?: string;
  template?: string;
}>;

type QueryState = {
  category?: string;
  template?: string;
};

function buildProfilesHref(current: QueryState, patch: Partial<QueryState>) {
  const merged = { ...current, ...patch };
  const params = new URLSearchParams();

  if (merged.category) {
    params.set("category", merged.category);
  }

  if (merged.template) {
    params.set("template", merged.template);
  }

  const query = params.toString();
  return query ? `/html-business-profiles?${query}` : "/html-business-profiles";
}

function toTemplateSlug(productSlug: string) {
  return productSlug.replace(/^html-business-profile-/, "");
}

function extractProfileNumber(productSlug: string) {
  const templateSlug = toTemplateSlug(productSlug);
  const match = /^profile-(\d+)-/.exec(templateSlug);
  const value = Number.parseInt(match?.[1] ?? "", 10);
  return Number.isFinite(value) ? value : 9999;
}

function sortTemplates<T extends { slug: string; name: string }>(items: T[]) {
  return [...items].sort((first, second) => {
    const firstNumber = extractProfileNumber(first.slug);
    const secondNumber = extractProfileNumber(second.slug);
    return firstNumber - secondNumber || first.name.localeCompare(second.name);
  });
}

export default async function HtmlBusinessProfilesPage({ searchParams }: { searchParams: SearchParams }) {
  const query = await searchParams;
  const allTemplates = sortTemplates(
    await listPublicShopProducts({ category: HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug }),
  );

  const availableCategorySet = new Set(allTemplates.map((item) => item.typeSlug));
  const activeCategory = query.category && availableCategorySet.has(query.category) ? query.category : undefined;

  const visibleTemplates = activeCategory
    ? allTemplates.filter((item) => item.typeSlug === activeCategory)
    : allTemplates;

  const selectedTemplate = visibleTemplates.find((item) => item.slug === query.template)
    ?? visibleTemplates[0]
    ?? allTemplates[0]
    ?? null;

  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-45 pointer-events-none" aria-hidden />
        <Container>
          <Badge tone="primary" dot>HTML Business Profiles</Badge>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl tracking-tight text-balance">
            Preview every HTML business profile template by category.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-7 text-text-muted">
            Explore built templates across creative, local-service, and corporate categories, preview each one,
            and purchase directly from the shop.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href={`/shop?category=${HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug}`}>
              Browse in shop
            </LinkButton>
            <LinkButton href="/services/html-business-profiles" variant="outline">
              Service details
            </LinkButton>
          </div>
        </Container>
      </Section>

      <Section className="py-8" tone="inset">
        <Container>
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildProfilesHref(query, { category: undefined, template: query.template })}
              className={
                "rounded-full border px-3 py-1.5 text-sm transition-colors " +
                (!activeCategory
                  ? "border-primary bg-primary/10 font-medium text-primary"
                  : "border-border bg-surface text-text-muted hover:text-text")
              }
            >
              All categories
            </Link>
            {HTML_BUSINESS_PROFILE_CATEGORIES.filter((category) => availableCategorySet.has(category.slug)).map((category) => (
              <Link
                key={category.slug}
                href={buildProfilesHref(query, { category: category.slug, template: undefined })}
                className={
                  "rounded-full border px-3 py-1.5 text-sm transition-colors " +
                  (activeCategory === category.slug
                    ? "border-primary bg-primary/10 font-medium text-primary"
                    : "border-border bg-surface text-text-muted hover:text-text")
                }
              >
                {category.label}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {selectedTemplate ? (
            <Card className="overflow-hidden p-0">
              <div className="border-b border-border px-6 py-5 sm:px-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  Live template preview
                </p>
                <h2 className="mt-2 font-display text-2xl tracking-tight">{selectedTemplate.name}</h2>
                <p className="mt-2 text-sm leading-6 text-text-muted">{selectedTemplate.summary}</p>
              </div>
              <div className="aspect-16/10 min-h-110 bg-black">
                {selectedTemplate.embeddedPreviewUrl ? (
                  <iframe
                    src={selectedTemplate.embeddedPreviewUrl}
                    title={`${selectedTemplate.name} preview`}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-6 text-center text-sm text-white/70">
                    Preview URL is unavailable for this template.
                  </div>
                )}
              </div>
              <div className="border-t border-border px-6 py-4 sm:px-8">
                <div className="flex flex-wrap gap-3">
                  <LinkButton href={getCheckoutHref(selectedTemplate)}>
                    <ShoppingBagIcon className="size-4" /> Buy this template
                  </LinkButton>
                  {selectedTemplate.livePreviewUrl || selectedTemplate.embeddedPreviewUrl ? (
                    <LinkButton
                      href={selectedTemplate.livePreviewUrl ?? selectedTemplate.embeddedPreviewUrl ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      variant="outline"
                    >
                      Open full preview <ArrowTopRightOnSquareIcon className="size-4" />
                    </LinkButton>
                  ) : null}
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <p className="font-display text-2xl tracking-tight">No published HTML templates yet.</p>
              <p className="mt-2 text-text-muted">
                Publish templates in Studio or keep local profile files in the HTML Business Profiles folder.
              </p>
            </Card>
          )}
        </Container>
      </Section>

      <Section tone="inset">
        <Container>
          <SectionHeading
            eyebrow="Template catalog"
            title="Templates grouped by business category"
            description="Select any template to load its live HTML preview and purchase path."
          />

          <div className="mt-10 space-y-10">
            {HTML_BUSINESS_PROFILE_CATEGORIES
              .filter((category) => !activeCategory || category.slug === activeCategory)
              .map((category) => {
                const categoryItems = visibleTemplates.filter((item) => item.typeSlug === category.slug);

                if (categoryItems.length === 0) {
                  return null;
                }

                return (
                  <section key={category.slug}>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl tracking-tight">{category.label}</h3>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-text-muted">{category.description}</p>
                      </div>
                      <Badge tone="secondary">{categoryItems.length} templates</Badge>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {categoryItems.map((product) => {
                        const isSelected = selectedTemplate?.slug === product.slug;
                        const templateSlug = toTemplateSlug(product.slug);
                        const hasRawTemplate = Boolean(getHtmlBusinessProfileBySlug(templateSlug));

                        return (
                          <Card
                            key={product.slug}
                            className={isSelected ? "border-primary bg-primary/5" : ""}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="font-display text-lg tracking-tight">{product.name}</p>
                              <Badge tone={isSelected ? "primary" : "secondary"}>{product.price}</Badge>
                            </div>
                            <p className="mt-2 text-sm leading-6 text-text-muted">{product.teaser}</p>

                            <div className="mt-4 flex flex-wrap gap-2">
                              <LinkButton
                                href={buildProfilesHref(query, { category: category.slug, template: product.slug })}
                                variant={isSelected ? "primary" : "outline"}
                                size="sm"
                              >
                                <SwatchIcon className="size-4" />
                                {isSelected ? "Previewing" : "Preview"}
                              </LinkButton>
                              <LinkButton href={getCheckoutHref(product)} variant="outline" size="sm">
                                <ShoppingBagIcon className="size-4" /> Buy
                              </LinkButton>
                              {hasRawTemplate ? (
                                <LinkButton
                                  href={`/api/html-business-profiles/${templateSlug}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  variant="ghost"
                                  size="sm"
                                >
                                  Open raw HTML
                                </LinkButton>
                              ) : null}
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
          </div>
        </Container>
      </Section>
    </>
  );
}
