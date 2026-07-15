import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbListSchema, buildCollectionPageSchema } from "@/lib/seo-structured-data";
import { listPublicPortfolio } from "@/server/domain/catalog";
import { buildPortfolioFilters, filterPortfolioProjects } from "@/lib/portfolio-landing-content";
import { PortfolioPageClient } from "./PortfolioPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Portfolio — Selected Builds",
  description:
    "Explore case studies across websites, SaaS applications, mobile apps, automation, and technical SEO engagements delivered by Growrix OS.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const projects = filterPortfolioProjects(await listPublicPortfolio());
  const filters = buildPortfolioFilters(projects);
  const portfolioStructuredData = [
    buildCollectionPageSchema({
      name: "Portfolio — Selected Builds",
      description:
        "Explore case studies across websites, SaaS applications, mobile apps, automation, and technical SEO engagements delivered by Growrix OS.",
      path: "/portfolio",
      items: projects.slice(0, 20).map((project) => ({
        name: project.name,
        path: `/portfolio/${project.slug}`,
      })),
    }),
    buildBreadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Portfolio", path: "/portfolio" },
    ]),
  ];

  return (
    <>
      <JsonLd data={portfolioStructuredData} />
      <PortfolioPageClient projects={projects} filters={filters} />
    </>
  );
}
