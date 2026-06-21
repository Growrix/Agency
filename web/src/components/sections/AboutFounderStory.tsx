import Image from "next/image";
import { Card } from "@/components/primitives/Card";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { ABOUT_FOUNDER_SECTION } from "@/lib/about-landing-content";
import { ABOUT_IMAGES } from "@/lib/site-images";

export function AboutFounderStory() {
  const { founder, timeline } = ABOUT_FOUNDER_SECTION;

  return (
    <div className="mt-10 space-y-8 lg:space-y-10">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 lg:items-stretch">
        <div className="flex min-w-0 lg:col-span-5">
          <Card className="relative flex w-full overflow-hidden rounded-lg p-0">
            <div className="relative aspect-4/5 w-full lg:aspect-auto lg:h-full lg:min-h-[22rem]">
              <Image
                src={ABOUT_IMAGES.founder.src}
                alt={`${founder.name}, Founder of GrowrixOS`}
                fill
                sizes="(min-width: 1024px) 28vw, 100vw"
                className="object-cover object-center"
                priority={false}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent lg:from-black/20" aria-hidden />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white lg:hidden">
                <p className="font-display text-lg tracking-tight">{founder.name}</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80">{founder.role}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex min-w-0 lg:col-span-7">
          <Card className="flex w-full flex-col justify-center p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">Founder</p>
            <h3 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">{founder.name}</h3>
            <p className="mt-1 text-sm font-medium text-text-muted">{founder.role}</p>
            <p className="mt-5 text-base leading-7 text-text-muted text-pretty sm:text-[17px] sm:leading-8">
              {founder.intro}
            </p>
          </Card>
        </div>
      </div>

      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">The path to GrowrixOS</p>
        <RevealGroup as="ol" className="mt-4 grid gap-4 lg:grid-cols-3" stagger={0.07} aria-label="Founder timeline">
          {timeline.map((step, index) => (
            <RevealItem as="li" key={step.title} className="relative h-full min-w-0 list-none">
              {index < timeline.length - 1 ? (
                <span
                  className="pointer-events-none absolute top-9 right-0 hidden h-px w-4 translate-x-full bg-border lg:block"
                  aria-hidden
                />
              ) : null}
              <Card hoverable className="flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-surface font-mono text-xs text-primary"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">{step.eyebrow}</p>
                </div>
                <h4 className="mt-4 font-display text-lg leading-snug tracking-tight sm:text-xl">{step.title}</h4>
                <p className="mt-3 flex-1 text-sm leading-6 text-text-muted text-pretty">{step.description}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}
