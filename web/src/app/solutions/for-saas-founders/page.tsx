import type { Metadata } from "next";
import { SolutionsLanding } from "@/components/marketing/SolutionsLanding";
import { SOLUTION_BY_SLUG } from "@/lib/product-led-content";

const solution = SOLUTION_BY_SLUG["for-saas-founders"];

export const metadata: Metadata = {
  title: "Solutions for SaaS Founders | Starters, SEO, and Implementation",
  description: solution.description,
};

export default function ForSaasFoundersSolutionPage() {
  return <SolutionsLanding solution={solution} />;
}
