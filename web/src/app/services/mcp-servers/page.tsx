import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ServerStackIcon,
  CpuChipIcon,
  WrenchScrewdriverIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Servers",
  description:
    "Model Context Protocol servers for AI agent integrations. Connect your tools, data sources, and workflows to AI systems with production-grade MCP implementations.",
};

const features = [
  {
    icon: ServerStackIcon,
    title: "Protocol Expertise",
    description:
      "Deep knowledge of the Model Context Protocol specification. We build servers that work reliably with Claude, GPT, and other AI agents.",
  },
  {
    icon: CpuChipIcon,
    title: "Tool & Resource Design",
    description:
      "Well-designed tool schemas, resource endpoints, and prompt templates that make your MCP server intuitive for AI consumption.",
  },
  {
    icon: WrenchScrewdriverIcon,
    title: "Custom Integrations",
    description:
      "Connect any API, database, or internal system. We build the bridge between your data and AI agent capabilities.",
  },
  {
    icon: CloudArrowUpIcon,
    title: "Hosting & Operations",
    description:
      "Production deployment with monitoring, logging, and scaling. Your MCP server runs reliably in any environment.",
  },
];

export default function McpServersPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="xl">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-6">
              MCP Servers
            </Badge>
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              AI Agent{" "}
              <span className="text-primary">Integration Servers</span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Build production-grade Model Context Protocol servers that
              connect your tools, databases, and workflows to AI agents.
              We make AI integrations reliable, secure, and maintainable.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <LinkButton href="/book-appointment" size="lg">
                Scope an MCP Server
                <ArrowRightIcon className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/shop?category=mcp-servers" variant="outline" size="lg">
                Browse MCP Products
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container size="2xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f) => (
              <Card key={f.title} padding="lg" as="article">
                <div className="h-10 w-10 rounded-[var(--radius-sm)] bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{f.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2
                className="text-2xl font-bold tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Deliverables
              </h2>
              <ul className="space-y-3">
                {[
                  "MCP server with tool and resource definitions",
                  "API integration layer for your data sources",
                  "Authentication and authorization middleware",
                  "Error handling, retries, and rate limiting",
                  "Comprehensive logging and monitoring",
                  "Docker containerization and deployment configs",
                  "Documentation and usage examples",
                  "Testing suite and integration tests",
                ].map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm">
                    <CheckCircleIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2
                className="text-2xl font-bold tracking-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ideal For
              </h2>
              <ul className="space-y-3">
                {[
                  "Teams integrating AI agents with internal tools",
                  "Companies building AI-powered workflows",
                  "Developers needing custom MCP server implementations",
                  "Enterprises connecting legacy systems to AI",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircleIcon className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-foreground text-background">
        <Container size="lg" className="text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Need an MCP Server?
          </h2>
          <p className="mt-4 opacity-70">
            Let&apos;s discuss your integration requirements and build
            a production-ready solution.
          </p>
          <div className="mt-8">
            <LinkButton
              href="/book-appointment"
              variant="light"
              size="lg"
            >
              Scope an MCP Server
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
