# Rayiss Electrical & Solar — Next.js Rebuild

A complete redesign of the Rayiss Electrical & Solar website in Next.js 15 (App Router) with a stunning editorial/architectural design system in black, orange, and white.

## What's in this scaffold

```
rayiss/
├── app/
│   ├── globals.css          # Tailwind + font imports + design tokens
│   ├── layout.jsx           # Root layout with SEO metadata
│   └── page.jsx             # Homepage route
├── components/
│   └── RayissHomepage.jsx   # The full homepage (all sections in one file for now)
├── package.json
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.mjs
└── jsconfig.json
```

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's already built in the homepage

- **Sticky top bar** with phone, hours, social icons
- **Glass-morphic navigation** with two-column dropdown menus for Solar / Electrical pillars
- **Hero** with editorial typography, mixed weights, Instrument Serif italic accents, live-indicator pulse, trust metrics strip
- **Animated brand marquee** (pauses on hover)
- **Stats section** with oversized numbers and hairline dividers
- **Two service pillars** — Solar (light card) and Electrical (dark card) — with all 12 sub-services inline
- **Four-step process** in a dark grid
- **Interactive solar savings calculator** — slider for quarterly bill + roof orientation → recommended kW, STC rebate, annual savings, payback period
- **Project case studies** with real data overlays (bill before/after, payback, etc.)
- **Brand partners strip**
- **Editorial testimonials** with pull-quote treatment
- **Bold orange CTA section**
- **Accordion FAQ**
- **Multi-step quote builder** (3 steps: service → property → contact) — replaces the old 7-checkbox form
- **Comprehensive footer** with Solar / Electrical / Company columns
- **Sticky mobile CTA** (call + quote buttons) — won't be missed on mobile

## Design system

| Token | Value | Usage |
|---|---|---|
| `#0A0A0A` | Deep black | Body text, dark sections |
| `#F8F5EE` | Warm cream | Page background (replaces harsh white) |
| `#FF5B1F` | Vibrant orange | **Primary actions only** — never decoration |
| `#FFFFFF` | Pure white | Cards, reverse-out surfaces |
| Bricolage Grotesque | Display | All headings |
| Instrument Serif Italic | Editorial accent | Emphasized words ("sharpest", "actually", etc.) |
| DM Sans | Body | Paragraphs, UI |
| JetBrains Mono | Data | Numbers, eyebrows, technical callouts |

The single biggest design rule: **orange = action**. Never a decorative orange block, never an orange icon background, never a gradient orange divider. If it's orange, the user should be able to click it. This solves the "banner blindness" problem the old site had where six different things were orange for six different reasons.

## Information architecture

Old site had 4 top-level service menus (Solar, Energy, Electrical, Level 2) that confused visitors. The new IA collapses to **2 pillars**:

**Solar installations**
- Residential solar
- Commercial solar
- Battery storage
- System upgrades
- Service & maintenance
- Finance options

**Electrical services**
- General electrical
- Level 2 services
- Hot water heat pumps
- LED lighting upgrades
- EV charger installation
- CCTV installation

Plus supporting pages: About, Projects, Blog, Contact.

## Next pages to build (suggested order)

1. `/solar` — Solar pillar landing (overview + 6 sub-service cards + savings calculator)
2. `/solar/residential` — Service page template (hero, what's included, process, pricing, calculator, case studies, FAQ, quote form)
3. `/electrical` — Electrical pillar landing
4. `/projects` — Filterable grid of case studies (the highest-converting page after the homepage)
5. `/about` — Team, story, certifications, fleet
6. `/contact` — Quote form + map + service area
7. `/blog` — Already exists in old site; keep WordPress headless for the CMS or migrate to MDX
8. Service-area pages: `/solar/wetherill-park`, `/electrician/fairfield`, etc. — programmatic SEO

## Suggested conversion improvements layered on top

- Add `react-hook-form` + `zod` for production form validation
- Wire the quote form to a backend (Formspree, Resend, or a Next.js API route + email)
- Add Google reviews API integration for live-pulled testimonials
- Embed Google Business Profile rating badge in hero
- Add GA4 + Google Tag Manager
- WhatsApp Business chat widget (much more common in AU trades than Messenger)
- Add `next/image` for proper image optimization once you have real photography
- Schema.org structured data: LocalBusiness, Service, FAQPage

## Migrating from WordPress

The old site is on WordPress. To avoid SEO loss during the cutover:

1. Crawl the existing site (Screaming Frog) and export all URLs with traffic
2. Map old URLs to new in `next.config.mjs` redirects
3. Run both sites in parallel on a staging subdomain (e.g. `new.rayisselectrical.com.au`) for 1–2 weeks
4. Cut DNS on a low-traffic day
5. Submit new sitemap to Google Search Console; monitor 404s for 30 days

Keep the WordPress blog content; either migrate posts to MDX or run WordPress headless with the new Next.js front-end pointing at the WP REST API for `/blog`.
