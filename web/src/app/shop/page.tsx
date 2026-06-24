import type { Metadata } from "next";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { ShopProductCatalogCard } from "@/components/shop/ShopProductCatalogCard";
import { ShopStickyFilterSidebar } from "@/components/shop/ShopStickyFilterSidebar";
import { ShopPageMobile } from "@/components/shop/ShopPageMobile";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { PRODUCT_CATEGORY_CHIPS, PRODUCT_INDEX_COPY } from "@/lib/product-led-content";
import {
  buildShopFilterGroups,
  buildShopFilterOptions,
  buildShopHref,
  type ShopFilterGroup,
  type ShopFilterState,
} from "@/lib/shop-filters";
import { listPublicShopProducts } from "@/server/domain/catalog";

export const metadata: Metadata = {
  title: "Digital Products — Templates, Starters, and Toolkits",
  description:
    "Browse HTML templates, SaaS starters, AI toolkits, MCP kits, and SEO packs. Compare Standard, Premium, and Done-For-You tiers.",
};

type SearchParams = Promise<{
  category?: string;
  type?: string;
  industry?: string;
}>;

function SidebarGroup({ group, filters }: { group: ShopFilterGroup; filters: ShopFilterState }) {
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
  const [allProducts, filteredProducts] = await Promise.all([
    listPublicShopProducts(),
    listPublicShopProducts(filters),
  ]);
  const filterOptions = buildShopFilterOptions(allProducts);

  const hasActiveFilter = !!(filters.category || filters.type || filters.industry);

  const filterGroups: ShopFilterGroup[] = buildShopFilterGroups(filterOptions, filters);

  const desktopView = (
    <>
      {/* Page header */}
      <Section className="border-b border-border pb-6 pt-10 sm:pt-14">
        <Container>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{PRODUCT_INDEX_COPY.eyebrow}</p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {PRODUCT_INDEX_COPY.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-text-muted">
                {PRODUCT_INDEX_COPY.description}
              </p>
              <p className="mt-2 text-sm text-text-muted">
                {allProducts.length} product{allProducts.length === 1 ? "" : "s"} published now.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {PRODUCT_CATEGORY_CHIPS.map((chip) => (
                  <Link
                    key={chip.href}
                    href={chip.href}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </div>
            <LinkButton href="/book-appointment" variant="outline" size="sm">
              Need Done-For-You setup?
            </LinkButton>
          </div>
        </Container>
      </Section>

      {/* Sidebar + product grid */}
      <Section className="py-8 sm:py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-stretch">

            <ShopStickyFilterSidebar>
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-semibold tracking-tight">Filters</p>
                {hasActiveFilter ? (
                  <Link
                    href="/digital-products"
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
            </ShopStickyFilterSidebar>

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
                    <LinkButton href="/digital-products" size="sm">Reset filters</LinkButton>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ShopProductCatalogCard key={product.slug} product={product} />
                  ))}
                </div>
              )}
            </div>

          </div>
        </Container>
      </Section>
    </>
  );

  const mobileView = (
    <ShopPageMobile
      filters={filters}
      filterGroups={filterGroups}
      allProducts={allProducts}
      filteredProducts={filteredProducts}
    />
  );

  return (
    <MarketingViewportGate
      desktop={desktopView}
      mobile={mobileView}
    />
  );
}
