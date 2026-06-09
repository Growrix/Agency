import type { Metadata } from "next";
import { SolutionsLanding } from "@/components/marketing/SolutionsLanding";
import { SOLUTION_BY_SLUG } from "@/lib/product-led-content";

const solution = SOLUTION_BY_SLUG["for-startups"];

export const metadata: Metadata = {
  title: "Solutions for Startups | SaaS Templates and MVP Support",
  description: solution.description,
};

export default function ForStartupsSolutionPage() {
  return <SolutionsLanding solution={solution} />;
}
