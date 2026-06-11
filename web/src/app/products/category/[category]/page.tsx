import { redirect } from "next/navigation";
import { HtmlBusinessProfilesServicePage } from "@/app/services/[slug]/page";
import { WebsiteTemplatesCategoryLanding } from "@/components/sections/WebsiteTemplatesCategoryLanding";
import { WebsiteTemplatesHtmlPreviewCategoryLanding } from "@/components/sections/WebsiteTemplatesHtmlPreviewCategoryLanding";
import { listPublicShopProducts } from "@/server/domain/catalog";

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function ProductsCategoryPage({ params }: PageProps) {
  const { category } = await params;
  if (category === "saas-templates" || category === "ready-websites") {
    redirect("/products/category/website-templates");
  }

  if (category === "html-business-profiles") {
    const products = await listPublicShopProducts({ category: "html-business-profiles" });
    return <HtmlBusinessProfilesServicePage products={products} />;
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
