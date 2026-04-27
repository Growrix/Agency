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
import { CLIENT_LOGOS, PROCESS_STEPS } from "@/lib/content";
import { SHOW_GOOGLE_REVIEWS } from "@/lib/feature-flags";
import { WHATSAPP_HREF } from "@/lib/nav";
import { ABOUT_IMAGES } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "About Growrix OS | Founder-Led Websites and SaaS Delivery",
  description:
    "Meet Nayeem, founder of Growrix OS, and learn how the studio combines growth thinking, product development, and AI-driven execution to build websites, SaaS products, and revenue-ready digital systems.",
};

const FOUNDING_SIGNALS = [
  {
    value: "2013",
    title: "Started in growth",
    description: "The foundation was digital marketing, SEO, funnels, and understanding how online businesses actually grow.",
  },
  {
    value: "Full stack",
    title: "Built through code",
    description: "From WordPress into HTML, CSS, JavaScript, Python, Django, Next.js, and Vite to control the full product path.",
  },
  {
    value: "Remote-first",
    title: "Flexible delivery system",
    description: "Founder-led execution with a distributed team of developers and specialists assembled around the right outcome.",
  },
  {
    value: "AI-ready",
    title: "MCP-powered workflows",
    description: "Modern delivery enhanced by AI systems that improve speed, repeatability, and operational clarity.",
  },
];

const JOURNEY = [
  {
    label: "2013",
    title: "Growth and SEO came first",
    description:
      "The early years were spent inside digital marketing, learning traffic, positioning, search, offers, and how online businesses turn attention into revenue.",
  },
  {
    label: "WordPress",
    title: "The first build layer",
    description:
      "Website delivery started in WordPress, which sharpened practical instincts around launch speed, content structure, and conversion-focused execution.",
  },
  {
    label: "Full-scale dev",
    title: "Then the stack went deeper",
    description:
      "That curiosity moved into HTML, CSS, JavaScript, Python, Django, Next.js, and Vite so strategy and implementation could live under one roof.",
  },
  {
    label: "Now",
    title: "Growrix OS as an operating system",
    description:
      "Today the work combines product engineering with AI-assisted, MCP-based workflows to ship websites, SaaS applications, and revenue-ready systems faster and more reliably.",
  },
];

const OPERATING_PILLARS = [
  {
    title: "Founder-led direction",
    description:
      "Nayeem leads the vision, architecture, and final delivery quality so strategy and execution stay tightly aligned.",
  },
  {
    title: "Remote-first team chemistry",
    description:
      "Growrix OS is backed by a flexible distributed team of developers and specialists brought together around the actual project needs.",
  },
  {
    title: "Industry-standard delivery",
    description:
      "Planning, design, development, QA, deployment, and scaling follow a disciplined workflow instead of improvised freelancing.",
  },
];

const DELIVERY_PROMISE = [
  "Business context comes first. We care about the commercial outcome, not just the codebase.",
  "AI is used as leverage, not theater. Workflows are accelerated without lowering engineering standards.",
  "The build is expected to survive real use. Performance, accessibility, testing, and deployment quality are part of the job.",
  "Collaboration stays flexible. We can build, maintain, operate, or partner long-term depending on the opportunity.",
];

const ENGAGEMENT_MODELS = [
  {
    title: "Build",
    description:
      "Launch a new website, SaaS application, or product surface with a roadmap that connects design, engineering, and business goals.",
  },
  {
    title: "Maintain",
    description:
      "Keep an existing product healthy with support, release discipline, bug fixing, and iterative feature improvement after launch.",
  },
  {
    title: "Operate",
    description:
      "Hand over selected technical operations such as deployments, content workflows, automations, and system upkeep when your team needs continuity.",
  },
  {
    title: "Partner",
    description:
      "Work beyond a single project on ideas, micro SaaS opportunities, or revenue-focused products where long-term alignment matters.",
  },
];

const WHO_WE_WORK_WITH = ["Startups", "Individual founders", "Established companies", "Micro SaaS operators"];

