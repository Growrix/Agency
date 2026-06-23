import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { SERVICES } from "@/lib/content";
import { SERVICE_PORTFOLIO_TAG_LABELS } from "@/lib/services-landing-content";
import type { PublicPortfolioRecord } from "@/server/domain/catalog";

type PortfolioCardMobileProps = {
  project: PublicPortfolioRecord;
};

export function PortfolioCardMobile({ project }: PortfolioCardMobileProps) {
  const image = project.hero_image;
  const embeddedPreview = !image ? project.embeddedPreviewUrl : undefined;
  const serviceLabel =
    SERVICE_PORTFOLIO_TAG_LABELS[project.service] ??
    SERVICES.find((service) => service.slug === project.service)?.name ??
    "Project";

  return (
    <article className="home-mobile-marketing__portfolio-card">
      <div className="home-mobile-marketing__portfolio-card-tags">
        <span className="home-mobile-marketing__portfolio-card-tag">{serviceLabel}</span>
        <span className="home-mobile-marketing__portfolio-card-tag home-mobile-marketing__portfolio-card-tag--accent">
          {project.industry}
        </span>
      </div>

      <div className="home-mobile-marketing__portfolio-card-media">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover"
          />
        ) : embeddedPreview ? (
          <iframe
            src={embeddedPreview}
            title={`${project.name} embedded preview`}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : null}
      </div>

      <h3 className="home-mobile-marketing__portfolio-card-title">{project.name}</h3>
      <p className="home-mobile-marketing__portfolio-card-summary">{project.summary}</p>

      <div className="home-mobile-marketing__portfolio-card-footer">
        <Link href={`/portfolio/${project.slug}`} className="home-mobile-marketing__portfolio-card-cta">
          View case study <ArrowUpRightIcon className="size-3.5" aria-hidden />
        </Link>
        {project.livePreviewUrl ? (
          <span className="home-mobile-marketing__portfolio-card-live">
            <span className="home-mobile-marketing__portfolio-card-live-dot" aria-hidden />
            Live site available
          </span>
        ) : null}
      </div>
    </article>
  );
}
