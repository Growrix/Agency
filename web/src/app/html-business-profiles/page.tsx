import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "HTML Business Profiles",
  description: "Category-based HTML business profile templates and conversion-focused pricing under Products.",
};

export default function HtmlBusinessProfilesPage() {
  redirect("/digital-products/category/html-business-profiles");
}
