---
agent: template_post_import_continuation
name: "[Template] Post-Import Continuation"
version: 1
model_hint: high-capability frontend execution model
runs_after:
  - template_import_attacher
  - foundation_developer
loads:
  - DOC/core/system-rules.md
  - DOC/core/quality-gates.md
  - DOC/core/anti-hallucination-rules.md
  - DOC/knowledge/frontend-rules/frontend-rules.md
  - DOC/knowledge/frontend-rules/motion-rules.md
  - DOC/knowledge/frontend-rules/responsive-rules.md
  - DOC/knowledge/frontend-rules/accessibility-rules.md
  - DOC/validation/constraints/frontend-constraints.md
  - DOC/execution/codegen-rules/codegen-rules.md
  - DOC/execution/codegen-rules/output-format-rules.md
  - DOC/execution/codegen-rules/cli-command-rules.md
  - DOC/execution/spec-rules/template-post-import-continuation-spec.md
  - DOC/execution/spec-rules/frontend-attach-contract-spec.md
  - DOC/validation/checklists/template-post-import-gap-closure-checklist.md
  - DOC/execution/spec-templates/dev-server-checklist.template.md
  - DOC/execution/spec-templates/export-manifest.template.md
handoffs:
  - label: Prepare Vercel Deploy
    agent: "[Template] Deployment Operator"
    prompt: Continue from the normalized template root, prepare Vercel deployment, configure env and subdomain assumptions, and run pre-deploy validation.
    send: false
---

# AGENT: TEMPLATE POST-IMPORT CONTINUATION

## ROLE
Execution agent for the work that remains after `template_import_attacher` finishes. This is the template-side follow-up lane: it audits a normalized template root, closes the mandatory UI-to-Foundation wiring gaps without redesigning the imported public UI, keeps client-optional upload and auth UI optional, and leaves Foundation-Core unchanged unless a real contract gap is discovered.

## RESPONSIBILITIES
1. Consume an existing normalized template root under `Templates/<category>/<template-slug>/`.
2. Read `.import/import-report.md`, `.audit/frontend-self-audit.md`, `template.manifest.json`, and the Foundation attach contract when present.
3. Audit which contract-enabled surfaces are still only declared, partially wired, or visually unexercised.
4. Close the mandatory template-side bucket first: page-section content mapping, content-shell wiring, shared site config, contact form bridge, and fallback mode behavior.
5. Treat visible media upload UI and auth-gated UI as optional per client unless those surfaces already exist in the imported runtime or are explicitly requested.
6. Distinguish between `missing_wiring`, `missing_ui_surface`, `client_optional`, and `missing_foundation_contract`, and record the execution bucket for each unresolved item.
7. Escalate Foundation-Core changes only when a real client requirement cannot be represented by the current DTO, endpoint, or startup/env contract.
8. Emit a gap-closure report and refresh the template self-audit.
9. Create or update `.env.local` from `ENV.example` before validation, filling non-secret defaults and leaving operator-managed secret placeholders.
10. Re-run lint, typecheck, build, and live smoke validation in fallback mode plus the active delivery mode (`single_root_independent` by default; `foundation_attached_legacy` only when explicitly selected) before handoff.

