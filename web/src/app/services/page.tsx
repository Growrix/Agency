import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/constants";
import {
  RocketLaunchIcon,
  GlobeAltIcon,
  ServerStackIcon,
  BoltIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our service pillars: SaaS applications, websites, MCP servers, and automation systems. Engineered for performance and long-term value.",
};

const serviceIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  rocket: RocketLaunchIcon,
  globe: GlobeAltIcon,
  server: ServerStackIcon,
  bolt: BoltIcon,
};

const capabilities = [
  "Product strategy and scoping",
  "UI/UX design systems",
  "Full-stack engineering",
  "API design and integration",
  "Performance optimization",
  "Security hardening",
  "CI/CD and deployment",
  "Post-launch support",
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="xl" className="text-center">
          <Badge variant="primary" className="mb-6">
            Our Services
          </Badge>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Build With a{" "}
            <span className="text-primary">Product-Minded</span> Partner
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Four service pillars designed for founders, operators, and technical
            teams who need more than code — they need a delivery partner.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <LinkButton href="/book-appointment" size="lg">
              Discuss My Project
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="/pricing" variant="outline" size="lg">
              Compare Services
            </LinkButton>
          </div>
        </Container>
      </Section>

      {/* Service Cards */}
      <Section className="bg-surface">
        <Container size="2xl">
          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <Card key={service.href} hover padding="lg" as="article">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-[var(--radius-md)] bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2
                        className="text-xl font-bold mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {service.title}
                      </h2>
                      <p className="text-muted leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <LinkButton href={service.href} variant="outline" size="sm">
                        Learn more
                        <ArrowRightIcon className="h-3.5 w-3.5" />
                      </LinkButton>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Capabilities */}
      <Section>
        <Container size="xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                End-to-End Capabilities
              </h2>
              <p className="mt-4 text-muted leading-relaxed max-w-lg">
                Every project gets access to the full depth of our engineering
                and design capability, regardless of service pillar.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {capabilities.map((cap) => (
                <div
                  key={cap}
                  className="flex items-center gap-2 p-3 rounded-[var(--radius-sm)] bg-surface border border-border text-sm"
                >
                  <CheckCircleIcon className="h-4 w-4 text-primary shrink-0" />
                  {cap}
                </div>
              ))}
            </div>
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
            Not Sure Which Service Fits?
          </h2>
          <p className="mt-4 opacity-70 max-w-lg mx-auto">
            Book a free consultation and we&apos;ll help you define the right
            scope, stack, and engagement model.
          </p>
          <div className="mt-8">
            <LinkButton
              href="/book-appointment"
              variant="light"
              size="lg"
            >
              Book a Free Call
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
