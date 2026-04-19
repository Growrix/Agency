import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our shipped projects. SaaS platforms, websites, MCP servers, and automation systems built for real businesses.",
};

const projects = [
  {
    title: "FinTech Dashboard Rebuild",
    category: "SaaS Application",
    description:
      "Complete platform redesign and rebuild for a fintech startup. New design system, performance optimization, and onboarding flows.",
    result: "3x faster load times, 40% user retention increase",
    slug: "fintech-dashboard",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "E-Commerce Platform Launch",
    category: "Website",
    description:
      "Premium direct-to-consumer website with custom CMS, Stripe checkout, and conversion-optimized product pages.",
    result: "€2M revenue in first quarter, 98 Lighthouse score",
    slug: "ecommerce-platform",
    tags: ["Next.js", "Stripe", "Headless CMS"],
  },
  {
    title: "AI Agent Integration Hub",
    category: "MCP Server",
    description:
      "Custom MCP server connecting 12 internal tools to AI agents. Automated workflows for support, sales, and operations.",
    result: "Connected 12 tools, 60% reduction in manual work",
    slug: "ai-agent-hub",
    tags: ["MCP Protocol", "TypeScript", "Docker"],
  },
  {
    title: "Operations Automation Suite",
    category: "Automation",
    description:
      "End-to-end workflow automation for a logistics company. Order processing, inventory sync, and customer notifications.",
    result: "85% reduction in manual processing time",
    slug: "operations-automation",
    tags: ["Zapier", "Custom API", "Node.js"],
  },
  {
    title: "SaaS Onboarding Redesign",
    category: "SaaS Application",
    description:
      "Complete onboarding funnel redesign for a B2B SaaS platform. New user flows, analytics, and conversion optimization.",
    result: "2.5x activation rate improvement",
    slug: "saas-onboarding",
    tags: ["React", "Analytics", "A/B Testing"],
  },
  {
    title: "Agency Portfolio Website",
    category: "Website",
    description:
      "Premium portfolio site with case study system, booking integration, and AI concierge for a creative agency.",
    result: "300% increase in inbound leads",
    slug: "agency-portfolio",
    tags: ["Next.js", "Framer Motion", "MDX"],
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="xl" className="text-center">
          <Badge variant="primary" className="mb-6">
            Portfolio
          </Badge>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Shipped Work,{" "}
            <span className="text-primary">Measured Outcomes</span>
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Every project here was delivered with our full process: strategy,
            design system, engineering, QA, and launch. Results speak louder
            than proposals.
          </p>
        </Container>
      </Section>

      {/* Project Grid */}
      <Section className="pt-0">
        <Container size="2xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.slug} hover as="article">
                <div className="aspect-[16/10] rounded-[var(--radius-sm)] bg-inset border border-border mb-4 flex items-center justify-center">
                  <span className="text-xs text-muted">Preview</span>
                </div>
                <Badge variant="primary" className="mb-2">
                  {project.category}
                </Badge>
                <h2
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {project.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  {project.description}
                </p>
                <p className="text-sm font-semibold text-primary mb-3">
                  {project.result}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <LinkButton
                  href={`/portfolio/${project.slug}`}
                  variant="ghost"
                  size="sm"
                  className="!px-0 !h-auto text-primary hover:!bg-transparent hover:underline"
                >
                  View case study
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </LinkButton>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-foreground text-background">
        <Container size="lg" className="text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Want Results Like These?
          </h2>
          <p className="mt-4 opacity-70 max-w-lg mx-auto">
            Let&apos;s discuss how we can apply the same quality standards to
            your project.
          </p>
          <div className="mt-8">
            <LinkButton
              href="/book-appointment"
              variant="light"
              size="lg"
            >
              Book a Discovery Call
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
