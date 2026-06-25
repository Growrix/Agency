import { ProcessStepsMobile } from "@/components/marketing/ProcessStepsMobile";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Audit",
    description:
      "We review the current state of your site's technical setup—crawlability, tracking gaps, meta coverage, and performance baseline.",
  },
  {
    number: "02",
    title: "Configuration",
    description:
      "We implement the missing or broken settings: indexing, analytics events, schema, sitemap, and performance fixes.",
  },
  {
    number: "03",
    title: "Verification",
    description:
      "We confirm that indexing is active, tracking events fire correctly, and performance metrics have improved before wrapping up.",
  },
  {
    number: "04",
    title: "Handoff",
    description:
      "Full documentation so you own and understand every setting. No black boxes—you stay in control after we're done.",
  },
] as const;

export function AdditionalServicesProcessMobile() {
  return (
    <ProcessStepsMobile
      eyebrow="How we do it"
      titleLead="Four steps from"
      titleAccent="audit to handoff."
      description="No guesswork, no black boxes. Every configuration is audited, implemented, verified, and handed over with documentation you own."
      steps={[...PROCESS_STEPS]}
    />
  );
}
