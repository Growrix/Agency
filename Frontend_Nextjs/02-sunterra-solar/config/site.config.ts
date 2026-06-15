export const siteConfig = {
  name: 'Sunterra Solar',
  locale: 'en-AU',
  phone: '+61-1300-786-837',
  phoneTel: '1300786837',
  phoneDisplay: '1300 786 837',
  email: 'hello@sunterra.com.au',
  abn: '84 612 345 678',
  cecId: 'SA-CEC-2014-0847',
  address: {
    street: 'Level 12, 100 Harris St',
    locality: 'Pyrmont',
    region: 'NSW',
    postalCode: '2009',
    country: 'AU',
  },
  hours: 'Mon–Fri 8am–6pm AEST',
  metadata: {
    titleSuffix: ' — Sunterra Solar',
    defaultTitle: "Sunterra Solar — Power your home with Australia's solar experts",
    defaultDescription:
      'Sunterra Solar designs and installs CEC-accredited residential and commercial solar across Australia. STC rebates, batteries, EV chargers and $0 upfront finance.',
    ogImage: '/og-image.png',
  },
  organization: {
    foundingYear: 2014,
    slogan: "Power your home with Australia's solar experts",
    rating: 4.9,
    reviewCount: 847,
  },
  social: {
    linkedin: 'https://linkedin.com/company/sunterra-solar',
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
