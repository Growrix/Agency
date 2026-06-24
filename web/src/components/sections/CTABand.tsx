import type { ReactNode } from "react";
import { LinkButton } from "@/components/primitives/Button";
import { Container, Section, type SectionLayout, type SectionSize, type SectionSpacing } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/SectionHeading";
import { MarketingAccentTitle } from "@/components/marketing/MarketingAccentTitle";
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
}) {
  const resolvedTitle =
    titleLead && titleAccent ? (
      <MarketingAccentTitle lead={titleLead} accent={titleAccent} />
    ) : (
      title
    );

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
          <div className="relative max-w-2xl">
            <Eyebrow className="text-secondary mb-4">
              <span className="h-px w-6 bg-secondary/60" aria-hidden />
              {eyebrow}
            </Eyebrow>
            <h2 className={cn(titleClassName ?? DEFAULT_TITLE_CLASS)}>
              {resolvedTitle}
            </h2>
            {description && (
              <p className="mt-5 text-lg leading-7 text-contrast-muted text-pretty">{description}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={primary.href} variant="primary" size="lg">
                {primary.label}
              </LinkButton>
              {secondary && (
                <LinkButton href={secondary.href} variant="outline" size="lg">
                  {secondary.label}
                </LinkButton>
              )}
            </div>
            {children}
          </div>
        </div>
      </Container>
    </Section>
  );
}
