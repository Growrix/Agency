/** Prose pages served by app/(marketing)/[slug]/page.tsx */
export const PAGE_SLUGS = [
  'about',
  'residential',
  'commercial',
  'batteries',
  'ev-chargers',
  'off-grid',
  'maintenance',
  'why-solar',
  'why-us',
  'contact',
  'faq',
  'inspection',
  'rebates',
  'finance',
  'reviews',
  'certifications',
  'warranty',
  'privacy',
  'terms',
  'cookies',
] as const;

export type PageSlug = (typeof PAGE_SLUGS)[number];
