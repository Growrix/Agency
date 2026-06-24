import type { ComponentType, SVGProps } from "react";
import {
  CodeBracketSquareIcon,
  RocketLaunchIcon,
  ShoppingBagIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export const MARKETING_TIER_ICON_KEYS = [
  "template-packs",
  "ready-websites",
  "custom-build-scope",
  "mvp-launch",
  "product-build",
  "custom-platform",
] as const;

export type MarketingTierIconKey = (typeof MARKETING_TIER_ICON_KEYS)[number];

const MARKETING_TIER_ICONS: Record<MarketingTierIconKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  "template-packs": ShoppingBagIcon,
  "ready-websites": RocketLaunchIcon,
  "custom-build-scope": CodeBracketSquareIcon,
  "mvp-launch": RocketLaunchIcon,
  "product-build": CodeBracketSquareIcon,
  "custom-platform": SparklesIcon,
};

export function getMarketingTierIcon(key?: MarketingTierIconKey) {
  if (!key) {
    return RocketLaunchIcon;
  }

  return MARKETING_TIER_ICONS[key] ?? RocketLaunchIcon;
}
