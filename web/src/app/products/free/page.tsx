import type { Metadata } from "next";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { listPublicShopProducts } from "@/server/domain/catalog";

export const metadata: Metadata = {
  title: "Free Products",
  description: "Browse free offers and starter downloads from the catalog.",
};

function isFreePrice(price: string) {
  const normalized = price.trim().toLowerCase();
  return normalized === "free" || normalized.startsWith("$0") || normalized.startsWith("0");
}

function isFreeProduct(product: { price: string; tag?: string; name: string; type: string }) {
  const tagText = [product.tag, product.name, product.type].filter(Boolean).join(" ").toLowerCase();
  return isFreePrice(product.price) || tagText.includes("free");
}

export default async function FreeProductsPage() {
  const freeProducts = (await listPublicShopProducts()).filter(isFreeProduct);

  return (
    <Section className="py-10 sm:py-14">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Free"
            title="Free products"
            description="Starter templates and resources you can use before committing to paid bundles."
          />
          <LinkButton href="/products" variant="outline" size="sm">
            Browse all products
          </LinkButton>
        </div>

        {freeProducts.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-text-muted">
            No free products are published yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {freeProducts.map((product) => (
              <ShopProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
