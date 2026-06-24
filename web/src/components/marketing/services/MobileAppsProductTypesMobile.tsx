import { MobileFeatureGrid } from "@/components/marketing/mobile/MobileFeatureGrid";
import { MOBILE_PRODUCT_TYPES_SECTION } from "@/lib/mobile-apps-service-content";

export function MobileAppsProductTypesMobile() {
  return (
    <MobileFeatureGrid
      eyebrow={MOBILE_PRODUCT_TYPES_SECTION.eyebrow}
      title={MOBILE_PRODUCT_TYPES_SECTION.title}
      titleLead={MOBILE_PRODUCT_TYPES_SECTION.titleLead}
      titleAccent={MOBILE_PRODUCT_TYPES_SECTION.titleAccent}
      description={MOBILE_PRODUCT_TYPES_SECTION.description}
      items={MOBILE_PRODUCT_TYPES_SECTION.items}
    />
  );
}
