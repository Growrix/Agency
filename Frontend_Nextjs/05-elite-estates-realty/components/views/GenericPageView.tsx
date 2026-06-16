import Link from 'next/link';
import type { ReactNode } from 'react';
import type { GenericPageContent } from '@/lib/content/types';
import { IconArrowRight, IconCheck } from '@/components/icons';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site.config';

interface GenericPageViewProps {
  page: GenericPageContent;
  children?: ReactNode;
}

export function GenericPageView({ page, children }: GenericPageViewProps) {
  const fallbackCard = page.section.fallbackCard ?? {
    title: siteConfig.labels.genericFallbackCardTitle,
    text: siteConfig.labels.genericFallbackCardText,
  };

  return (
    <>
      <PageHero hero={page.hero} />

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="grid2">
            <Reveal>
              <span className="eyebrow">{page.section.eyebrow}</span>
              <h2 className="h-d">{page.section.title}</h2>
              <p className="h-sub">{page.section.lede}</p>

              {page.section.bullets?.length ? (
                <div style={{ display: 'grid', gap: '10px', marginTop: '22px' }}>
                  {page.section.bullets.map((bullet) => (
                    <div key={bullet} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '15px' }}>
                      <span style={{ color: 'var(--emerald)', flexShrink: 0 }}>
                        <IconCheck width={15} height={15} />
                      </span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              {page.cta ? (
                <Link href={page.cta.href} className={`btn ${page.cta.accent ? 'btn-gold' : 'btn-outline'} btn-lg`} style={{ marginTop: '28px' }}>
                  {page.cta.label}
                  <IconArrowRight width={16} height={16} />
                </Link>
              ) : null}
            </Reveal>

            <Reveal delayMs={100}>
              {page.section.stats?.length ? (
                <div className="grid2" style={{ gap: '14px' }}>
                  {page.section.stats.map((stat) => (
                    <div key={stat.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--rc)', padding: '22px' }}>
                      <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '36px', color: 'var(--gold)' }}>{stat.value}</div>
                      <div style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--muted)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--rc)', padding: '28px' }}>
                  <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.25rem' }}>{fallbackCard.title}</h3>
                  <p style={{ marginTop: '10px', color: 'var(--muted)', lineHeight: 1.7 }}>{fallbackCard.text}</p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {children}
    </>
  );
}
