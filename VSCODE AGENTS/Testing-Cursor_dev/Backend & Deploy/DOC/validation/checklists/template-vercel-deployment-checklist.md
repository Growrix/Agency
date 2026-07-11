# Template Vercel Deployment Checklist

Use this checklist before declaring a template ready for Vercel rollout.

## Required
- Template lint, typecheck, build, and smoke are green.
- The mandatory template-side wiring bucket is complete or explicitly blocked before deployment work begins.
- Attached mode and fallback mode evidence exist for the template-local facades.
- `ENV.example` documents deploy-time public and server env requirements.
- Vercel project linkage is known or explicitly blocked as missing.
- Preview deploy behavior is documented.
- Production deploy behavior is documented.
- Domain model is recorded as `<subdomain>.<base-domain>`.
- DNS or Vercel domain-control ownership is confirmed or explicitly blocked.
- Post-deploy smoke routes are defined.
- Deployment report exists at `.audit/template-deployment-report.md`.

## Required for Foundation-attached templates
- `FOUNDATION_BASE_URL` target is documented for the deployed environment.
- Public template domain and Foundation runtime domain are validated separately.
- Any missing Foundation env or startup contract requirement is documented as a deployment blocker rather than treated as template feature work.