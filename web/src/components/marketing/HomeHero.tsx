import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ConciergeTriggerButton } from "@/components/ai/ConciergeTrigger";
import { HeroTrustStrip } from "@/components/marketing/HeroTrustStrip";
import { HomeHeroVisual, type HomeHeroVisualProps } from "@/components/marketing/HomeHeroVisual";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Container, Section } from "@/components/primitives/Container";
import { HOME_HERO_COPY } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { WHATSAPP_HREF } from "@/lib/nav";
import { HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";

type HomeHeroProps = {
  badge?: string;
  title?: string;
  description?: string;
  visual?: HomeHeroVisualProps;
};

export function HomeHero({
  badge = HOME_HERO_COPY.badge,
  title = HOME_HERO_COPY.title,
  description = HOME_HERO_COPY.description,
  visual,
}: HomeHeroProps) {
  return (
    <Section {...homeSection("hero")} className="hero-section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
      <div
        className="hero-glow signal-drift-1 pointer-events-none absolute left-[12%] top-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="hero-glow signal-drift-2 pointer-events-none absolute bottom-8 right-[8%] h-44 w-44 rounded-full bg-secondary/15 blur-3xl"
        aria-hidden
      />

      <Container width="shell" className={HERO_VIEWPORT_CONTAINER_CLASS}>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="signal-rise" style={{ animationDelay: "0ms" }}>
              <Badge tone="primary" dot>
                {badge}
              </Badge>
            </div>

            <h1
              className="signal-rise mt-5 max-w-xl font-display text-3xl leading-[1.06] tracking-tight text-balance sm:text-4xl lg:text-5xl"
              style={{ animationDelay: "80ms" }}
            >
              {title}
            </h1>

            <p
              className="signal-rise mt-5 max-w-lg text-base leading-7 text-pretty text-text-muted sm:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              {description}
            </p>

            <div
              className="signal-rise mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "240ms" }}
            >
              <LinkButton href="/digital-products" size="lg">
                {HOME_HERO_COPY.primaryCta}
                <ArrowRightIcon className="size-4" />
              </LinkButton>
              <LinkButton href="/book-appointment" variant="outline" size="lg">
                {HOME_HERO_COPY.secondaryCta}
              </LinkButton>
            </div>

            <div
              className="signal-rise mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
              style={{ animationDelay: "300ms" }}
            >
              <Link href="/contact" className="font-medium text-text-muted transition-colors hover:text-primary">
                Need custom work?
              </Link>
              <span className="hidden text-border sm:inline" aria-hidden>
                ·
              </span>
              <Link
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-text-muted transition-colors hover:text-primary"
              >
                Chat on WhatsApp
              </Link>
              <span className="hidden text-border sm:inline" aria-hidden>
                ·
              </span>
              <ConciergeTriggerButton
                variant="ghost"
                size="sm"
                prompt="I need help choosing between a product purchase and a done-for-you custom build."
              >
                Ask AI Assistant
              </ConciergeTriggerButton>
            </div>

            <div className="signal-rise mt-8" style={{ animationDelay: "360ms" }}>
              <HeroTrustStrip className="justify-start" />
            </div>

            <p
              className="signal-rise mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted sm:text-xs"
              style={{ animationDelay: "420ms" }}
            >
              {HOME_HERO_COPY.stackLabel}{" "}
              {HOME_HERO_COPY.stackItems.join(" · ")}
            </p>
          </div>

          <div className="lg:col-span-6 xl:col-span-5">
            <HomeHeroVisual {...visual} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
