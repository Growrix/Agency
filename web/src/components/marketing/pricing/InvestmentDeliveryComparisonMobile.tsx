import { CheckIcon } from "@heroicons/react/24/outline";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { INVESTMENT_DELIVERY_COMPARISON } from "@/lib/investment-guide-content";
import { cn } from "@/lib/utils";

export function InvestmentDeliveryComparisonMobile() {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={INVESTMENT_DELIVERY_COMPARISON.eyebrow}
        titleLead={INVESTMENT_DELIVERY_COMPARISON.titleLead}
        titleAccent={INVESTMENT_DELIVERY_COMPARISON.titleAccent}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack">
        {INVESTMENT_DELIVERY_COMPARISON.paths.map((path) => {
          const featured = "featured" in path && Boolean(path.featured);

          return (
            <article
              key={path.title}
              className={cn(
                "home-mobile-marketing__path-card",
                featured && "home-mobile-marketing__path-card--pricing-featured",
              )}
            >
              <div className="home-mobile-marketing__path-card-title-row">
                <h3 className="home-mobile-marketing__path-card-title">{path.title}</h3>
                {featured ? (
                  <span className="mobile-pricing-cards__card-badge">Popular</span>
                ) : null}
              </div>

              <ul className="home-mobile-marketing__path-card-bullets">
                {path.highlights.map((highlight) => (
                  <li key={highlight} className="home-mobile-marketing__path-card-bullet">
                    <CheckIcon className="home-mobile-marketing__path-card-bullet-icon" aria-hidden />
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
