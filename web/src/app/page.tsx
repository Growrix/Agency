import { HomeHeroGate } from "@/components/marketing/HomeHeroGate";
import { HomeBelowFoldGate } from "@/components/marketing/HomeBelowFoldGate";

import { SHOW_GOOGLE_REVIEWS } from "@/lib/feature-flags";

import { buildReadyMadeSolutionTabs, pickPreviewProducts } from "@/lib/ready-made-solutions";

import { homeSection } from "@/lib/homepage-composition";

import { getHomePageData } from "@/server/marketing/home-page-data";

import { JsonLd, type JsonLdData } from "@/components/seo/JsonLd";

import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

import {

  buildWebsiteTemplateHtmlPreviewHeroSlides,

  buildWebsiteTemplateHtmlPreviewSlides,

  getPreviewPosterUrl,

  getWebsiteTemplateHtmlPreviewUrl,

  listWebsiteTemplateHtmlPreviews,

  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,

} from "@/lib/website-templates-html-preview";

import { getProductHref } from "@/lib/shop";

import { WEBSITE_TEMPLATE_PREVIEW } from "@/lib/preview-terminology";

export const revalidate = 120;

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

  const heroPreviewSlides = buildWebsiteTemplateHtmlPreviewHeroSlides(htmlPreviewCatalogProducts);

  const htmlPreviewPrimaryTemplate = htmlPreviewCatalogProducts[0];

  const htmlPreviewFallbackTemplate = listWebsiteTemplateHtmlPreviews()[0];

  const htmlPreviewFallbackSlide = {

    name: htmlPreviewPrimaryTemplate?.name ?? "Website Template",

    type: htmlPreviewPrimaryTemplate?.type ?? WEBSITE_TEMPLATE_PREVIEW.previewBadge,

    price: htmlPreviewPrimaryTemplate?.price ?? "$149",

    href: htmlPreviewPrimaryTemplate

      ? getProductHref(htmlPreviewPrimaryTemplate)

      : "/digital-products/category/website-templates-html-preview",

    previewUrl: htmlPreviewFallbackTemplate

      ? getWebsiteTemplateHtmlPreviewUrl(htmlPreviewFallbackTemplate.slug)

      : undefined,

  };

  const heroPreviewFallbackSlide = {

    ...htmlPreviewFallbackSlide,

    previewUrl: undefined,

    previewImage: htmlPreviewFallbackTemplate

      ? {

          src: getPreviewPosterUrl(htmlPreviewFallbackTemplate.slug, "desktop"),

          alt: `${htmlPreviewFallbackTemplate.title} desktop preview`,

        }

      : undefined,

    previewMobileImage: htmlPreviewFallbackTemplate

      ? {

          src: getPreviewPosterUrl(htmlPreviewFallbackTemplate.slug, "mobile"),

          alt: `${htmlPreviewFallbackTemplate.title} mobile preview`,

        }

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

      <div className="home-desktop-marketing">
      <HomeHeroGate

        badge={homeContent?.heroBadge}

        title={homeContent?.heroTitle}

        description={homeContent?.heroDescription}

        slides={heroPreviewSlides}

        emptyFallbackSlide={heroPreviewFallbackSlide}

      />

      <HomeBelowFoldGate
        services={services}
        readyMadeTabs={readyMadeSolutions.tabs}
        readyMadeProductsByTabId={readyMadeSolutions.productsByTabId}
        featuredHtmlWebsiteTemplates={featuredHtmlWebsiteTemplates}
        htmlPreviewSlides={htmlPreviewSlides}
        htmlPreviewFallbackSlide={htmlPreviewFallbackSlide}
        htmlPreviewSectionShell={homeSection("html-preview")}
        publicProducts={publicProducts}
        featuredProjects={featuredProjects}
        featuredBuildsTitle={homeContent?.featuredBuilds?.title}
        featuredBuildsDescription={homeContent?.featuredBuilds?.description}
        aiEyebrow={homeContent?.ai?.eyebrow}
        aiTitle={homeContent?.ai?.title}
        aiDescription={homeContent?.ai?.description}
        aiPrivacyNote={homeContent?.ai?.privacyNote}
        showGoogleReviews={SHOW_GOOGLE_REVIEWS}
        latestBlogPosts={latestBlogPosts}
        fieldNotesEyebrow={homeContent?.fieldNotes?.eyebrow}
        fieldNotesTitle={homeContent?.fieldNotes?.title}
        fieldNotesDescription={homeContent?.fieldNotes?.description}
        finalCtaEyebrow={homeContent?.finalCta?.eyebrow ?? "Start with a product or a conversation"}
        finalCtaTitle={homeContent?.finalCta?.title ?? "Browse ready-made assets or book a free consultation."}
        finalCtaDescription={
          homeContent?.finalCta?.description ??
          "Pick a digital product for instant delivery, request Done-For-You setup, or scope a custom build."
        }
        finalCtaPrimaryLabel={homeContent?.finalCta?.primaryLabel ?? "Browse Digital Products"}
        finalCtaSecondaryLabel={homeContent?.finalCta?.secondaryLabel ?? "Book a Free Consultation"}
        featuredTemplatesCtaHref="/digital-products/category/website-templates-html-preview#profiles"
        featuredTemplatesCtaLabel={WEBSITE_TEMPLATE_PREVIEW.browseTemplatePreviewsCta}
      />

      </div>
    </>

  );

}

