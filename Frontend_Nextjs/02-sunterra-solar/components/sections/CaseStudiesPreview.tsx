import Link from 'next/link';
import type { BlogPost, CaseStudy, FaqItem, HomePageContent, Testimonial } from '@/lib/content/types';
import { IconStar } from '@/components/icons';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';

function MediaPlaceholder() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="media-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary-soft)" />
          <stop offset="100%" stopColor="rgb(14 165 233 / 0.25)" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#media-grad)" />
      <circle cx="160" cy="90" r="28" fill="var(--color-secondary)" opacity="0.35" />
      <path d="M148 90h24M160 78v24" stroke="var(--color-accent)" strokeWidth="3" />
    </svg>
  );
}

export function CaseStudiesPreview({
  head,
  items,
}: {
  head: HomePageContent['caseStudies'];
  items: CaseStudy[];
}) {
  const preview = items.slice(0, 3);
  return (
    <section className="section-pad section-surface">
      <Container>
        <Reveal>
          <SectionHead {...head} row link={head.link} />
        </Reveal>
        <div className="card-grid card-grid--3">
          {preview.map((c, i) => (
            <Reveal key={c.id} delay={(i + 1) as 1 | 2 | 3}>
              <article className="cstudy">
                <div className="cstudy__media">
                  <MediaPlaceholder />
                </div>
                <div className="cstudy__body">
                  <p className="cstudy__meta">{c.loc}</p>
                  <h3 className="cstudy__title">
                    <Link href={`/case-studies/${c.id}`}>{c.title}</Link>
                  </h3>
                  <div className="cstudy__stats">
                    <span className="cstudy__stat">{c.size}</span>
                    <span className="cstudy__stat">{c.save}</span>
                  </div>
                  <p className="text-sm text-text-muted">{c.sum}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Testimonials({
  head,
  items,
}: {
  head: HomePageContent['testimonials'];
  items: Testimonial[];
}) {
  return (
    <section className="section-pad">
      <Container>
        <Reveal>
          <SectionHead eyebrow={head.eyebrow} title={head.title} center />
        </Reveal>
        <div className="card-grid card-grid--3">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={(i + 1) as 1 | 2 | 3}>
              <figure className="quote-card">
                <div className="quote-card__stars" aria-label={`${t.stars} stars`}>
                  {Array.from({ length: t.stars }, (_, j) => (
                    <IconStar key={j} size={16} />
                  ))}
                </div>
                <blockquote className="quote-card__text">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="quote-card__person">
                  {t.name}
                  <span className="quote-card__role">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function BlogPreview({ head, posts }: { head: HomePageContent['blog']; posts: BlogPost[] }) {
  const preview = posts.slice(0, 3);
  return (
    <section className="section-pad">
      <Container>
        <Reveal>
          <SectionHead {...head} row link={head.link} />
        </Reveal>
        <div className="card-grid card-grid--3">
          {preview.map((p, i) => (
            <Reveal key={p.id} delay={(i + 1) as 1 | 2 | 3}>
              <article className="bcard">
                <div className="bcard__media">
                  <MediaPlaceholder />
                </div>
                <div className="bcard__body">
                  <p className="bcard__meta">
                    {p.date} · {p.read}
                  </p>
                  <h3 className="bcard__title">
                    <Link href={`/blog/${p.id}`}>{p.title}</Link>
                  </h3>
                  <p className="bcard__excerpt">{p.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FaqPreview({
  head,
  items,
}: {
  head: HomePageContent['faqPreview'];
  items: FaqItem[];
}) {
  const preview = items.slice(0, 5);
  return (
    <section className="section-pad section-surface">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHead eyebrow={head.eyebrow} title={head.title} center />
        </Reveal>
        <Reveal delay={1}>
          <div className="faq">
            {preview.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p className="faq__answer">{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href={head.cta.href} className="btn btn--secondary">
              {head.cta.label}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
