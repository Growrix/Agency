import { CheckIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { cn } from "@/lib/utils";

type PricingCard = {
  title: string;
  investment: string;
  description: string;
  bestFor: readonly string[];
  cta: { label: string; href: string };
  featured?: boolean;
};

type MobilePricingCardsProps = {
  eyebrow: string;
  titleLead?: string;
  titleAccent?: string;
  title?: string;
  description?: string;
  cards: readonly PricingCard[];
};

export function MobilePricingCards({
  eyebrow,
  titleLead,
  titleAccent,
  title,
  description,
  cards,
}: MobilePricingCardsProps) {
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

      <div className="mobile-pricing-cards__stack">
        {cards.map((card) => (
          <div
            key={card.title}
            className={cn(
              "mobile-pricing-cards__card",
              card.featured && "mobile-pricing-cards__card--featured",
            )}
          >
            <div className="mobile-pricing-cards__card-head">
              <h3 className="mobile-pricing-cards__card-title">{card.title}</h3>
              {card.featured ? (
                <span className="mobile-pricing-cards__card-badge">Popular</span>
              ) : null}
            </div>
            <p className="mobile-pricing-cards__card-investment">{card.investment}</p>
            <p className="mobile-pricing-cards__card-description">{card.description}</p>
            <ul className="mobile-pricing-cards__card-list">
              {card.bestFor.map((item) => (
                <li key={item} className="mobile-pricing-cards__card-list-item">
                  <CheckIcon className="mobile-pricing-cards__card-list-icon" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mobile-pricing-cards__card-cta">
              <LinkButton
                href={card.cta.href}
                variant={card.featured ? "primary" : "outline"}
                fullWidth
              >
                {card.cta.label}
              </LinkButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
