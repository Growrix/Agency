import { listPublicPortfolio } from "@/server/domain/catalog";
import { buildPortfolioFilters, filterPortfolioProjects } from "@/lib/portfolio-landing-content";
import { PortfolioPageClient } from "./PortfolioPageClient";

export default async function PortfolioPage() {
  const projects = filterPortfolioProjects(await listPublicPortfolio());
  const filters = buildPortfolioFilters(projects);

  return <PortfolioPageClient projects={projects} filters={filters} />;
}
