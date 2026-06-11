import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { ShopProductHtmlMobilePreviewCard } from "@/components/shop/ShopProductHtmlMobilePreviewCard";
import { ShopProductHtmlPreviewCard } from "@/components/shop/ShopProductHtmlPreviewCard";
import { WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG } from "@/lib/website-templates-html-preview";
import type { ShopProduct } from "@/lib/shop";

const HTML_BUSINESS_PROFILES_CATEGORY_SLUG = "html-business-profiles";

type ShopProductCatalogCardProps = {
  product: ShopProduct;
  variant?: "default" | "catalog-wide";
};

/** Picks the catalog card preview mode that matches each product slug page. */
export function ShopProductCatalogCard({ product, variant = "default" }: ShopProductCatalogCardProps) {
  if (product.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG) {
    return <ShopProductHtmlPreviewCard product={product} variant={variant} />;
  }

  if (product.categorySlug === HTML_BUSINESS_PROFILES_CATEGORY_SLUG) {
    return <ShopProductHtmlMobilePreviewCard product={product} variant={variant} />;
  }

  return <ShopProductCard product={product} />;
}
