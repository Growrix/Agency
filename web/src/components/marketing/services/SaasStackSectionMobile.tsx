import { MobileStackSection } from "@/components/marketing/mobile/MobileStackGroups";
import {
  SAAS_STACK_GROUPS,
  SAAS_STACK_SECTION,
} from "@/lib/saas-applications-service-content";

export function SaasStackSectionMobile() {
  return (
    <MobileStackSection
      eyebrow={SAAS_STACK_SECTION.eyebrow}
      title={SAAS_STACK_SECTION.title}
      titleLead={SAAS_STACK_SECTION.titleLead}
      titleAccent={SAAS_STACK_SECTION.titleAccent}
      description={SAAS_STACK_SECTION.description}
      benefits={SAAS_STACK_SECTION.benefits}
      groups={SAAS_STACK_GROUPS}
      footerNote={SAAS_STACK_SECTION.footerNote}
    />
  );
}
