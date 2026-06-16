import Link from 'next/link';
import type { GenericPageContent, PropertyCard as PropertyCardType } from '@/lib/content/types';
import { IconArrowRight } from '@/components/icons';
import { PageHero } from '@/components/sections/PageHero';
import { PropertyCard } from '@/components/sections/PropertyCard';
import { Reveal } from '@/components/ui/Reveal';

interface RentViewProps {
  page: GenericPageContent;
  properties: PropertyCardType[];
}

export function RentView({ page, properties }: RentViewProps) {
  const rentals = properties.filter((item) => item.status === 'For Rent');

  return (
    <>
      <PageHero hero={page.hero} />
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="grid3">
            {rentals.map((item, index) => (
              <Reveal key={item.id} delayMs={(index % 3) * 100}>
                <PropertyCard property={item} />
              </Reveal>
            ))}
          </div>
          {page.cta ? (
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Link href={page.cta.href} className={`btn ${page.cta.accent ? 'btn-gold' : 'btn-outline'} btn-lg`}>
                {page.cta.label}
                <IconArrowRight width={16} height={16} />
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
