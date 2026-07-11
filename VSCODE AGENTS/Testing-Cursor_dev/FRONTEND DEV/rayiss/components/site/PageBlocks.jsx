import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function PageHero({ eyebrow, title, highlight, description, ctaHref = '/contact', ctaLabel = 'Get a free quote' }) {
  return (
    <section className="relative overflow-hidden" style={{ background: '#0A0A0A', color: '#fff', padding: '84px 0' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-24%',
          right: '-14%',
          width: 720,
          height: 720,
          background: 'radial-gradient(circle, rgba(255,91,31,0.24) 0%, transparent 65%)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="eyebrow mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {eyebrow}
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(40px, 7vw, 92px)', fontWeight: 700, maxWidth: '14ch', lineHeight: 0.95 }}>
          {title}
          {highlight ? (
            <>
              {' '}
              <span className="serif-i" style={{ color: '#FF5B1F', fontWeight: 400 }}>
                {highlight}
              </span>
            </>
          ) : null}
        </h1>
        <p style={{ marginTop: 24, maxWidth: '54ch', lineHeight: 1.6, color: 'rgba(255,255,255,0.72)', fontSize: 17 }}>{description}</p>
        <div style={{ marginTop: 34 }}>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full text-white text-sm font-medium"
            style={{ background: '#FF5B1F', padding: '14px 22px' }}
          >
            {ctaLabel} <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SectionWrap({ eyebrow, title, description, children }) {
  return (
    <section style={{ padding: '88px 0', borderTop: '1px solid rgba(10,10,10,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-4" style={{ color: '#FF5B1F' }}>
              {eyebrow}
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(34px, 4.5vw, 56px)', fontWeight: 600, lineHeight: 1 }}>
              {title}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p style={{ color: '#4A4A45', lineHeight: 1.65, fontSize: 16 }}>{description}</p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

export function InfoCard({ title, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(10,10,10,0.08)', padding: 26 }}>
      <h3 className="display" style={{ fontSize: 30, fontWeight: 600, marginBottom: 12 }}>
        {title}
      </h3>
      <div style={{ color: '#4A4A45', lineHeight: 1.65, fontSize: 15 }}>{children}</div>
    </div>
  );
}

export function CtaStrip({ title, description, href = '/contact', label = 'Talk to Rayiss' }) {
  return (
    <section style={{ padding: '72px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className="grain"
          style={{
            borderRadius: 26,
            background: '#FF5B1F',
            color: '#fff',
            padding: '44px 36px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center relative">
            <div className="lg:col-span-8">
              <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 700, lineHeight: 1 }}>
                {title}
              </h2>
              <p style={{ marginTop: 14, color: 'rgba(255,255,255,0.84)', fontSize: 16, lineHeight: 1.6 }}>{description}</p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Link
                href={href}
                className="inline-flex items-center gap-2 rounded-full text-white text-sm font-medium"
                style={{ background: '#0A0A0A', padding: '14px 22px' }}
              >
                {label} <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
