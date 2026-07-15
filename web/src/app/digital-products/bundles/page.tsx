import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbListSchema, buildCollectionPageSchema } from "@/lib/seo-structured-data";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { listPublicShopProducts } from "@/server/domain/catalog";

export const metadata: Metadata = buildPageMetadata({
  title: "Product Bundles",
  description: "Explore bundle and package offers from the published product catalog.",
  path: "/digital-products/bundles",
});

function isBundleProduct(product: { category: string; type: string; name: string; tag?: string }) {
  const haystack = [product.category, product.type, product.name, product.tag].filter(Boolean).join(" ").toLowerCase();
  return haystack.includes("bundle") || haystack.includes("pack");
}

export default async function ProductBundlesPage() {
  const bundles = (await listPublicShopProducts()).filter(isBundleProduct);
  const bundlesStructuredData = [
    buildCollectionPageSchema({
      name: "Product Bundles",
      description: "Explore bundle and package offers from the published product catalog.",
      path: "/digital-products/bundles",
      items: bundles.map((product) => ({
        name: product.name,
        path: `/digital-products/${product.slug}`,
      })),
    }),
    buildBreadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Digital Products", path: "/digital-products" },
      { name: "Product Bundles", path: "/digital-products/bundles" },
    ]),
  ];

  return (
    <>
      <JsonLd data={bundlesStructuredData} />
    <Section className="py-10 sm:py-14">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            as="h1"
            eyebrow="Bundles"
            title="Product bundles"
            description="Curated packs and grouped offers designed for faster launch decisions."
          />
          <LinkButton href="/digital-products" variant="outline" size="sm">
            Browse all digital products
          </LinkButton>
        </div>

        {bundles.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-text-muted">
            No bundle products are published yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {bundles.map((product) => (
              <ShopProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </Container>
    </Section>
    </>
  );
}
