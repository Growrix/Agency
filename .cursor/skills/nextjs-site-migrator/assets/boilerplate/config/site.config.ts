export const siteConfig = {
  name: '__BRAND_NAME__',
  locale: 'en',
  phone: '',
  phoneDisplay: '',
  abn: '',
  metadata: {
    titleSuffix: ' — __BRAND_NAME__',
    defaultTitle: '__BRAND_NAME__',
    defaultDescription: '',
  },
  organization: {
    foundingYear: 2014,
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
