import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { ADDITIONAL_SERVICES_CATEGORIES } from "@/lib/content";
import {
  ChartBarIcon,
  MagnifyingGlassCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

const CATEGORY_ICONS = [
  MagnifyingGlassCircleIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
] as const;

export function AdditionalServicesCategoriesMobile() {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow="What we cover"
        titleLead="Three categories."
        titleAccent="One strong foundation."
        description="These configurations are designed to work together—visibility, tracking, and technical structure as a single setup sprint."
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack">
        {ADDITIONAL_SERVICES_CATEGORIES.map((cat, index) => {
          const Icon = CATEGORY_ICONS[index] ?? MagnifyingGlassCircleIcon;
          return (
            <article key={cat.id} className="home-mobile-marketing__principle-card">
              <span className="home-mobile-marketing__principle-card-icon" aria-hidden>
                <Icon className="home-mobile-marketing__principle-card-icon-glyph" />
              </span>
              <div className="home-mobile-marketing__principle-card-body">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="home-mobile-marketing__principle-card-title">{cat.title}</h3>
                  {cat.badge ? <Badge tone="secondary">{cat.badge}</Badge> : null}
                </div>
                <ul className="mt-3 space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-6 text-text-muted">
                      <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
