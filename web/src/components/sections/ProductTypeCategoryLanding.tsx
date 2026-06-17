import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import type { ProductTypeDefinition } from "@/lib/product-taxonomy";
import type { ShopProduct } from "@/lib/shop";

type PublicProduct = ShopProduct & {
  variants?: Array<{
    slug: string;
    tier_name: string;
    price: string;
    fulfillment_type: "digital_download" | "hybrid_support" | "done_for_you_service";
  }>;
};

export function ProductTypeCategoryLanding({
  type,
  products,
}: {
  type: ProductTypeDefinition;
  products: PublicProduct[];
}) {
  const featured = products.slice(0, 8);
  const sample = products[0];
  const canonicalHref = `/products/category/${type.slug}`;

  return (
    <>
      <Section size="hero" layout="viewport" className="hero-section">
        <Container>
          <Link href="/products" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary">
            ← All products
          </Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <Badge tone="primary" dot>{type.label}</Badge>
              <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
                {type.label} built for faster launches.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-text-muted">
                {type.description} Browse ready products, compare delivery paths, and choose self-serve or
                customization support depending on your timeline.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <LinkButton href={canonicalHref}>
                  Browse {type.label} <ArrowRightIcon className="size-4" />
                </LinkButton>
                {sample ? (
                  <LinkButton href={`/products/${sample.slug}`} variant="outline">
                    View Example Product
                  </LinkButton>
                ) : null}
              </div>
            </div>
            <div className="lg:col-span-4">
              <Card className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Category snapshot</p>
                <p className="mt-3 font-display text-3xl tracking-tight">{products.length}+</p>
                <p className="mt-1 text-sm text-text-muted">Published products in this type.</p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section size="standard" layout="viewport" tone="inset">
        <Container>
          <SectionHeading
            eyebrow="Featured products"
            title={`Popular ${type.label.toLowerCase()}`}
            description="Product cards are sourced from the live catalog for this type."
          />
          {featured.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {featured.map((product) => (
                <ShopProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <Card className="mt-10 p-8 text-center">
              <p className="font-display text-xl tracking-tight">No published products yet for this type.</p>
              <p className="mt-2 text-sm text-text-muted">
                Add products with this type slug from CMS/Admin and they will appear automatically here.
              </p>
            </Card>
          )}
          <div className="mt-8">
            <LinkButton href={canonicalHref} variant="outline">
              View All {type.label} <ArrowUpRightIcon className="size-4" />
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
