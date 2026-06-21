import { CheckIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/motion/Motion";
import { HOME_THREE_PATH_CARDS, HOME_THREE_PATH_COPY } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { HERO_TITLE_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function ThreePathExplainer() {
  const shell = homeSection("three-path");

  return (
    <Section {...shell}>
      <Container>
        <SectionHeading
          eyebrow={HOME_THREE_PATH_COPY.eyebrow}
          title={HOME_THREE_PATH_COPY.title}
          description={HOME_THREE_PATH_COPY.description}
          titleClassName={HERO_TITLE_CLASS}
        />
        <Reveal className="mt-8 sm:mt-10">
          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_THREE_PATH_CARDS.map((card) => (
              <Card
                key={card.title}
                className={cn(
                  "flex h-full flex-col",
                  "featured" in card && card.featured && "border-primary/40 ring-1 ring-primary/20",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl tracking-tight">{card.title}</h3>
                  {"featured" in card && card.featured ? <Badge tone="primary">Recommended</Badge> : null}
                </div>
                <p className="mt-3 text-sm leading-6 text-text-muted">{card.description}</p>
                <ul className="mt-5 flex-1 space-y-2">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-text-muted">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <LinkButton
                  href={card.cta.href}
                  className="mt-6 w-full"
                  variant={"featured" in card && card.featured ? "primary" : "outline"}
                >
                  {card.cta.label}
                </LinkButton>
              </Card>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
