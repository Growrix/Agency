# Route Mapping

Convert HTML hash-router views to Next.js App Router file routes.

## Convention

| HTML | Next.js |
|---|---|
| `data-route="home"` | `app/page.tsx` |
| `data-route="about"` | `app/about/page.tsx` |
| `data-route="blog-article"` + param | `app/blog/[slug]/page.tsx` |
| `data-route="case-study"` + param | `app/case-studies/[slug]/page.tsx` |
| `data-route="404"` | `app/not-found.tsx` |

## Dynamic routes

When HTML resolves params from hash (`#/blog/stc-rebates-2026`):

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await contentRepo.getBlogPosts();
  return posts.map((p) => ({ slug: p.id }));
}
```

## Metadata

Map HTML `VIEW_TITLES` object to `generateMetadata()` using `config/site.config.ts` title suffix pattern.

## Redirects

Optional `next.config.ts` redirects from legacy hash URLs if needed for client bookmarks — not required for greenfield production deploys.

## Route groups

Use `app/(marketing)/` for public pages sharing one layout with header/footer/shell components.
