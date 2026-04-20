import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { ProductPreviewSurface } from "@/components/shop/ProductPreviewSurface";
import { getShopProduct, SHOP_PRODUCTS } from "@/lib/shop";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SHOP_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getShopProduct(slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} Preview`,
    description: product.summary,
  };
}

export default async function ShopPreviewPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getShopProduct(slug);

  if (!product) {
    notFound();
  }

  const related = SHOP_PRODUCTS.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <>
      <Section className="pb-12 pt-12 sm:pt-16">
        <Container>
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary">
            <ArrowLeftIcon className="size-4" /> Back to shop
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="primary">{product.category}</Badge>
                {product.tag ? <Badge tone="secondary">{product.tag}</Badge> : null}
              </div>
              <h1 className="mt-5 font-display text-5xl leading-[1.04] tracking-tight text-balance sm:text-6xl">
                {product.name}
              </h1>
              <p className="mt-5 text-lg leading-7 text-text-muted text-pretty">{product.summary}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {product.highlights.map((highlight) => (
                  <div key={highlight.label} className="rounded-[16px] border border-border bg-surface px-4 py-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">{highlight.label}</p>
                    <p className="mt-2 font-display text-lg tracking-tight">{highlight.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/book-appointment" size="lg">
                  Talk about implementation
                </LinkButton>
                <LinkButton href="/checkout" variant="outline" size="lg">
                  Mock checkout <ArrowUpRightIcon className="size-4" />
                </LinkButton>
              </div>

              <Card className="mt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Ideal for</p>
                <p className="mt-3 leading-7 text-pretty">{product.audience}</p>
              </Card>
            </div>

            <div className="lg:col-span-7">
              <ProductPreviewSurface variant={product.previewVariant} />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="inset">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <SectionHeading eyebrow="Included" title="What ships with the mock package." />
              <ul className="mt-6 space-y-3 text-sm leading-6 text-text-muted">
                {product.includes.map((item) => (
                  <li key={item} className="rounded-[14px] border border-border bg-inset/40 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <SectionHeading eyebrow="Stack" title="Built around modern frontend delivery." />
              <div className="mt-6 flex flex-wrap gap-3">
                {product.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-inset/40 px-4 py-2 text-sm text-text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-text-muted">
                These preview surfaces are intentionally mock implementations so the storefront feels complete now. The final deliverables can replace each preview with live template code later.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="More previews"
            title="Other mock products in the catalog."
            description="Browse the rest of the shop while the real template packages are being finalized."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <ShopProductCard key={item.slug} product={item} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}