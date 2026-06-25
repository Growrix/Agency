import type { ReactNode } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Container, Section, type SectionLayout, type SectionSize, type SectionSpacing } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/SectionHeading";
import { MarketingAccentTitle } from "@/components/marketing/MarketingAccentTitle";
import { resolveMarketingTitle } from "@/lib/marketing-title";
import { HOME_FINAL_CTA_FEATURES } from "@/lib/home-conversion-content";
import { SECTION_TITLE_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";

const DEFAULT_TITLE_CLASS = SECTION_TITLE_CLASS;

export function CTABand({
  eyebrow = "Next step",
  title,
  titleLead,
  titleAccent,
  description,
  primary,
  secondary,
  children,
  titleClassName,
  size = "compact",
  layout = "content",
  spacing = "default",
  tone = "default",
  desktopLayout = "default",
  marketingFeatures,
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  titleLead?: string;
  titleAccent?: string;
  description?: ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  children?: ReactNode;
  titleClassName?: string;
  size?: SectionSize;
  layout?: SectionLayout;
  spacing?: SectionSpacing;
  tone?: "default" | "inset" | "dark";
  desktopLayout?: "default" | "marketing";
  marketingFeatures?: readonly { label: string; description: string }[];
}) {
  const resolved = resolveMarketingTitle({ title, titleLead, titleAccent });
  const resolvedTitle =
    resolved.kind === "accent" ? (
      <MarketingAccentTitle lead={resolved.titleLead} accent={resolved.titleAccent} />
    ) : (
      title
    );

  const isMarketingLayout = desktopLayout === "marketing";
  const resolvedMarketingFeatures =
    marketingFeatures === undefined ? HOME_FINAL_CTA_FEATURES : marketingFeatures;

  return (
    <Section size={size} layout={layout} spacing={spacing} tone={tone}>
      <Container>
        <div className="contrast-surface relative overflow-hidden rounded-lg border border-border bg-contrast px-8 py-14 text-contrast-text sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-grid-strong opacity-[0.06]" aria-hidden />
          <div
            className="signal-drift-1 absolute -top-32 -right-24 size-96 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-primary), transparent 60%)" }}
            aria-hidden
          />
          <div
            className="signal-drift-2 absolute -bottom-32 -left-24 size-96 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-secondary), transparent 60%)" }}
            aria-hidden
          />
          <div
            className={cn(
              "relative",
              isMarketingLayout ? "home-desktop-marketing__cta-slab" : "max-w-2xl",
            )}
          >
            <div>
              <Eyebrow className="text-secondary mb-4">
                <span className="h-px w-6 bg-secondary/60" aria-hidden />
                {eyebrow}
              </Eyebrow>
              <h2 className={cn(titleClassName ?? DEFAULT_TITLE_CLASS)}>
                {resolvedTitle}
              </h2>
              {description ? (
                <p className="mt-5 text-lg leading-7 text-contrast-muted text-pretty">{description}</p>
              ) : null}
              {isMarketingLayout && resolvedMarketingFeatures.length > 0 ? (
                <ul className="home-desktop-marketing__cta-checklist">
                  {resolvedMarketingFeatures.map((feature) => (
                    <li key={feature.label} className="home-desktop-marketing__cta-checklist-item">
                      <CheckIcon className="size-4 shrink-0 text-primary" aria-hidden />
                      <span>
                        <strong className="font-medium text-contrast-text">{feature.label}</strong>
                        {" — "}
                        {feature.description}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {!isMarketingLayout ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  <LinkButton href={primary.href} variant="primary" size="lg">
                    {primary.label}
                  </LinkButton>
                  {secondary ? (
                    <LinkButton href={secondary.href} variant="outline" size="lg">
                      {secondary.label}
                    </LinkButton>
                  ) : null}
                </div>
              ) : null}
              {children}
            </div>
            {isMarketingLayout ? (
              <div className="home-desktop-marketing__cta-actions">
                <LinkButton href={primary.href} variant="primary" size="lg" className="w-full">
                  {primary.label}
                </LinkButton>
                {secondary ? (
                  <LinkButton href={secondary.href} variant="outline" size="lg" className="w-full">
                    {secondary.label}
                  </LinkButton>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
