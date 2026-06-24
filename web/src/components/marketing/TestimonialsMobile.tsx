import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { HOME_TESTIMONIALS_COPY } from "@/lib/home-conversion-content";
import { TESTIMONIALS } from "@/lib/content";

export function TestimonialsMobile() {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={HOME_TESTIMONIALS_COPY.eyebrow}
        titleLead={HOME_TESTIMONIALS_COPY.titleLead}
        titleAccent={HOME_TESTIMONIALS_COPY.titleAccent}
        description={HOME_TESTIMONIALS_COPY.description}
      />

      <div className="home-mobile-marketing__stack">
        {TESTIMONIALS.map((item) => (
          <article key={item.author} className="home-mobile-marketing__testimonial-card">
            <span className="home-mobile-marketing__testimonial-quote-mark" aria-hidden>
              &ldquo;
            </span>
            <p className="home-mobile-marketing__testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
            <div>
              <p className="home-mobile-marketing__testimonial-author">{item.author}</p>
              <p className="home-mobile-marketing__testimonial-role">{item.role}</p>
              <p className="home-mobile-marketing__testimonial-metric">{item.metric}</p>
            </div>
          </article>
        ))}
      </div>

      <Link href="/portfolio" className="home-mobile-marketing__footer-link mx-auto">
        View all case studies <ArrowUpRightIcon className="size-3.5" aria-hidden />
      </Link>
    </div>
  );
}
