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
  description: "Browse website templates from $500 and ready websites from $1k, then go straight to product details or checkout.",
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

type FilterGroup = {
  label: string;
  key: keyof FilterState;
  options: { value: string; label: string }[];
  activeValue: string | undefined;
};

function SidebarGroup({ group, filters }: { group: FilterGroup; filters: FilterState }) {
  const allHref = buildShopHref(filters, { [group.key]: undefined });
  const isAllActive = !group.activeValue;

  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
        {group.label}
      </p>
      <ul className="space-y-0.5">
        <li>
          <Link
            href={allHref}
            scroll={false}
            className={
              "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors " +
              (isAllActive
                ? "border-l-2 border-primary bg-primary/10 font-semibold text-primary"
                : "text-text-muted hover:bg-inset hover:text-text")
            }
          >
            All {group.label}
          </Link>
        </li>
        {group.options.map((option) => {
          const isActive = group.activeValue === option.value;
          return (
            <li key={option.value}>
              <Link
                href={buildShopHref(filters, { [group.key]: option.value })}
                scroll={false}
                className={
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors " +
                  (isActive
                    ? "border-l-2 border-primary bg-primary/10 font-semibold text-primary"
                    : "text-text-muted hover:bg-inset hover:text-text")
                }
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const filters = await searchParams;
  const filteredProducts = filterProducts(PUBLISHED_SHOP_PRODUCTS, filters);

  const hasActiveFilter = !!(filters.category || filters.type || filters.industry);

  const filterGroups: FilterGroup[] = [
    { label: "Category", key: "category", options: SHOP_CATEGORY_OPTIONS, activeValue: filters.category },
    { label: "Type", key: "type", options: SHOP_TYPE_OPTIONS, activeValue: filters.type },
    { label: "Industry", key: "industry", options: SHOP_INDUSTRY_OPTIONS, activeValue: filters.industry },
  ];

  return (
    <>
      {/* Page header */}
      <Section className="border-b border-border pb-6 pt-10 sm:pt-14">
        <Container>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Templates &amp; Ready Websites
              </h1>
              <p className="mt-2 text-sm leading-6 text-text-muted">
                {PUBLISHED_SHOP_PRODUCTS.length} products &mdash; website templates from $500 and ready websites from $1k, each with 1 year of support.
              </p>
            </div>
            <LinkButton href="/book-appointment" variant="outline" size="sm">
              Need something custom?
            </LinkButton>
          </div>
        </Container>
      </Section>

      {/* Sidebar + product grid */}
      <Section className="py-8 sm:py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:items-start">

            {/* Sidebar filter nav */}
            <aside className="space-y-6 rounded-2xl border border-border bg-surface p-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-semibold tracking-tight">Filters</p>
                {hasActiveFilter ? (
                  <Link
                    href="/shop"
                    scroll={false}
                    className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-primary"
                  >
                    <XMarkIcon className="size-3.5" /> Clear all
                  </Link>
                ) : null}
              </div>

              {filterGroups.map((group) => (
                <SidebarGroup key={group.key} group={group} filters={filters} />
              ))}
            </aside>

            {/* Product grid area */}
            <div>
              {/* Result count + active filter pills */}
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-text-muted">
                  {filteredProducts.length} result{filteredProducts.length === 1 ? "" : "s"}
                </span>
                {filterGroups
                  .filter((g) => g.activeValue)
                  .map((g) => (
                    <Link
                      key={g.key}
                      href={buildShopHref(filters, { [g.key]: undefined })}
                      scroll={false}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-inset/50 px-3 py-1 text-xs text-text-muted hover:border-primary/40 hover:text-text"
                    >
                      {g.options.find((o) => o.value === g.activeValue)?.label ?? g.activeValue}
                      <XMarkIcon className="size-3" />
                    </Link>
                  ))}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-12 text-center">
                  <p className="font-display text-xl tracking-tight">No products match those filters.</p>
                  <p className="mt-2 text-sm text-text-muted">Clear a filter to see more of the catalog.</p>
                  <div className="mt-6 flex justify-center">
                    <LinkButton href="/shop" size="sm">Reset filters</LinkButton>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ShopProductCard key={product.slug} product={product} />
                  ))}
                </div>
              )}
            </div>

          </div>
        </Container>
      </Section>
    </>
  );
}
