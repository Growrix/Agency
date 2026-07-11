# Dev Server Checklist

## Runtime Root
- Use `Templates/commerce/growrix-auto/`.

## Install
- Run `npm install` from runtime root.

## Environment
- Copy `ENV.example` to `.env.local`.
- Keep `FOUNDATION_BASE_URL` pointed at Foundation Core for attached mode.

## Startup
- Fallback mode: `npm run dev`
- Attached mode: start Foundation Core, then run `npm run dev:linked`

## Smoke Checks
- Verify `/` and `/shop` render.
- Verify `/contact-us` submits through `/api/foundation/forms/contact/submit`.
- Verify `/api/foundation/content/site-config` and `/api/foundation/health` return `ok: true` envelopes.
