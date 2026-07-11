# Template Post-Import Continuation Spec

## Purpose
Define the governed lane for the work that follows `template_import_attacher`: audit unresolved merge gaps, close eligible frontend/backend wiring gaps inside the normalized template root, and leave the template ready for deployment work.

## Required inputs
- Existing normalized template root under `Templates/<category>/<template-slug>/`
- `.import/import-report.md`
- `.audit/frontend-self-audit.md`
- `template.manifest.json`
- Optional `frontend-attach-contract.json`

## Required outputs
- Refreshed template runtime under the same root
- Local `.env.local` prepared from `ENV.example` with operator-managed secret placeholders
- `.audit/post-import-gap-closure.md`
- Refreshed `.audit/frontend-self-audit.md`

## Decision buckets
Every unresolved or newly completed item must be assigned to one of these execution buckets:

- `must_wire_now`
	- page-section content mapping where the template consumes Foundation-backed content
	- content-shell wiring and shared site config
	- contact form bridge
	- `.env.local` preparation from `ENV.example` with non-secret defaults and operator-managed secret placeholders
	- fallback mode behavior for the mandatory wired surfaces
- `optional_per_client`
	- visible media upload UI
	- visible auth-gated UI such as protected pages, account pages, or admin actions
- `foundation_change_only_if_missing_contract_support`
	- new DTO fields
	- new endpoint shapes
	- deploy-time Foundation env or startup contract adjustments that the current contract cannot represent

## Gap classes
Every unresolved item discovered during continuation must be classified as exactly one of:
- `wired`
- `missing_wiring`
- `missing_ui_surface`
- `client_optional`
- `missing_foundation_contract`

## Execution rules
- Keep Foundation-Core generic and stable. Do not reopen Foundation-Core unless the item falls into `foundation_change_only_if_missing_contract_support`.
- Preserve the imported public UI baseline; continuation closes wiring gaps rather than redesigning the product.
- Wire enabled contract modules only through template-local same-origin facades.
- Close the `must_wire_now` bucket before any optional work.
- Close eligible gaps where the imported runtime already has the corresponding surface or clearly implies it.
- Media and session facades may remain wired only at the system layer when the site has no visible upload or protected-account surface.
- Do not add new auth, upload, billing, or analytics UI unless the surface already exists or the user explicitly requests it.
- Standalone fallback mode must remain runnable for every wired surface.
- Create or update `.env.local` from `ENV.example` before lint/typecheck/build/dev smoke validation.
- Set non-secret defaults in `.env.local`, never invent secret values, and treat missing operator-provided secrets as explicit deploy blockers.
- Every remaining unresolved item must appear in the gap-closure report with its classification and recommended next owner.
- Vercel readiness, deploy docs, env publication, and subdomain rollout belong to the separate deployment lane.

## Validation
- `.env.local` preflight must be complete before runtime validation commands are executed.
- Lint, typecheck, build, and live smoke must pass from the normalized template root.
- Fallback mode must be proven for the wired surfaces.
- Active delivery mode must be proven for wired surfaces (`single_root_independent` by default; `foundation_attached_legacy` only when explicitly configured).
- The `must_wire_now` bucket must be complete before deployment handoff.
- At least one real wired contract surface beyond attach-status must be validated when such a surface exists in the imported runtime.

## Failure modes
- `POST_IMPORT_REPORT_MISSING`
- `POST_IMPORT_GAP_CLASSIFICATION_FAILED`
- `POST_IMPORT_MANDATORY_BUCKET_INCOMPLETE`
- `POST_IMPORT_ELIGIBLE_GAP_LEFT_OPEN`
- `POST_IMPORT_ENV_LOCAL_PREP_FAILED`
- `POST_IMPORT_VALIDATION_FAILED`