# Agent Lanes

This root now exposes one shared frontend entrypoint and two separate frontend-building lanes that converge into the same later backend/deploy phases.

## Shared Frontend Entry
- `phase1-site-replication.agent.md`
- `phase1.1-pixel-replicator.agent.md`
- `phase1.2-replica-to-nextjs-frontend.agent.md`
- `phase1.3-replica-to-native-nextjs-frontend.agent.md`
- `phase1.4-html-to-verified-native-nextjs-frontend.agent.md`
- `phase1.5-frontend-production-hardening.agent.md`

### Repli-to-Next.js Lane (Screenshot-First Pure Native)
Parallel four-agent lane that builds a pure Next.js + React + TypeScript + Tailwind v4 project directly from screenshots, bypassing the HTML intermediate. Pixel parity floor is `<=5%` (the realistic limit for screenshot-only input). Hands off to Phase 1.5, which can tighten to `<=1%` only if a live source URL or HTML reference becomes available.
- `repli-to-nextjs-phase1.1-design-read.agent.md` - reads screenshots, extracts design tokens, primitive inventory, section inventory, page inventory, motion policy. Writes only `DOC/design-read/`.
- `repli-to-nextjs-phase1.2-kit-builder.agent.md` - scaffolds Next.js 15 + Tailwind v4 with tokens wired, builds the UI primitive library, exposes `/_dev/kit` preview.
- `repli-to-nextjs-phase1.3-section-builder.agent.md` - composes the section library from primitives, batched <=8 per work unit, exposes `/_dev/sections/[slug]` previews.
- `repli-to-nextjs-phase1.4-page-composer-qa.agent.md` - composes public pages from typed data + sections, wires global header/footer/mobile-nav, runs Playwright + pixelmatch parity at `<=5%` per route per viewport. Hands off to Phase 1.5.

Use this lane when the user wants pure native Next.js + React from day one with screenshots as the only input. Use the existing `phase1.1-pixel-replicator.agent.md` HTML lane when the user wants the HTML intermediate or has a live source URL.

Phase 1 remains unchanged. Phase 1.1 is the pixel-perfect screenshot replication entrypoint. Phase 1.2 is the folder-in / folder-out frontend-only Next.js bridge/parity lane for the repeatable workflow: locate the Phase 1.1 replica folder, preserve it as source of truth, and output a separate pixel-locked Next.js App Router project without backend/provider/deployment questions. Phase 1.3 is the stricter folder-in / native-frontend-out lane for the user's final frontend expectation: a separate pure native Next.js App Router project with pixel parity, reusable components/data/state, native form/action contracts, SEO/tests, no primary HTML injection, no public HTML ownership, and backend/devops handoff readiness. Phase 1.4 is the verified HTML/static-template and failed-attempt repair lane: use it when raw HTML pages or an HTML-backed Next.js attempt must become a separate pure native output with route-by-route ownership proof, purity scans, measured parity evidence, and zero Problems.
Phase 1.5 is the production hardening and backend handoff lane that runs after Phase 1.4. Generic and reusable for any 1.4 output. It tightens visual parity to <=1%, hardens performance and Core Web Vitals, locks SEO and structured data, finalizes accessibility, centralizes the data layer and design tokens, declares the typed backend handoff contract, and optionally packages the project as a marketplace template. It does not implement backend code, providers, or deployment and does not reopen 1.4 ownership decisions.

## Rebrand & Industry-Switch Lane
Two-agent sequential lane that takes a built Next.js site (Phase 1.4 `pages_ready_for_hardening` or Phase 1.5 `hardening_complete`) and rebrands every content surface (text, CTAs, testimonials, images, SEO, brand marks, JSON-LD) — optionally switching industry (car -> plumbing, solar -> agency, etc.) — while keeping theme tokens, components, routing, layout, and motion byte-identical.
- `rebrand-phase2.1-planner.agent.md` - plan-only under `DOC/rebrand/`: brand bible, industry translation map, content inventory with per-slot char budgets, downloadable image swap plan, SEO + JSON-LD plan, surface-leakage scan.
- `rebrand-phase2.2-executor.agent.md` - applies the plan: industry-matched image downloads into `public/images/` (no external CDN hotlinks in the final site), text rewrites under budgets, brand-mark swap (logo / favicon / OG / Twitter), `manifest.json` + `package.json` + JSON-LD updates, legal brand-name substitution, full validation loop with source-brand + source-industry residual grep and zero-CDN image-source scan.

Default scope: text + images + brand marks. Color tokens, fonts, components, layout, motion preserved unless explicitly overridden. Image download via user-supplied folder, Pexels API, Pixabay API, or workspace stock — `PEXELS_API_KEY` and `PIXABAY_API_KEY` requested via the Bangla acquisition protocol when needed. Final site contains zero external image CDN references.

