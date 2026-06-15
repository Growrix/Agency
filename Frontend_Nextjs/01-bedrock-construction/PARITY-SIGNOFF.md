# Parity Sign-off — Bedrock Construction

Source: `sites/01-BedrockConstruction.html`  
Target: `Frontend_Nextjs/01-bedrock-construction/`  
Date: 2026-06-11

## Routes

| Hash SPA | App Router | Status |
|---|---|---|
| `#home` | `/` | ✅ |
| `#about` | `/about` | ✅ |
| `#services` | `/services` | ✅ |
| `#projects` | `/projects` | ✅ |
| `#industries` | `/industries` | ✅ |
| `#careers` | `/careers` | ✅ |
| `#insights` | `/insights` | ✅ |
| `#contact` | `/contact` | ✅ (interactive React view) |

## Init hooks coverage

| HTML init | Next.js | Status |
|---|---|---|
| `initRouter` | App Router (removed) | ✅ |
| `initNavbar` | `useHeaderScroll` + Header | ✅ |
| `initDrawer` | MobileNav | ✅ |
| `initBottomNav` | BottomNav (always visible mobile) | ✅ |
| `initFab` | Fab + `useFab` | ✅ |
| `initReveal` | `useReveal` + ScrollRevealInit | ✅ |
| `initCounters` | `useCounters` / StatCounter | ✅ |
| `initTestimonials` | `useTestimonials` | ✅ |
| `initContactForm` | `useContactForm` | ✅ |
| `initNewsletters` | `useNewsletter` | ✅ |

## Remaining gaps

| ID | Severity | Item |
|---|---|---|
| P2-01 | P2 | External Unsplash images (same as source HTML) — consider `next/image` + self-hosted assets for production |
| P2-02 | P2 | Blog "Read more" links are non-navigating placeholders (same as source `#`) |
| P2-03 | P2 | Footer legal links point to `#` (same as source) |
| P2-04 | P2 | No dedicated `/og-image.png` asset in `public/` yet |

## Build

`pnpm build` — **PASS** (zero TS errors, 13 static routes)
