# REPLI Replica To Next.js Frontend Checklist

## System Surface
- [ ] Public wrapper exists under `.github/agents/phase1.2-replica-to-nextjs-frontend.agent.md`.
- [ ] Canonical public agent exists under `Backend & Deploy/.github/agents/phase1.2-replica-to-nextjs-frontend.agent.md`.
- [ ] Canonical DOC agent exists under `Backend & Deploy/DOC/agents/phase1.2-replica-to-nextjs-frontend.agent.md`.
- [ ] Execution spec exists under `Backend & Deploy/DOC/execution/spec-rules/repli-replica-to-nextjs-frontend-spec.md`.
- [ ] Checklist exists under `Backend & Deploy/DOC/validation/checklists/repli-replica-to-nextjs-frontend-checklist.md`.
- [ ] Root and canonical registries describe Phase 1.2 as frontend-only pixel migration, not Phase 2.6 production-template completion.

## Intake And Source Safety
- [ ] `source_root` is the only required input.
- [ ] `output_root` is derived when omitted.
- [ ] Source root exists.
- [ ] Source root is not mutated.
- [ ] Output root is separate from source root.
- [ ] Unsafe overwrite risks are blocked before editing.

## Source Inventory
- [ ] Source routes/pages are inventoried.
- [ ] Source HTML files are inventoried when present.
- [ ] Source screenshots or renderable routes are identified.
- [ ] CSS order is inventoried.
- [ ] JS/script order is inventoried.
- [ ] Fonts/images/media roots are inventoried.
- [ ] Visible forms and controls are inventoried.
- [ ] Plugin/widget hooks are inventoried.

## Output Generation
- [ ] Output Next.js App Router project exists.
- [ ] Assets, CSS, JS, fonts, and media required for parity are localized.
- [ ] Every source page maps to a canonical route.
- [ ] `.html` compatibility behavior exists where applicable.
- [ ] Internal links are canonicalized.
- [ ] Source-domain primary navigation/canonical residue is removed unless intentionally external.
- [ ] Route-specific runtime scripts are preserved or reinitialized route-aware.
- [ ] Frontend-only forms/controls have honest validation or not-configured states.

## Pixel And Runtime Parity
- [ ] Desktop baseline screenshots exist.
- [ ] Desktop output screenshots exist.
- [ ] Desktop visual diff passes within threshold.
- [ ] Mobile baseline screenshots exist.
- [ ] Mobile output screenshots exist.
- [ ] Mobile visual diff passes within threshold.
- [ ] Sliders/carousels work when present.
- [ ] Animation/parallax/before-after/accordion/tab/filter/menu/modal widgets work when present.
- [ ] Critical media assets resolve.

## Validation Gates
- [ ] `npm run lint -- --max-warnings 0` passes from output root.
- [ ] `npm run build` passes from output root.
- [ ] Dev server starts from output root.
- [ ] Smoke checks pass for every canonical route.
- [ ] VS Code Problems count is zero for output root.
- [ ] Final report uses `delivery_class=frontend_pixel_locked_nextjs` only when all applicable gates pass.
- [ ] Final report does not include optional continuation prompts for executable work.

## Blocker Discipline
- [ ] Missing source folder is reported as `REPLI_P12_SOURCE_ROOT_MISSING`.
- [ ] Unreadable source/assets are reported as `REPLI_P12_SOURCE_UNREADABLE`.
- [ ] Baseline capture failures are reported with exact command/path evidence.
- [ ] Validation failures are fixed and rerun before completion.
- [ ] Backend/provider/deployment unknowns are not treated as blockers in this frontend-only lane.