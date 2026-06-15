'use client';

import type { HomePageContent, StatItem } from '@/lib/content/types';
import { useCounter } from '@/hooks/useCounters';
import { IconCheck } from '@/components/icons';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

export function Stats({ items }: { items: StatItem[] }) {
  return (
    <section className="stats">
      <Container>
        <div className="stats__grid">
          {items.map((stat, i) => (
            <Reveal key={stat.label} delay={(i % 3) as 1 | 2 | 3}>
              <StatCounter stat={stat} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StatCounter({ stat }: { stat: StatItem }) {
  const ref = useCounter(stat.counter);

  if (stat.counter !== undefined) {
    return (
      <div>
        <p className="stats__value">
          <span ref={ref}>0</span>
          {stat.suffix ?? ''}
        </p>
        <p className="stats__label">{stat.label}</p>
      </div>
    );
  }

  return (
    <div>
      <p className="stats__value">{stat.value}</p>
      <p className="stats__label">{stat.label}</p>
    </div>
  );
}

function PartnerBadge({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 120 40" width="120" height="40" aria-hidden className="opacity-70">
      <rect x="1" y="1" width="118" height="38" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="8" fill="var(--color-secondary)" opacity="0.3" />
      <text x="36" y="24" fill="currentColor" fontSize="11" fontWeight="700">
        {name.length > 14 ? `${name.slice(0, 12)}…` : name}
      </text>
    </svg>
  );
}

export function Partners({ content }: { content: HomePageContent['partners'] }) {
  return (
    <section className="section-pad section-surface">
      <Container>
        <Reveal>
          <h2 className="section-head__title text-center">{content.title}</h2>
        </Reveal>
        <div className="brands mt-8">
          {content.items.map((p) => (
            <Reveal key={p.name}>
              <div className="brands__item" aria-label={`${p.name} partner`}>
                <PartnerBadge name={p.name} />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Finance({ content }: { content: HomePageContent['finance'] }) {
  return (
    <section className="section-pad">
      <Container className="split">
        <Reveal>
          <p className="section-head__eyebrow">{content.eyebrow}</p>
          <h2 className="section-head__title">{content.title}</h2>
          <p className="section-head__lede">{content.lede}</p>
          <ul className="feature-list mt-4">
            {content.features.map((f) => (
              <li key={f}>
                <IconCheck size={18} />
                {f}
              </li>
            ))}
          </ul>
          <a href={content.cta.href} className="btn btn--accent mt-6">
            {content.cta.label}
          </a>
        </Reveal>
        <Reveal delay={1}>
          <div className="finance-card">
            <p className="finance-card__rate">{content.cardTitle}</p>
            <p className="mt-2 text-sm text-text-muted">{content.cardText}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function ServiceAreas({ content }: { content: HomePageContent['serviceAreas'] }) {
  return (
    <section className="section-pad section-surface">
      <Container>
        <Reveal>
          <h2 className="section-head__title text-center">{content.title}</h2>
        </Reveal>
        <div className="areas mt-8">
          {content.areas.map((a) => (
            <Reveal key={a.state}>
              <div className="areas__item">
                <p className="areas__state">{a.state}</p>
                <p className="areas__dns">{a.dnsps}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CtaBand({ content }: { content: HomePageContent['ctaBand'] }) {
  return (
    <section className="cta-band">
      <Container>
        <h2 className="cta-band__title">{content.title}</h2>
        <p className="cta-band__lede">{content.lede}</p>
        <div className="cta-band__actions">
          {content.actions.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className={`btn ${a.href.startsWith('tel:') ? 'btn--inverse' : 'btn--accent'}`}
            >
              {a.label}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
