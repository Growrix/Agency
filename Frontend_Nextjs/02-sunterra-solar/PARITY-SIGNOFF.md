# Parity Sign-Off — 02-sunterra-solar

**Source:** `sites/02. sunterra-solar-website.html`  
**Target:** `Frontend_Nextjs/02-sunterra-solar/`  
**Date:** 2026-06-11  
**Build:** `pnpm build` — PASS (42 static routes)

## Wave 1 — CSS + Icons + shadcn + StickyCta

- [x] Component CSS merged into `app/globals.css` `@layer components` (btn, form, hero, scard, mega, fab, toast, rebates-band, stats, announce, bottomnav, sticky-cta, data-reveal-delay)
- [x] `components/icons/` — BrandMark, IconCheck, IconStar, IconPhone, IconSun, IconMoon, IconMenu, IconClose, bottom nav + service icons
- [x] Emoji replaced with SVG in Header, ThemeToggle, AnnounceBar, BottomNav, Testimonials
- [x] `sonner` installed; `Toaster` in marketing layout
- [x] StickyCta `lg:hidden` (mobile-only per HTML)

## Wave 2 — Shell parity

- [x] `components/layout/Fab.tsx` + `hooks/useFab.ts`
- [x] AnnounceBar crossfade CSS, `sunterra_announce_dismissed` localStorage, IconCheck SVG
- [x] `hooks/useHeaderScroll.ts` + `.header.is-scrolled`
- [x] Header mega menu: full-width, click-outside + Escape, link icons, promo gradient
- [x] MobileNav focus trap, Escape, return focus to menu button
- [x] `hooks/useBottomNavScrollHide.ts` — hide bottom nav on scroll down

## Wave 3 — Interactive views

- [x] `lib/leads/store.ts` (`sunterra_leads`) + `hooks/useToast.ts` (sonner)
- [x] `ContactView.tsx` + `useContactForm`
- [x] `RebateCheckerView.tsx` + `useRebateChecker`
- [x] `InspectionView.tsx` + `useInspectionForm`
- [x] `QuoteView` + `useQuoteWizard` — 4 steps Property/Energy/System/Contact, consent, STC preview
- [x] `CalculatorView` — system cost input in payback calc
- [x] Hero `useHeroQuoteForm` + lead save
- [x] `[slug]/page.tsx` routes contact, rebates, inspection to dedicated views
- [x] `contact.json`, `rebates.json`, `inspection.json` prose-only (no form HTML)

## Wave 4 — Homepage polish

- [x] Section components use BEM classes from globals.css
- [x] Stats counters via `useCounters` + IntersectionObserver
- [x] Partner SVG badges, case/blog media SVG placeholders
- [x] `[data-reveal-delay]` in component CSS layer

## Wave 5 — SEO + signoff

- [x] `JsonLd.tsx` — Services ItemList, AggregateRating on Organization/LocalBusiness, full FAQPage
- [x] `PARITY-SIGNOFF.md` updated
- [x] `pnpm build` — run verification below

## Route coverage

| HTML `data-route` | Next.js path | Status |
|---|---|---|
| home | `/` | Migrated |
| 20 prose views | `/[slug]` | Migrated |
| contact | `/contact` | Interactive view |
| rebates | `/rebates` | Interactive view |
| inspection | `/inspection` | Interactive view |
| blog | `/blog` | Migrated |
| blog-article | `/blog/[slug]` | Migrated |
| case-studies | `/case-studies` | Migrated |
| case-study | `/case-studies/[slug]` | Migrated |
| calculator | `/calculator` | Migrated |
| quote | `/quote` | Migrated |
| 404 | `not-found.tsx` | Migrated |

## Architecture checklist

- [x] Repository pattern (`lib/content/repositories/site-content.ts`)
- [x] Brand/config in `config/site.config.ts`
- [x] Form copy in `content/forms.json`
- [x] Navigation in `content/navigation.json`
- [x] Design tokens + BEM component CSS in `app/globals.css`
- [x] `next-themes` with `data-theme` attribute
- [x] Zero emoji icons in `components/`
- [x] No interactive HTML in prose JSON for contact/rebates/inspection

## Build verification

```
pnpm build — exit 0
42 static pages generated
Zero TypeScript errors
```

## Deferred / follow-up

- Side-by-side visual QA in browser at all breakpoints (manual step)
- OG image asset at `public/og-image.png`
