'use client';

import type { Testimonial } from '@/lib/content/types';
import { useTestimonials } from '@/hooks/useTestimonials';
import { IconChevLeft, IconChevRight, IconQuote, IconStar } from '@/components/icons';

export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const { current, prev, next } = useTestimonials(items);

  return (
    <div className="testi-wrap reveal" data-d="100">
      <div style={{ color: 'var(--accent)', opacity: 0.5, display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <IconQuote size={36} />
      </div>
      <blockquote className="testi-q">&ldquo;{current.quote}&rdquo;</blockquote>
      <div className="testi-stars">
        {Array.from({ length: current.stars }).map((_, i) => (
          <IconStar key={i} size={17} />
        ))}
      </div>
      <div className="testi-name">{current.name}</div>
      <div className="testi-role">{current.role}</div>
      <div className="testi-ctrls">
        <button type="button" className="testi-btn" aria-label="Previous testimonial" onClick={prev}>
          <IconChevLeft size={18} />
        </button>
        <button type="button" className="testi-btn" aria-label="Next testimonial" onClick={next}>
          <IconChevRight size={18} />
        </button>
      </div>
    </div>
  );
}
