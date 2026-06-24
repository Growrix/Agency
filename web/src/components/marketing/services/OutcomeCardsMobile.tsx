import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";

type OutcomeCard = {
  title: string;
  description: string;
};

type OutcomeCardsMobileProps = {
  eyebrow: string;
  title: string;
  titleLead?: string;
  titleAccent?: string;
  description?: string;
  cards: OutcomeCard[];
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
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={eyebrow}
        titleLead={titleLead}
        titleAccent={titleAccent}
        title={titleLead && titleAccent ? undefined : title}
        description={description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack">
        {cards.map((card) => (
          <article key={card.title} className="home-mobile-marketing__content-card">
            <h3 className="home-mobile-marketing__content-card-title">{card.title}</h3>
            <p className="home-mobile-marketing__content-card-description">{card.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
