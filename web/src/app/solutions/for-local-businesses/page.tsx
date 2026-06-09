import type { Metadata } from "next";
import { SolutionsLanding } from "@/components/marketing/SolutionsLanding";
import { SOLUTION_BY_SLUG } from "@/lib/product-led-content";

const solution = SOLUTION_BY_SLUG["for-local-businesses"];

export const metadata: Metadata = {
  title: "Solutions for Local Businesses | HTML Profiles and Setup",
  description: solution.description,
};

export default function ForLocalBusinessesSolutionPage() {
  return <SolutionsLanding solution={solution} />;
}
