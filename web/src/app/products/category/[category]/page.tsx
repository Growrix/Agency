import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { HtmlBusinessProfilesCategoryLanding } from "@/components/sections/HtmlBusinessProfilesCategoryLanding";
import { WebsiteTemplatesCategoryLanding } from "@/components/sections/WebsiteTemplatesCategoryLanding";
import { WebsiteTemplatesHtmlPreviewCategoryLanding } from "@/components/sections/WebsiteTemplatesHtmlPreviewCategoryLanding";
import { listPublicShopProducts } from "@/server/domain/catalog";

type PageProps = {
  params: Promise<{ category: string }>;
};

const CATEGORY_METADATA: Record<string, { title: string; description: string }> = {
  "website-templates": {
    title: "Website Templates",
    description:
      "Production-ready website templates with Standard, Premium, and Done-For-You options. Buy a polished template or have Growrix OS launch it for you.",
  },
  "website-templates-html-preview": {
    title: "HTML Website Templates with Live Preview",
    description:
      "Browse HTML website templates with embedded desktop and mobile previews. Inspect each template live, then purchase or request Done-For-You setup.",
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

  const canonical = `/products/category/${category}`;
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
  if (category === "saas-templates" || category === "ready-websites") {
    redirect("/products/category/website-templates");
  }

  if (category === "html-business-profiles") {
    const products = await listPublicShopProducts({ category: "html-business-profiles" });
    return <HtmlBusinessProfilesCategoryLanding products={products} />;
  }
  if (category === "website-templates") {
    const products = await listPublicShopProducts({ category: "website-templates" });
    return <WebsiteTemplatesCategoryLanding products={products} />;
  }
  if (category === "website-templates-html-preview") {
    const products = await listPublicShopProducts({ category: "website-templates-html-preview" });
    return <WebsiteTemplatesHtmlPreviewCategoryLanding products={products} />;
  }

  redirect("/products");
}
