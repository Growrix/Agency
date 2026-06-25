import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { HtmlBusinessProfilesCategoryLanding } from "@/components/sections/HtmlBusinessProfilesCategoryLanding";
import { WebsiteTemplatesHtmlPreviewCategoryLanding } from "@/components/sections/WebsiteTemplatesHtmlPreviewCategoryLanding";
import { JsonLd, type JsonLdData } from "@/components/seo/JsonLd";
import { isHiddenProductCategorySlug } from "@/lib/feature-flags";
import { HTML_BUSINESS_PROFILES_CATEGORY_METADATA } from "@/lib/html-business-profiles-category-content";
import { HTML_BUSINESS_PROFILE_SHOP_CATEGORY } from "@/lib/html-business-profiles";
import { WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_METADATA } from "@/lib/website-templates-html-preview-category-content";
import { WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG } from "@/lib/website-templates-html-preview";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import { listPublicShopProducts } from "@/server/domain/catalog";

type PageProps = {
  params: Promise<{ category: string }>;
};

export const revalidate = 180;

const CATEGORY_METADATA: Record<string, { title: string; description: string }> = {
  [WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG]: {
    title: WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_METADATA.title,
    description: WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_METADATA.description,
  },
  [HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug]: {
    title: HTML_BUSINESS_PROFILES_CATEGORY_METADATA.title,
    description: HTML_BUSINESS_PROFILES_CATEGORY_METADATA.description,
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const entry = CATEGORY_METADATA[category];
  if (!entry) {
    return {};
  }

  const canonical = `/digital-products/category/${category}`;
  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
    },
  };
}

export default async function ProductsCategoryPage({ params }: PageProps) {
  const { category } = await params;
  if (isHiddenProductCategorySlug(category)) {
    redirect("/digital-products");
  }
  if (category === "saas-templates" || category === "ready-websites") {
    redirect("/digital-products");
  }

  const categoryMetadata = CATEGORY_METADATA[category];
  const categoryPath = `/digital-products/category/${category}`;
  const categoryStructuredData: JsonLdData[] | null = categoryMetadata
    ? [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: categoryMetadata.title,
          description: categoryMetadata.description,
          url: absoluteUrl(categoryPath),
          isPartOf: {
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Digital Products",
              item: absoluteUrl("/digital-products"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: categoryMetadata.title,
              item: absoluteUrl(categoryPath),
            },
          ],
        },
      ]
    : null;

  if (category === HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug) {
    const products = await listPublicShopProducts({ category: HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug });
    return (
      <>
        {categoryStructuredData ? <JsonLd data={categoryStructuredData} /> : null}
        <HtmlBusinessProfilesCategoryLanding products={products} />
      </>
    );
  }
  if (category === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG) {
    const products = await listPublicShopProducts({ category: WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG });
    return (
      <>
        {categoryStructuredData ? <JsonLd data={categoryStructuredData} /> : null}
        <WebsiteTemplatesHtmlPreviewCategoryLanding products={products} />
      </>
    );
  }

  redirect("/digital-products");
}
