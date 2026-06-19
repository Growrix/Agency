import type { PublicShopProductRecord } from "@/server/domain/catalog";

export type ShopFilterState = {
  category?: string;
  type?: string;
  industry?: string;
};

export type ShopFilterOption = { value: string; label: string };

export type ShopFilterGroup = {
  label: string;
  key: keyof ShopFilterState;
  options: ShopFilterOption[];
  activeValue: string | undefined;
};

const CATEGORY_ORDER = new Map([
  ["html-business-profiles", 0],
  ["html-templates", 1],
  ["website-templates-html-preview", 2],
  ["saas-templates", 3],
  ["ai-automation", 4],
  ["mcp-servers", 5],
  ["seo-toolkits", 6],
  ["bundles", 7],
  ["free-products", 8],
]);

function sortCategoryOptions(left: ShopFilterOption, right: ShopFilterOption) {
  const leftRank = CATEGORY_ORDER.get(left.value) ?? 999;
  const rightRank = CATEGORY_ORDER.get(right.value) ?? 999;
  if (leftRank !== rightRank) {
    return leftRank - rightRank;
  }
  return left.label.localeCompare(right.label);
}

export function buildShopFilterOptions(
  items: Pick<
    PublicShopProductRecord,
    "category" | "categorySlug" | "type" | "typeSlug" | "industry" | "industrySlug"
  >[],
) {
  return {
    categories: Array.from(
      new Map(items.map((item) => [item.categorySlug, item.category])).entries(),
      ([value, label]) => ({ value, label }),
    ).sort(sortCategoryOptions),
    types: Array.from(
      new Map(items.map((item) => [item.typeSlug, item.type])).entries(),
      ([value, label]) => ({ value, label }),
    ).sort((left, right) => left.label.localeCompare(right.label)),
    industries: Array.from(
      new Map(items.map((item) => [item.industrySlug, item.industry])).entries(),
      ([value, label]) => ({ value, label }),
    ).sort((left, right) => left.label.localeCompare(right.label)),
  };
}

export function filterShopProducts(
  items: PublicShopProductRecord[],
  filters: ShopFilterState,
): PublicShopProductRecord[] {
  return items.filter((item) => {
    if (filters.category && item.categorySlug !== filters.category) {
      return false;
    }
    if (filters.type && item.typeSlug !== filters.type) {
      return false;
    }
    if (filters.industry && item.industrySlug !== filters.industry) {
      return false;
    }
    return true;
  });
}

export function buildShopHref(filters: ShopFilterState, patch: Partial<ShopFilterState>) {
  const next = new URLSearchParams();
  const merged = { ...filters, ...patch };
  if (merged.category) next.set("category", merged.category);
  if (merged.type) next.set("type", merged.type);
  if (merged.industry) next.set("industry", merged.industry);
  const query = next.toString();
  return query ? `/digital-products?${query}` : "/digital-products";
}

export function buildShopFilterGroups(
  filterOptions: ReturnType<typeof buildShopFilterOptions>,
  filters: ShopFilterState,
): ShopFilterGroup[] {
  return [
    {
      label: "Category",
      key: "category",
      options: filterOptions.categories,
      activeValue: filters.category,
    },
    {
      label: "Type",
      key: "type",
      options: filterOptions.types,
      activeValue: filters.type,
    },
    {
      label: "Industry",
      key: "industry",
      options: filterOptions.industries,
      activeValue: filters.industry,
    },
  ];
}
