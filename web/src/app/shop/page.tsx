import type { Metadata } from "next";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { ProductPreviewSurface } from "@/components/shop/ProductPreviewSurface";
import { SHOP_PRODUCTS } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Shop — Templates, Starters, and Kits",
  description: "Preview the Growrix OS template catalog, including mock product pages for starters, kits, and automation bundles.",
};

export default function ShopPage() {
  return (
    <>
      <Section className="pb-10 pt-12 sm:pt-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Shop catalog"
                title="Template previews that make the storefront feel real now."
                description="These are polished mock previews for the upcoming catalog. They show layout quality, UI direction, and product packaging while the live template code is being finalized."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/checkout" size="lg">
                  Mock checkout <ArrowUpRightIcon className="size-4" />
                </LinkButton>
                <LinkButton href="/book-appointment" variant="outline" size="lg">
                  Ask about a custom build
                </LinkButton>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ProductPreviewSurface variant="marketing" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="inset">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { label: "Mock previews", value: "6", detail: "Each product now has its own preview page." },
              { label: "Categories", value: "3", detail: "Templates, automation kits, and MCP starters." },
              { label: "Launch mode", value: "Preview", detail: "Real template payloads can replace the mock pages later." },
            ].map((item) => (
              <Card key={item.label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">{item.label}</p>
                <p className="mt-3 font-display text-3xl tracking-tight">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-text-muted">{item.detail}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Catalog"
            title="Browse every current mock product preview."
            description="Each card now opens a dedicated preview route instead of looping back to the placeholder shop page."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {SHOP_PRODUCTS.map((product) => (
              <ShopProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
