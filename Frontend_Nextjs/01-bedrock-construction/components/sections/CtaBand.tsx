import Link from 'next/link';
import { IconArrowRight } from '@/components/icons';

interface CtaBandProps {
  title: string;
  lede: string;
  image: string;
  actions: { label: string; href: string; variant: string }[];
}

export function CtaBand({ title, lede, image, actions }: CtaBandProps) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#0B0C0E' }}>
      <div style={{ position: 'absolute', inset: 0, background: `url(${image}) center/cover`, opacity: 0.35 }} aria-hidden />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg,rgba(11,12,14,.7),rgba(11,12,14,.92))',
        }}
        aria-hidden
      />
      <div className="container" style={{ position: 'relative', paddingBlock: 'clamp(80px,10vw,130px)', textAlign: 'center' }}>
        <div className="reveal">
          <h2
            style={{
              fontFamily: 'var(--fd)',
              fontWeight: 800,
              color: '#fff',
              fontSize: 'clamp(2rem,5vw,3.5rem)',
              letterSpacing: '-.03em',
              margin: 0,
            }}
          >
            {title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,.78)', fontSize: 18, maxWidth: 500, margin: '18px auto 0', lineHeight: 1.6 }}>
            {lede}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 32 }}>
            {actions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`btn ${action.variant === 'primary' ? 'btn-p btn-lg' : 'btn-g btn-lg'}`}
              >
                {action.label}
                {action.variant === 'primary' ? <IconArrowRight size={16} /> : null}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
