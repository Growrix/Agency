# Content Schema

All page copy and structured data lives outside TSX. Components receive typed props from repositories.

## File layout

```
content/
  navigation.json
  announcements.json
  home.json
  services.json
  faq.json
  blog.json
  case-studies.json
  pages/
    about.json
    privacy.json
    ...
config/site.config.ts
lib/content/types.ts
lib/content/repositories/site-content.ts
lib/content/providers/local.ts
lib/content/providers/remote.ts   # stub for CMS/API
```

## site.config.ts

```ts
export const siteConfig = {
  name: 'Brand Name',
  locale: 'en-AU',
  phone: '+61-1300-786-837',
  phoneDisplay: '1300 786 837',
  metadata: { titleSuffix: ' — Brand Name', defaultDescription: '...' },
  social: { /* optional */ },
  features: { /* toggles */ },
} as const;

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}
```

## Repository interface

```ts
export interface SiteContentRepository {
  getNavigation(): Promise<NavigationContent>;
  getHomePage(): Promise<HomePageContent>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | null>;
  getPage(slug: string): Promise<PageContent | null>;
}
```

## Extraction from HTML

During inventory, list every `var ARRAY = [...]` in the HTML script block. Each becomes a JSON file with matching schema in `types.ts`.

## Validation

Use Zod schemas in `lib/content/schemas.ts` to validate JSON at build time or in repository load functions.
