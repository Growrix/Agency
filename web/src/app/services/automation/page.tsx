import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  BoltIcon,
  CogIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automation",
  description:
    "Workflow automation that delivers measurable operational leverage. Reduce manual work, connect systems, and scale operations with custom automation solutions.",
};

const features = [
  {
    icon: BoltIcon,
    title: "Workflow Automation",
    description:
      "Map, optimize, and automate your business processes. From simple triggers to complex multi-step workflows across tools.",
  },
  {
    icon: CogIcon,
    title: "System Integration",
    description:
      "Connect your CRM, email, payments, and internal tools into a unified automated workflow. No more manual data transfer.",
  },
  {
    icon: ChartBarIcon,
    title: "Measurable Results",
    description:
      "Every automation comes with clear metrics: time saved, errors eliminated, throughput increased. No abstract consulting.",
  },
  {
    icon: ClockIcon,
    title: "Ongoing Optimization",
    description:
      "Automation isn't set-and-forget. We monitor, iterate, and improve workflows based on real operational data.",
  },
];

export default function AutomationServicePage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="xl">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-6">
              Automation
            </Badge>
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Measurable{" "}
              <span className="text-primary">Operational Leverage</span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              We build automation systems that deliver concrete operational
              improvements. Reduce manual work, eliminate errors, and scale
              your operations without scaling your team.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <LinkButton href="/book-appointment" size="lg">
                Audit My Workflow
                <ArrowRightIcon className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/portfolio" variant="outline" size="lg">
                View Automation Examples
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
                  "Workflow audit and optimization report",
                  "Custom automation implementation",
                  "Zapier, Make, or custom webhook integrations",
                  "Error handling and retry logic",
                  "Monitoring dashboards and alerting",
                  "Documentation and team training",
                  "Performance metrics and ROI tracking",
                  "Ongoing optimization support",
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
                  "Operations teams drowning in manual processes",
                  "Companies scaling without proportional headcount",
                  "Teams needing CRM, email, and payment automation",
                  "Businesses seeking data pipeline automation",
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
            Ready to Automate?
          </h2>
          <p className="mt-4 opacity-70">
            Start with a workflow audit. We&apos;ll identify the highest-impact
            automation opportunities.
          </p>
          <div className="mt-8">
            <LinkButton
              href="/book-appointment"
              variant="light"
              size="lg"
            >
              Audit My Workflow
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
