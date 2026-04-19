import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  PaintBrushIcon,
  MagnifyingGlassIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Websites",
  description:
    "High-conversion, design-forward websites that perform. From corporate sites to e-commerce platforms, built with modern tools and best practices.",
};

const features = [
  {
    icon: PaintBrushIcon,
    title: "Design System First",
    description:
      "Custom design tokens, typography, and component libraries that ensure visual consistency across every page.",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "SEO & Performance",
    description:
      "Server-rendered pages, optimized assets, structured data, and Core Web Vitals tuned for search visibility.",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Mobile-First Responsive",
    description:
      "Every layout designed for mobile first, scaling beautifully to tablet and desktop with no compromises.",
  },
  {
    icon: GlobeAltIcon,
    title: "CMS & Content Strategy",
    description:
      "Headless CMS integration for easy content management. No developer needed for content updates.",
  },
];

export default function WebsitesServicePage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="xl">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-6">
              Websites
            </Badge>
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Design-Forward Websites That{" "}
              <span className="text-primary">Convert</span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              We build high-performance websites that combine editorial design
              quality with engineering precision. Every site is fast,
              accessible, and optimized for conversion.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <LinkButton href="/book-appointment" size="lg">
                Plan My Website
                <ArrowRightIcon className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/portfolio" variant="outline" size="lg">
                View Website Portfolio
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
                  "Custom design system with responsive components",
                  "SEO-optimized page structure and metadata",
                  "CMS integration for content management",
                  "Contact forms, booking, and lead capture",
                  "Analytics and conversion tracking",
                  "Performance optimization (< 2s load time)",
                  "Accessibility compliance (WCAG 2.1 AA)",
                  "Deployment and hosting configuration",
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
                  "Companies launching a new brand presence",
                  "Agencies needing a premium portfolio site",
                  "E-commerce businesses going direct-to-consumer",
                  "Startups replacing template-based sites",
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
            Let&apos;s Plan Your Website
          </h2>
          <p className="mt-4 opacity-70">
            Book a free consultation to discuss scope, timeline, and budget.
          </p>
          <div className="mt-8">
            <LinkButton
              href="/book-appointment"
              variant="light"
              size="lg"
            >
              Plan My Website
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
