import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { HERO_TITLE_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";

type HomeDesktopSectionRailProps = {
  eyebrow: string;
  title?: string;
  titleLead?: string;
  titleAccent?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

export function HomeDesktopSectionRail({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  ctaHref,
  ctaLabel,
  className,
}: HomeDesktopSectionRailProps) {
  return (
    <div className={cn("home-desktop-marketing__rail", className)}>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        titleLead={titleLead}
        titleAccent={titleAccent}
        description={description}
        titleClassName={HERO_TITLE_CLASS}
        className="home-desktop-marketing__rail-heading"
      />
      {ctaHref && ctaLabel ? (
        <Link href={ctaHref} className="home-desktop-marketing__rail-link">
          {ctaLabel}
          <ArrowUpRightIcon className="size-4" aria-hidden />
        </Link>
      ) : null}
    </div>
  );
}
