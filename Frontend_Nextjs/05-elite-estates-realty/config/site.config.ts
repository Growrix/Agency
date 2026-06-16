export const siteConfig = {
  name: 'Elite Estates Realty',
  brand: {
    monogram: 'E',
    primary: 'Elite',
    accent: 'Estates',
  },
  siteUrl: 'https://www.eliteestates.com',
  locale: 'en-GB',
  phone: '+44 20 7123 4567',
  phoneTel: '442071234567',
  phoneDisplay: '+44 20 7123 4567',
  email: 'enquiries@eliteestates.com',
  consultationPath: '/contact',
  whatsapp: 'https://wa.me/442071234567',
  aiAssistantPath: '/contact',
  hours: 'Mon-Fri 9am-7pm',
  address: {
    street: '14 Berkeley Square',
    locality: 'Mayfair, London',
    region: 'Greater London',
    postalCode: 'W1J',
    country: 'UK',
  },
  officeRegions: ['Dubai, UAE', 'New York, USA', 'Singapore', 'Monaco, France'],
  foundedYear: 2005,
  metadata: {
    titleSuffix: ' — Elite Estates Realty',
    defaultTitle: 'Elite Estates Realty — Luxury Real Estate Worldwide',
    defaultDescription:
      "Elite Estates is a global luxury real estate advisory offering premium properties, investment intelligence, and private client services across 60+ markets.",
    ogImage: '/og-image.svg',
  },
  organization: {
    legalName: 'Elite Estates Realty',
    foundingYear: 2005,
    slogan: 'Discover extraordinary living.',
    ratingValue: 4.9,
    ratingCount: 4200,
  },
  credits: {
    label: 'Built and maintained by',
    name: 'GrowrixOS',
    href: 'https://www.growrixos.com',
  },
  social: {
    linkedIn: '#',
    instagram: '#',
    youtube: '#',
  },
  labels: {
    breadcrumbHome: 'Home',
    breadcrumbAriaLabel: 'Breadcrumb',
    fabBackToTop: 'Back to top',
    fabCall: 'Call',
    fabConsultation: 'Book Consultation',
    fabWhatsapp: 'WhatsApp',
    fabAiAdvisor: 'AI Property Advisor',
    fabQuickActions: 'Quick actions',
    footerClientRatingLabel: 'client rating',
    footerTransactionsLabel: 'transactions',
    footerNewsletterEmailLabel: 'Email for newsletter updates',
    propertyPrimaryCta: 'Enquire',
    propertySecondaryCta: 'View Tour',
    genericFallbackCardTitle: 'Tailored advisory, every step',
    genericFallbackCardText:
      'We align every recommendation to your goals, timeline, and risk profile while preserving full confidentiality.',
    investmentReturnsEyebrow: 'Market Returns',
    investmentReturnsTitle: 'Where your money works harder',
    investmentCardCta: 'Explore',
  },
} as const;

export type SiteConfig = typeof siteConfig;

function normalizeSiteUrl(value: string): string {
  const parsed = new URL(value.trim());
  parsed.hash = '';
  parsed.search = '';
  return parsed.toString().replace(/\/+$/, '');
}

function isLocalhostUrl(value: string): boolean {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(value);
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) {
    try {
      const normalized = normalizeSiteUrl(configured);
      if (process.env.NODE_ENV === 'production' && isLocalhostUrl(normalized)) {
        throw new Error('NEXT_PUBLIC_SITE_URL cannot be localhost in production.');
      }
      return normalized;
    } catch (error) {
      if (error instanceof Error && error.message.includes('localhost')) {
        throw error;
      }
      throw new Error('NEXT_PUBLIC_SITE_URL must be an absolute URL, for example https://example.com');
    }
  }
  if (process.env.VERCEL_URL && process.env.VERCEL_ENV === 'preview') {
    return normalizeSiteUrl(`https://${process.env.VERCEL_URL}`);
  }
  if (process.env.NODE_ENV === 'production') {
    return normalizeSiteUrl(siteConfig.siteUrl);
  }
  return 'http://localhost:3000';
}

export function absoluteUrl(path = ''): string {
  const base = getSiteUrl();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
