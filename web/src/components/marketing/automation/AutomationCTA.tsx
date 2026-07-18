import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Container, Section } from "@/components/primitives/Container";
import { MarketingAccentTitle } from "@/components/marketing/MarketingAccentTitle";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { ProductLedFinalCTAMobile } from "@/components/marketing/ProductLedFinalCTAMobile";
import { AUTOMATION_SERVICE_CTA } from "@/lib/automation-service-content";
import { cn } from "@/lib/utils";
import styles from "./AutomationPage.module.css";

function AutomationCTADesktop() {
  return (
    <Section size="compact" layout="content" spacing="default">
      <Container>
        <div className={styles.ctaBand}>
          <h2
            className={cn(
              "font-display text-3xl sm:text-4xl leading-[1.08] tracking-tight text-balance",
              styles.ctaTitleAccent,
            )}
          >
            <MarketingAccentTitle
              lead={AUTOMATION_SERVICE_CTA.titleLead}
              accent={AUTOMATION_SERVICE_CTA.titleAccent}
            />
          </h2>
          <p className="mt-5 text-lg leading-7 text-contrast-muted text-pretty">
            {AUTOMATION_SERVICE_CTA.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={AUTOMATION_SERVICE_CTA.primaryHref} variant="primary" size="lg">
              {AUTOMATION_SERVICE_CTA.primaryLabel}
              <ArrowRightIcon className="size-4" />
            </LinkButton>
            <LinkButton href={AUTOMATION_SERVICE_CTA.secondaryHref} variant="outline" size="lg">
              {AUTOMATION_SERVICE_CTA.secondaryLabel}
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function AutomationCTA() {
  return (
    <MarketingViewportGate
      mobile={
        <ProductLedFinalCTAMobile
          eyebrow="Next step"
          titleLead={AUTOMATION_SERVICE_CTA.titleLead}
          titleAccent={AUTOMATION_SERVICE_CTA.titleAccent}
          description={AUTOMATION_SERVICE_CTA.description}
          primaryLabel={AUTOMATION_SERVICE_CTA.primaryLabel}
          primaryHref={AUTOMATION_SERVICE_CTA.primaryHref}
          secondaryLabel={AUTOMATION_SERVICE_CTA.secondaryLabel}
          secondaryHref={AUTOMATION_SERVICE_CTA.secondaryHref}
        />
      }
      desktop={<AutomationCTADesktop />}
    />
  );
}
