import type { GenericPageContent, PropertyCard as PropertyCardType } from '@/lib/content/types';
import { PageHero } from '@/components/sections/PageHero';
import { PropertyCard } from '@/components/sections/PropertyCard';
import { Reveal } from '@/components/ui/Reveal';

interface PropertiesViewProps {
  page: GenericPageContent;
  properties: PropertyCardType[];
}

export function PropertiesView({ page, properties }: PropertiesViewProps) {
  const saleListings = properties.filter((item) => item.status !== 'For Rent').slice(0, 6);

  return (
    <>
      <PageHero hero={page.hero} />
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '36px' }}>
            {(page.section.filters ?? []).map((filter, index) => (
              <button key={filter} className={`btn ${index === 0 ? 'btn-dark' : 'btn-outline'} btn-sm`} type="button">
                {filter}
              </button>
            ))}
          </div>

          <div className="grid3">
            {saleListings.map((item, index) => (
              <Reveal key={item.id} delayMs={(index % 3) * 100}>
                <PropertyCard property={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
