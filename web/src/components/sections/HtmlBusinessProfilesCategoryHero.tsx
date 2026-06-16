import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { HtmlProfileHeroCarousel } from "@/components/sections/HtmlProfileHeroCarousel";
import { getProductHref } from "@/lib/shop";

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
  /** Disable on pages that already render another autoplay carousel above the fold. */
  autoPlayCarousel?: boolean;
};

const FALLBACK_CAROUSEL_PROFILES = [
  { slug: "", name: "Cafe Business Profile", type: "Cafe", price: "$19" },
  { slug: "", name: "Law Firm Business Profile", type: "Law Firm", price: "$19" },
  { slug: "", name: "Agency Business Profile", type: "Agency", price: "$19" },
  { slug: "", name: "Cleaning Business Profile", type: "Cleaning", price: "$19" },
] as const;

export function HtmlBusinessProfilesCategoryHero({
  products,
  showBackLink = true,
  profilesAnchorId = "profiles",
  autoPlayCarousel = true,
}: HtmlBusinessProfilesCategoryHeroProps) {
  const carouselProfiles = products.length > 0 ? products : [...FALLBACK_CAROUSEL_PROFILES];
  const heroSlides = carouselProfiles.map((profile) => ({
    name: profile.name,
    type: profile.type,
    price: profile.price,
    href: profile.slug ? getProductHref(profile) : "/products/category/html-business-profiles",
    previewUrl:
      ("embeddedPreviewUrl" in profile ? profile.embeddedPreviewUrl : undefined) ??
      ("livePreviewUrl" in profile ? profile.livePreviewUrl : undefined),
  }));

  return (
    <Section className="hero-section relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-16">
      <div className="absolute inset-0 bg-grid opacity-45 pointer-events-none" aria-hidden />
      <Container>
        {showBackLink ? (
          <Link href="/products" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary">
            ← All products
          </Link>
        ) : null}

        <div className={`grid min-w-0 gap-8 lg:grid-cols-12 lg:items-start xl:gap-10 ${showBackLink ? "mt-6" : ""}`}>
          <div className="min-w-0 lg:col-span-5">
            <Badge tone="primary" dot>HTML Business Profiles</Badge>
            <h2 className="mt-5 font-display text-3xl sm:text-4xl leading-[1.08] tracking-tight text-balance">
              Professional Business Profile Websites Ready in 24 Hours
            </h2>
            <p className="mt-5 text-lg leading-7 text-text-muted">
              Choose a category-specific HTML business profile, customize it if needed, and launch a professional
              online presence without a full website project.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={`/products/category/html-business-profiles#${profilesAnchorId}`} size="lg">
                Browse Business Profiles <ArrowRightIcon className="size-4" />
              </LinkButton>
              <LinkButton href="/products/category/html-business-profiles" variant="outline" size="lg">
                View Live Examples
              </LinkButton>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
              {[
                { value: "50+", label: "Business Profiles" },
                { value: "24h", label: "Response Time" },
                { value: "4", label: "Service Levels" },
                { value: "100%", label: "Mobile Responsive" },
              ].map((metric) => (
                <Card key={metric.label} className="p-4">
                  <p className="font-display text-2xl tracking-tight">{metric.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-text-muted">{metric.label}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <Card className="p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">Live mobile profile preview</p>
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
      </Container>
    </Section>
  );
}