## [REPLI SYSTEM] Frontend Lane
These agents keep the current screenshot-first completion workflow:
- `phase2-frontend-planning.agent.md`
- `phase2-frontend-completion.agent.md`
- `phase3-frontend-polish.agent.md`

Use this lane when the site should stay rooted in what Phase 1 visibly replicated, and the remaining work is truthful route/state completion plus polish.

### [REPLI SYSTEM] Candidate Track
These candidate agents preserve the locked REPLI baseline while testing earlier deployability and dedicated Next.js migration passes:
- `phase2-frontend-planning-deployable-candidate.agent.md`
- `phase2-frontend-completion-deployable-candidate.agent.md`
- `phase2.5-nextjs-migration-candidate.agent.md`
- `phase2.6-nextjs-native-completion.agent.md`

Use `phase1.2-replica-to-nextjs-frontend.agent.md` before this candidate track when the requested outcome is frontend-only pixel parity from a located replica folder rather than deep production-template completion.
Use `phase1.3-replica-to-native-nextjs-frontend.agent.md` instead of Phase 1.2 when the requested outcome is a separate pure native Next.js frontend from a located replica folder and bridge shortcuts must block completion.
Use `phase1.4-html-to-verified-native-nextjs-frontend.agent.md` when the requested outcome is stricter: raw HTML/static source or a failed HTML-backed Next.js attempt must be converted into verified pure native App Router ownership with parser/source-HTML runtime retired before completion.
Use `phase2.6-nextjs-native-completion.agent.md` when the site is already visually approved but still relies on legacy HTML-backed ownership, generated page dumps, legacy runtime scripts, `.html` route ownership, fake forms, localStorage-only commerce, or missing production flow contracts. This phase must finish the site into a pure production Next.js App Router client template with exact visual parity, canonical routes, reusable shell/sections/data, native lead-gen and commerce contracts, SEO, tests, and legacy retirement.

## [DOC SYSTEM] Frontend Lane
These agents start from the same Phase 1 replica but let you reshape the site around your own authored plan:
- `phase2-doc-system-planning.agent.md`
- `phase2-doc-system-frontend-dev.agent.md`
- `phase3-doc-system-polish.agent.md`

Use this lane when the screenshot provides the starting substrate, but your own plan should redefine route architecture, page composition, content direction, conversion flow, and shared UX surfaces.

## Backend & Deploy Lane
These are additive agents for the imported backend/deploy workflow. They operate against the isolated bundle under `Backend & Deploy/` and do not replace either frontend lane:
- `phase4-foundation-planning.agent.md`
- `phase4-foundation-development.agent.md`
- `phase5-template-import-attach.agent.md`
- `phase6-post-import-continuation.agent.md`
- `phase7-template-deployment.agent.md`

Use this lane only after either frontend lane is already complete enough to be imported, attached, continued, and prepared for deployment.

## Generic Senior SaaS Delivery Entry
This optional generic entrypoint sits alongside the shared lanes:
- `senior_saas_developer.agent.md`

Use this agent when you want one senior generalist to first audit the current project or system end-to-end, then plan, implement, refactor, debug, validate, and document the work across frontend and backend.
It does not replace `foundation_planner`, `foundation_developer`, or the shared frontend lanes. It is a convenience entrypoint for users who want one generic senior builder while still respecting existing docs, lane boundaries, and quality gates.

## Meta Lane
These are system-building agents for the workflow itself:
- `system-builder.agent.md`
- `agent-builder-modes2.agent.md`

Use this lane when the work is about agent design, lane alignment, governance, supporting files, or system-level drift repair rather than product delivery.
Use `agent-builder-modes2.agent.md` when you want a specialist two-stage authoring workflow that first produces a blueprint and then emits one ready-to-use `agent.md` file.
Use `system-builder.agent.md` when the request changes the shared agent system itself: wrappers, canonical sources, specs, checklists, registries, or lane boundaries.
For large architecture blueprints, this lane now performs module-level readiness classification (`currently_supported`, `requires_extension`, `missing_knowledge`) before any downstream delivery handoff.
For non-SaaS local automation/tooling blueprints such as Node CLI generators, prompt-driven builders, local dashboards, or file-output systems, this lane must first decide whether the work belongs in a new isolated local system instead of the shared phase1-7/backend lanes.
When progress depends on user-supplied external accounts, keys, IDs, dashboards, or other off-repo assets, this lane must ask for them with Bangla acquisition instructions.

## Task Ledger Governance
All material project, repo, system, migration, validation, and delivery work must maintain a durable `tasks.md` at the active project root. Agents read or create this ledger before implementation, write ordered phase/task checklists, update status after each material step, and record evidence paths or notes for completed work. Existing legacy trackers such as `DOC/PROJECT PLAN/Tasks/tasks.md` may be read as context, but the canonical forward ledger is `project_root/tasks.md`.

