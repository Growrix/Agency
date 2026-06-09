import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

export function FeaturedProducts({
  products,
  eyebrow = "Featured products",
  title = "Production-ready digital products",
  description = "Templates, starters, and toolkits with Standard, Premium, and Done-For-You options — buy now or hire us to launch it for you.",
  ctaHref = "/products",
  ctaLabel = "Browse all products",
}: {
  products: PublicShopProductRecord[];
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  if (products.length === 0) {
    return null;
  }

  return (
    <Section>
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <LinkButton href={ctaHref} variant="outline">
            {ctaLabel} <ArrowUpRightIcon className="size-4" />
          </LinkButton>
        </div>
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {products.map((product) => (
            <RevealItem key={product.slug} className="h-full">
              <ShopProductCard product={product} />
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
