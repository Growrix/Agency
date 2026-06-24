import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { PortfolioCardMobile } from "@/components/sections/PortfolioCardMobile";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import type { PublicPortfolioRecord } from "@/server/domain/catalog";

type ServiceFeaturedProofMobileProps = {
  eyebrow: string;
  title: string;
  titleLead?: string;
  titleAccent?: string;
  projects: PublicPortfolioRecord[];
};

export function ServiceFeaturedProofMobile({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  projects,
}: ServiceFeaturedProofMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={eyebrow}
        titleLead={titleLead}
        titleAccent={titleAccent}
        title={titleLead && titleAccent ? undefined : title}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <LinkButton
        href="/portfolio"
        variant="outline"
        className="home-mobile-marketing__cta home-mobile-marketing__cta--outline"
      >
        <span className="home-mobile-marketing__cta-inner">
          View all
          <ArrowUpRightIcon className="home-mobile-marketing__cta-icon" aria-hidden />
        </span>
      </LinkButton>

      <RevealGroup className="home-mobile-marketing__stack">
        {projects.map((project) => (
          <RevealItem key={project.slug}>
            <PortfolioCardMobile project={project} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Link href="/portfolio" className="home-mobile-marketing__inline-link">
        Browse full portfolio <ArrowUpRightIcon className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
