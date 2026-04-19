import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "SaaS Applications",
  description:
    "Full-stack SaaS product builds from strategy to launch. Custom applications engineered for growth, performance, and long-term scalability.",
};

interface ServiceDetailLayoutProps {
  badge: string;
  title: ReactNode;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  features: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; title: string; description: string }[];
  deliverables: string[];
  idealFor: string[];
}

function ServiceDetailLayout({
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  features,
  deliverables,
  idealFor,
}: ServiceDetailLayoutProps) {
  return (
    <>
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="xl">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-6">
              {badge}
            </Badge>
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <LinkButton href={primaryCta.href} size="lg">
                {primaryCta.label}
                <ArrowRightIcon className="h-4 w-4" />
              </LinkButton>
              <LinkButton href={secondaryCta.href} variant="outline" size="lg">
                {secondaryCta.label}
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container size="2xl">
          <h2
            className="text-3xl font-bold tracking-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What You Get
          </h2>
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
                {deliverables.map((d) => (
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
                {idealFor.map((item) => (
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
            Ready to Start?
          </h2>
          <p className="mt-4 opacity-70">
            Book a free consultation. We&apos;ll scope your project and
            deliver a detailed proposal.
          </p>
          <div className="mt-8">
            <LinkButton
              href="/book-appointment"
              variant="light"
              size="lg"
            >
              {primaryCta.label}
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default function SaasApplicationsPage() {
  return (
    <ServiceDetailLayout
      badge="SaaS Applications"
      title={
        <>
          Product Strategy +{" "}
          <span className="text-primary">Engineering Execution</span>
        </>
      }
      subtitle="We build custom SaaS applications from concept to launch. Product thinking, scalable architecture, and production-grade code — delivered as a complete product."
      primaryCta={{ label: "Start a SaaS Build", href: "/book-appointment" }}
      secondaryCta={{ label: "See SaaS Work", href: "/portfolio" }}
      features={[
        {
          icon: RocketLaunchIcon,
          title: "Product Strategy",
          description:
            "Market positioning, user journey mapping, feature prioritization, and MVP scoping — before a single line of code.",
        },
        {
          icon: CpuChipIcon,
          title: "Scalable Architecture",
          description:
            "Microservice-ready backends, optimized databases, and infrastructure designed to grow with your user base.",
        },
        {
          icon: ChartBarIcon,
          title: "Growth Engineering",
          description:
            "Analytics integration, A/B testing framework, onboarding optimization, and conversion tracking from day one.",
        },
        {
          icon: ShieldCheckIcon,
          title: "Security & Compliance",
          description:
            "RBAC, data encryption, GDPR compliance, and security audits built into the development process — not bolted on.",
        },
      ]}
      deliverables={[
        "Product requirements document and technical architecture",
        "UI/UX design system with responsive components",
        "Full-stack implementation (frontend + backend + API)",
        "Authentication, authorization, and role management",
        "Third-party integrations (payments, email, analytics)",
        "CI/CD pipeline and deployment configuration",
        "QA test suite and security review",
        "Launch support and post-launch monitoring",
      ]}
      idealFor={[
        "Founders building an MVP for investor readiness",
        "Startups scaling from prototype to production",
        "Enterprises modernizing legacy internal tools",
        "Teams needing product engineering capacity",
      ]}
    />
  );
}
