"use client";

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  EyeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { ShopProductHomeMobileRowCard } from "@/components/shop/ShopProductHomeMobileRowCard";
import { ShopProductHtmlMobilePreviewCard } from "@/components/shop/ShopProductHtmlMobilePreviewCard";
import { HOME_TEMPLATES_MARKETPLACE_COPY } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { HERO_TITLE_CLASS } from "@/lib/typography";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

type HomeTemplatesMarketplaceSectionProps = {
  products: PublicShopProductRecord[];
};

function HomeTemplatesMarketplaceMobile({ products }: HomeTemplatesMarketplaceSectionProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={HOME_TEMPLATES_MARKETPLACE_COPY.eyebrow}
        title={HOME_TEMPLATES_MARKETPLACE_COPY.title}
        description={HOME_TEMPLATES_MARKETPLACE_COPY.description}
      />

      <div className="home-mobile-marketing__cta-row home-mobile-marketing__cta-row--center">
        <LinkButton
          href={HOME_TEMPLATES_MARKETPLACE_COPY.previewProfilesHref}
          variant="outline"
          className="home-mobile-marketing__cta home-mobile-marketing__cta--outline"
        >
          <span className="home-mobile-marketing__cta-inner">
            <EyeIcon className="home-mobile-marketing__cta-icon" aria-hidden />
            {HOME_TEMPLATES_MARKETPLACE_COPY.previewProfilesCta}
            <ArrowUpRightIcon className="home-mobile-marketing__cta-icon" aria-hidden />
          </span>
        </LinkButton>
        <LinkButton href={HOME_TEMPLATES_MARKETPLACE_COPY.browseTemplatesHref} className="home-mobile-marketing__cta">
          <span className="home-mobile-marketing__cta-inner">
            <Squares2X2Icon className="home-mobile-marketing__cta-icon" aria-hidden />
            {HOME_TEMPLATES_MARKETPLACE_COPY.browseTemplatesCta}
            <ArrowRightIcon className="home-mobile-marketing__cta-icon" aria-hidden />
          </span>
        </LinkButton>
      </div>

      <RevealGroup className="home-mobile-marketing__stack">
        {products.map((product, index) => (
          <RevealItem key={product.slug}>
            <ShopProductHomeMobileRowCard product={product} loadPriority={index === 0} />
          </RevealItem>
        ))}
      </RevealGroup>
      {products.length === 0 ? (
        <Card className="mt-[var(--home-mobile-marketing-gap-section-stack)] text-center">
          <p className="font-display text-base tracking-tight">No published HTML Business Profile items yet.</p>
          <p className="mt-2 text-text-muted">Publish HTML business profile products to display cards in this section.</p>
        </Card>
      ) : null}
    </div>
  );
}

function HomeTemplatesMarketplaceDesktop({ products }: HomeTemplatesMarketplaceSectionProps) {
  return (
    <>
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow={HOME_TEMPLATES_MARKETPLACE_COPY.eyebrow}
          title={HOME_TEMPLATES_MARKETPLACE_COPY.title}
          description={HOME_TEMPLATES_MARKETPLACE_COPY.description}
          titleClassName={HERO_TITLE_CLASS}
        />
        <div className="flex flex-wrap gap-3">
          <LinkButton href={HOME_TEMPLATES_MARKETPLACE_COPY.previewProfilesHref} variant="outline">
            {HOME_TEMPLATES_MARKETPLACE_COPY.previewProfilesCta}{" "}
            <ArrowUpRightIcon className="size-4" />
          </LinkButton>
          <LinkButton href={HOME_TEMPLATES_MARKETPLACE_COPY.browseTemplatesHref}>
            {HOME_TEMPLATES_MARKETPLACE_COPY.browseTemplatesCta}{" "}
            <ArrowRightIcon className="size-4" />
          </LinkButton>
        </div>
      </div>

      <RevealGroup className="mt-8 grid w-full min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:mt-10 sm:gap-5" stagger={0.07}>
        {products.map((product, index) => (
          <RevealItem key={product.slug} className="h-full min-w-0">
            <ShopProductHtmlMobilePreviewCard product={product} loadPriority={index === 0} />
          </RevealItem>
        ))}
      </RevealGroup>
      {products.length === 0 ? (
        <Card className="mt-10 text-center">
          <p className="font-display text-2xl tracking-tight">No published HTML Business Profile items yet.</p>
          <p className="mt-2 text-text-muted">
            Publish HTML business profile products to display cards in this section.
          </p>
        </Card>
      ) : null}
    </>
  );
}

export function HomeTemplatesMarketplaceSection({ products }: HomeTemplatesMarketplaceSectionProps) {
  const shell = homeSection("html-profiles");

  return (
    <Section {...shell}>
      <Container>
        <MarketingViewportGate
          mobile={<HomeTemplatesMarketplaceMobile products={products} />}
          desktop={<HomeTemplatesMarketplaceDesktop products={products} />}
        />
      </Container>
    </Section>
  );
}
