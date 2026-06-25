import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { HTML_BUSINESS_PROFILES_CATEGORY_INCLUDED_SECTION } from "@/lib/html-business-profiles-category-content";

export function HtmlBusinessProfilesIncludedMobile() {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_INCLUDED_SECTION.eyebrow}
        titleLead={HTML_BUSINESS_PROFILES_CATEGORY_INCLUDED_SECTION.titleLead}
        titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_INCLUDED_SECTION.titleAccent}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <ul className="home-mobile-marketing__stack-group-items html-business-profiles-category-included-mobile__chips">
        {HTML_BUSINESS_PROFILES_CATEGORY_INCLUDED_SECTION.items.map((item) => (
          <li key={item} className="home-mobile-marketing__stack-group-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
