import { HomeHero } from "@/components/marketing/HomeHero";

import { FeaturedProducts } from "@/components/marketing/FeaturedProducts";

import { ThreePathExplainer } from "@/components/marketing/ThreePathExplainer";

import { ServiceCards } from "@/components/marketing/ServiceCards";

import { Testimonials } from "@/components/marketing/Testimonials";

import { ProductLedFinalCTA } from "@/components/marketing/ProductLedFinalCTA";

import { HomeAiConciergeSection } from "@/components/marketing/HomeAiConciergeSection";

import { HomeFeaturedBuildsSection } from "@/components/marketing/HomeFeaturedBuildsSection";

import { HomeHtmlPreviewSection } from "@/components/marketing/HomeHtmlPreviewSection";

import { HomeProcessSection } from "@/components/marketing/HomeProcessSection";

import { HomeTemplatesMarketplaceSection } from "@/components/marketing/HomeTemplatesMarketplaceSection";

import { GoogleReviews } from "@/components/sections/GoogleReviews";

import { TrustStrip } from "@/components/sections/TrustStrip";

import { HomeFieldNotesSection } from "@/components/marketing/HomeFieldNotesSection";

import { Container, Section } from "@/components/primitives/Container";

import { HOME_STACK_MARQUEE } from "@/lib/content";

import { SHOW_GOOGLE_REVIEWS } from "@/lib/feature-flags";

import { HTML_BUSINESS_PROFILE_SHOP_CATEGORY } from "@/lib/html-business-profiles";

import { buildReadyMadeSolutionTabs, pickPreviewProducts } from "@/lib/ready-made-solutions";

import { HOME_PREVIEW_COPY } from "@/lib/home-conversion-content";

import { homeSection } from "@/lib/homepage-composition";

import { HERO_TITLE_CLASS } from "@/lib/typography";

import { getHomePageData } from "@/server/marketing/home-page-data";

import { JsonLd, type JsonLdData } from "@/components/seo/JsonLd";

import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

import {

  buildWebsiteTemplateHtmlPreviewSlides,

  getWebsiteTemplateHtmlPreviewUrl,

  listWebsiteTemplateHtmlPreviews,

  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,

} from "@/lib/website-templates-html-preview";

import { getProductHref } from "@/lib/shop";

import { WEBSITE_TEMPLATE_PREVIEW } from "@/lib/preview-terminology";

import dynamic from "next/dynamic";



const ReadyMadeSolutionsSection = dynamic(

  () => import("@/components/marketing/ReadyMadeSolutionsSection").then((mod) => mod.ReadyMadeSolutionsSection),

);



const HomeDigitalProductsShowcase = dynamic(

  () => import("@/components/marketing/HomeDigitalProductsShowcase").then((mod) => mod.HomeDigitalProductsShowcase),

);



export const revalidate = 120;



const HOME_PROFILE_PREVIEW_COUNT = 4;

function pickBySlugs<T extends { slug: string }>(items: T[], slugs: string[] | undefined, fallback: T[]) {
  if (!slugs || slugs.length === 0) {
    return fallback;
  }

  const bySlug = new Map(items.map((item) => [item.slug, item]));
  const picked = slugs.map((slug) => bySlug.get(slug)).filter((item): item is T => item !== undefined);
  return picked.length > 0 ? picked : fallback;
}

