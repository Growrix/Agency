import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { MarketingHeroTitle } from "@/components/marketing/MarketingHeroTitle";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { HtmlBusinessProfilesCategoryHeroMobile } from "@/components/marketing/categories/HtmlBusinessProfilesCategoryHeroMobile";
import { HtmlProfileHeroCarousel } from "@/components/sections/HtmlProfileHeroCarousel";
import { marketingSection } from "@/lib/marketing-composition";
import {
  HTML_BUSINESS_PROFILES_CATEGORY_ANCHORS,
  HTML_BUSINESS_PROFILES_CATEGORY_HERO,
  HTML_BUSINESS_PROFILES_CATEGORY_PATH,
  buildHtmlBusinessProfilesCategoryHeroSlides,
} from "@/lib/html-business-profiles-category-content";

type HtmlBusinessProfilesCategoryHeroProduct = {
  slug: string;
  name: string;
  type: string;
  price: string;
  embeddedPreviewUrl?: string;
  livePreviewUrl?: string;
};

type HtmlBusinessProfilesCategoryHeroProps = {
  products: HtmlBusinessProfilesCategoryHeroProduct[];
  showBackLink?: boolean;
  profilesAnchorId?: string;
  autoPlayCarousel?: boolean;
  sectionSize?: "hero" | "standard";
};

export function HtmlBusinessProfilesCategoryHero({
  products,
  showBackLink = true,
  profilesAnchorId = HTML_BUSINESS_PROFILES_CATEGORY_ANCHORS.profiles,
  autoPlayCarousel = false,
  sectionSize = "hero",
}: HtmlBusinessProfilesCategoryHeroProps) {
  const heroSlides = buildHtmlBusinessProfilesCategoryHeroSlides(products);

  return (
    <Section
      {...marketingSection("category-business-profiles", "hero")}
      size={sectionSize}
      layout="viewport"
      className="hero-section relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-45 pointer-events-none" aria-hidden />
      <Container>
        <MarketingViewportGate
          mobile={<HtmlBusinessProfilesCategoryHeroMobile products={products} showBackLink={showBackLink} />}
          desktop={
            <>
              {showBackLink ? (
                <Link
                  href={HTML_BUSINESS_PROFILES_CATEGORY_HERO.backHref}
                  className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary"
                >
                  ← {HTML_BUSINESS_PROFILES_CATEGORY_HERO.backLabel}
                </Link>
              ) : null}

              <div className={`grid min-w-0 gap-8 lg:grid-cols-12 lg:items-start xl:gap-10 ${showBackLink ? "mt-6" : ""}`}>
                <div className="min-w-0 lg:col-span-5">
                  <Badge tone="primary" dot>
                    {HTML_BUSINESS_PROFILES_CATEGORY_HERO.eyebrow}
                  </Badge>
                  <MarketingHeroTitle
                    className="mt-5 font-display text-3xl sm:text-4xl leading-[1.08] tracking-tight text-balance"
                    titleLead={HTML_BUSINESS_PROFILES_CATEGORY_HERO.titleLead}
                    titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_HERO.titleAccent}
                    layout="block"
                  />
                  <p className="mt-5 text-lg leading-7 text-text-muted">
                    {HTML_BUSINESS_PROFILES_CATEGORY_HERO.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <LinkButton href={`${HTML_BUSINESS_PROFILES_CATEGORY_PATH}#${profilesAnchorId}`} size="lg">
                      {HTML_BUSINESS_PROFILES_CATEGORY_HERO.primaryCta} <ArrowRightIcon className="size-4" />
                    </LinkButton>
                    <LinkButton href={HTML_BUSINESS_PROFILES_CATEGORY_PATH} variant="outline" size="lg">
                      {HTML_BUSINESS_PROFILES_CATEGORY_HERO.secondaryCta}
                    </LinkButton>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                    {HTML_BUSINESS_PROFILES_CATEGORY_HERO.stats.map((metric) => (
                      <Card key={metric.label} className="p-4">
                        <p className="font-display text-2xl tracking-tight">{metric.value}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-text-muted">{metric.label}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="min-w-0 lg:col-span-7">
                  <Card className="p-5 sm:p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                      {HTML_BUSINESS_PROFILES_CATEGORY_HERO.previewLabel}
                    </p>
                    <div className="mt-4 min-w-0">
                      <HtmlProfileHeroCarousel
                        slides={heroSlides}
                        previewMode="mobile-frame"
                        mobilePreviewMaxHeight={400}
                        mobilePreviewShowViewportLabel={false}
                        autoPlay={autoPlayCarousel}
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </>
          }
        />
      </Container>
    </Section>
  );
}
