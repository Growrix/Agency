import { MobileFeatureGrid } from "@/components/marketing/mobile/MobileFeatureGrid";
import { AUTOMATION_TYPE_ICONS } from "@/components/marketing/automation/automation-visual-icons";
import { AUTOMATION_TYPES_SECTION } from "@/lib/automation-service-content";

export function AutomationTypesMobile() {
  const items = AUTOMATION_TYPES_SECTION.items.map((item, index) => {
    const { icon, tone } = AUTOMATION_TYPE_ICONS[index % AUTOMATION_TYPE_ICONS.length];
    return {
      ...item,
      icon,
      iconTone: tone,
    };
  });

  return (
    <MobileFeatureGrid
      eyebrow={AUTOMATION_TYPES_SECTION.eyebrow}
      title={AUTOMATION_TYPES_SECTION.title}
      titleLead={AUTOMATION_TYPES_SECTION.titleLead}
      titleAccent={AUTOMATION_TYPES_SECTION.titleAccent}
      description={AUTOMATION_TYPES_SECTION.description}
      items={items}
    />
  );
}
