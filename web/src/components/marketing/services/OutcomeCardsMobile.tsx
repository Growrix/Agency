import { MobileFeatureGrid } from "@/components/marketing/mobile/MobileFeatureGrid";
import type { WebsitesOutcomeIconKey } from "@/lib/websites-service-icons";
import { getWebsitesOutcomeIcon } from "@/lib/websites-service-icons";

type OutcomeItem = {
  title: string;
  description: string;
  icon: WebsitesOutcomeIconKey;
};

type OutcomeCardsMobileProps = {
  eyebrow: string;
  title: string;
  titleLead?: string;
  titleAccent?: string;
  description?: string;
  cards: readonly OutcomeItem[];
};

export function OutcomeCardsMobile({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  cards,
}: OutcomeCardsMobileProps) {
  return (
    <MobileFeatureGrid
      eyebrow={eyebrow}
      title={title}
      titleLead={titleLead}
      titleAccent={titleAccent}
      description={description}
      items={cards.map((card) => ({
        title: card.title,
        description: card.description,
        icon: getWebsitesOutcomeIcon(card.icon),
      }))}
    />
  );
}
