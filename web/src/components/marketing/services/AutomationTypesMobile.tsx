import { MobileFeatureGrid } from "@/components/marketing/mobile/MobileFeatureGrid";
import { AUTOMATION_TYPES_SECTION } from "@/lib/automation-service-content";

export function AutomationTypesMobile() {
  return (
    <MobileFeatureGrid
      eyebrow={AUTOMATION_TYPES_SECTION.eyebrow}
      title={AUTOMATION_TYPES_SECTION.title}
      titleLead={AUTOMATION_TYPES_SECTION.titleLead}
      titleAccent={AUTOMATION_TYPES_SECTION.titleAccent}
      description={AUTOMATION_TYPES_SECTION.description}
      items={AUTOMATION_TYPES_SECTION.items}
    />
  );
}
