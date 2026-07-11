# Dev Server Checklist

## Runtime root
- Use `Templates/foundation-attached-starter/`.

## Install
- Run `npm install`.

## Environment
- Copy `ENV.example` to `.env.local`.
- Set `FOUNDATION_BASE_URL` when connecting to a running Foundation Core instance.

## Startup modes
- Fallback mode: `npm run dev`
- Attached mode: start `Foundation-Core` first, then run `npm run dev:linked`

## Smoke checks
- Open `/`.
- Confirm the attach status card shows either `attached` or `mock-fallback`.