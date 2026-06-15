import Link from 'next/link';
import type { HomePageContent, IndustriesPageContent } from '@/lib/content/types';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { StatCounter } from '@/components/sections/StatCounter';
import { IconArrowRight } from '@/components/icons';

export function IndustriesView({ page, ctaBand }: { page: IndustriesPageContent; ctaBand: HomePageContent['ctaBand'] }) {
  return (
    <>
      <PageHero hero={page.hero} />
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="grid3">
            {page.industries.map((ind, i) => (
              <div key={ind.title} className="reveal" data-d={String((i % 3) * 80)}>
                <div style={{ borderRadius: 'var(--rc)', overflow: 'hidden', height: 220, marginBottom: 20, position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ind.image} alt={ind.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" width={800} height={220} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))' }} aria-hidden />
                  <div style={{ position: 'absolute', bottom: 16, left: 16, fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 20, color: '#fff' }}>{ind.title}</div>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6 }}>{ind.description}</p>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--accent-t)', fontWeight: 600, fontSize: 14, marginTop: 14 }}>
                  Get in touch <IconArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="stats-s">
        <div className="stats-glow" />
        <div className="container">
          <div className="stats-grid">
            {page.stats.map((s) => (
              <div key={s.label} className="stat">
                <div className="stat-n">
                  <StatCounter counter={s.counter} suffix={s.suffix} />
                </div>
                <div className="stat-l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand {...ctaBand} />
    </>
  );
}
