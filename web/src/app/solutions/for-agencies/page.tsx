import type { Metadata } from "next";
import { SolutionsLanding } from "@/components/marketing/SolutionsLanding";
import { SOLUTION_BY_SLUG } from "@/lib/product-led-content";

const solution = SOLUTION_BY_SLUG["for-agencies"];

export const metadata: Metadata = {
  title: "Solutions for Agencies | Template Bundles and Delivery Systems",
  description: solution.description,
};

export default function ForAgenciesSolutionPage() {
  return <SolutionsLanding solution={solution} />;
}
