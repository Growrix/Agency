import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
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
      <div className="home-mobile-marketing__proof-header">
        <MobileMarketingSectionHeader
          eyebrow={eyebrow}
          titleLead={titleLead}
          titleAccent={titleAccent}
          title={titleLead && titleAccent ? undefined : title}
          align="left"
          className="home-mobile-marketing__header--left max-w-none"
        />
        <Link href="/portfolio" className="home-mobile-marketing__proof-link">
          View all <ArrowUpRightIcon className="size-4" aria-hidden />
        </Link>
      </div>

      <RevealGroup className="home-mobile-marketing__stack">
        {projects.map((project) => (
          <RevealItem key={project.slug}>
            <PortfolioCardMobile project={project} />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
