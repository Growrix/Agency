import {
  BoltIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { MobileFeatureGrid } from "@/components/marketing/mobile/MobileFeatureGrid";

const VALUE_POINTS = [
  {
    icon: CursorArrowRaysIcon,
    title: "Get found faster",
    description: "Proper indexing and Search Console setup can cut crawl delay from weeks to days.",
  },
  {
    icon: ChartBarIcon,
    title: "Measure what matters",
    description: "GA4 and Pixel configured correctly from the start means every decision is data-backed.",
  },
  {
    icon: BoltIcon,
    title: "Win on Core Web Vitals",
    description: "Performance scores directly influence rankings and first-impression conversion rates.",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Structured for algorithms",
    description: "Schema markup and clean URL structure help search engines understand and rank your pages.",
  },
] as const;

export function AdditionalServicesValueMobile() {
  return (
    <MobileFeatureGrid
      eyebrow="Why it matters"
      titleLead="The foundation most"
      titleAccent="products launch without."
      description="These are not optional add-ons. They're the configurations that determine whether your product gets found, measured, and ranked correctly."
      items={VALUE_POINTS}
    />
  );
}
