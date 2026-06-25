import type { ComponentType, SVGProps } from "react";
import {
  ChartBarIcon,
  CheckIcon,
  ChevronRightIcon,
  MagnifyingGlassCircleIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import type { SeoSetupCategory } from "@/lib/technical-seo-service-content";
import { TECHNICAL_SEO_SETUP_CATEGORIES_SECTION } from "@/lib/technical-seo-service-content";
import { cn } from "@/lib/utils";

const SETUP_CATEGORY_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "seo-visibility": MagnifyingGlassCircleIcon,
  "tracking-analytics": ChartBarIcon,
  "technical-seo": WrenchScrewdriverIcon,
};

type TechnicalSeoSetupCategoriesMobileProps = {
  categories?: readonly SeoSetupCategory[];
  footerNote?: string;
};

export function TechnicalSeoSetupCategoriesMobile({
  categories = TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.categories,
  footerNote = TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.footerNote,
}: TechnicalSeoSetupCategoriesMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.eyebrow}
        titleLead={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.titleLead}
        titleAccent={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.titleAccent}
        description={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack home-mobile-marketing__engagement-stack">
        {categories.map((category, index) => {
          const featured = index === 0;
          const Icon = SETUP_CATEGORY_ICONS[category.id] ?? SparklesIcon;

          return (
            <article
              key={category.id}
              className={cn(
                "home-mobile-marketing__path-card home-mobile-marketing__path-card--pricing",
                featured && "home-mobile-marketing__path-card--pricing-featured",
              )}
            >
              <div className="home-mobile-marketing__path-card-head">
                <span className="home-mobile-marketing__path-card-icon" aria-hidden>
                  <Icon className="home-mobile-marketing__path-card-icon-glyph" />
                </span>
                <div className="home-mobile-marketing__path-card-title-wrap">
                  <div className="home-mobile-marketing__path-card-title-row">
                    <h3 className="home-mobile-marketing__path-card-title">{category.title}</h3>
                    {category.badge ? <Badge tone="primary">{category.badge}</Badge> : null}
                  </div>
                </div>
                <span className="home-mobile-marketing__path-card-chevron" aria-hidden>
                  <ChevronRightIcon className="size-4" />
                </span>
              </div>

              <ul className="home-mobile-marketing__path-card-bullets">
                {category.items.map((item) => (
                  <li key={item} className="home-mobile-marketing__path-card-bullet">
                    <CheckIcon className="home-mobile-marketing__path-card-bullet-icon" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <p className="home-mobile-marketing__note">{footerNote}</p>
    </div>
  );
}