const STACK_AND_SYSTEMS = [
  "Next.js",
  "Django",
  "Vite",
  "JavaScript",
  "Python",
  "MCP systems",
  "SEO strategy",
  "Product architecture",
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <div
          className="absolute inset-x-0 top-0 h-64 opacity-70"
          style={{ background: "radial-gradient(circle at top left, color-mix(in srgb, var(--color-secondary) 22%, transparent), transparent 62%)" }}
          aria-hidden
        />
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div>
              <Badge tone="primary" dot>Founder-led studio</Badge>
              <h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance">
                Growrix OS is built for people who need product thinking, growth clarity, and reliable execution in one place.
              </h1>
              <p className="mt-6 text-lg text-text-muted leading-7 text-pretty">
                Led by Nayeem, Growrix OS helps teams turn ideas into premium websites, SaaS products, and revenue-ready digital systems. The work is shaped by a rare combination of growth strategy, full-scale development, and AI-assisted delivery discipline.
              </p>
              <p className="mt-4 text-lg text-text-muted leading-7 text-pretty">
                That means the conversation is never only about features. It is about what should be built, what should be simplified, and what will actually move the business forward after launch.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/book-appointment" size="lg">Meet through a call</LinkButton>
                <LinkButton href="#process" variant="outline" size="lg">Explore the process</LinkButton>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {WHO_WE_WORK_WITH.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Card className="p-0 overflow-hidden rounded-[24px]">
                <div className="relative aspect-3/4 overflow-hidden">
                  <Image
                    src={ABOUT_IMAGES.founder.src}
                    alt={ABOUT_IMAGES.founder.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 38vw, (min-width: 640px) 60vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/12 to-transparent" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">Founder’s note</p>
                    <p className="mt-3 max-w-sm font-display text-2xl tracking-tight text-balance">
                      “I care about the business outcome as much as the build itself.”
                    </p>
                  </div>
                </div>
              </Card>
              <Card variant="inset" className="p-5 sm:p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Nayeem</p>
                <p className="mt-3 text-sm leading-7 text-pretty sm:text-base">
                  Growrix OS exists to give ambitious founders and teams a sharper way to build: clear strategy, modern engineering, AI leverage where it helps, and direct accountability from the person leading the work.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {FOUNDING_SIGNALS.map((signal) => (
              <Card key={signal.title} className="h-full">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">{signal.value}</p>
                <h2 className="mt-3 font-display text-2xl tracking-tight">{signal.title}</h2>
                <p className="mt-3 text-sm leading-6 text-text-muted">{signal.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="inset">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Founder’s note"
                title="From digital growth work to full-scale product delivery."
                description="The path behind Growrix OS matters because it shapes how projects are scoped, built, and judged. The studio sees the work through both the business lens and the engineering lens."
              />
              <div className="mt-8 space-y-5 text-base leading-7 text-text-muted sm:text-lg">
                <p>
                  Nayeem started in 2013 with digital marketing, building a foundation in SEO, growth strategy, and online business. That early experience made one thing obvious: design and code only matter when they create a result people can feel in traffic, revenue, clarity, or speed.
                </p>
                <p>
                  Over time the work moved from marketing into the technical side of product building. It began with WordPress, then expanded into modern development across HTML, CSS, JavaScript, Python, Django, Next.js, and Vite.
                </p>
                <p>
                  Today Growrix OS combines that development depth with AI-driven workflows powered by MCP-based systems. The goal is simple: ship faster, think cleaner, and give clients something they can trust in production rather than admire in a screenshot.
                </p>
              </div>
            </div>
            <Card className="rounded-[24px] p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">What that means in practice</p>
              <div className="mt-6 space-y-5">
                {DELIVERY_PROMISE.map((item, index) => (
                  <div key={item} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-inset font-mono text-xs text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1 text-sm leading-6 text-text-muted sm:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="The path"
            title="The journey behind the operating system."
            description="Growrix OS was not assembled from one discipline. It grew by combining growth work, practical delivery, deep development, and AI systems into one way of working."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-4 sm:grid-cols-2">
            {JOURNEY.map((item) => (
              <Card key={item.title} hoverable className="h-full">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">{item.label}</p>
                <h3 className="mt-3 font-display text-xl tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-text-muted">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="process" tone="inset">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="How we work"
                title="A remote-first system with direct accountability."
                description="Growrix OS is not a one-person freelancer setup and not a bloated agency machine either. It is a founder-led operating system backed by a flexible team that can move with speed while keeping quality standards high."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {OPERATING_PILLARS.map((pillar) => (
                  <Card key={pillar.title} variant="outline" className="h-full">
                    <h3 className="font-display text-lg tracking-tight">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-text-muted">{pillar.description}</p>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Delivery rhythm</p>
              <div className="mt-5">
                <ProcessSteps steps={PROCESS_STEPS} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Beyond development"
                title="We do not just build software. We help build businesses."
                description="Some clients need a launch partner. Others need someone who can stay close to the product, handle operations, or collaborate around a longer-term opportunity. Growrix OS is designed to support all of those modes without losing focus."
              />
              <Card variant="inset" className="mt-8 rounded-[24px] p-6 sm:p-8">
                <p className="font-display text-2xl tracking-tight text-balance">
                  As the founder, Nayeem personally stands behind every deal and every outcome.
                </p>
                <p className="mt-4 text-base leading-7 text-text-muted">
                  The aim is to remove guesswork from the process so clients can evaluate the work clearly, test it honestly, and grow with confidence after launch.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {STACK_AND_SYSTEMS.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ENGAGEMENT_MODELS.map((item) => (
                <Card key={item.title} hoverable className="h-full">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">Engagement model</p>
                  <h3 className="mt-3 font-display text-xl tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-text-muted">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <TrustStrip items={CLIENT_LOGOS} />

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
        title="If you have an idea or an opportunity, let's talk about how Growrix OS can help build it."
        description="Bring a new product, a website rebuild, a launch plan, or an existing system that needs a stronger operator behind it."
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "WhatsApp us", href: WHATSAPP_HREF }}
      />
    </>
  );
}
