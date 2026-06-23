import {
  BoltIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassCircleIcon,
  SparklesIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import type { PublicServiceRecord } from "@/server/domain/catalog";

export const HOME_SERVICE_HIGHLIGHT_SLUGS = [
  "websites",
  "saas-applications",
  "mobile-apps",
  "automation",
  "technical-seo",
  "ai-business-systems",
] as const;

export type HomeServiceHighlightSlug = (typeof HOME_SERVICE_HIGHLIGHT_SLUGS)[number];

export const HOME_SERVICE_ICONS: Record<string, typeof WindowIcon> = {
  websites: WindowIcon,
  "saas-applications": CodeBracketSquareIcon,
  "mobile-apps": DevicePhoneMobileIcon,
  automation: BoltIcon,
  "technical-seo": MagnifyingGlassCircleIcon,
  "ai-business-systems": SparklesIcon,
};

export function getOrderedHomeServices(services: PublicServiceRecord[]): PublicServiceRecord[] {
  const bySlug = new Map(services.map((service) => [service.slug, service]));
  return HOME_SERVICE_HIGHLIGHT_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (service): service is PublicServiceRecord => Boolean(service),
  );
}
