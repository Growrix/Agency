import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { ShopProductHtmlPreviewCard } from "@/components/shop/ShopProductHtmlPreviewCard";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

type FeaturedProductsProps = {
  products: PublicShopProductRecord[];
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  variant?: "default" | "html-preview";
  maxProducts?: number;
};

export function FeaturedProducts({
  products,
  eyebrow = "Featured products",
  title = "Production-ready digital products",
  description = "Templates, starters, and toolkits with Standard, Premium, and Done-For-You options — buy now or hire us to launch it for you.",
  ctaHref = "/digital-products",
  ctaLabel = "Browse all digital products",
  variant = "default",
  maxProducts,
}: FeaturedProductsProps) {
  const visibleProducts = maxProducts ? products.slice(0, maxProducts) : products;

  if (visibleProducts.length === 0) {
    return null;
  }

  const isHtmlPreview = variant === "html-preview";

  return (
    <Section
      size="standard"
      layout="viewport"
      tone={isHtmlPreview ? "inset" : undefined}
      className={isHtmlPreview ? "overflow-x-hidden" : undefined}
    >
      <Container className={isHtmlPreview ? "min-w-0" : undefined}>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <LinkButton href={ctaHref} variant="outline">
            {ctaLabel} <ArrowUpRightIcon className="size-4" />
          </LinkButton>
        </div>

        <RevealGroup
          className={
            isHtmlPreview
              ? "mt-8 grid w-full min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              : "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          }
          stagger={0.07}
        >
          {visibleProducts.map((product) => (
            <RevealItem key={product.slug} className="h-full min-w-0">
              {isHtmlPreview ? (
                <ShopProductHtmlPreviewCard product={product} variant="catalog-wide" />
              ) : (
                <ShopProductCard product={product} />
              )}
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-6 text-sm text-text-muted">
          Every product supports{" "}
          <Link href="/services/template-customization" className="font-medium text-primary hover:underline">
            Done-For-You customization
          </Link>{" "}
          when you need branding, deployment, or integration help.
        </p>
      </Container>
    </Section>
  );
}
