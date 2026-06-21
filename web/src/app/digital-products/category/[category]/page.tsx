import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { HtmlBusinessProfilesCategoryLanding } from "@/components/sections/HtmlBusinessProfilesCategoryLanding";
import { WebsiteTemplatesHtmlPreviewCategoryLanding } from "@/components/sections/WebsiteTemplatesHtmlPreviewCategoryLanding";
import { JsonLd, type JsonLdData } from "@/components/seo/JsonLd";
import { isHiddenProductCategorySlug } from "@/lib/feature-flags";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import { WEBSITE_TEMPLATE_PREVIEW } from "@/lib/preview-terminology";
import { listPublicShopProducts } from "@/server/domain/catalog";

type PageProps = {
  params: Promise<{ category: string }>;
};

export const revalidate = 180;

const CATEGORY_METADATA: Record<string, { title: string; description: string }> = {
  "website-templates-html-preview": {
    title: WEBSITE_TEMPLATE_PREVIEW.categoryPageTitle,
    description: WEBSITE_TEMPLATE_PREVIEW.categoryPageDescription,
  },
  "html-business-profiles": {
    title: "HTML Business Profiles",
    description:
      "Category-specific HTML business profile websites ready in 24 hours. Preview live mobile profiles and launch a professional online presence fast.",
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

  if (category === "html-business-profiles") {
    const products = await listPublicShopProducts({ category: "html-business-profiles" });
    return (
      <>
        {categoryStructuredData ? <JsonLd data={categoryStructuredData} /> : null}
        <HtmlBusinessProfilesCategoryLanding products={products} />
      </>
    );
  }
  if (category === "website-templates-html-preview") {
    const products = await listPublicShopProducts({ category: "website-templates-html-preview" });
    return (
      <>
        {categoryStructuredData ? <JsonLd data={categoryStructuredData} /> : null}
        <WebsiteTemplatesHtmlPreviewCategoryLanding products={products} />
      </>
    );
  }

  redirect("/digital-products");
}
