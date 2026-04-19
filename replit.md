# Signal Atelier — Agency SaaS Marketing Site

A premium web development studio website (SaaS apps · websites · MCP servers · automation), built on Next.js and migrated from Vercel to Replit.

## Structure

- `web/` — Next.js app (App Router, TypeScript, Tailwind CSS v4)
  - `src/app/` — pages and route segments
  - `src/components/primitives/` — Button, Card, Badge, Container, SectionHeading
  - `src/components/sections/` — Accordion, CTABand, FeatureCard, PricingTier, ProcessSteps, StatBlock, Testimonial, TrustStrip, ComingSoon
  - `src/components/shell/` — Header, Footer, MobileBottomNav, UtilityRibbon, ChatLauncher
  - `src/lib/content.ts` — Mock data: SERVICES, PORTFOLIO, TESTIMONIALS, FAQ, etc.
  - `src/lib/nav.ts` — PRIMARY_NAV, FOOTER_NAV, WHATSAPP_HREF
  - `src/app/globals.css` — Design tokens via Tailwind v4 `@theme` (Signal Atelier — teal/copper/warm paper)

## Pages built

Marketing & service:
- `/` Home (12-section hero → trust → CTA flow)
- `/services` Overview with comparison matrix
- `/services/[slug]` Dynamic detail page for the 4 practices
- `/portfolio` Filterable listing
- `/portfolio/[slug]` Case study template
- `/pricing`, `/about`, `/contact`, `/faq`

Legal & utility:
- `/privacy-policy`, `/terms-of-service`, `not-found.tsx` (404)

Stub routes (deferred phases — render shared `ComingSoon` component):
- `/shop`, `/checkout`, `/book-appointment`, `/ai-concierge`

## Running the App

```
cd web && npm run dev
```

Started by the `Start application` workflow on port 5000, bound to `0.0.0.0`.

## Key Configuration

- **Port**: 5000 (required for Replit webview)
- **Host**: `0.0.0.0` (required for Replit proxy)
- `web/next.config.ts` includes `allowedDevOrigins` for `*.replit.dev`

## Tech Stack

- Next.js 16 (Turbopack, App Router) · React 19 · TypeScript
- Tailwind CSS v4 (design tokens via `@theme` in `globals.css`)
- Headless UI · Heroicons
- next/font: Bricolage Grotesque (display) / Manrope (sans) / JetBrains Mono (mono)

## Design language

"Signal Atelier" — editorial-premium meets product dashboard. Light-first warm paper background with teal primary, copper secondary, blueprint grid motifs, and disciplined motion.

## Deferred (not yet built)

Commerce (real Shop catalog + Stripe checkout), AI Concierge backend, booking calendar integration, admin/CMS, real contact-form backend (currently mocked).
