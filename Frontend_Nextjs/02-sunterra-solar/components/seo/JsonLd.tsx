import { absoluteUrl, siteConfig } from '@/config/site.config';
import type { ServiceItem } from '@/lib/content/types';

export function JsonLdOrganization() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${absoluteUrl()}/#org`,
    name: siteConfig.name,
    url: absoluteUrl(),
    slogan: siteConfig.organization.slogan,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    foundingDate: String(siteConfig.organization.foundingYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressCountry: siteConfig.address.country,
      addressRegion: siteConfig.address.region,
      addressLocality: siteConfig.address.locality,
      postalCode: siteConfig.address.postalCode,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.organization.rating,
      reviewCount: siteConfig.organization.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function JsonLdWebSite() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${absoluteUrl()}/#website`,
    url: absoluteUrl(),
    name: siteConfig.name,
    publisher: { '@id': `${absoluteUrl()}/#org` },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function JsonLdLocalBusiness() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${absoluteUrl()}/#localbusiness`,
    name: siteConfig.name,
    url: absoluteUrl(),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: '$$',
    openingHours: siteConfig.hours,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.organization.rating,
      reviewCount: siteConfig.organization.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function JsonLdServices({ services }: { services: ServiceItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
        url: absoluteUrl(s.href),
        provider: { '@id': `${absoluteUrl()}/#org` },
        areaServed: { '@type': 'Country', name: 'Australia' },
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function JsonLdFAQ({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function JsonLdArticle({ title, date, author }: { title: string; date: string; author: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    author: { '@type': 'Person', name: author },
    datePublished: date,
    publisher: { '@id': `${absoluteUrl()}/#org` },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
