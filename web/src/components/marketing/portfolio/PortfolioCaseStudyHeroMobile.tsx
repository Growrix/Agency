import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { toSanityCdnImageSrc } from "@/lib/sanity-image";
import { MarketingHeroTitle } from "@/components/marketing/MarketingHeroTitle";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

type PortfolioCaseStudyHeroMobileProps = {
  industry: string;
  serviceName?: string;
  year: string;
  name: string;
  summary: string;
  client: string;
  duration: string;
  team: string;
  accent: string;
  heroImage?: { src: string; alt: string };
  embeddedPreviewUrl?: string;
  metric?: string;
  livePreviewUrl?: string;
};

export function PortfolioCaseStudyHeroMobile({
  industry,
  serviceName,
  year,
  name,
  summary,
  client,
  duration,
  team,
  accent,
  heroImage,
  embeddedPreviewUrl,
  metric,
  livePreviewUrl,
}: PortfolioCaseStudyHeroMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary">
        ← All projects
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge tone="primary">{industry}</Badge>
        {serviceName ? <Badge tone="neutral">{serviceName}</Badge> : null}
        <Badge tone="accent">{year}</Badge>
      </div>

      <MarketingHeroTitle
        className="mt-4 font-display text-3xl font-bold tracking-tight text-balance"
        title={name}
        layout="block"
      />
      <p className="mt-3 text-base leading-7 text-text-muted">{summary}</p>

      <dl className="contact-hero-mobile__stats mt-6">
        <div className="contact-hero-mobile__stat">
          <dt className="contact-hero-mobile__stat-label">Client</dt>
          <dd className="contact-hero-mobile__stat-value contact-hero-mobile__stat-value--plain">{client}</dd>
        </div>
        <div className="contact-hero-mobile__stat">
          <dt className="contact-hero-mobile__stat-label">Duration</dt>
          <dd className="contact-hero-mobile__stat-value contact-hero-mobile__stat-value--plain">{duration}</dd>
        </div>
        <div className="contact-hero-mobile__stat">
          <dt className="contact-hero-mobile__stat-label">Team</dt>
          <dd className="contact-hero-mobile__stat-value contact-hero-mobile__stat-value--plain">{team}</dd>
        </div>
      </dl>

      <Card className="mt-6 overflow-hidden p-0">
        <div className={`relative aspect-16/10 overflow-hidden bg-linear-to-br ${accent}`}>
          {heroImage ? (
            <Image
              src={toSanityCdnImageSrc(heroImage.src, 828)}
              alt={heroImage.alt}
              fill
              priority
              sizes="(min-width: 640px) 85vw, 100vw"
              className="object-contain bg-[#070b12]"
            />
          ) : embeddedPreviewUrl ? (
            <iframe
              src={embeddedPreviewUrl}
              title={`${name} website preview`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : null}
          <div className="absolute inset-0 bg-linear-to-t from-black/72 via-black/15 to-transparent" aria-hidden />
          {metric ? (
            <div className="absolute inset-0 flex items-end p-4 text-white">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider opacity-80">Outcome</p>
                <p className="mt-1 font-display text-2xl tracking-tight">{metric}</p>
              </div>
            </div>
          ) : null}
        </div>
      </Card>

      {livePreviewUrl ? (
        <LinkButton href={livePreviewUrl} target="_blank" rel="noreferrer" variant="outline" fullWidth className="mt-4">
          Visit live site <ArrowUpRightIcon className="size-4" aria-hidden />
        </LinkButton>
      ) : null}

      <div className="service-detail-hero-mobile__cta-stack mt-6">
        <LinkButton href="/book-appointment" fullWidth className="service-detail-hero-mobile__cta-primary">
          <span className="service-detail-hero-mobile__cta-inner">
            Build something similar
            <ArrowRightIcon className="service-detail-hero-mobile__cta-icon" aria-hidden />
          </span>
        </LinkButton>
        <LinkButton href="/portfolio" variant="outline" fullWidth className="service-detail-hero-mobile__cta-secondary">
          More work
        </LinkButton>
      </div>
    </div>
  );
}
