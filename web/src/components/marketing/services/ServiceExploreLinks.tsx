import Link from "next/link";
import { Container, Section } from "@/components/primitives/Container";
import type { MarketingSectionConfig } from "@/lib/marketing-composition";

const SERVICE_CLUSTER_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
  { href: "/services", label: "All services" },
] as const;

type ServiceExploreLinksProps = {
  sectionProps: MarketingSectionConfig;
};

/** Shared internal-link cluster for service detail pages (pricing / proof / contact). */
export function ServiceExploreLinks({ sectionProps }: ServiceExploreLinksProps) {
  return (
    <Section {...sectionProps}>
      <Container>
        <nav aria-label="Related pages" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {SERVICE_CLUSTER_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-muted underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </Section>
  );
}
