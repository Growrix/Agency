import Link from 'next/link';
import type { ContactFormContent, GenericPageContent } from '@/lib/content/types';
import { IconArrowRight, IconCheck } from '@/components/icons';
import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';

interface BuyViewProps {
  page: GenericPageContent;
  formContent: ContactFormContent;
}

export function BuyView({ page, formContent }: BuyViewProps) {
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
              <ConsultationForm formContent={formContent} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
