import { MobileFeatureGrid } from "@/components/marketing/mobile/MobileFeatureGrid";
import { SAAS_PRODUCT_TYPES_SECTION } from "@/lib/saas-applications-service-content";

export function SaasProductTypesMobile() {
  return (
    <MobileFeatureGrid
      eyebrow={SAAS_PRODUCT_TYPES_SECTION.eyebrow}
      title={SAAS_PRODUCT_TYPES_SECTION.title}
      titleLead={SAAS_PRODUCT_TYPES_SECTION.titleLead}
      titleAccent={SAAS_PRODUCT_TYPES_SECTION.titleAccent}
      description={SAAS_PRODUCT_TYPES_SECTION.description}
      items={SAAS_PRODUCT_TYPES_SECTION.items}
    />
  );
}
