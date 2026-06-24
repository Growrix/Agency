import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import type { SeoChecklistCard, SeoVisibilityFlow } from "@/lib/technical-seo-service-content";
import { TECHNICAL_SEO_VISIBILITY_SECTION } from "@/lib/technical-seo-service-content";
import { cn } from "@/lib/utils";

type SeoVisibilityFoundationMobileProps = {
  flow?: SeoVisibilityFlow;
  withoutSetup?: SeoChecklistCard;
  withSetup?: SeoChecklistCard;
};

function ChecklistCard({ card }: { card: SeoChecklistCard }) {
  const isPositive = card.variant === "positive";
  const Icon = isPositive ? CheckIcon : XMarkIcon;

  return (
    <article
      className={cn(
        "home-mobile-marketing__seo-checklist-card",
        isPositive && "home-mobile-marketing__seo-checklist-card--positive",
      )}
    >
      <h3 className="home-mobile-marketing__seo-checklist-card-title">{card.title}</h3>
      <ul className="home-mobile-marketing__seo-checklist-items" aria-label={card.title}>
        {card.items.map((item) => (
          <li key={item} className="home-mobile-marketing__seo-checklist-item">
            <Icon className="home-mobile-marketing__seo-checklist-item-icon" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function SeoVisibilityFoundationMobile({
  flow = TECHNICAL_SEO_VISIBILITY_SECTION.flow,
  withoutSetup = TECHNICAL_SEO_VISIBILITY_SECTION.withoutSetup,
  withSetup = TECHNICAL_SEO_VISIBILITY_SECTION.withSetup,
}: SeoVisibilityFoundationMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={TECHNICAL_SEO_VISIBILITY_SECTION.eyebrow}
        titleLead={TECHNICAL_SEO_VISIBILITY_SECTION.titleLead}
        titleAccent={TECHNICAL_SEO_VISIBILITY_SECTION.titleAccent}
        description={TECHNICAL_SEO_VISIBILITY_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__seo-flow">
        <p className="home-mobile-marketing__seo-flow-label">{flow.title}</p>
        <ol className="home-mobile-marketing__seo-flow-steps" aria-label={flow.title}>
          {flow.steps.map((step, index) => (
            <li key={step} className="home-mobile-marketing__seo-flow-step">
              <span className="home-mobile-marketing__seo-flow-step-index">{index + 1}</span>
              <span className="home-mobile-marketing__seo-flow-step-label">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="home-mobile-marketing__stack">
        <ChecklistCard card={withoutSetup} />
        <ChecklistCard card={withSetup} />
      </div>
    </div>
  );
}
