import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { INVESTMENT_CLIENT_JOURNEYS } from "@/lib/investment-guide-content";

export function InvestmentClientJourneysMobile() {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={INVESTMENT_CLIENT_JOURNEYS.eyebrow}
        titleLead={INVESTMENT_CLIENT_JOURNEYS.titleLead}
        titleAccent={INVESTMENT_CLIENT_JOURNEYS.titleAccent}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack">
        {INVESTMENT_CLIENT_JOURNEYS.journeys.map((journey) => (
          <article key={journey.persona} className="home-mobile-marketing__journey-card">
            <p className="home-mobile-marketing__journey-persona">{journey.persona}</p>

            <ol className="home-mobile-marketing__journey-steps" aria-label={`${journey.persona} journey`}>
              {journey.steps.map((step, index) => (
                <li key={step} className="home-mobile-marketing__journey-step-item">
                  <span className="home-mobile-marketing__journey-step">{step}</span>
                  {index < journey.steps.length - 1 ? (
                    <span className="home-mobile-marketing__journey-connector" aria-hidden>
                      <ChevronDownIcon className="size-4" />
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>

            <p className="home-mobile-marketing__journey-footnote">Typical progression over time</p>
          </article>
        ))}
      </div>
    </div>
  );
}
