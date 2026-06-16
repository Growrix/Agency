import Link from 'next/link';
import Image from 'next/image';
import type { PropertyCard as PropertyCardType } from '@/lib/content/types';
import { IconArrowRight, IconPin } from '@/components/icons';
import { siteConfig } from '@/config/site.config';

interface PropertyCardProps {
  property: PropertyCardType;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="prop-card">
      <div style={{ position: 'relative', overflow: 'hidden', height: '240px' }}>
        <Image
          className="prop-img"
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 880px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span className="prop-tag">{property.tag}</span>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'var(--status-chip-bg)',
            color: 'var(--status-chip-fg)',
            fontFamily: 'var(--fm)',
            fontSize: '11px',
            padding: '4px 10px',
            borderRadius: '999px',
            backdropFilter: 'blur(4px)',
          }}
        >
          {property.status}
        </div>
      </div>

      <div className="prop-body">
        <div className="prop-title">{property.title}</div>
        <div className="prop-loc">
          <IconPin width={13} height={13} />
          {property.location}
        </div>
        {(property.beds || property.baths || property.size) && (
          <div className="prop-meta">
            {property.beds ? <span>{property.beds}</span> : null}
            {property.baths ? <span>{property.baths}</span> : null}
            {property.size ? <span>{property.size}</span> : null}
          </div>
        )}
        <div className="prop-price">
          {property.price}
          {property.priceSub ? <div className="prop-price-sub">{property.priceSub}</div> : null}
        </div>
        <div className="prop-cta">
          <Link href={property.ctaHref ?? '/contact'} className="btn btn-gold btn-sm" style={{ flex: 1 }}>
            {property.ctaLabel ?? siteConfig.labels.propertyPrimaryCta}
            <IconArrowRight width={16} height={16} />
          </Link>
          <Link href={property.secondaryCtaHref ?? '/contact'} className="btn btn-outline btn-sm">
            {property.secondaryCtaLabel ?? siteConfig.labels.propertySecondaryCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
