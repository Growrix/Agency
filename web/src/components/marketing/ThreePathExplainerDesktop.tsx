import { CheckIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { HomeDesktopSectionRail } from "@/components/marketing/desktop/HomeDesktopSectionRail";
import { HomeDesktopSplitSection } from "@/components/marketing/desktop/HomeDesktopSplitSection";
import { Reveal } from "@/components/motion/Motion";
import { HOME_THREE_PATH_CARDS, HOME_THREE_PATH_COPY } from "@/lib/home-conversion-content";
import { cn } from "@/lib/utils";

export function ThreePathExplainerDesktop() {
  return (
    <HomeDesktopSplitSection
      rail={
        <HomeDesktopSectionRail
          eyebrow={HOME_THREE_PATH_COPY.eyebrow}
          titleLead={HOME_THREE_PATH_COPY.titleLead}
          titleAccent={HOME_THREE_PATH_COPY.titleAccent}
          description={HOME_THREE_PATH_COPY.description}
        />
      }
      content={
        <Reveal>
          <div className="home-desktop-marketing__path-grid">
            {HOME_THREE_PATH_CARDS.map((card) => (
              <article
                key={card.title}
                className={cn(
                  "home-desktop-marketing__path-card",
                  "featured" in card && card.featured && "home-desktop-marketing__path-card--featured",
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
              </article>
            ))}
          </div>
        </Reveal>
      }
    />
  );
}
