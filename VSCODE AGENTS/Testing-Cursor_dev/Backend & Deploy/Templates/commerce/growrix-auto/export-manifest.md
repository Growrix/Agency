# Export Manifest

## Required Bundle
- `Templates/commerce/growrix-auto/`

## Runtime Root Contract
- Runtime root is `Templates/commerce/growrix-auto/`.
- Install, lint, typecheck, build, and dev commands execute from this root only.

## Attach Contract
- Consumes Foundation Core through local facade routes rooted at `/api/foundation/**`.
- Foundation contract reference: `../../../Foundation-Core/docs/contracts/frontend-attach-contract.json`.

## Post-Export Bootstrap
1. Enter `Templates/commerce/growrix-auto/`.
2. Run `npm install`.
3. Copy `ENV.example` to `.env.local`.
4. Run `npm run dev` for fallback mode, or `npm run dev:linked` for attached mode.
5. Run smoke probes for `/`, `/shop`, `/contact-us`, and `/api/foundation/health`.
