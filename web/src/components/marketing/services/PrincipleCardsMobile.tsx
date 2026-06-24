import { MobilePrincipleList } from "@/components/marketing/mobile/MobilePrincipleList";
import type { WebsitesPrincipleIconKey } from "@/lib/websites-service-icons";
import { getWebsitesPrincipleIcon } from "@/lib/websites-service-icons";

type PrincipleItem = {
  title: string;
  description: string;
  icon: WebsitesPrincipleIconKey;
};

type PrincipleCardsMobileProps = {
  eyebrow: string;
  title: string;
  titleLead?: string;
  titleAccent?: string;
  description?: string;
  cards: readonly PrincipleItem[];
};

export function PrincipleCardsMobile({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  cards,
}: PrincipleCardsMobileProps) {
  return (
    <MobilePrincipleList
      eyebrow={eyebrow}
      title={title}
      titleLead={titleLead}
      titleAccent={titleAccent}
      description={description}
      items={cards.map((card) => ({
        title: card.title,
        description: card.description,
        icon: getWebsitesPrincipleIcon(card.icon),
      }))}
    />
  );
}
