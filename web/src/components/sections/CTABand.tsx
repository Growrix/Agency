import type { ReactNode } from "react";
import { LinkButton } from "@/components/primitives/Button";
import { Container, Section } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/SectionHeading";

export function CTABand({
  eyebrow = "Next step",
  title,
  description,
  primary,
  secondary,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  children?: ReactNode;
}) {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[#101316] px-8 py-14 sm:px-12 sm:py-16 text-[#f1ece1]">
          <div className="absolute inset-0 bg-grid-strong opacity-[0.06]" aria-hidden />
          <div
            className="absolute -top-32 -right-24 size-96 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-primary), transparent 60%)" }}
            aria-hidden
          />
          <div
            className="absolute -bottom-32 -left-24 size-96 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-secondary), transparent 60%)" }}
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <Eyebrow className="text-[var(--color-secondary)] mb-4">
              <span className="h-px w-6 bg-[var(--color-secondary)]/60" aria-hidden />
              {eyebrow}
            </Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="mt-5 text-lg leading-7 text-[#cdc4b3] text-pretty">{description}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={primary.href} variant="primary" size="lg">
                {primary.label}
              </LinkButton>
              {secondary && (
                <LinkButton
                  href={secondary.href}
                  variant="ghost"
                  size="lg"
                  className="text-[#f1ece1] border border-white/15 hover:bg-white/10"
                >
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
