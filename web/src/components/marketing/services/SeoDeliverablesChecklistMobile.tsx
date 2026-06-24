import { CheckIcon } from "@heroicons/react/24/outline";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import type { SeoDeliverableCategory } from "@/lib/technical-seo-service-content";
import { TECHNICAL_SEO_DELIVERABLES_SECTION } from "@/lib/technical-seo-service-content";

type SeoDeliverablesChecklistMobileProps = {
  categories?: readonly SeoDeliverableCategory[];
};

export function SeoDeliverablesChecklistMobile({
  categories = TECHNICAL_SEO_DELIVERABLES_SECTION.categories,
}: SeoDeliverablesChecklistMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={TECHNICAL_SEO_DELIVERABLES_SECTION.eyebrow}
        titleLead={TECHNICAL_SEO_DELIVERABLES_SECTION.titleLead}
        titleAccent={TECHNICAL_SEO_DELIVERABLES_SECTION.titleAccent}
        description={TECHNICAL_SEO_DELIVERABLES_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack">
        {categories.map((category) => (
          <article key={category.title} className="home-mobile-marketing__seo-checklist-card home-mobile-marketing__seo-checklist-card--positive">
            <h3 className="home-mobile-marketing__seo-checklist-card-title">{category.title}</h3>
            <ul className="home-mobile-marketing__seo-checklist-items" aria-label={`${category.title} deliverables`}>
              {category.items.map((item) => (
                <li key={item} className="home-mobile-marketing__seo-checklist-item">
                  <CheckIcon className="home-mobile-marketing__seo-checklist-item-icon" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
