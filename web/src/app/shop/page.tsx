import type { Metadata } from "next";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import {
  PUBLISHED_SHOP_PRODUCTS,
  SHOP_CATEGORY_OPTIONS,
  SHOP_INDUSTRY_OPTIONS,
  SHOP_TYPE_OPTIONS,
  type ShopProduct,
} from "@/lib/shop";

export const metadata: Metadata = {
  title: "Shop — Website Templates and Ready Websites",
  description: "Browse website templates and ready-made websites by category, type, and industry, then go straight to product details or checkout.",
};

type SearchParams = Promise<{
  category?: string;
  type?: string;
  industry?: string;
}>;

type FilterState = {
  category?: string;
  type?: string;
  industry?: string;
};

function filterProducts(products: ShopProduct[], filters: FilterState) {
  return products.filter((product) => {
    if (filters.category && product.categorySlug !== filters.category) return false;
    if (filters.type && product.typeSlug !== filters.type) return false;
    if (filters.industry && product.industrySlug !== filters.industry) return false;
    return true;
  });
}

function buildShopHref(filters: FilterState, patch: Partial<FilterState>) {
  const next = new URLSearchParams();
  const merged = { ...filters, ...patch };
  if (merged.category) next.set("category", merged.category);
  if (merged.type) next.set("type", merged.type);
  if (merged.industry) next.set("industry", merged.industry);
  const query = next.toString();
  return query ? `/shop?${query}` : "/shop";
}

function chip(active: boolean) {
  return (
    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors " +
    (active
      ? "border-primary bg-primary text-white"
      : "border-border bg-surface text-text-muted hover:border-primary/40 hover:text-text")
  );
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const filters = await searchParams;
  const filteredProducts = filterProducts(PUBLISHED_SHOP_PRODUCTS, filters);
  const activeFilters = [
    filters.category && {
      key: "category" as const,
      label: SHOP_CATEGORY_OPTIONS.find((o) => o.value === filters.category)?.label ?? filters.category,
    },
    filters.type && {
      key: "type" as const,
      label: SHOP_TYPE_OPTIONS.find((o) => o.value === filters.type)?.label ?? filters.type,
    },
    filters.industry && {
      key: "industry" as const,
      label: SHOP_INDUSTRY_OPTIONS.find((o) => o.value === filters.industry)?.label ?? filters.industry,
    },
  ].filter(Boolean) as { key: keyof FilterState; label: string }[];

  return (
    <>
      {/* Page header */}
      <Section className="border-b border-border pb-6 pt-10 sm:pt-14">
        <Container>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Templates &amp; Ready Websites
              </h1>
              <p className="mt-2 text-sm leading-6 text-text-muted">
                {PUBLISHED_SHOP_PRODUCTS.length} products &mdash; purchase any item and receive it immediately.
              </p>
            </div>
            <LinkButton href="/shop/concierge" variant="outline" size="sm">
              Need something custom?
            </LinkButton>
          </div>
        </Container>
      </Section>

      {/* Filter bar */}
      <Section className="border-b border-border py-4">
        <Container>
          <div className="flex flex-col gap-4 sm:gap-3">
            {/* Category row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted w-20 shrink-0">Category</span>
              <Link href={buildShopHref(filters, { category: undefined })} className={chip(!filters.category)}>All</Link>
              {SHOP_CATEGORY_OPTIONS.map((o) => (
                <Link key={o.value} href={buildShopHref(filters, { category: o.value })} className={chip(filters.category === o.value)}>
                  {o.label}
                </Link>
              ))}
            </div>

            {/* Type row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted w-20 shrink-0">Type</span>
              <Link href={buildShopHref(filters, { type: undefined })} className={chip(!filters.type)}>All</Link>
              {SHOP_TYPE_OPTIONS.map((o) => (
                <Link key={o.value} href={buildShopHref(filters, { type: o.value })} className={chip(filters.type === o.value)}>
                  {o.label}
                </Link>
              ))}
            </div>

            {/* Industry row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted w-20 shrink-0">Industry</span>
              <Link href={buildShopHref(filters, { industry: undefined })} className={chip(!filters.industry)}>All</Link>
              {SHOP_INDUSTRY_OPTIONS.map((o) => (
                <Link key={o.value} href={buildShopHref(filters, { industry: o.value })} className={chip(filters.industry === o.value)}>
                  {o.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Active filter pills + result count */}
      {activeFilters.length > 0 ? (
        <Section className="border-b border-border py-3">
          <Container>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-text-muted">{filteredProducts.length} result{filteredProducts.length === 1 ? "" : "s"}</span>
              {activeFilters.map((filter) => (
                <Link
                  key={filter.key}
                  href={buildShopHref(filters, { [filter.key]: undefined })}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-inset/50 px-3 py-1 text-sm text-text-muted hover:border-primary/40 hover:text-text"
                >
                  {filter.label} <XMarkIcon className="size-3.5" />
                </Link>
              ))}
              <LinkButton href="/shop" variant="ghost" size="sm">Clear all</LinkButton>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Product grid */}
      <Section className="py-10 sm:py-14">
        <Container>
          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="font-display text-xl tracking-tight">No products match those filters.</p>
              <p className="mt-2 text-sm text-text-muted">Clear a filter to see more of the catalog.</p>
              <div className="mt-6 flex justify-center">
                <LinkButton href="/shop" size="sm">Reset filters</LinkButton>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ShopProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
