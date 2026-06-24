import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { WebsitesIconFeatureCard } from "@/components/marketing/services/WebsitesIconFeatureCard";
import type { WebsitesOutcomeIconKey } from "@/lib/websites-service-icons";
import { getWebsitesOutcomeIcon } from "@/lib/websites-service-icons";

type OutcomeItem = {
  title: string;
  description: string;
  icon: WebsitesOutcomeIconKey;
};

type WebsitesOutcomesDesktopProps = {
  eyebrow: string;
  title: string;
  titleLead?: string;
  titleAccent?: string;
  description: string;
  items: readonly OutcomeItem[];
};

export function WebsitesOutcomesDesktop({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  items,
}: WebsitesOutcomesDesktopProps) {
  return (
    <>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        titleLead={titleLead}
        titleAccent={titleAccent}
        description={description}
      />
      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {items.map((item) => {
          const Icon = getWebsitesOutcomeIcon(item.icon);
          return (
            <RevealItem key={item.title} className="h-full">
              <WebsitesIconFeatureCard
                icon={Icon}
                title={item.title}
                description={item.description}
                variant="outcome"
              />
            </RevealItem>
          );
        })}
      </RevealGroup>
    </>
  );
}
