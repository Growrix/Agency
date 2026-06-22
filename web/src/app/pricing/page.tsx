import type { Metadata } from "next";
import { PricingPageClient } from "@/app/pricing/PricingPageClient";

export const metadata: Metadata = {
  title: "Investment Guide | Digital Products, Services & Custom Builds",
  description:
    "Choose the right investment path for your goals—digital products, Done-For-You setup, custom builds, and typical service ranges from GrowrixOS.",
};

export default function PricingPage() {
  return <PricingPageClient />;
}