export default async function Home() {

  const { latestBlogPosts, homeContent, services, portfolio, publicProducts } = await getHomePageData();



  const featuredProjects = pickBySlugs(portfolio, homeContent?.featuredBuilds?.projectSlugs, portfolio.slice(0, 3));

  const readyMadeSolutions = buildReadyMadeSolutionTabs(publicProducts);

  const featuredHtmlBusinessProfileProducts = pickPreviewProducts(

    publicProducts,

    HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug,

    HOME_PROFILE_PREVIEW_COUNT,

    "start",

  );

  const htmlPreviewCatalogProducts = publicProducts.filter(

    (product) => product.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,

  );

  const featuredHtmlWebsiteTemplates = pickPreviewProducts(

    publicProducts,

    WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,

    3,

    "start",

  );

  const htmlPreviewSlides = buildWebsiteTemplateHtmlPreviewSlides(htmlPreviewCatalogProducts);

  const htmlPreviewPrimaryTemplate = htmlPreviewCatalogProducts[0];

  const htmlPreviewFallbackSlide = {

    name: htmlPreviewPrimaryTemplate?.name ?? "Website Template",

    type: htmlPreviewPrimaryTemplate?.type ?? WEBSITE_TEMPLATE_PREVIEW.previewBadge,

    price: htmlPreviewPrimaryTemplate?.price ?? "$149",

    href: htmlPreviewPrimaryTemplate

      ? getProductHref(htmlPreviewPrimaryTemplate)

      : "/digital-products/category/website-templates-html-preview",

    previewUrl: listWebsiteTemplateHtmlPreviews()[0]

      ? getWebsiteTemplateHtmlPreviewUrl(listWebsiteTemplateHtmlPreviews()[0].slug)

      : undefined,

  };

  const homeStructuredData: JsonLdData[] = [

    {

      "@context": "https://schema.org",

      "@type": "Organization",

      name: SITE_NAME,

      url: SITE_URL,

      logo: absoluteUrl("/Favicon.svg"),

      sameAs: [],

    },

    {

      "@context": "https://schema.org",

      "@type": "WebSite",

      name: SITE_NAME,

      url: SITE_URL,

      potentialAction: {

        "@type": "SearchAction",

        target: `${SITE_URL}/digital-products?search={search_term_string}`,

        "query-input": "required name=search_term_string",

      },

    },

  ];



  return (

    <>

      <JsonLd data={homeStructuredData} />

      <HomeHero

        badge={homeContent?.heroBadge}

        title={homeContent?.heroTitle}

        description={homeContent?.heroDescription}

        slides={htmlPreviewSlides}

        emptyFallbackSlide={htmlPreviewFallbackSlide}

      />



      <ServiceCards services={services} />



      <ReadyMadeSolutionsSection

        tabs={readyMadeSolutions.tabs}

        productsByTabId={readyMadeSolutions.productsByTabId}

      />



      <HomeTemplatesMarketplaceSection products={featuredHtmlBusinessProfileProducts} />



      <FeaturedProducts

        products={featuredHtmlWebsiteTemplates}

        variant="html-preview"

        maxProducts={3}

        eyebrow="Featured templates"

        title="Production-ready templates with live desktop preview"

        description="Deliver flawless experiences across every device—preview, purchase, and launch from proven website systems."

        ctaHref="/digital-products/category/website-templates-html-preview#profiles"

        ctaLabel={WEBSITE_TEMPLATE_PREVIEW.browseTemplatePreviewsCta}

      />



      <HomeHtmlPreviewSection

        slides={htmlPreviewSlides}

        emptyFallbackSlide={htmlPreviewFallbackSlide}

        sectionShell={homeSection("html-preview")}

        title={HOME_PREVIEW_COPY.title}

        description={HOME_PREVIEW_COPY.description}

      />



      <HomeDigitalProductsShowcase products={publicProducts} />



      <ThreePathExplainer />



      <HomeFeaturedBuildsSection

        projects={featuredProjects}

        title={homeContent?.featuredBuilds?.title}

        description={homeContent?.featuredBuilds?.description}

      />



      <TrustStrip items={HOME_STACK_MARQUEE} tone={homeSection("trust-strip").tone} />



      <HomeProcessSection />



      <HomeAiConciergeSection

        eyebrow={homeContent?.ai?.eyebrow}

        title={homeContent?.ai?.title}

        description={homeContent?.ai?.description}

        privacyNote={homeContent?.ai?.privacyNote}

      />



      <Testimonials />



      {SHOW_GOOGLE_REVIEWS && (

        <Section size="standard" layout="content" spacing="split">

          <Container>

            <GoogleReviews

              eyebrow="Voices"

              title="Teams we've shipped with."

              description="Live Google reviews from the public Growrix OS business profile."

              titleClassName={HERO_TITLE_CLASS}

            />

          </Container>

        </Section>

      )}



      <HomeFieldNotesSection
        posts={latestBlogPosts}
        eyebrow={homeContent?.fieldNotes?.eyebrow}
        title={homeContent?.fieldNotes?.title}
        description={homeContent?.fieldNotes?.description}
      />



      <ProductLedFinalCTA

        eyebrow={homeContent?.finalCta?.eyebrow ?? "Start with a product or a conversation"}

        title={homeContent?.finalCta?.title ?? "Browse ready-made assets or book a free consultation."}

        description={

          homeContent?.finalCta?.description ??

          "Pick a digital product for instant delivery, request Done-For-You setup, or scope a custom build."

        }

        primaryLabel={homeContent?.finalCta?.primaryLabel ?? "Browse Digital Products"}

        primaryHref="/digital-products"

        secondaryLabel={homeContent?.finalCta?.secondaryLabel ?? "Book a Free Consultation"}

        secondaryHref="/book-appointment"

      />

    </>

  );

}

