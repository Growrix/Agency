import { redirect } from "next/navigation";
import { HtmlBusinessProfilesServicePage } from "@/app/services/[slug]/page";
import { ProductTypeCategoryLanding } from "@/components/sections/ProductTypeCategoryLanding";
import { WebsiteTemplatesCategoryLanding } from "@/components/sections/WebsiteTemplatesCategoryLanding";
import { getProductTypeDefinition } from "@/lib/product-taxonomy";
import { listPublicShopProducts } from "@/server/domain/catalog";

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function ProductsCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const typeAliasRedirects: Record<string, string> = {
    "business-cards": "digital-business-cards",
    "website-templates": "website-templates",
    "email-templates": "newsletter-templates",
    faq: "faq-knowledge-base-pages",
    calculators: "calculators",
    "checklist-tracker": "checklists-trackers",
    "annual-report": "annual-report-pages",
    resume: "html-resumes-cv",
    proposal: "proposal-templates",
    invoice: "html-invoice-templates",
    "restaurant-menu": "restaurant-menu-pages",
    "app-promo": "app-promo-pages",
    "affiliate-landing": "affiliate-landing-pages",
    "course-landing": "course-landing-pages",
    "event-webinar": "event-webinar-pages",
    "lead-magnet": "lead-magnet-download-pages",
    portfolio: "portfolio-templates",
    "product-launch": "product-launch-pages",
    "link-in-bio": "link-in-bio-pages",
    "coming-soon": "coming-soon-maintenance-pages",
    "cold-outreach": "cold-outreach-templates",
    "promo-blast": "promotional-email-blasts",
    transactional: "transactional-email-templates",
  };

  const aliasTarget = typeAliasRedirects[category];
  if (aliasTarget && aliasTarget !== category) {
    redirect(`/products/category/${aliasTarget}`);
  }

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
  const typeDefinition = getProductTypeDefinition(category);
  if (typeDefinition) {
    const products = await listPublicShopProducts({ type: category });
    return <ProductTypeCategoryLanding type={typeDefinition} products={products} />;
  }
  redirect(`/products?category=${encodeURIComponent(category)}`);
}
