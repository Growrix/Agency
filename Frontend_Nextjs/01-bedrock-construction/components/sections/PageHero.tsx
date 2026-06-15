import Link from 'next/link';
import type { PageHero as PageHeroType } from '@/lib/content/types';

interface PageHeroProps {
  hero: PageHeroType;
}

export function PageHero({ hero }: PageHeroProps) {
  const titleLines = hero.title.split('\n');
  return (
    <section className="page-hero">
      <div className="ph-bg" style={{ backgroundImage: `url(${hero.image})` }} />
      <div className="ph-ov" />
      <div className="container ph-content">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: 'var(--text)' }}>{hero.breadcrumb}</span>
        </nav>
        <span className="eyebrow" style={{ color: 'var(--accent)', marginTop: 16, display: 'inline-flex' }}>
          {hero.eyebrow}
        </span>
        <h1 className="ph-h1">
          {titleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < titleLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </h1>
        <p className="ph-sub">{hero.lede}</p>
      </div>
    </section>
  );
}
