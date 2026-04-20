import Image from "next/image";
import type { Metadata } from "next";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTABand } from "@/components/sections/CTABand";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { StatBlock } from "@/components/sections/StatBlock";
import { CLIENT_LOGOS, HOME_STATS, PROCESS_STEPS } from "@/lib/content";
import { WHATSAPP_HREF } from "@/lib/nav";
import { ABOUT_IMAGES, TEAM_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "About | Product-Minded Web Development Partner",
  description:
    "Learn how Growrix OS works, what it values, and how it delivers visually strong, technically rigorous digital products.",
};

const PRINCIPLES = [
  { title: "Design discipline", description: "Tokens, typography, motion, and spacing decided once and used everywhere." },
  { title: "Engineering quality", description: "Tests, types, observability, and production readiness from day one." },
  { title: "Speed without chaos", description: "Predictable cadence, written plans, and clear ownership at every step." },
  { title: "Measurable outcomes", description: "Every engagement targets a number. We don't ship vanity work." },
];

const TEAM = [
  { name: "Mira Aldenberg", role: "Founder · Product & Strategy", strength: "Scopes the right problem before sizing the solution." },
  { name: "Felix Aranha", role: "Engineering Lead", strength: "Designs systems that survive feature growth." },
  { name: "Yuna Park", role: "Design Lead", strength: "Builds visual systems that feel inevitable in retrospect." },
  { name: "Ravi Saini", role: "Automation & MCP", strength: "Connects systems other people would have given up on." },
];

const PHILOSOPHY = [
  "Frontends are the product. We treat them as such.",
  "Motion is language. It must support meaning, not decorate it.",
  "Mobile is not a smaller desktop. It's a thumb-driven product.",
  "Accessibility is a baseline, not an upsell.",
  "Performance is a brand attribute. Slow feels cheap.",
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <Badge tone="primary" dot>About</Badge>
              <h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance">
                A studio for teams that take their product seriously.
              </h1>
              <p className="mt-6 text-lg text-text-muted leading-7 text-pretty">
                Growrix OS is an independent studio of senior designers and engineers. We build SaaS products, websites, MCP servers, and automation systems with the discipline of a real product team — and the speed of a small one.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/book-appointment" size="lg">Meet through a call</LinkButton>
                <LinkButton href="#process" variant="outline" size="lg">Explore the process</LinkButton>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Card className="p-0 overflow-hidden">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={ABOUT_IMAGES.hero.src}
                    alt={ABOUT_IMAGES.hero.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/12 to-transparent" aria-hidden />
                  <div className="absolute inset-0 flex items-end p-6 text-white">
                    <p className="font-display text-2xl tracking-tight max-w-xs">
                      “Studio sized for craft, scoped for outcomes.”
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <StatBlock stats={HOME_STATS} />
        </Container>
      </Section>

      <Section tone="inset">
        <Container>
          <SectionHeading eyebrow="Principles" title="Four operating choices we don't compromise on." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <Card key={p.title}>
                <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Principle</p>
                <h3 className="mt-2 font-display text-xl tracking-tight">{p.title}</h3>
                <p className="mt-2 text-text-muted leading-7 text-pretty">{p.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="The team"
            title="Senior, hands-on, and accountable."
            description="No middlemen between you and the people doing the work."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <Card key={m.name} hoverable>
                <div className="relative size-14 overflow-hidden rounded-full border border-border">
                  {TEAM_IMAGES[m.name] ? (
                    <Image
                      src={TEAM_IMAGES[m.name].src}
                      alt={TEAM_IMAGES[m.name].alt}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <h3 className="mt-4 font-display text-lg tracking-tight">{m.name}</h3>
                <p className="text-sm text-text-muted">{m.role}</p>
                <p className="mt-3 text-sm leading-6">{m.strength}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="process" tone="inset">
        <Container>
          <SectionHeading eyebrow="How we work" title="Process you can plan a quarter around." />
          <div className="mt-10">
            <ProcessSteps steps={PROCESS_STEPS} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="reading">
          <SectionHeading eyebrow="Frontend philosophy" title="Why our frontend work doesn't blend in." />
          <ul className="mt-8 space-y-4">
            {PHILOSOPHY.map((p, i) => (
              <li key={p} className="flex gap-4">
                <span className="shrink-0 size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg leading-7 text-pretty pt-0.5">{p}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <TrustStrip items={CLIENT_LOGOS} />

      <Section>
        <Container>
          <GoogleReviews
            eyebrow="Voices"
            title="What clients say after launch."
            description="Live Google reviews shown from the studio business profile."
          />
        </Container>
      </Section>

      <CTABand
        title="Want to meet the team that would actually build it?"
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "WhatsApp us", href: WHATSAPP_HREF }}
      />
    </>
  );
}
