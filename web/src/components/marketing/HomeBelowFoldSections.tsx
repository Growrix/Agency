"use client";

import dynamic from "next/dynamic";
import { Container, Section } from "@/components/primitives/Container";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { HOME_PREVIEW_COPY } from "@/lib/home-conversion-content";
import type { HomeSectionShellProps } from "@/lib/homepage-composition";
import { HERO_TITLE_CLASS } from "@/lib/typography";
import type { PublicPortfolioRecord, PublicServiceRecord, PublicShopProductRecord } from "@/server/domain/catalog";
import type { BlogPost } from "@/lib/content";
import type { ReadyMadeSolutionTabDefinition } from "@/lib/ready-made-solutions";

const ServiceCards = dynamic(
  () => import("@/components/marketing/ServiceCards").then((mod) => mod.ServiceCards),
  { ssr: false },
);

const GoogleReviews = dynamic(
  () => import("@/components/sections/GoogleReviews").then((mod) => mod.GoogleReviews),
  { ssr: false },
);

const ReadyMadeSolutionsSection = dynamic(
  () => import("@/components/marketing/ReadyMadeSolutionsSection").then((mod) => mod.ReadyMadeSolutionsSection),
  { ssr: false },
);

const HomeDigitalProductsShowcase = dynamic(
  () => import("@/components/marketing/HomeDigitalProductsShowcase").then((mod) => mod.HomeDigitalProductsShowcase),
  { ssr: false },
);

const FeaturedProducts = dynamic(
  () => import("@/components/marketing/FeaturedProducts").then((mod) => mod.FeaturedProducts),
  { ssr: false },
);

const HomeHtmlPreviewSection = dynamic(
  () => import("@/components/marketing/HomeHtmlPreviewSection").then((mod) => mod.HomeHtmlPreviewSection),
  { ssr: false },
);

const ThreePathExplainer = dynamic(
  () => import("@/components/marketing/ThreePathExplainer").then((mod) => mod.ThreePathExplainer),
  { ssr: false },
);

const HomeFeaturedBuildsSection = dynamic(
  () => import("@/components/marketing/HomeFeaturedBuildsSection").then((mod) => mod.HomeFeaturedBuildsSection),
  { ssr: false },
);

const HomeProcessSection = dynamic(
  () => import("@/components/marketing/HomeProcessSection").then((mod) => mod.HomeProcessSection),
  { ssr: false },
);

const HomeAiConciergeSection = dynamic(
  () => import("@/components/marketing/HomeAiConciergeSection").then((mod) => mod.HomeAiConciergeSection),
  { ssr: false },
);

const Testimonials = dynamic(
  () => import("@/components/marketing/Testimonials").then((mod) => mod.Testimonials),
  { ssr: false },
);

const HomeFieldNotesSection = dynamic(
  () => import("@/components/marketing/HomeFieldNotesSection").then((mod) => mod.HomeFieldNotesSection),
  { ssr: false },
);

const ProductLedFinalCTA = dynamic(
  () => import("@/components/marketing/ProductLedFinalCTA").then((mod) => mod.ProductLedFinalCTA),
  { ssr: false },
);

type HomeBelowFoldSectionsProps = {
  services: PublicServiceRecord[];
  readyMadeTabs: ReadyMadeSolutionTabDefinition[];
  readyMadeProductsByTabId: Record<string, PublicShopProductRecord[]>;
  featuredHtmlWebsiteTemplates: PublicShopProductRecord[];
  htmlPreviewSlides: HtmlProfileHeroSlide[];
  htmlPreviewFallbackSlide: HtmlProfileHeroSlide;
  htmlPreviewSectionShell: Partial<HomeSectionShellProps>;
  publicProducts: PublicShopProductRecord[];
  featuredProjects: PublicPortfolioRecord[];
  featuredBuildsTitle?: string;
  featuredBuildsDescription?: string;
  aiEyebrow?: string;
  aiTitle?: string;
  aiDescription?: string;
  aiPrivacyNote?: string;
  showGoogleReviews: boolean;
  latestBlogPosts: BlogPost[];
  fieldNotesEyebrow?: string;
  fieldNotesTitle?: string;
  fieldNotesDescription?: string;
  finalCtaEyebrow: string;
  finalCtaTitle: string;
  finalCtaDescription: string;
  finalCtaPrimaryLabel: string;
  finalCtaSecondaryLabel: string;
  featuredTemplatesCtaHref: string;
  featuredTemplatesCtaLabel: string;
};

