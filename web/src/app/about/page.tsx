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
import { HOME_STATS, HOME_STACK_MARQUEE, PROCESS_STEPS } from "@/lib/content";
import { SHOW_GOOGLE_REVIEWS } from "@/lib/feature-flags";
import { WHATSAPP_HREF } from "@/lib/nav";
import { ABOUT_IMAGES, TEAM_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "About | Websites, SaaS, and Launch Systems Partner",
  description:
    "Learn how Growrix OS works, what it values, and how it delivers premium websites, SaaS products, mobile launch experiences, and ready websites.",
};

const TEAM = [
  { name: "Mira Aldenberg", role: "Founder · Product & Strategy", strength: "Scopes the right problem before sizing the solution." },
  { name: "Felix Aranha", role: "Engineering Lead", strength: "Designs systems that survive feature growth." },
  { name: "Yuna Park", role: "Design Lead", strength: "Builds visual systems that feel inevitable in retrospect." },
  { name: "Ravi Saini", role: "Systems & Integrations Lead", strength: "Brings automation and MCP work in where the main product needs it." },
];

const PRINCIPLES = [
  { title: "Design discipline", description: "Tokens, typography, motion, and spacing decided once and used everywhere." },
  { title: "Engineering quality", description: "Tests, types, observability, and production readiness from day one." },
  { title: "Content that sells", description: "Hero messaging, proof, FAQs, and launch copy are treated like product surfaces, not filler text." },
  { title: "Measurable outcomes", description: "Every engagement targets a number. We don't ship vanity work." },
];

const PHILOSOPHY = [
  "A website should convert like a product, not read like a brochure.",
  "Motion is language. It must support meaning, not decorate it.",
  "Mobile is often the first impression. It needs launch-level care, not desktop leftovers.",
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
                A studio for teams that want the launch to feel as strong as the product.
              </h1>
              <p className="mt-6 text-lg text-text-muted leading-7 text-pretty">
                Growrix OS is an independent studio of senior designers and engineers. We focus on premium websites, SaaS products, mobile app launch experiences, and ready websites, with MCP and automation brought in when they support the main outcome.
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
                      &ldquo;Studio sized for craft, scoped for outcomes.&rdquo;
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <StatBlock stats={HOME_STATS} />

      <TrustStrip items={HOME_STACK_MARQUEE} />

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
            eyebrow="Founder's Note"
            title="Turning Ideas Into Lasting Products"
            description="Starting in digital marketing taught me the value of growth and adaptability. Over time, I've built a toolkit that combines technical expertise with AI-powered systems, ensuring every project is both innovative and practical."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Card className="p-0 overflow-hidden rounded-[24px]">
              <div className="relative aspect-4/5 overflow-hidden">
                <Image
                  src={ABOUT_IMAGES.founder.src}
                  alt="Nayeem, Founder of Growrix OS"
                  fill
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">Nayeem, Founder of Growrix OS</p>
                </div>
              </div>
            </Card>
            <div className="grid gap-4">
              <Card>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">01. Getting Started</p>
                <h3 className="mt-3 font-display text-2xl tracking-tight">I entered the field through growth, SEO, and online business.</h3>
                <p className="mt-4 text-base leading-7 text-text-muted text-pretty">
                  Since 2013, I&apos;ve focused on understanding what makes products succeed, not just how they look.
                </p>
              </Card>
              <Card>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">02. Expanding My Skills</p>
                <h3 className="mt-3 font-display text-2xl tracking-tight">Transitioning from WordPress, I immersed myself in modern development tools.</h3>
                <p className="mt-4 text-base leading-7 text-text-muted text-pretty">
                  HTML, CSS, JavaScript, Python, Django, React, Next.js, and Vite, along with more native tools and frameworks, helped me bridge strategy and implementation.
                </p>
              </Card>
              <Card>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">03. My Current Focus</p>
                <h3 className="mt-3 font-display text-2xl tracking-tight">I use disciplined product methods and industry standard and AI-driven processes.</h3>
                <p className="mt-4 text-base leading-7 text-text-muted text-pretty">
                  My goal is to deliver solutions that are reliable, effective, and built for real-world challenges.
                </p>
              </Card>
            </div>
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
        <Container>
          <div className="grid gap-10 lg:grid-cols-[60%_40%] lg:items-start">
            <SectionHeading
              eyebrow="Beyond Development"
              title="We don't just build software—we build businesses."
              description="Whether you're a startup, an individual with an idea, or an established company, we can collaborate in a way that fits your goals. We can build, maintain, operate, or even partner with you long-term. With the rise of micro SaaS, we are actively creating and supporting products that generate real revenue—not just code."
            />
            <Card variant="inset" className="rounded-[24px] p-6 sm:p-8 flex flex-col h-full">
              <div className="flex flex-col gap-4 h-full">
                <h4 className="font-display text-lg tracking-tight text-primary mb-2">Why partner with us?</h4>
                <hr className="border-border mb-3" />
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block size-3 rounded-full bg-primary" />
                    <span>As the founder, I personally stand behind every project.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block size-3 rounded-full bg-primary" />
                    <span>Transparent process from start to finish.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block size-3 rounded-full bg-primary" />
                    <span>Flexible collaboration models—build, maintain, operate, or partner long-term.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block size-3 rounded-full bg-primary" />
                    <span>We focus on delivering results you can truly grow with.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-block size-3 rounded-full bg-primary" />
                    <span>Active in micro SaaS—building products that generate revenue, not just code.</span>
                  </li>
                </ul>
                <div className="mt-auto pt-2">
                  <LinkButton href="/contact" className="w-full">Let&apos;s talk about your idea</LinkButton>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="inset">
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

      <Section>
        <Container width="reading">
          <SectionHeading eyebrow="Frontend philosophy" title="Why our frontend work doesn't blend in." />
          <ul className="mt-8 space-y-4">
            {PHILOSOPHY.map((p, i) => (
              <li key={p} className="flex gap-4">
                <span className="shrink-0 size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-xs">
                  {String(i + 1).padStart(2, "00")}
                </span>
                <p className="text-lg leading-7 text-pretty pt-0.5">{p}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {SHOW_GOOGLE_REVIEWS && (
        <Section>
          <Container>
            <GoogleReviews
              eyebrow="Voices"
              title="What clients say after launch."
              description="Proof from launches, redesigns, and ongoing product work."
            />
          </Container>
        </Section>
      )}

      <CTABand
        title="Want to meet the team that would actually launch it?"
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "WhatsApp us", href: WHATSAPP_HREF }}
      />
    </>
  );
}
