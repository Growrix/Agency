import { absoluteUrl, siteConfig } from '@/config/site.config';

export function JsonLd() {
  const organizationId = `${absoluteUrl('/')}#organization`;
  const websiteId = `${absoluteUrl('/')}#website`;
  const address = {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: siteConfig.organization.legalName,
        url: absoluteUrl('/'),
        logo: absoluteUrl(siteConfig.metadata.ogImage),
        slogan: siteConfig.organization.slogan,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address,
        foundingDate: `${siteConfig.organization.foundingYear}`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: siteConfig.organization.ratingValue,
          ratingCount: siteConfig.organization.ratingCount,
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: siteConfig.name,
        url: absoluteUrl('/'),
        description: siteConfig.metadata.defaultDescription,
        inLanguage: siteConfig.locale,
        publisher: { '@id': organizationId },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${absoluteUrl('/properties')}?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'RealEstateAgent',
        '@id': `${absoluteUrl('/')}#real-estate-agent`,
        name: siteConfig.name,
        url: absoluteUrl('/'),
        email: siteConfig.email,
        telephone: siteConfig.phone,
        areaServed: siteConfig.officeRegions,
        address,
        parentOrganization: { '@id': organizationId },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
