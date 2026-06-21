import { HTML_BUSINESS_PROFILE_SHOP_CATEGORY } from "@/lib/html-business-profiles";
import {
  getWebsiteTemplateHtmlPreviewByProductSlug,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
} from "@/lib/website-templates-html-preview";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

export type ReadyMadeSolutionTabDefinition = {
  id: string;
  label: string;
  categorySlug: string;
  description: string;
};

export const READY_MADE_SOLUTION_TAB_DEFINITIONS: ReadyMadeSolutionTabDefinition[] = [
  {
    id: "website-templates",
    label: "Website Templates",
    categorySlug: WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
    description: "Desktop live previews — inspect full website templates before you buy.",
  },
  {
    id: "html-business-profiles",
    label: "HTML Business Profiles",
    categorySlug: HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug,
    description: "Mobile-first profile previews — shareable business cards that drive traffic to your site.",
  },
];

function hasPreviewableAsset(product: PublicShopProductRecord): boolean {
  if (product.embeddedPreviewUrl || product.livePreviewUrl) {
    return true;
  }

  if (product.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG) {
    return Boolean(getWebsiteTemplateHtmlPreviewByProductSlug(product.slug));
  }

  return false;
}

export function pickPreviewProducts(
  products: PublicShopProductRecord[],
  categorySlug: string,
  limit = 3,
): PublicShopProductRecord[] {
  const seen = new Set<string>();

  return products
    .filter(
      (product) =>
        product.published !== false &&
        product.categorySlug === categorySlug &&
        hasPreviewableAsset(product),
    )
    .sort((left, right) => left.name.localeCompare(right.name))
    .filter((product) => {
      if (seen.has(product.slug)) {
        return false;
      }
      seen.add(product.slug);
      return true;
    })
    .slice(0, limit);
}

export function buildReadyMadeSolutionTabs(products: PublicShopProductRecord[]) {
  const tabsWithProducts = READY_MADE_SOLUTION_TAB_DEFINITIONS.map((tab) => ({
    ...tab,
    products: pickPreviewProducts(products, tab.categorySlug),
  })).filter((tab) => tab.products.length > 0);

  return {
    tabs: tabsWithProducts.map(({ id, label, categorySlug, description }) => ({
      id,
      label,
      categorySlug,
      description,
    })),
    productsByTabId: Object.fromEntries(
      tabsWithProducts.map((tab) => [tab.id, tab.products]),
    ) as Record<string, PublicShopProductRecord[]>,
  };
}

export function getReadyMadeSolutionCategoryHref(categorySlug: string) {
  return `/digital-products/category/${categorySlug}`;
}
