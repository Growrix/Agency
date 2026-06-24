import type { ComponentType, SVGProps } from "react";
import {
  BoltIcon,
  ChartBarIcon,
  CodeBracketSquareIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassCircleIcon,
  RocketLaunchIcon,
  ShoppingBagIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export const MARKETING_TIER_ICON_KEYS = [
  "template-packs",
  "ready-websites",
  "custom-build-scope",
  "mvp-launch",
  "product-build",
  "custom-platform",
  "mobile-launch",
  "companion-mvp",
  "mobile-product-build",
  "workflow-audit",
  "automation-build",
  "optimization-partner",
  "seo-essentials",
  "seo-foundation",
  "seo-launch-bundle",
  "ai-discovery",
  "ai-system-build",
  "ai-operations-partner",
] as const;

export type MarketingTierIconKey = (typeof MARKETING_TIER_ICON_KEYS)[number];

const MARKETING_TIER_ICONS: Record<MarketingTierIconKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  "template-packs": ShoppingBagIcon,
  "ready-websites": RocketLaunchIcon,
  "custom-build-scope": CodeBracketSquareIcon,
  "mvp-launch": RocketLaunchIcon,
  "product-build": CodeBracketSquareIcon,
  "custom-platform": SparklesIcon,
  "mobile-launch": DevicePhoneMobileIcon,
  "companion-mvp": RocketLaunchIcon,
  "mobile-product-build": CodeBracketSquareIcon,
  "workflow-audit": MagnifyingGlassCircleIcon,
  "automation-build": BoltIcon,
  "optimization-partner": WrenchScrewdriverIcon,
  "seo-essentials": MagnifyingGlassCircleIcon,
  "seo-foundation": ChartBarIcon,
  "seo-launch-bundle": RocketLaunchIcon,
  "ai-discovery": SparklesIcon,
  "ai-system-build": CpuChipIcon,
  "ai-operations-partner": SparklesIcon,
};

export function getMarketingTierIcon(key?: MarketingTierIconKey) {
  if (!key) {
    return RocketLaunchIcon;
  }

  return MARKETING_TIER_ICONS[key] ?? RocketLaunchIcon;
}