export function HomeBelowFoldSections({
  services,
  readyMadeTabs,
  readyMadeProductsByTabId,
  featuredHtmlWebsiteTemplates,
  htmlPreviewSlides,
  htmlPreviewFallbackSlide,
  htmlPreviewSectionShell,
  publicProducts,
  featuredProjects,
  featuredBuildsTitle,
  featuredBuildsDescription,
  aiEyebrow,
  aiTitle,
  aiDescription,
  aiPrivacyNote,
  showGoogleReviews,
  latestBlogPosts,
  fieldNotesEyebrow,
  fieldNotesTitle,
  fieldNotesDescription,
  finalCtaEyebrow,
  finalCtaTitle,
  finalCtaDescription,
  finalCtaPrimaryLabel,
  finalCtaSecondaryLabel,
  featuredTemplatesCtaHref,
  featuredTemplatesCtaLabel,
}: HomeBelowFoldSectionsProps) {
  return (
    <>
      <ServiceCards services={services} />

      <ReadyMadeSolutionsSection tabs={readyMadeTabs} productsByTabId={readyMadeProductsByTabId} />

      <FeaturedProducts
        products={featuredHtmlWebsiteTemplates}
        variant="html-preview"
        maxProducts={3}
        eyebrow="Featured templates"
        title="Production-ready templates with live desktop preview"
        description="Deliver flawless experiences across every device—preview, purchase, and launch from proven website systems."
        ctaHref={featuredTemplatesCtaHref}
        ctaLabel={featuredTemplatesCtaLabel}
      />

      <HomeHtmlPreviewSection
        slides={htmlPreviewSlides}
        emptyFallbackSlide={htmlPreviewFallbackSlide}
        sectionShell={htmlPreviewSectionShell}
        title={HOME_PREVIEW_COPY.title}
        description={HOME_PREVIEW_COPY.description}
      />

      <HomeDigitalProductsShowcase products={publicProducts} />

      <ThreePathExplainer />

      <HomeFeaturedBuildsSection
        projects={featuredProjects}
        title={featuredBuildsTitle}
        description={featuredBuildsDescription}
      />

      <HomeProcessSection />

      <HomeAiConciergeSection
        eyebrow={aiEyebrow}
        title={aiTitle}
        description={aiDescription}
        privacyNote={aiPrivacyNote}
      />

      <Testimonials />

      {showGoogleReviews ? (
        <Section size="standard" layout="content" spacing="split" tone="default">
          <Container>
            <GoogleReviews
              eyebrow="Voices"
              title="Teams we've shipped with."
              description="Live Google reviews from the public Growrix OS business profile."
              titleClassName={HERO_TITLE_CLASS}
            />
          </Container>
        </Section>
      ) : null}

      <HomeFieldNotesSection
        posts={latestBlogPosts}
        eyebrow={fieldNotesEyebrow}
        title={fieldNotesTitle}
        description={fieldNotesDescription}
      />

      <ProductLedFinalCTA
        eyebrow={finalCtaEyebrow}
        title={finalCtaTitle}
        description={finalCtaDescription}
        primaryLabel={finalCtaPrimaryLabel}
        primaryHref="/digital-products"
        secondaryLabel={finalCtaSecondaryLabel}
        secondaryHref="/book-appointment"
      />
    </>
  );
}
