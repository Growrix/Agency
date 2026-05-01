import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { CTABand } from "@/components/sections/CTABand";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { StatBlock } from "@/components/sections/StatBlock";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { HOME_STATS, SERVICES } from "@/lib/content";
import { SHOW_GOOGLE_REVIEWS } from "@/lib/feature-flags";
import { WHATSAPP_HREF } from "@/lib/nav";
import { getPublicPortfolioProject, listPublicPortfolio } from "@/server/domain/catalog";

export async function generateStaticParams() {
  const projects = await listPublicPortfolio();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublicPortfolioProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Case Study`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublicPortfolioProject(slug);
  if (!project) notFound();

  const service = SERVICES.find((s) => s.slug === project.service);
  const related = (await listPublicPortfolio()).filter((entry) => entry.slug !== project.slug).slice(0, 3);
  const detail = project.detail;

  if (!detail) notFound();

  const heroImage = project.hero_image;
  const galleryImages = detail.gallery.length > 0
    ? detail.gallery
    : heroImage
      ? [heroImage]
      : [];
  const outcomeStats = detail.results.length > 0 ? detail.results : HOME_STATS;
  const hasTechnicalMeta =
    Boolean(detail.deliveryStory?.trim()) ||
    (detail.process?.length ?? 0) > 0 ||
    (detail.integrations?.length ?? 0) > 0 ||
    (detail.seo?.length ?? 0) > 0 ||
    (detail.standards?.length ?? 0) > 0;

  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-12">
        <Container>
          <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary">
            ← All projects
          </Link>
          <div className="mt-6 grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge tone="primary">{project.industry}</Badge>
                {service && <Badge tone="neutral">{service.name}</Badge>}
                <Badge tone="accent">{detail.year}</Badge>
              </div>
              <h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance">
                {project.name}
              </h1>
              <p className="mt-6 text-lg text-text-muted leading-7 text-pretty">{project.summary}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[14px] border border-border bg-surface px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">Client</p>
                  <p className="mt-2 font-display text-lg tracking-tight">{detail.client}</p>
                </div>
                <div className="rounded-[14px] border border-border bg-surface px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">Duration</p>
                  <p className="mt-2 font-display text-lg tracking-tight">{detail.duration}</p>
                </div>
                <div className="rounded-[14px] border border-border bg-surface px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">Team</p>
                  <p className="mt-2 font-display text-lg tracking-tight">{detail.team}</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/book-appointment" size="lg">Build something similar</LinkButton>
                <LinkButton href="/portfolio" variant="outline" size="lg">More work</LinkButton>
              </div>
            </div>
            <div className="lg:col-span-6">
              <Card className="overflow-hidden p-0">
                <div className={`relative aspect-16/10 overflow-hidden bg-linear-to-br ${project.accent}`}>
                  {heroImage ? (
                    <Image
                      src={heroImage.src}
                      alt={heroImage.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-contain bg-[#070b12]"
                    />
                  ) : project.embeddedPreviewUrl ? (
                    <iframe
                      src={project.embeddedPreviewUrl}
                      title={`${project.name} live preview`}
                      className="absolute inset-0 h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-linear-to-t from-black/72 via-black/15 to-transparent" aria-hidden />
                  <div className="absolute inset-0 flex items-end p-6 text-white">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider opacity-80">Outcome</p>
                      <p className="mt-1 font-display text-3xl tracking-tight">{project.metric}</p>
                    </div>
                  </div>
                </div>
              </Card>
              {project.livePreviewUrl ? (
                <div className="mt-4">
                  <LinkButton href={project.livePreviewUrl} target="_blank" rel="noreferrer" variant="outline" fullWidth>
                    Visit live site <ArrowUpRightIcon className="size-4" />
                  </LinkButton>
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <StatBlock stats={outcomeStats} />
      </Section>

      {hasTechnicalMeta && (
        <Section tone="inset">
          <Container>
            <SectionHeading
              eyebrow="Delivery focus"
              title="How we built the new production website."
              description="A concise project narrative, delivery process, and the technical standards we enforced before launch."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <Card className="p-6 lg:col-span-1">
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Execution story</p>
                <p className="mt-3 text-sm leading-7 text-pretty text-text-muted">
                  {detail.deliveryStory?.trim() || "We rebuilt the experience around conversion clarity, scalable content operations, and production-safe engineering gates."}
                </p>
              </Card>
              <Card className="p-6 lg:col-span-2">
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Delivery process</p>
                <ol className="mt-3 space-y-3">
                  {(detail.process?.length ? detail.process : ["Discovery and KPI alignment", "Design and content architecture", "Build, QA, and launch hardening"]).map((step, index) => (
                    <li key={`${step}-${index}`} className="flex gap-3">
                      <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-border font-mono text-[11px] text-text-muted">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-6 text-text-muted">{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              {(detail.integrations?.length ?? 0) > 0 && (
                <Card className="p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Integrations</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                    {detail.integrations?.map((integration, index) => (
                      <li key={`${integration}-${index}`}>• {integration}</li>
                    ))}
                  </ul>
                </Card>
              )}
              {(detail.seo?.length ?? 0) > 0 && (
                <Card className="p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">SEO and discovery</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                    {detail.seo?.map((item, index) => (
                      <li key={`${item}-${index}`}>• {item}</li>
                    ))}
                  </ul>
                </Card>
              )}
              {(detail.standards?.length ?? 0) > 0 && (
                <Card className="p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Quality standards</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                    {detail.standards?.map((item, index) => (
                      <li key={`${item}-${index}`}>• {item}</li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </Container>
        </Section>
      )}

      {detail.challenge.length > 0 && (
        <Section tone="inset">
          <Container width="reading">
            <SectionHeading eyebrow="The challenge" title="What needed to change." />
            <div className="mt-8 space-y-4">
              {detail.challenge.map((c, i) => (
                <p key={i} className="text-lg leading-7 text-pretty">{c}</p>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {detail.strategy.length > 0 && (
        <Section>
          <Container width="reading">
            <SectionHeading
              eyebrow="Strategy & solution"
              title="Decisions that shaped the build."
              description="The architecture, design system, and product choices that made the rest of the project possible."
            />
            <ul className="mt-10 space-y-5">
              {detail.strategy.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-lg leading-7 text-pretty pt-0.5">{s}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section tone="inset">
        <Container>
          <SectionHeading eyebrow="Build breakdown" title="Stack and modules delivered." />
          <div className="mt-10 grid gap-px overflow-hidden rounded-[16px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {detail.build.map((b) => (
              <div key={b.label} className="bg-surface p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">{b.label}</p>
                <p className="mt-2 font-display text-lg tracking-tight">{b.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Experience gallery" title="Surfaces from the live product." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {galleryImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="relative aspect-16/10 rounded-[20px] overflow-hidden border border-border bg-inset"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-contain bg-[#070b12]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent" aria-hidden />
                <div className="absolute inset-0 flex items-end p-6 text-white">
                  <p className="font-mono text-xs uppercase tracking-wider opacity-85">Screen 0{index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {SHOW_GOOGLE_REVIEWS && (
        <Section tone="inset">
          <Container width="reading">
            <GoogleReviews
              eyebrow="Google reviews"
              title="Recent client feedback from the studio profile."
              description="A live Google review keeps the proof layer tied to the public business profile."
              displayMode="single"
              limit={1}
              showSummary={false}
            />
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <SectionHeading eyebrow="More work" title="Adjacent projects worth a look." />
            <Link href="/portfolio" className="text-sm font-medium text-primary">
              View all <ArrowUpRightIcon className="inline size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {related.map((p) => (
              <PortfolioCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="Build something similar"
        title={`Want a result like ${project.name}'s?`}
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "Open WhatsApp", href: WHATSAPP_HREF }}
      />
    </>
  );
}

