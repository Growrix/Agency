import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { MobilePrincipleList } from "@/components/marketing/mobile/MobilePrincipleList";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { PortfolioGalleryLightbox } from "@/components/media/PortfolioGalleryLightbox";
import type { PublicPortfolioDetailRecord, PublicPortfolioRecord } from "@/server/domain/catalog";

type PortfolioDetail = NonNullable<PublicPortfolioDetailRecord["detail"]>;

type PortfolioCaseStudyBodyMobileProps = {
  detail: PortfolioDetail;
  galleryImages: Array<{ src: string; alt: string }>;
  related: PublicPortfolioRecord[];
  showReviews: boolean;
};

export function PortfolioCaseStudyBodyMobile({
  detail,
  galleryImages,
  related,
  showReviews,
}: PortfolioCaseStudyBodyMobileProps) {
  const hasTechnicalMeta =
    Boolean(detail.deliveryStory?.trim()) ||
    (detail.process?.length ?? 0) > 0 ||
    (detail.integrations?.length ?? 0) > 0 ||
    (detail.seo?.length ?? 0) > 0 ||
    (detail.standards?.length ?? 0) > 0;

  const processSteps = detail.process?.length
    ? detail.process
    : ["Discovery and KPI alignment", "Design and content architecture", "Build, QA, and launch hardening"];

  return (
    <>
      {hasTechnicalMeta ? (
        <div className="home-mobile-marketing">
          <MobileMarketingSectionHeader
            eyebrow="Delivery focus"
            titleLead="How we built the"
            titleAccent="new production website."
            description="A concise project narrative, delivery process, and the technical standards we enforced before launch."
            align="left"
            className="home-mobile-marketing__header--left max-w-none"
          />

          <div className="home-mobile-marketing__stack">
            <article className="home-mobile-marketing__principle-card home-mobile-marketing__principle-card--text-only">
              <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Execution story</p>
              <p className="mt-3 text-sm leading-7 text-text-muted">
                {detail.deliveryStory?.trim() ||
                  "We rebuilt the experience around conversion clarity, scalable content operations, and production-safe engineering gates."}
              </p>
            </article>

            <article className="home-mobile-marketing__principle-card home-mobile-marketing__principle-card--text-only">
              <p className="font-mono text-[11px] uppercase tracking-wider text-accent">Delivery process</p>
              <ol className="mt-3 space-y-3">
                {processSteps.map((step, index) => (
                  <li key={`${step}-${index}`} className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent font-mono text-[11px] font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-6 text-text-muted">{step}</span>
                  </li>
                ))}
              </ol>
            </article>

            {(detail.integrations?.length ?? 0) > 0 ? (
              <article className="home-mobile-marketing__principle-card home-mobile-marketing__principle-card--text-only">
                <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Integrations</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                  {detail.integrations?.map((integration, index) => (
                    <li key={`${integration}-${index}`} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden />
                      {integration}
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}

            {(detail.seo?.length ?? 0) > 0 ? (
              <article className="home-mobile-marketing__principle-card home-mobile-marketing__principle-card--text-only">
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">SEO and discovery</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                  {detail.seo?.map((item, index) => (
                    <li key={`${item}-${index}`} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/60" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}

            {(detail.standards?.length ?? 0) > 0 ? (
              <article className="home-mobile-marketing__principle-card home-mobile-marketing__principle-card--text-only">
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Quality standards</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                  {detail.standards?.map((item, index) => (
                    <li key={`${item}-${index}`} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-text-muted/50" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}
          </div>
        </div>
      ) : null}

      {((detail.integrations?.length ?? 0) > 0 || detail.build.length > 0 || detail.results.length > 0) ? (
        <div className="home-mobile-marketing">
          <MobileMarketingSectionHeader
            eyebrow="Stack and integrations"
            titleLead="Production scope and"
            titleAccent="systems delivered."
            description="A clearer snapshot of what was implemented, integrated, and measured after launch."
            align="left"
            className="home-mobile-marketing__header--left max-w-none"
          />

          <div className="home-mobile-marketing__stack">
            {(detail.integrations?.length ?? 0) > 0 ? (
              <article className="home-mobile-marketing__principle-card home-mobile-marketing__principle-card--text-only">
                <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Integrations shipped</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                  {detail.integrations?.map((integration, index) => (
                    <li key={`${integration}-${index}`} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden />
                      {integration}
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}

            {detail.build.length > 0 ? (
              <article className="home-mobile-marketing__principle-card home-mobile-marketing__principle-card--text-only">
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">Build facts</p>
                <ul className="mt-3 space-y-3">
                  {detail.build.map((item) => (
                    <li key={`${item.label}-${item.value}`} className="border-b border-border/40 pb-2.5 last:border-0 last:pb-0">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-text-muted">{item.label}</span>
                      <span className="mt-0.5 block text-sm font-medium text-text">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}

            {detail.results.length > 0 ? (
              <article className="home-mobile-marketing__principle-card home-mobile-marketing__principle-card--text-only">
                <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Measured outcomes</p>
                <ul className="mt-3 space-y-3">
                  {detail.results.map((item) => (
                    <li key={`${item.label}-${item.value}`} className="border-b border-border/40 pb-2.5 last:border-0 last:pb-0">
                      <span className="block font-display text-xl tracking-tight text-text">{item.value}</span>
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-text-muted">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}
          </div>
        </div>
      ) : null}

      {detail.strategy.length > 0 ? (
        <MobilePrincipleList
          eyebrow="Strategy & solution"
          titleLead="Decisions that"
          titleAccent="shaped the build."
          description="The architecture, design system, and product choices that made the rest of the project possible."
          items={detail.strategy.map((s, index) => ({
            title: `Decision ${String(index + 1).padStart(2, "0")}`,
            description: s,
          }))}
        />
      ) : null}

      {detail.build.length > 0 ? (
        <div className="home-mobile-marketing">
          <MobileMarketingSectionHeader
            eyebrow="Build breakdown"
            title="Stack and modules delivered."
            align="left"
            className="home-mobile-marketing__header--left max-w-none"
          />
          <div className="home-mobile-marketing__stack">
            {detail.build.map((item) => (
              <article key={item.label} className="home-mobile-marketing__principle-card home-mobile-marketing__principle-card--text-only">
                <p className="font-mono text-[10px] uppercase tracking-wider text-primary/70">{item.label}</p>
                <p className="mt-2 font-display text-lg tracking-tight">{item.value}</p>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {galleryImages.length > 0 ? (
        <div className="home-mobile-marketing">
          <MobileMarketingSectionHeader
            eyebrow="Experience gallery"
            title="Surfaces from the live product."
            align="left"
            className="home-mobile-marketing__header--left max-w-none"
          />
          <PortfolioGalleryLightbox images={galleryImages} />
        </div>
      ) : null}

      {showReviews ? (
        <div className="home-mobile-marketing">
          <GoogleReviews
            eyebrow="Google reviews"
            title="Recent client feedback from the studio profile."
            description="A live Google review keeps the proof layer tied to the public business profile."
            displayMode="single"
            limit={1}
            showSummary={false}
            hideHeading
          />
        </div>
      ) : null}

      {related.length > 0 ? (
        <div className="home-mobile-marketing">
          <MobileMarketingSectionHeader
            eyebrow="More work"
            titleLead="Adjacent projects"
            titleAccent="worth a look."
            align="left"
            className="home-mobile-marketing__header--left max-w-none"
          />
          <div className="home-mobile-marketing__stack">
            {related.map((project) => (
              <PortfolioCard key={project.slug} project={project} />
            ))}
          </div>
          <Link href="/portfolio" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
            View all <ArrowUpRightIcon className="size-4" aria-hidden />
          </Link>
        </div>
      ) : null}
    </>
  );
}