This governance also bans redundant next-step permission questions when the next executable task already exists in `tasks.md`. Agents should execute the next owned task and update the ledger unless progress depends on ambiguous root selection, external inputs, destructive operations, or user-owned product/legal/provider decisions.

Canonical support:
- `Backend & Deploy/DOC/core/task-ledger-discipline.md`
- `Backend & Deploy/DOC/execution/spec-rules/task-ledger-discipline-spec.md`
- `Backend & Deploy/DOC/validation/checklists/task-ledger-discipline-checklist.md`
- `.github/instructions/task-ledger.instructions.md`

## Safety Rules
- Keep Phase 1 unchanged as the shared frontend entrypoint.
- Use Phase 1.2 after Phase 1.1 when the user wants a no-drama frontend-only Next.js pixel migration from a located replica folder.
- Use Phase 1.3 after Phase 1.1 when the user wants the same folder-in workflow but requires pure native Next.js frontend readiness rather than a bridge or baseline prototype.
- Use Phase 1.5 after Phase 1.4 finishes its native ownership contract and the remaining work is production hardening, SEO/perf/a11y lock, data and token centralization, typed backend handoff, and optional marketplace template packaging. Do not use it to reopen 1.4 ownership decisions.
- Use Phase 1.4 when the source is raw HTML/static pages or a prior Next.js migration is HTML-backed and the job requires verified native ownership evidence rather than another wrapper.
- Choose exactly one frontend-building lane after Phase 1: `[REPLI SYSTEM]` or `[DOC SYSTEM]`.
- Both frontend lanes must converge into the same later Phase 5, 6, and 7 process.
- Treat phase4-7 as an opt-in continuation lane.
- Use `senior_saas_developer.agent.md` when you want one optional senior generalist entrypoint for project delivery without manually selecting separate plan and execution roles.
- Use the meta lane for system structure work before editing delivery lanes directly.
- Use `agent-builder-modes2.agent.md` when the goal is to design an agent in Mode 1 and output one final `agent.md` in Mode 2 without changing shared governance.
- Use an isolated local system instead of the shared lanes when the blueprint is primarily a local automation, CLI, prompt-driven builder, or file-output product.
- Keep backend/deploy artifacts under `Backend & Deploy/` unless the user explicitly asks to promote them into the main root.
- Do not mutate source frontend projects in place during phase5 import/attach work.
- Do not route system-governance or workspace Git-topology work through `senior_saas_developer.agent.md`.

## Convergence Contract
- `[REPLI SYSTEM]` and `[DOC SYSTEM]` are frontend-only alternatives.
- They must produce the same kind of frontend-complete outcome: a working Next.js project that can enter the existing backend/deploy continuation lane.
- Phase 5, Phase 6, and Phase 7 stay shared and unchanged.

## Selection Guide
- Choose `[REPLI SYSTEM]` when you want to keep the Phase 1 screenshot-derived site and finish the missing truth behind it.
- Choose `phase1.2-replica-to-nextjs-frontend.agent.md` when the desired workflow is "I locate the Phase 1.1 replicated folder; the system outputs a pixel-perfect frontend-only Next.js project" and production integrations are out of scope.
- Choose `phase1.3-replica-to-native-nextjs-frontend.agent.md` when the desired workflow is "I locate the Phase 1.1 replicated folder; the system outputs a pure native, backend/devops handoff-ready Next.js frontend" and bridge outputs must be blocked instead of accepted.
- Choose `phase1.4-html-to-verified-native-nextjs-frontend.agent.md` when the desired workflow is "I have raw HTML/static pages or a failed HTML-backed Next.js attempt; the system must output a verified pure native Next.js frontend with purity scans and route-by-route ownership proof."
- Choose `phase1.5-frontend-production-hardening.agent.md` when the desired workflow is "I already have a 1.4-compliant native Next.js frontend; the system must close the remaining production gap (parity <=1%, performance, SEO/structured data, a11y, data and token centralization, typed backend handoff, optional marketplace packaging) without reopening 1.4 ownership."
- Inside the `[REPLI SYSTEM]` candidate track, choose `phase2.6-nextjs-native-completion.agent.md` when the runtime already builds and looks correct but the project still needs final production-template migration: canonical App Router ownership, reusable component/data architecture, native lead-gen and commerce flows, SEO, tests, and explicit retirement of HTML/legacy/script ownership.
- Choose `[DOC SYSTEM]` when you want to use the Phase 1 replica only as a starting base, then rebuild the site around your own authored plan.
- Choose `senior_saas_developer.agent.md` when you want one generic senior SaaS developer to audit the current project first and then decide planning versus execution without manually switching roles.
- Choose `agent-builder-modes2.agent.md` when you want a blueprint-first agent-authoring workflow that ends in one ready-to-use `agent.md` file.
- Choose the Meta lane first when you need to decide whether a blueprint should stay in the shared website/runtime lanes or become an isolated local system.

Do not run both frontend lanes on the same site in the same pass.