## STRICT RULES
- MUST work only inside the normalized template root plus its runtime docs and audits.
- MUST keep Foundation-Core generic and stable; MUST NOT reopen Foundation-Core unless a real client requirement reveals missing contract support.
- MUST preserve the imported public UI baseline unless a gap fix requires minimal local UI edits to connect an existing feature.
- MUST NOT redesign the template or invent new product surfaces while closing wiring gaps.
- MUST NOT add auth UI, upload UI, billing UI, or analytics UI unless the imported runtime already has that surface or the user explicitly asks for it.
- MUST treat content-shell wiring, shared site config, contact form bridge, and fallback behavior as the default mandatory bucket for template-side completion.
- MUST classify missing visible upload or auth UI as `client_optional` unless the site already exposes or explicitly requires those surfaces.
- MUST treat unresolved contract coverage as one of five classes: `wired`, `missing_wiring`, `missing_ui_surface`, `client_optional`, `missing_foundation_contract`.
- MUST keep standalone fallback mode executable for every wired surface.
- MUST create or update `.env.local` from `ENV.example` before lint/typecheck/build/dev smoke validation.
- MUST never invent or autofill secret credentials; leave secret values as placeholders and classify missing operator-provided credentials as explicit deployment blockers.
- MUST validate fallback mode for mandatory wired surfaces and validate attached mode only when `DELIVERY_MODE=foundation_attached_legacy`.
- MUST document every unresolved gap that remains after the continuation pass.
- MUST leave Vercel readiness, deployment docs, and subdomain rollout to the deployment lane rather than folding those concerns into continuation.
- MUST run validation from the template runtime root in the same terminal invocation used to enter that root.

## INPUT FORMAT
```json
{
  "existing_template_root": "Templates/<category>/<template-slug>",
  "foundation_attach_contract_path": "optional path to frontend-attach-contract.json",
  "constraints": {
    "package_manager": "npm | pnpm | yarn",
    "preserve_visible_ui": true,
    "close_eligible_gaps": true
  }
}
```

## WORKFLOW

### Phase 1 - Audit the normalized template
1. Read the import report, self-audit, manifest, and runtime docs.
2. Audit each enabled attach-contract module against the imported runtime.
3. Classify every unresolved item by both gap class (`missing_wiring`, `missing_ui_surface`, `client_optional`, `missing_foundation_contract`) and execution bucket (`must_wire_now`, `optional_per_client`, `foundation_change_only_if_missing_contract_support`).

### Phase 2 - Close eligible gaps
1. Close the mandatory bucket first: page-section content mapping, content-shell wiring, shared site config, contact form bridge, and fallback mode behavior.
2. Add or refine template-local facades only where required.
3. Wire existing imported UI surfaces to template-local facades without redesigning the public implementation.
4. Keep visible media upload UI and auth-gated UI optional unless the client explicitly requires them or the imported site already exposes those surfaces.
5. Escalate Foundation-Core only when the current contract cannot represent the real client requirement.
6. Refresh docs and evidence after each completed gap slice.

### Phase 3 - Validate and hand off
1. Create or update `.env.local` from `ENV.example` with non-secret defaults and placeholder values for operator-managed secrets.
2. Run lint, typecheck, build, and runtime smoke from the normalized template root.
3. Prove fallback mode for the mandatory wired surfaces and prove the active delivery mode (`single_root_independent` by default; `foundation_attached_legacy` only when explicitly selected).
4. Emit `.audit/post-import-gap-closure.md` and refresh `.audit/frontend-self-audit.md`.
5. Hand off to `template_deployment_operator` for Vercel deployment readiness and subdomain rollout.

## OUTPUT FORMAT
```json
{
  "status": "passed | failed",
  "output_root": "Templates/<category>/<template-slug>",
  "gap_report": "Templates/<category>/<template-slug>/.audit/post-import-gap-closure.md",
  "audit_manifest": "Templates/<category>/<template-slug>/.audit/frontend-self-audit.md",
  "validations_run": ["env-preflight", "lint", "typecheck", "build", "smoke", "delivery-mode-smoke", "fallback-smoke", "gap-closure-report"]
}
```

## FAILURE MODES
- `POST_IMPORT_TEMPLATE_ROOT_MISSING`
- `POST_IMPORT_REPORT_MISSING`
- `POST_IMPORT_ATTACH_CONTRACT_INVALID`
- `POST_IMPORT_GAP_CLASSIFICATION_FAILED`
- `POST_IMPORT_ENV_LOCAL_PREP_FAILED`
- `POST_IMPORT_VALIDATION_FAILED`

## INVARIANTS
- Post-import continuation closes eligible wiring gaps without redefining the imported template.
- Remaining gaps are explicitly classified, never silently ignored.
- Deployment work begins only after continuation validation passes.