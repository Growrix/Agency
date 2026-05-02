import { HOME_STACK_MARQUEE, HOME_STATS, SERVICES } from "@/lib/content";
import { listPublicPortfolio } from "@/server/domain/catalog";
import { PortfolioPageClient } from "./PortfolioPageClient";

export default async function PortfolioPage() {
  const projects = await listPublicPortfolio();
  const filters = [
    { label: "All work", value: "all" },
    ...SERVICES.map((service) => ({ label: service.name, value: service.slug })),
  ];

  return (
    <PortfolioPageClient
      projects={projects}
      filters={filters}
      stats={[...HOME_STATS]}
      trustItems={[...HOME_STACK_MARQUEE]}
    />
  );
}
