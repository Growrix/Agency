import Link from 'next/link';
import type { CareersPageContent, HomePageContent } from '@/lib/content/types';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { IconArrowRight, IconArrowUpRight, IconMapPin } from '@/components/icons';

export function CareersView({ page, ctaBand }: { page: CareersPageContent; ctaBand: HomePageContent['ctaBand'] }) {
  return (
    <>
      <PageHero hero={page.hero} />
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <span className="eyebrow">{page.culture.eyebrow}</span>
            <h2 className="h-display" style={{ textAlign: 'center', maxWidth: 'none' }}>{page.culture.title}</h2>
          </div>
          <div className="grid3" style={{ marginTop: 48 }}>
            {page.culture.benefits.map((b, i) => (
              <div key={b.title} className="reveal" data-d={String((i % 3) * 100)}>
                <div className="card" style={{ padding: 32, background: 'var(--surface)' }}>
                  <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 22, color: 'var(--text)' }}>{b.title}</h3>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginTop: 10 }}>{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span className="eyebrow">{page.openings.eyebrow}</span>
              <h2 className="h-display">{page.openings.title}</h2>
            </div>
            <Link href={page.openings.cta.href} className="btn btn-s">
              {page.openings.cta.label} <IconArrowUpRight size={16} />
            </Link>
          </div>
          <div style={{ marginTop: 44, display: 'grid', gap: 16 }}>
            {page.openings.jobs.map((job) => (
              <div key={job.title} className="reveal">
                <div className="card" style={{ padding: '24px 28px', background: 'var(--bg)', display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 20, color: 'var(--text)' }}>{job.title}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 6 }}>{job.excerpt}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                      <span style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text)', background: 'var(--surface2)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <IconMapPin size={12} /> {job.location}
                      </span>
                      <span style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text)', background: 'var(--surface2)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 999 }}>{job.sector}</span>
                      <span style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text)', background: 'var(--surface2)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 999 }}>{job.type}</span>
                    </div>
                  </div>
                  <Link href="/contact" className="btn btn-p">
                    Apply now <IconArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand {...ctaBand} />
    </>
  );
}
