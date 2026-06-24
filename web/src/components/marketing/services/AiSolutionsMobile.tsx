import { MobileFeatureGrid } from "@/components/marketing/mobile/MobileFeatureGrid";
import { AI_SOLUTIONS_SECTION } from "@/lib/ai-business-systems-service-content";

export function AiSolutionsMobile() {
  return (
    <MobileFeatureGrid
      eyebrow={AI_SOLUTIONS_SECTION.eyebrow}
      title={AI_SOLUTIONS_SECTION.title}
      titleLead={AI_SOLUTIONS_SECTION.titleLead}
      titleAccent={AI_SOLUTIONS_SECTION.titleAccent}
      description={AI_SOLUTIONS_SECTION.description}
      items={AI_SOLUTIONS_SECTION.items}
    />
  );
}
