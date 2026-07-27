import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { NOINDEX_ROBOTS } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "HTML Business Profiles",
  description: "Category-based HTML business profile templates and conversion-focused pricing under Products.",
  alternates: { canonical: "/digital-products/category/html-business-profiles" },
  robots: NOINDEX_ROBOTS,
};

export default function HtmlBusinessProfilesPage() {
  redirect("/digital-products/category/html-business-profiles");
}
