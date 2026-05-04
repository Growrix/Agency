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
import { ABOUT_IMAGES } from "@/lib/site-images";
import { getSanityAboutPageContent } from "@/server/sanity/marketing";

export const metadata: Metadata = {
  title: "About | Websites, SaaS, and Launch Systems Partner",
  description:
    "Learn how Growrix OS works, what it values, and how it delivers premium websites, SaaS products, mobile launch experiences, and ready websites.",
};

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

export default async function AboutPage() {
  const aboutContent = await getSanityAboutPageContent().catch(() => null);
  const principles = aboutContent?.principles && aboutContent.principles.length > 0 ? aboutContent.principles : PRINCIPLES;
  const founderCards = aboutContent?.founder?.cards && aboutContent.founder.cards.length > 0
    ? aboutContent.founder.cards
    : [
        { eyebrow: "01. Getting Started", title: "I entered the field through growth, SEO, and online business.", description: "Since 2013, I\u2019ve focused on understanding what makes products succeed, not just how they look." },
        { eyebrow: "02. Expanding My Skills", title: "Transitioning from WordPress, I immersed myself in modern development tools.", description: "HTML, CSS, JavaScript, Python, Django, React, Next.js, and Vite, along with more native tools and frameworks, helped me bridge strategy and implementation." },
        { eyebrow: "03. My Current Focus", title: "I use disciplined product methods and industry standard and AI-driven processes.", description: "My goal is to deliver solutions that are reliable, effective, and built for real-world challenges." },
      ];
  const partnerBullets = aboutContent?.beyond?.bullets && aboutContent.beyond.bullets.length > 0
    ? aboutContent.beyond.bullets
    : [
        "As the founder, I personally stand behind every project.",
        "Transparent process from start to finish.",
        "Flexible collaboration models\u2014build, maintain, operate, or partner long-term.",
        "We focus on delivering results you can truly grow with.",
        "Active in micro SaaS\u2014building products that generate revenue, not just code.",
      ];
  const philosophyItems = aboutContent?.philosophy?.items && aboutContent.philosophy.items.length > 0 ? aboutContent.philosophy.items : PHILOSOPHY;
  const teamMembers = aboutContent?.team?.members ?? [];

  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <Badge tone="primary" dot>About</Badge>
              <h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance">
                {aboutContent?.heroTitle ?? "A studio for teams that want the launch to feel as strong as the product."}
              </h1>
              <p className="mt-6 text-lg text-text-muted leading-7 text-pretty">
                {aboutContent?.heroDescription ?? "Growrix OS is an independent studio of senior designers and engineers. We focus on premium websites, SaaS products, mobile app launch experiences, and ready websites, with MCP and automation brought in when they support the main outcome."}
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
                      &ldquo;{aboutContent?.heroQuote ?? "Studio sized for craft, scoped for outcomes."}&rdquo;
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <div className="pb-12 sm:pb-16">
        <StatBlock stats={HOME_STATS} />
      </div>

      <Section tone="inset">
        <Container>
          <SectionHeading eyebrow="Principles" title="Four operating choices we don't compromise on." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {principles.map((p) => (
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
            eyebrow={aboutContent?.founder?.eyebrow ?? "Founder's Note"}
            title={aboutContent?.founder?.title ?? "Turning Ideas Into Lasting Products"}
            description={aboutContent?.founder?.description ?? "Starting in digital marketing taught me the value of growth and adaptability. Over time, I've built a toolkit that combines technical expertise with AI-powered systems, ensuring every project is both innovative and practical."}
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
              {founderCards.map((card) => (
                <Card key={card.title}>
                  {card.eyebrow ? <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">{card.eyebrow}</p> : null}
                  <h3 className="mt-3 font-display text-2xl tracking-tight">{card.title}</h3>
                  <p className="mt-4 text-base leading-7 text-text-muted text-pretty">{card.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="process" tone="inset">
        <Container>
          <SectionHeading
            eyebrow={aboutContent?.process?.eyebrow ?? "How we work"}
            title={aboutContent?.process?.title ?? "Process you can plan a quarter around."}
          />
          <div className="mt-10">
            <ProcessSteps steps={PROCESS_STEPS} />
          </div>
        </Container>
      </Section>

      <TrustStrip items={HOME_STACK_MARQUEE} />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[60%_40%] lg:items-start">
            <SectionHeading
              eyebrow={aboutContent?.beyond?.eyebrow ?? "Beyond Development"}
              title={aboutContent?.beyond?.title ?? "We don't just build software\u2014we build businesses."}
              description={aboutContent?.beyond?.description ?? "Whether you're a startup, an individual with an idea, or an established company, we can collaborate in a way that fits your goals. We can build, maintain, operate, or even partner with you long-term. With the rise of micro SaaS, we are actively creating and supporting products that generate real revenue\u2014not just code."}
            />
            <Card variant="inset" className="rounded-[24px] p-6 sm:p-8 flex flex-col h-full">
              <div className="flex flex-col gap-4 h-full">
                <h4 className="font-display text-lg tracking-tight text-primary mb-2">Why partner with us?</h4>
                <hr className="border-border mb-3" />
                <ul className="space-y-3 mb-4">
                  {partnerBullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-1 inline-block size-3 rounded-full bg-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
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
            eyebrow={aboutContent?.team?.eyebrow ?? "The team"}
            title={aboutContent?.team?.title ?? "Senior, hands-on, and accountable."}
            description={aboutContent?.team?.description ?? "No middlemen between you and the people doing the work."}
          />
          {teamMembers.length > 0 && (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((m) => (
                <Card key={m.name} hoverable>
                  <div className="relative size-14 overflow-hidden rounded-full border border-border">
                    {m.image ? (
                      <Image
                        src={m.image.src}
                        alt={m.image.alt}
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
          )}
        </Container>
      </Section>

      <Section>
        <Container width="reading">
          <SectionHeading
            eyebrow="Frontend philosophy"
            title={aboutContent?.philosophy?.title ?? "Why our frontend work doesn't blend in."}
          />
          <ul className="mt-8 space-y-4">
            {philosophyItems.map((p, i) => (
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
        title={aboutContent?.finalCta?.title ?? "Want to meet the team that would actually launch it?"}
        primary={{ label: aboutContent?.finalCta?.primaryLabel ?? "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: aboutContent?.finalCta?.secondaryLabel ?? "WhatsApp us", href: WHATSAPP_HREF }}
      />
    </>
  );
}
