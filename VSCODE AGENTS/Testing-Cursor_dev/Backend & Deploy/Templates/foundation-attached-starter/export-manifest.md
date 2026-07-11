# Export Manifest

## Required bundle
- `Templates/foundation-attached-starter/`

## Runtime contract
- This template remains standalone and can render with mocks.
- When `FOUNDATION_BASE_URL` points to a running Foundation Core instance, it attaches to live content and health surfaces.

## Post-export bootstrap
1. Enter `Templates/foundation-attached-starter/`.
2. Run `npm install`.
3. Copy `ENV.example` to `.env.local`.
4. Run `npm run dev` or `npm run dev:linked`.