import {
  getHtmlBusinessProfileBySlug,
  HTML_BUSINESS_PROFILE_SHOP_CATEGORY,
} from "@/lib/html-business-profiles";
import {
  getWebsiteTemplateHtmlPreviewByProductSlug,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
} from "@/lib/website-templates-html-preview";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

export type ReadyMadeSolutionPreviewMode = "website-template-wide" | "html-profile-mobile";

export type ReadyMadeSolutionTabDefinition = {
  id: string;
  label: string;
  categorySlug: string;
  description: string;
  previewLimit: number;
  previewMode: ReadyMadeSolutionPreviewMode;
};

export const READY_MADE_SOLUTION_TAB_DEFINITIONS: ReadyMadeSolutionTabDefinition[] = [
  {
    id: "website-templates",
    label: "Website Templates",
    categorySlug: WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
    description: "Desktop website previews — inspect full website templates before you buy.",
    previewLimit: 3,
    previewMode: "website-template-wide",
  },
  {
    id: "html-business-profiles",
    label: "HTML Business Profiles",
    categorySlug: HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug,
    description: "Mobile-first profile previews — shareable business cards that drive traffic to your site.",
    previewLimit: 4,
    previewMode: "html-profile-mobile",
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

function getProductCatalogSortKey(product: PublicShopProductRecord): number {
  if (product.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG) {
    const template = getWebsiteTemplateHtmlPreviewByProductSlug(product.slug);
    if (template) {
      const match = /^(\d+)-/.exec(template.slug);
      if (match) {
        return Number.parseInt(match[1] ?? "", 10);
      }
    }
  }

  if (product.categorySlug === HTML_BUSINESS_PROFILE_SHOP_CATEGORY.slug) {
    const templateSlug = product.slug.replace(/^html-business-profile-/, "");
    const template = getHtmlBusinessProfileBySlug(templateSlug);
    if (template?.profileNumber !== null && template?.profileNumber !== undefined) {
      return template.profileNumber;
    }
  }

  return 9999;
}

export function pickPreviewProducts(
  products: PublicShopProductRecord[],
  categorySlug: string,
  limit = 3,
  position: "start" | "end" = "end",
): PublicShopProductRecord[] {
  const seen = new Set<string>();

  const sorted = products
    .filter(
      (product) =>
        product.published !== false &&
        product.categorySlug === categorySlug &&
        hasPreviewableAsset(product),
    )
    .sort(
      (left, right) =>
        getProductCatalogSortKey(left) - getProductCatalogSortKey(right) ||
        left.name.localeCompare(right.name),
    )
    .filter((product) => {
      if (seen.has(product.slug)) {
        return false;
      }
      seen.add(product.slug);
      return true;
    });

  return position === "end" ? sorted.slice(-limit) : sorted.slice(0, limit);
}

export function buildReadyMadeSolutionTabs(products: PublicShopProductRecord[]) {
  const tabsWithProducts = READY_MADE_SOLUTION_TAB_DEFINITIONS.map((tab) => ({
    ...tab,
    products: pickPreviewProducts(products, tab.categorySlug, tab.previewLimit, "end"),
  })).filter((tab) => tab.products.length > 0);

  return {
    tabs: tabsWithProducts.map(({ id, label, categorySlug, description, previewLimit, previewMode }) => ({
      id,
      label,
      categorySlug,
      description,
      previewLimit,
      previewMode,
    })),
    productsByTabId: Object.fromEntries(
      tabsWithProducts.map((tab) => [tab.id, tab.products]),
    ) as Record<string, PublicShopProductRecord[]>,
  };
}

export function getReadyMadeSolutionCategoryHref(categorySlug: string) {
  return `/digital-products/category/${categorySlug}`;
}

export function getReadyMadeSolutionGridClassName(previewMode: ReadyMadeSolutionPreviewMode) {
  if (previewMode === "website-template-wide") {
    return "mt-6 grid w-full min-w-0 auto-rows-fr items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3";
  }

  return "mt-8 grid w-full min-w-0 auto-rows-fr items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:mt-10 sm:gap-5";
}
