import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { listPublicPortfolio } from "@/server/domain/catalog";
import { buildPortfolioFilters, filterPortfolioProjects } from "@/lib/portfolio-landing-content";
import { PortfolioPageClient } from "./PortfolioPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Portfolio — Selected Builds from Growrix OS",
  description:
    "Explore case studies across websites, SaaS applications, mobile apps, automation, and technical SEO engagements delivered by Growrix OS.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const projects = filterPortfolioProjects(await listPublicPortfolio());
  const filters = buildPortfolioFilters(projects);

  return <PortfolioPageClient projects={projects} filters={filters} />;
}
