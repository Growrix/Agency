# Growrix Auto Template Runbook

## Runtime Root
- Run all install, build, and dev commands from `Templates/commerce/growrix-auto/`.

## Commands
- `npm install`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run dev`
- `npm run dev:linked`
- `npm run verify`

## Attach Modes
- Standalone fallback mode:
  - Start with `npm run dev`.
  - Template-local facades serve mock fallback payloads when Foundation Core is unavailable.
- Foundation attached mode:
  - Start `Foundation-Core` at `http://localhost:3000`.
  - Copy `ENV.example` to `.env.local` and keep `FOUNDATION_BASE_URL=http://localhost:3000`.
  - Run `npm run dev:linked` for isolated local verification.

## Required Smoke Routes
- `/`
- `/shop`
- `/shop/product/22-5-hole-aluminum-wheel`
- `/contact-us`
- `/api/foundation/content/site-config`
- `/api/foundation/forms/contact/submit` (POST)
- `/api/foundation/health`
