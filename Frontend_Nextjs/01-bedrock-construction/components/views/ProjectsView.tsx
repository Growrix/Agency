import Link from 'next/link';
import type { HomePageContent, ProjectsPageContent } from '@/lib/content/types';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { IconArrowRight, IconMapPin } from '@/components/icons';

export function ProjectsView({ page, ctaBand }: { page: ProjectsPageContent; ctaBand: HomePageContent['ctaBand'] }) {
  return (
    <>
      <PageHero hero={page.hero} />
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="reveal">
            <span className="eyebrow">{page.gridHead.eyebrow}</span>
            <h2 className="h-display">{page.gridHead.title}</h2>
          </div>
          <div className="masonry reveal" data-d="100" style={{ marginTop: 44 }}>
            {page.projects.map((p) => (
              <div key={p.id} id={p.id} className={`proj ${p.span2 ? 'span2' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} loading="lazy" width={1200} height={800} />
                <div className="proj-ov" />
                <div className="proj-body">
                  <span className="proj-sector">{p.sector}</span>
                  <div>
                    <div className="proj-name">{p.name}</div>
                    <div className="proj-scope">{p.scope}</div>
                    <div className="proj-meta">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <IconMapPin size={12} /> {p.location}
                      </span>
                      <span>{p.year}</span>
                      <span className="proj-val">{p.value}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <span className="eyebrow">{page.featuredCaseStudy.eyebrow}</span>
            <h2 className="h-display" style={{ textAlign: 'center', maxWidth: 'none' }}>{page.featuredCaseStudy.title}</h2>
          </div>
          <div className="grid2" style={{ marginTop: 48, alignItems: 'center' }}>
            <div className="reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={page.featuredCaseStudy.image} alt={page.featuredCaseStudy.title} style={{ borderRadius: 'var(--rc)', width: '100%', height: 420, objectFit: 'cover' }} loading="lazy" width={1200} height={420} />
            </div>
            <div className="reveal" data-d="100">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                {page.featuredCaseStudy.stats.map((s) => (
                  <div key={s.label} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--rc)', padding: 20 }}>
                    <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 32, color: 'var(--accent)' }}>{s.value}</div>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 6 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.65 }}>{page.featuredCaseStudy.body}</p>
              <Link href={page.featuredCaseStudy.cta.href} className="btn btn-p" style={{ marginTop: 24 }}>
                {page.featuredCaseStudy.cta.label} <IconArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CtaBand {...ctaBand} />
    </>
  );
}
