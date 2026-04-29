import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowUpRightIcon, ShoppingBagIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { ProductPreviewSurface } from "@/components/shop/ProductPreviewSurface";
import { getCheckoutHref, getShopProduct, SHOP_PRODUCTS } from "@/lib/shop";
import { getPublicShopProduct, listPublicShopProducts } from "@/server/domain/catalog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const publicProducts = await listPublicShopProducts().catch(() => []);
  return Array.from(
    new Map([...SHOP_PRODUCTS, ...publicProducts].map((product) => [product.slug, { slug: product.slug }])).values()
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = (await getPublicShopProduct(slug).catch(() => null)) ?? getShopProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Shop`,
    description: product.summary,
  };
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 16 16"
          className={star <= Math.round(rating) ? "size-4 fill-amber-400" : "size-4 fill-border"}
          aria-hidden
        >
          <path d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.35l-3.52 1.99.67-3.93L2.3 5.63l3.94-.57z" />
        </svg>
      ))}
    </span>
  );
}

export default async function ShopPreviewPage({ params }: PageProps) {
  const { slug } = await params;
  const product = (await getPublicShopProduct(slug).catch(() => null)) ?? getShopProduct(slug);

  if (!product) notFound();

  const related = (await listPublicShopProducts()).filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <>
      {/* Main product layout */}
      <Section className="pb-10 pt-6 sm:pb-14 sm:pt-8">
        <Container>
          <Link href="/shop" className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary">
            <ArrowLeftIcon className="size-4" /> Back to shop
          </Link>

          <div className="grid min-w-0 gap-10 lg:grid-cols-[1fr_360px] lg:items-start xl:grid-cols-[1fr_380px]">

            {/* LEFT — preview + details */}
            <div className="min-w-0 space-y-8">
              {/* Product name (mobile only, shown above preview) */}
              <div className="lg:hidden">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  {product.category} &middot; {product.type}
                </p>
                <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">{product.name}</h1>
              </div>

              {/* Preview surface */}
              <div id="preview" className="min-w-0 overflow-hidden rounded-2xl border border-border">
                <ProductPreviewSurface variant={product.previewVariant} />
              </div>

              {/* Description */}
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">About this product</h2>
                <p className="mt-3 leading-7 text-text-muted">{product.teaser}</p>
                <p className="mt-3 leading-7 text-text-muted">{product.summary}</p>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">At a glance</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {product.highlights.map((highlight) => (
                    <div key={highlight.label} className="rounded-2xl border border-border bg-inset/40 px-4 py-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">{highlight.label}</p>
                      <p className="mt-2 font-display text-lg font-semibold tracking-tight">{highlight.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes */}
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">What&apos;s included</h2>
                <ul className="mt-4 space-y-2">
                  {product.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-text-muted">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack */}
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">Stack</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-inset/40 px-3 py-1.5 text-sm text-text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — sticky purchase sidebar */}
            <aside className="min-w-0 space-y-4 lg:sticky lg:top-24">
              {/* Name + category (desktop) */}
              <div className="hidden lg:block">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  {product.category} &middot; {product.type}
                </p>
                <h1 className="mt-2 font-display text-2xl font-bold leading-snug tracking-tight">{product.name}</h1>
              </div>

              {/* Rating row */}
              {product.rating ? (
                <div className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
                  <StarRating rating={product.rating} />
                  <span className="font-semibold text-text">{product.rating}</span>
                  {product.reviewCount ? <span>({product.reviewCount} reviews)</span> : null}
                  {product.salesCount ? (
                    <>
                      <span aria-hidden className="select-none">·</span>
                      <span>{product.salesCount} sales</span>
                    </>
                  ) : null}
                </div>
              ) : null}

              {/* Price */}
              <p className="font-display text-4xl font-bold tracking-tight">{product.price}</p>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <LinkButton href={getCheckoutHref(product)} size="lg" fullWidth>
                  <ShoppingBagIcon className="size-5" /> Start Purchase
                </LinkButton>
                <LinkButton href={`/shop/${product.slug}#preview`} variant="outline" size="lg" fullWidth>
                  Live Preview <ArrowUpRightIcon className="size-4" />
                </LinkButton>
              </div>

              <hr className="border-border" />

              {/* Meta table */}
              <dl className="space-y-2 text-sm">
                {[
                  { label: "Category", value: product.category },
                  { label: "Type", value: product.type },
                  { label: "Industry", value: product.industry },
                  ...(product.highlights.slice(0, 2).map((h) => ({ label: h.label, value: h.value }))),
                ].map((row) => (
                  <div key={row.label} className="flex min-w-0 items-start justify-between gap-4">
                    <dt className="shrink-0 font-medium text-text-muted">{row.label}</dt>
                    <dd className="min-w-0 flex-1 wrap-anywhere text-right text-text">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <hr className="border-border" />

              {/* Ideal for */}
              <div className="rounded-2xl border border-border bg-inset/40 p-4 text-sm leading-6 text-text-muted">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">Ideal for</p>
                <p className="mt-2">{product.audience}</p>
              </div>

              {/* Talk to us */}
              <div className="text-center">
                <LinkButton
                  href="/book-appointment"
                  variant="ghost"
                  size="sm"
                  fullWidth
                  className="h-auto whitespace-normal px-4 py-2.5 leading-5"
                >
                  Need flexible payment or a custom fit? Talk to us first
                </LinkButton>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Related products */}
      {related.length > 0 ? (
        <Section className="border-t border-border py-12 sm:py-16">
          <Container>
            <h2 className="font-display text-2xl font-bold tracking-tight">More in the catalog</h2>
            <p className="mt-2 text-sm text-text-muted">
              Browse more website templates and ready websites.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ShopProductCard key={item.slug} product={item} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
