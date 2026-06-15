# Migration Map — Bedrock Construction

Source: `sites/01-BedrockConstruction.html`  
Target: `Frontend_Nextjs/01-bedrock-construction/`  
Generated: 2026-06-11

## Hash SPA → App Router

| Hash / SPA ID | Route | Type |
|---|---|---|
| `spa-home` / `#home` | `/` | Homepage sections |
| `page-about` / `#about` | `/about` | Prose view |
| `page-services` / `#services` | `/services` | Prose view |
| `page-projects` / `#projects` | `/projects` | Prose view |
| `page-industries` / `#industries` | `/industries` | Prose view |
| `page-careers` / `#careers` | `/careers` | Prose view |
| `page-insights` / `#insights` | `/insights` | Blog + newsletter |
| `page-contact` / `#contact` | `/contact` | **Interactive** (ContactView + useContactForm) |

## Init functions → hooks

| HTML | Next.js |
|---|---|
| `initRouter` | App Router (removed) |
| `initNavbar` | `useHeaderScroll` + Header |
| `initDrawer` | MobileNav |
| `initBottomNav` | BottomNav (always visible mobile) |
| `initFab` | Fab + `useFab` |
| `initReveal` | `useReveal` + ScrollRevealInit |
| `initCounters` | `useCounters` + StatCounter |
| `initTestimonials` | `useTestimonials` |
| `initContactForm` | `useContactForm` |
| `initNewsletters` | `useNewsletter` |

## Content files

- `config/site.config.ts` — brand, contact, SEO defaults
- `content/navigation.json` — nav, drawer, bottom nav, footer
- `content/home.json` — homepage copy
- `content/services.json`, `projects.json`, `faq.json`, `testimonials.json`, `blog.json`
- `content/pages/*.json` — inner page prose
- `content/forms/contact.json` — form labels/options (not form markup)

## Design tokens

Dark default (`data-theme="dark"`). Light via `[data-theme=light]`.  
Fonts: Archivo (`--font-display`), Space Grotesk (`--font-body`), IBM Plex Mono (`--font-mono`).
