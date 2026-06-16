import Link from 'next/link';
import type { ContactFormContent, GenericPageContent, StatItem } from '@/lib/content/types';
import { IconArrowRight, IconCheck } from '@/components/icons';
import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site.config';

interface InvestmentViewProps {
  page: GenericPageContent;
  formContent: ContactFormContent;
}

function getMarketName(stat: StatItem): string {
  return stat.label.replace(/\s+(Gross|Prime|Residential|Growth)?\s*Yield$/i, '').trim();
}

export function InvestmentView({ page, formContent }: InvestmentViewProps) {
  return (
    <>
      <PageHero hero={page.hero} />
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          {page.section.stats?.length ? (
            <>
              <Reveal className="center">
                <span className="eyebrow" style={{ justifyContent: 'center' }}>
                  {siteConfig.labels.investmentReturnsEyebrow}
                </span>
                <h2 className="h-d center">{siteConfig.labels.investmentReturnsTitle}</h2>
              </Reveal>
              <div className="grid5" style={{ marginTop: '40px', gap: '16px' }}>
                {page.section.stats.map((stat, index) => (
                  <Reveal key={stat.label} delayMs={index * 70}>
                    <div className="investment-card">
                      <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '17px', marginBottom: '4px' }}>{getMarketName(stat)}</div>
                      <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '38px', color: 'var(--gold-t)' }}>{stat.value}</div>
                      <div style={{ opacity: 0.6, fontSize: '13px', marginTop: '4px' }}>{stat.label}</div>
                      <Link href="/investment" className="tap-target-inline" style={{ gap: '6px', color: 'var(--gold-t)', fontWeight: 600, fontSize: '13px', marginTop: '14px' }}>
                        {siteConfig.labels.investmentCardCta}
                        <IconArrowRight width={16} height={16} />
                      </Link>
                    </div>
                  </Reveal>
                ))}
              </div>
            </>
          ) : null}

          <div className="grid2" style={{ marginTop: page.section.stats?.length ? '56px' : '0', alignItems: 'start' }}>
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
              <ConsultationForm formContent={formContent} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
