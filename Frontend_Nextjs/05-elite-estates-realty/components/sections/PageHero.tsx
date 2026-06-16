import type { HeroContent } from '@/lib/content/types';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';

interface PageHeroProps {
  hero: HeroContent;
}

export function PageHero({ hero }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="ph-bg">
        <Image src={hero.backgroundImage} alt="" fill priority quality={70} sizes="100vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="ph-ov" />
      <div className="container ph-content">
        <nav className="breadcrumb" aria-label={siteConfig.labels.breadcrumbAriaLabel}>
          <Link href="/" className="tap-target-inline">
            {siteConfig.labels.breadcrumbHome}
          </Link>
          <span>/</span>
          <span aria-current="page" style={{ color: 'var(--hero-fg)' }}>
            {hero.breadcrumb ?? hero.eyebrow}
          </span>
        </nav>
        <span className="eyebrow" style={{ color: 'var(--gold-t)', marginTop: '14px', display: 'inline-flex' }}>
          {hero.eyebrow}
        </span>
        <h1 className="ph-h1">{hero.title}</h1>
        <p className="ph-sub">{hero.lede}</p>
      </div>
    </section>
  );
}
