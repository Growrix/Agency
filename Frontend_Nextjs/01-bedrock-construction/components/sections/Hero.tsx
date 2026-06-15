import Link from 'next/link';
import type { HomePageContent } from '@/lib/content/types';
import { IconArrowRight, IconArrowUpRight } from '@/components/icons';

export function Hero({ hero }: { hero: HomePageContent['hero'] }) {
  return (
    <section className="hero" id="top" style={{ minHeight: '92vh' }}>
      <div className="hero-bg" style={{ backgroundImage: `url(${hero.image})` }} />
      <div
        className="hero-ov"
        style={{
          background: 'linear-gradient(180deg,rgba(11,12,14,.55) 0%,rgba(11,12,14,.82) 60%,#0B0C0E 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)',
          backgroundSize: '56px 56px',
          opacity: 0.07,
        }}
        aria-hidden
      />
      <div className="container" style={{ paddingBlock: 'clamp(80px,12vw,160px)' }}>
        <div className="hero-grid">
          <div>
            <div className="reveal">
              <span className="eyebrow" style={{ color: 'var(--accent)' }}>
                {hero.eyebrow}
              </span>
            </div>
            <div className="reveal" data-d="80">
              <h1 className="hero-h1">
                {hero.title}
                <br />
                what <span style={{ color: 'var(--accent)' }}>{hero.titleHighlight}</span>
              </h1>
            </div>
            <div className="reveal" data-d="160">
              <p className="hero-sub">{hero.lede}</p>
            </div>
            <div className="hero-ctas reveal" data-d="240">
              {hero.ctas.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={`btn ${cta.variant === 'primary' ? 'btn-p btn-lg' : 'btn-g btn-lg'}`}
                >
                  {cta.label}
                  {cta.variant === 'primary' ? <IconArrowRight size={16} /> : <IconArrowUpRight size={16} />}
                </Link>
              ))}
            </div>
          </div>
          <div className="reveal" data-d="200">
            <div className="metric-grid">
              {hero.metrics.map((m) => (
                <div key={m.label} className="metric-card">
                  <div className="m-val">{m.value}</div>
                  <div className="m-lbl">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
