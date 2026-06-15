'use client';

import Link from 'next/link';
import type { HomePageContent, ServiceItem, ProjectItem, Testimonial, FaqItem } from '@/lib/content/types';
import { Hero } from '@/components/sections/Hero';
import { CtaBand } from '@/components/sections/CtaBand';
import { FaqList } from '@/components/sections/FaqList';
import { StatCounter } from '@/components/sections/StatCounter';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { IconArrowRight, IconArrowUpRight, IconCheck, ServiceIcon } from '@/components/icons';
import { IconMapPin } from '@/components/icons';

interface HomeSectionsProps {
  home: HomePageContent;
  services: ServiceItem[];
  projects: ProjectItem[];
  faq: FaqItem[];
  testimonials: Testimonial[];
}

export function HomeSections({ home, services, projects, faq, testimonials }: HomeSectionsProps) {
  return (
    <>
      <Hero hero={home.hero} />

      <div className="client-strip">
        <div className="container">
          <div className="cs-inner">
            <span style={{ fontFamily: 'var(--fm)', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--faint)' }}>
              {home.clientStrip.label}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px 40px', alignItems: 'center' }}>
              {home.clientStrip.clients.map((c) => (
                <span key={c} style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 17, color: 'var(--muted)', letterSpacing: '.04em' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="grid2">
            <div className="reveal">
              <span className="eyebrow">{home.overview.eyebrow}</span>
              <h2 className="h-display">{home.overview.title}</h2>
              <p className="h-sub">{home.overview.lede}</p>
              <Link href={home.overview.cta.href} className="btn btn-s" style={{ marginTop: 32 }}>
                {home.overview.cta.label} <IconArrowUpRight size={16} />
              </Link>
            </div>
            <div style={{ display: 'grid', gap: 16 }}>
              {home.overview.cards.map((card, i) => (
                <div key={card.title} className="reveal" data-d={String(i * 80)}>
                  <div className="card" style={{ padding: 24, display: 'flex', gap: 18, background: 'var(--surface)' }}>
                    <span style={{ fontFamily: 'var(--fm)', fontSize: 13, color: 'var(--accent-t)', paddingTop: 4 }}>{card.num}</span>
                    <div>
                      <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 22, color: 'var(--text)', margin: 0 }}>{card.title}</h3>
                      <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.6, margin: '8px 0 0' }}>{card.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="reveal">
            <span className="eyebrow">{home.servicesPreview.eyebrow}</span>
            <h2 className="h-display">{home.servicesPreview.title}</h2>
            <p className="h-sub">{home.servicesPreview.lede}</p>
          </div>
          <div className="grid3" style={{ marginTop: 48 }}>
            {services.map((s, i) => (
              <div key={s.id} className="reveal" data-d={String((i % 3) * 80)}>
                <Link href="/services" className="card" style={{ display: 'block', padding: 28, background: 'var(--bg)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ width: 52, height: 52, borderRadius: 13, background: 'var(--surface2)', color: 'var(--accent)', display: 'grid', placeItems: 'center', border: '1px solid var(--border)' }}>
                      <ServiceIcon icon={s.icon} size={24} />
                    </span>
                    <span style={{ fontFamily: 'var(--fm)', fontSize: 13, color: 'var(--faint)' }}>{s.num}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 22, color: 'var(--text)', margin: '22px 0 0' }}>{s.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 15.5, lineHeight: 1.6, margin: '10px 0 0' }}>{s.description}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--accent-t)', fontWeight: 600, fontSize: 14, marginTop: 20 }}>
                    Learn more <IconArrowRight size={16} />
                  </span>
                </Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href={home.servicesPreview.cta.href} className="btn btn-s">
              {home.servicesPreview.cta.label} <IconArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span className="eyebrow">{home.projectsPreview.eyebrow}</span>
              <h2 className="h-display">{home.projectsPreview.title}</h2>
            </div>
            <Link href={home.projectsPreview.cta.href} className="btn btn-s">
              {home.projectsPreview.cta.label} <IconArrowUpRight size={16} />
            </Link>
          </div>
          <div className="masonry reveal" data-d="100" style={{ marginTop: 44 }}>
            {projects.map((p) => (
              <Link key={p.id} href="/projects" className={`proj ${p.span2 ? 'span2' : ''}`}>
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-s">
        <div className="stats-glow" />
        <div className="container">
          <div className="stats-grid">
            {home.stats.map((s) => (
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

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="reveal">
            <span className="eyebrow">{home.process.eyebrow}</span>
            <h2 className="h-display">{home.process.title}</h2>
          </div>
          <div style={{ marginTop: 48, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 33, height: 1, background: 'var(--border)' }} aria-hidden />
            <div className="process-grid">
              {home.process.steps.map((step, i) => (
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

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <span className="eyebrow">{home.testimonials.eyebrow}</span>
            <h2 className="h-display" style={{ textAlign: 'center', maxWidth: 'none' }}>
              {home.testimonials.title}
            </h2>
          </div>
          <TestimonialsCarousel items={testimonials} />
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="grid2" style={{ alignItems: 'center' }}>
            <div className="reveal">
              <div style={{ position: 'relative', borderRadius: 'var(--rc)', overflow: 'hidden', minHeight: 380, background: 'linear-gradient(135deg,#0e2a1f,#0B0C0E)' }}>
                <div style={{ position: 'absolute', inset: 0, background: `url(${home.sustainability.image}) center/cover`, opacity: 0.55 }} aria-hidden />
                <div style={{ position: 'absolute', left: 24, bottom: 24, color: '#fff' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 40, marginTop: 8 }}>{home.sustainability.stat}</div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', opacity: 0.8 }}>{home.sustainability.statLabel}</div>
                </div>
              </div>
            </div>
            <div className="reveal" data-d="100">
              <span className="eyebrow">{home.sustainability.eyebrow}</span>
              <h2 className="h-display">{home.sustainability.title}</h2>
              <p className="h-sub">{home.sustainability.lede}</p>
              <ul className="sus-list">
                {home.sustainability.items.map((item) => (
                  <li key={item} className="sus-item">
                    <span className="sus-check">
                      <IconCheck size={14} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="grid2">
            <div className="reveal">
              <span className="eyebrow">{home.faqPreview.eyebrow}</span>
              <h2 className="h-display">{home.faqPreview.title}</h2>
              <p className="h-sub">{home.faqPreview.lede}</p>
              <Link href={home.faqPreview.cta.href} className="btn btn-p" style={{ marginTop: 32 }}>
                {home.faqPreview.cta.label} <IconArrowRight size={16} />
              </Link>
            </div>
            <div className="reveal" data-d="100">
              <FaqList items={faq} limit={3} />
            </div>
          </div>
        </div>
      </section>

      <CtaBand {...home.ctaBand} />
    </>
  );
}
