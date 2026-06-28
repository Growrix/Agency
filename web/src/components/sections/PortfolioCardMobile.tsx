import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { toSanityCdnImageSrc } from "@/lib/sanity-image";
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
        <span className="home-mobile-marketing__portfolio-card-tag home-mobile-marketing__portfolio-card-tag--service">
          {serviceLabel}
        </span>
        <span className="home-mobile-marketing__portfolio-card-tag home-mobile-marketing__portfolio-card-tag--industry">
          {project.industry}
        </span>
      </div>

      <div className="home-mobile-marketing__portfolio-card-media">
        {image ? (
          <Image
            src={toSanityCdnImageSrc(image.src, 828)}
            alt={image.alt}
            fill
            loading="lazy"
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-contain bg-[#070b12]"
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
          View case study <ArrowUpRightIcon className="home-mobile-marketing__portfolio-card-cta-icon" aria-hidden />
        </Link>
        {project.livePreviewUrl ? (
          <>
            <span className="home-mobile-marketing__portfolio-card-footer-divider" aria-hidden />
            <span className="home-mobile-marketing__portfolio-card-live">
              <span className="home-mobile-marketing__portfolio-card-live-dot" aria-hidden />
              Live site available
            </span>
          </>
        ) : null}
      </div>
    </article>
  );
}
