import Link from 'next/link';
import type { HomePageContent, ServicesPageContent } from '@/lib/content/types';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { IconArrowRight } from '@/components/icons';

export function ServicesView({
  page,
  ctaBand,
  process,
}: {
  page: ServicesPageContent;
  ctaBand: HomePageContent['ctaBand'];
  process: HomePageContent['process'];
}) {
  return (
    <>
      <PageHero hero={page.hero} />
      {page.sections.map((section, idx) => (
        <section key={section.num} className="section" style={{ background: idx % 2 === 0 ? 'var(--bg)' : 'var(--surface)' }}>
          <div className="container">
            <div className="grid2" style={{ alignItems: 'center' }}>
              {section.imageFirst ? (
                <div className="reveal">
                  <div style={{ borderRadius: 'var(--rc)', overflow: 'hidden', height: 360 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.image} alt={section.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" width={1200} height={360} />
                  </div>
                </div>
              ) : null}
              <div className="reveal" data-d="100">
                <span className="eyebrow">{section.num}</span>
                <h2 className="h-display">{section.title}</h2>
                <p className="h-sub">{section.lede}</p>
                <Link href="/contact" className="btn btn-p" style={{ marginTop: 28 }}>
                  Get a quote <IconArrowRight size={16} />
                </Link>
              </div>
              {!section.imageFirst ? (
                <div className="reveal">
                  <div style={{ borderRadius: 'var(--rc)', overflow: 'hidden', height: 360 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={section.image} alt={section.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" width={1200} height={360} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ))}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="reveal">
            <span className="eyebrow">{process.eyebrow}</span>
            <h2 className="h-display">{process.title}</h2>
          </div>
          <div style={{ marginTop: 48, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 33, height: 1, background: 'var(--border)' }} aria-hidden />
            <div className="process-grid">
              {process.steps.map((step, i) => (
                <div key={step.num} className="reveal" data-d={String(Math.min(i * 80, 400))}>
                  <div className="p-num">{step.num}</div>
                  <div className="p-title">{step.title}</div>
                  <div className="p-desc">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBand {...ctaBand} />
    </>
  );
}
