import type { Metadata } from "next";
import { SitePageView } from "@/components/site/site-page-view";
import { sitePages } from "@/data/site-content";

const page = sitePages.careerListing;

export const metadata: Metadata = {
  title: page.title + " | Lumoria",
  description: page.description,
};

export default function Page() {
  return <SitePageView pageKey="careerListing" />;
}
