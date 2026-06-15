export const siteConfig = {
  name: 'Bedrock Construction Group',
  shortName: 'BEDROCK',
  locale: 'en-US',
  phone: '+1-800-263-7625',
  phoneTel: '18002637625',
  phoneDisplay: '+1 (800) 263-7625',
  email: 'build@bedrock.com',
  whatsapp: '18002637625',
  address: {
    street: '233 S. Wacker Drive',
    locality: 'Chicago',
    region: 'IL',
    postalCode: '60606',
    country: 'US',
  },
  metadata: {
    titleSuffix: ' — Bedrock Construction Group',
    defaultTitle: 'Bedrock Construction Group — We Build What Endures',
    defaultDescription:
      'A global construction and engineering partner delivering large-scale commercial, industrial and infrastructure projects since 1987.',
    ogImage: '/og-image.png',
  },
  organization: {
    foundingYear: 1987,
    slogan: 'We build what endures.',
  },
  social: {
    linkedin: 'https://linkedin.com/company/bedrock-construction',
  },
  credits: {
    label: 'GrowrixOS',
    href: 'https://www.growrixos.com',
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}

export function absoluteUrl(path = ''): string {
  const base = getSiteUrl().replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
