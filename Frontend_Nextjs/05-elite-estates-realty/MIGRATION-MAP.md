# Migration Map

Source: `web/shop/html-template-websites/05-EliteEstatesRealty.html`
Target: `Frontend_Nextjs/05-elite-estates-realty/`
Generated: 2026-06-16T03:35:00.000Z

## Routes (9)

- `home` → `/`
- `properties` → `/properties`
- `buy` → `/buy`
- `rent` → `/rent`
- `commercial` → `/commercial`
- `agents` → `/agents`
- `investment` → `/investment`
- `about` → `/about`
- `contact` → `/contact`

## Sections (7)

- Header + ticker + shell → `components/layout/SiteShell.tsx`
- Home hero + search → `components/views/HomeView.tsx`
- Featured properties grid → `components/sections/PropertyCard.tsx`
- Markets + investment section → `components/views/HomeView.tsx`
- FAQ + CTA band → `components/ui/FaqAccordion.tsx`
- Route hero system → `components/sections/PageHero.tsx`
- Footer + bottom nav + FAB → `components/layout/Footer.tsx`

## Init functions (7)

- `initCounters` → `hooks/use-countup.ts`
- `initDrawer` → `hooks/use-drawer.ts`
- `initFab` → `hooks/use-fab.ts`
- `initForms` → `hooks/use-contact-form.ts`
- `initNavbar` → `hooks/use-navbar.ts`
- `initReveal` → `hooks/use-reveal.ts`
- `initRouter` → Next.js App Router files

## Content extractions (7)

- `navigation` → `content/navigation.json`
- `home` → `content/home.json`
- `properties` → `content/properties.json`
- `agents` → `content/agents.json`
- `faq` → `content/faq.json`
- `forms` → `content/forms/contact.json`
- route content → `content/pages/*.json`

## Design tokens

Light: 25 | Dark: 25

## Next steps

- `extract-component-css.mjs` ran (`.migration/component-css.css`)
- `extract-icons.mjs` ran (`.migration/icons-manifest.json`)
- `classify-routes.mjs` ran (`.migration/routes-classified.json`; source template uses `data-page` hash routing, so manual route mapping applied above)
