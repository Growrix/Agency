import { CheckIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { CTABand } from "@/components/sections/CTABand";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import type { SolutionAudience } from "@/lib/product-led-content";

export function SolutionsLanding({ solution }: { solution: SolutionAudience }) {
  return (
    <>
      <Section className="pt-12 sm:pt-16 lg:pt-20">
        <Container width="shell">
          <div className="mx-auto max-w-3xl text-center">
            <Badge tone="primary">{solution.eyebrow}</Badge>
            <h1 className="mt-5 font-display text-4xl tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {solution.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-text-muted text-pretty">
              {solution.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <LinkButton href={solution.primaryCta.href} size="lg">
                {solution.primaryCta.label}
              </LinkButton>
              <LinkButton href={solution.secondaryCta.href} variant="outline" size="lg">
                {solution.secondaryCta.label}
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="inset">
        <Container>
          <SectionHeading eyebrow="Pain points" title="Built for the problems you are solving now." />
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {solution.pains.map((pain) => (
              <li key={pain} className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-4 text-sm leading-6">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {pain}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Recommended offers" title="Start with products, upgrade to services when ready." />
          <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.08}>
            {solution.offers.map((offer) => (
              <RevealItem key={offer.title} className="h-full">
                <Card hoverable className="flex h-full flex-col">
                  <h3 className="font-display text-xl tracking-tight">{offer.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-text-muted">{offer.description}</p>
                  <LinkButton href={offer.href} variant="outline" size="sm" className="mt-6 w-fit">
                    Explore
                  </LinkButton>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CTABand
        eyebrow="Next step"
        title="Pick a product path or talk to the team."
        description="Every solutions page should end in a concrete action — browse the catalog, request setup, or book a discovery call."
        primary={solution.primaryCta}
        secondary={solution.secondaryCta}
      />
    </>
  );
}
