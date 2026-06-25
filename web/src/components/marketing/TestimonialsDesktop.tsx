import { StarIcon } from "@heroicons/react/24/solid";
import { HomeDesktopSectionRail } from "@/components/marketing/desktop/HomeDesktopSectionRail";
import { HomeDesktopSplitSection } from "@/components/marketing/desktop/HomeDesktopSplitSection";
import { Reveal } from "@/components/motion/Motion";
import { HOME_TESTIMONIALS_COPY } from "@/lib/home-conversion-content";
import { TESTIMONIALS } from "@/lib/content";

export function TestimonialsDesktop() {
  const [featured, ...supporting] = TESTIMONIALS;

  return (
    <HomeDesktopSplitSection
      rail={
        <HomeDesktopSectionRail
          eyebrow={HOME_TESTIMONIALS_COPY.eyebrow}
          titleLead={HOME_TESTIMONIALS_COPY.titleLead}
          titleAccent={HOME_TESTIMONIALS_COPY.titleAccent}
          description={HOME_TESTIMONIALS_COPY.description}
        />
      }
      content={
        <Reveal>
          <div className="home-desktop-marketing__testimonial-grid">
            {featured ? (
              <article className="home-desktop-marketing__testimonial-featured">
                <div className="mb-4 flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon key={index} className="size-4 text-primary" aria-hidden />
                  ))}
                </div>
                <p className="flex-1 text-lg leading-8 text-pretty">&ldquo;{featured.quote}&rdquo;</p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-medium text-text">{featured.author}</p>
                  <p className="text-sm text-text-muted">{featured.role}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-primary">{featured.metric}</p>
                </div>
              </article>
            ) : null}
            {supporting.map((item) => (
              <article key={item.author} className="home-desktop-marketing__testimonial-card">
                <p className="flex-1 text-sm leading-7 text-pretty">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-5 border-t border-border pt-3">
                  <p className="font-medium text-text">{item.author}</p>
                  <p className="text-sm text-text-muted">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      }
    />
  );
}
