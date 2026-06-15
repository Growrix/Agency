import Link from 'next/link';
import type { AboutPageContent, HomePageContent } from '@/lib/content/types';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { StatCounter } from '@/components/sections/StatCounter';
import { IconArrowRight, IconArrowUpRight } from '@/components/icons';

export function AboutView({ page, ctaBand }: { page: AboutPageContent; ctaBand: HomePageContent['ctaBand'] }) {
  return (
    <>
      <PageHero hero={page.hero} />
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="grid2">
            <div className="reveal">
              <span className="eyebrow">{page.intro.eyebrow}</span>
              <h2 className="h-display">{page.intro.title}</h2>
              {page.intro.paragraphs.map((p) => (
                <p key={p.slice(0, 30)} className="h-sub" style={{ marginTop: page.intro.paragraphs.indexOf(p) > 0 ? 16 : undefined }}>{p}</p>
              ))}
              <Link href={page.intro.cta.href} className="btn btn-p" style={{ marginTop: 32 }}>
                {page.intro.cta.label} <IconArrowRight size={16} />
              </Link>
            </div>
            <div className="reveal" data-d="100" style={{ display: 'grid', gap: 16 }}>
              {page.intro.stats.map((s) => (
                <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--rc)', padding: 28 }}>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 52, color: 'var(--accent)', letterSpacing: '-.03em' }}>
                    <StatCounter counter={s.counter} />
                    {s.suffix ?? ''}
                  </div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 8 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <span className="eyebrow">{page.foundation.eyebrow}</span>
            <h2 className="h-display" style={{ textAlign: 'center', maxWidth: 'none' }}>{page.foundation.title}</h2>
          </div>
          <div className="grid3" style={{ marginTop: 48 }}>
            {page.foundation.cards.map((card, i) => (
              <div key={card.title} className="reveal" data-d={String(i * 100)}>
                <div className="card" style={{ padding: 32, background: 'var(--bg)' }}>
                  <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 24, color: 'var(--text)' }}>{card.title}</h3>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginTop: 12, fontSize: 16 }}>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" id="leadership" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span className="eyebrow">{page.leadership.eyebrow}</span>
              <h2 className="h-display">{page.leadership.title}</h2>
            </div>
            <Link href={page.leadership.cta.href} className="btn btn-s">
              {page.leadership.cta.label} <IconArrowUpRight size={16} />
            </Link>
          </div>
          <div className="grid4" style={{ marginTop: 44 }}>
            {page.leadership.team.map((member, i) => (
              <div key={member.name} className="reveal" data-d={String((i % 4) * 80)}>
                <div className="team-card">
                  <div className="team-av"><span className="team-ini">{member.initials}</span></div>
                  <div className="team-info">
                    <div className="team-name">{member.name}</div>
                    <div className="team-role">{member.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-sm" id="safety" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <span className="eyebrow">{page.awards.eyebrow}</span>
            <h2 className="h-display" style={{ textAlign: 'center', maxWidth: 'none' }}>{page.awards.title}</h2>
            <p className="h-sub" style={{ textAlign: 'center', marginInline: 'auto' }}>{page.awards.lede}</p>
          </div>
          <div className="awards-grid" style={{ marginTop: 44 }}>
            {page.awards.items.map((item, i) => (
              <div key={item} className="reveal" data-d={String((i % 3) * 80)}>
                <div className="award-item">
                  <span style={{ fontFamily: 'var(--fb)', fontWeight: 600, fontSize: 14.5, color: 'var(--text)' }}>{item}</span>
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
