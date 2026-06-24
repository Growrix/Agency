import { Card } from "@/components/primitives/Card";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/motion/Motion";
import { HOME_TESTIMONIALS_COPY } from "@/lib/home-conversion-content";
import { TESTIMONIALS } from "@/lib/content";
import { HERO_TITLE_CLASS } from "@/lib/typography";

export function TestimonialsDesktop() {
  return (
    <>
      <SectionHeading
        eyebrow={HOME_TESTIMONIALS_COPY.eyebrow}
        title={HOME_TESTIMONIALS_COPY.title}
        titleLead={HOME_TESTIMONIALS_COPY.titleLead}
        titleAccent={HOME_TESTIMONIALS_COPY.titleAccent}
        description={HOME_TESTIMONIALS_COPY.description}
        align="center"
        titleClassName={HERO_TITLE_CLASS}
      />
      <Reveal className="mt-10">
        <div className="grid items-stretch gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <Card key={item.author} className="flex h-full flex-col">
              <p className="flex-1 text-base leading-7 text-pretty">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-medium text-text">{item.author}</p>
                <p className="text-sm text-text-muted">{item.role}</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-primary">{item.metric}</p>
              </div>
            </Card>
          ))}
        </div>
      </Reveal>
    </>
  );
}
