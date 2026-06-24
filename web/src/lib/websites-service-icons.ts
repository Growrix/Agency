import type { ComponentType, SVGProps } from "react";
import {
  ArrowTrendingUpIcon,
  BoltIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  CloudIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  RectangleGroupIcon,
  RocketLaunchIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export type WebsitesOutcomeIconKey =
  | "lead-generation"
  | "product-launch"
  | "client-portals"
  | "landing-pages"
  | "internal-systems"
  | "content-hubs";

export type WebsitesPrincipleIconKey =
  | "conversion-frameworks"
  | "modern-infrastructure"
  | "performance-default"
  | "mobile-first-ux";

export const WEBSITES_OUTCOME_ICONS: Record<
  WebsitesOutcomeIconKey,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  "lead-generation": UserGroupIcon,
  "product-launch": RocketLaunchIcon,
  "client-portals": RectangleGroupIcon,
  "landing-pages": CursorArrowRaysIcon,
  "internal-systems": BoltIcon,
  "content-hubs": BookOpenIcon,
};

export const WEBSITES_PRINCIPLE_ICONS: Record<
  WebsitesPrincipleIconKey,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  "conversion-frameworks": ArrowTrendingUpIcon,
  "modern-infrastructure": CloudIcon,
  "performance-default": BoltIcon,
  "mobile-first-ux": DevicePhoneMobileIcon,
};

export function getWebsitesOutcomeIcon(key: WebsitesOutcomeIconKey) {
  return WEBSITES_OUTCOME_ICONS[key] ?? ChatBubbleLeftRightIcon;
}

export function getWebsitesPrincipleIcon(key: WebsitesPrincipleIconKey) {
  return WEBSITES_PRINCIPLE_ICONS[key] ?? BoltIcon;
}
