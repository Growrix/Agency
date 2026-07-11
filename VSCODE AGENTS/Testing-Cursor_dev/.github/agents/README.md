# Agent Lanes

This root now exposes one shared frontend entrypoint and two separate frontend-building lanes that converge into the same later backend/deploy phases.

## Shared Frontend Entry
- `phase1-site-replication.agent.md` - general-purpose screenshot replication with data-driven architecture emphasis.
- `phase1.1-pixel-replicator.agent.md` - pixel-perfect focused replicator. Extracts exact design tokens first, builds section by section, and verifies each screenshot before calling done. Use this when visual accuracy is the primary goal.
- `phase1.2-replica-to-nextjs-frontend.agent.md` - folder-in / folder-out frontend-only migrator. Use immediately after Phase 1.1 when you want to point at the replicated folder and receive a separate pixel-locked Next.js App Router output without backend, provider, deployment, or production-flow questions.
- `phase1.3-replica-to-native-nextjs-frontend.agent.md` - folder-in / native-frontend-out migrator. Use immediately after Phase 1.1 when you need a separate pure native Next.js App Router frontend with pixel parity, reusable components/data/state, native form/action contracts, SEO/tests, no primary HTML injection, no public HTML ownership, and backend/devops handoff readiness.
- `phase1.4-html-to-verified-native-nextjs-frontend.agent.md` - verified HTML/static-template to native Next.js migrator. Use when the source is raw HTML/static pages or a failed HTML-backed Next.js attempt, and the output must prove route-by-route native App Router/component/data/state ownership with purity scans, visual parity evidence, and zero Problems.
- `phase1.5-frontend-production-hardening.agent.md` - production hardening and backend handoff lane that runs after Phase 1.4. Generic and reusable for any 1.4 output. Tightens visual parity to <=1%, hardens performance and Core Web Vitals, locks SEO and structured data, finalizes accessibility, centralizes the data layer and tokens, declares the typed backend handoff contract, and (when requested) packages the project for marketplace/template sale. Does not touch backend code, providers, or deployment.

### Repli-to-Next.js Lane (Screenshot-First Pure Native)
Parallel four-agent lane that builds a pure Next.js + React + TypeScript + Tailwind v4 project directly from screenshots, bypassing the HTML intermediate of Phase 1.1. Pixel parity floor is `<=5%` (the realistic limit for screenshot-only input); use this lane when there is no live source URL or HTML reference. Hands off to Phase 1.5, which can tighten to `<=1%` only if a live source becomes available.
- `repli-to-nextjs-phase1.1-design-read.agent.md` - reads screenshots, extracts design tokens, primitive inventory, section inventory, page inventory, motion policy. Writes only `DOC/design-read/`. No code.
- `repli-to-nextjs-phase1.2-kit-builder.agent.md` - scaffolds Next.js 15 + Tailwind v4 with tokens wired, builds the UI primitive library, exposes `/_dev/kit` preview. No public pages, no composite sections.
- `repli-to-nextjs-phase1.3-section-builder.agent.md` - composes the section library from primitives, batched <=8 per work unit, exposes `/_dev/sections/[slug]` previews. No public pages.
- `repli-to-nextjs-phase1.4-page-composer-qa.agent.md` - composes all public pages from typed data + sections, wires global header/footer/mobile-nav, runs Playwright + pixelmatch parity at `<=5%` per route per viewport. Hands off to Phase 1.5.

Use this lane when the user wants pure native Next.js + React from day one with screenshots as the only input. Use the `phase1.1-pixel-replicator.agent.md` HTML lane instead when the user explicitly wants the HTML intermediate (closer parity, easier diffing) or has a live source URL.

Phase 1 and Phase 1.1 are alternative entrypoints. Use Phase 1.1 when you need the tightest possible visual match to the screenshots. Both feed into the same downstream frontend lanes and backend/deploy phases.
Phase 1.2 is the default next step when the user goal is simply: locate the Phase 1.1 replica folder, preserve it as source of truth, and generate a frontend-only pixel-perfect Next.js project. It must not ask optional "if you want" follow-up questions for executable migration work.
Phase 1.3 is the default next step when the user goal is stricter: locate the Phase 1.1 replica folder and generate a separate pure native Next.js frontend that is ready for backend/devops work without accepting bridge ownership as complete.
Phase 1.5 is the production hardening lane that runs after Phase 1.4. It does not redo native ownership; it closes the remaining production gap (parity tightening, performance, SEO/structured data, accessibility, maintainability, scalability, typed backend handoff, optional marketplace packaging) so the frontend is safe to hand off to Phase 4/5/7 without limiting future scaling.
Phase 1.4 is the stricter repair/verification lane when the input is a raw HTML/static template or when a prior Next.js attempt still relies on HTML files, HTML parsers, public HTML ownership, generated dumps, legacy script behavior, or hidden bridge runtime.

## Rebrand & Industry-Switch Lane
Two-agent sequential lane that takes a built Next.js site (Phase 1.4 `pages_ready_for_hardening` or Phase 1.5 `hardening_complete`) and rebrands every content surface (text, CTAs, testimonials, images, SEO, brand marks, JSON-LD) — optionally switching industry (car -> plumbing, solar -> agency, etc.) — while keeping theme tokens, components, routing, layout, and motion byte-identical.
- `rebrand-phase2.1-planner.agent.md` - plan-only. Emits brand bible, industry translation map, content inventory with per-slot char budgets, downloadable image swap plan (industry-keyword queries), SEO + JSON-LD plan, surface-leakage scan, all under `DOC/rebrand/`. Writes nothing into `src/` or `public/`.
- `rebrand-phase2.2-executor.agent.md` - applies the plan. Downloads industry-matched images into `public/images/` via user-supplied folder, Pexels API, Pixabay API, or workspace stock (no external CDN hotlinks in the final site). Rewrites typed text under per-slot char budgets. Swaps logo, favicon, OG/Twitter share. Updates `manifest.json`, `package.json` (name/description only), JSON-LD, robots, sitemap. Brand-name-substitutes legal pages (no policy rewrites). Runs full validation loop including source-brand + source-industry residual grep and zero-CDN image-source scan.

Default rebrand scope: text + images + brand marks. Color tokens and fonts preserved unless the user explicitly requests a visual rebrand. Legal pages: brand-name substitution only. Image download is download-only — every image lives at `public/images/...` and is recorded with full attribution under `DOC/rebrand/image-attribution.md`. Phase 2.2 refuses to edit components, page composition, layout structure, tokens, or motion; defects there are returned to Phase 1.2 / 1.3 / 1.5.

Use this lane when an already-built screenshot-replicated site needs to be rebranded or repurposed for a different brand or industry without rebuilding theme, components, or UI/UX core.

## Project Starter Package
Shared phase1 and DOC-system phase2 agents now bootstrap missing project-local continuation roots from:
- `.github/project-starters/hybrid-canonical-project-starter/`

Bootstrap script:
- `.github/project-starters/bootstrap-hybrid-canonical-project-starter.ps1`

This is the canonical DOC plus local-agent source for new website project roots.
Historical exports such as `DOC-System-Export-20260518-100741/` remain reference snapshots, not the starter source.

## [REPLI SYSTEM] Frontend Lane
These agents keep the current screenshot-first completion workflow:
- `phase2-frontend-planning.agent.md`
- `phase2-frontend-completion.agent.md`
- `phase3-frontend-polish.agent.md`

Use this lane when the site should stay rooted in what Phase 1 visibly replicated, and the remaining work is truthful route/state completion plus polish.

### [REPLI SYSTEM] Candidate Track
These candidate agents preserve the locked REPLI baseline while testing earlier deployability and a dedicated Next.js migration step:
- `phase2-frontend-planning-deployable-candidate.agent.md`
- `phase2-frontend-completion-deployable-candidate.agent.md`
- `phase2.5-nextjs-migration-candidate.agent.md`
- `phase2.6-nextjs-native-completion.agent.md`

Use this track when you want to test earlier Vercel plus subdomain deploy readiness before the shared phase-7 lane, or when you want to validate a separate Next.js migration and production-template completion pass without changing the locked REPLI agents.
Use `phase1.2-replica-to-nextjs-frontend.agent.md` before this candidate track when the current pain point is not production-template architecture, but the simpler repeatable task: Phase 1.1 replica folder in, separate frontend-only pixel-perfect Next.js project out.
Use `phase1.3-replica-to-native-nextjs-frontend.agent.md` instead of Phase 1.2 when the current pain point is the stricter repeatable task: Phase 1.1 replica folder in, separate pure native Next.js frontend out, with bridge shortcuts forbidden at completion.
Use `phase1.4-html-to-verified-native-nextjs-frontend.agent.md` when the current pain point is stricter still: raw HTML/static source or a failed HTML-backed Next.js attempt must be converted into a verified pure native output with route ownership proof, purity scans, and measured parity evidence.
Use `phase2.6-nextjs-native-completion.agent.md` when the site is already visually approved but still relies on legacy HTML-backed ownership, generated page dumps, legacy runtime scripts, `.html` route ownership, fake forms, localStorage-only commerce, or missing production flow contracts. This phase must produce a pure Next.js App Router client template with exact visual parity, canonical routes, reusable shell/sections/data, native lead-gen and commerce contracts, SEO, tests, and legacy retirement.

## [DOC SYSTEM] Frontend Lane
These agents start from the same Phase 1 replica but let you reshape the site around your own authored plan:
- `phase2-doc-system-planning.agent.md`
- `phase2-doc-system-frontend-dev.agent.md`
- `phase2.1-doc-system-frontend-dev.agent.md`
- `phase2.2-doc-system-frontend-specialist.agent.md`
- `phase3-doc-system-polish.agent.md`

Use this lane when the screenshot provides the starting substrate, but your own plan should redefine route architecture, page composition, content direction, conversion flow, and shared UX surfaces.
Use `phase2.1-doc-system-frontend-dev.agent.md` when the authored plan needs a more specialist frontend execution pass: stronger visual direction, more distinctive layout composition, richer interaction and motion craft, and more intentional app-like mobile behavior while keeping the same DOC-system contract.
Use `phase2.2-doc-system-frontend-specialist.agent.md` when you want an independent frontend-specialist build pass inside a chosen `FRONTEND DEV` root: build the startup theme, shared sections, reusable blocks, and core components directly from the authored brief or plan without scanning unrelated reference-style folders or sibling frontend projects.

## Backend & Deploy Lane
These are additive agents for the imported backend/deploy workflow. They operate against the isolated bundle under `Backend & Deploy/` and do not replace either frontend lane:
- `phase4-foundation-planning.agent.md`
- `phase4-foundation-development.agent.md`
- `phase5-template-import-attach.agent.md`
- `phase6-post-import-continuation.agent.md`
- `phase7-template-deployment.agent.md`

Use this lane only after either frontend lane is already complete enough to be imported, attached, continued, and prepared for deployment.

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

## Core Git Management
These are root-level Git governance assets for the workspace itself:
- `github-agent.agent.md`

Use this root agent when the work is about repo targeting, onboarding a new repo, commit or pull or push safety, factory-backup routing, or workspace Git registry updates.
The canonical support root for this agent lives under `.github/git-workspace-manager/`, and its human-facing owner brief is `.github/Github_Agent.md`.
This is a core root system for the Testing factory, not an isolated local subsystem.

## Generic SaaS Delivery Entry
This is the optional one-agent generalist entrypoint for SaaS project work:
- `senior-saas-developer.agent.md`

Use this root agent when you want one senior developer role that first audits the current project end-to-end, then plans, implements, refactors, debugs, validates, and documents the work across frontend and backend.
It does not replace the existing phase lanes, project wrappers, or backend/deploy continuation lane. It is a convenience entrypoint for users who want one generic senior builder while still respecting project docs, lane rules, quality gates, and local-only Git discipline.

## Project Wrapper Entries
These are root-selectable wrappers that delegate to project-local canonical agents:
- `growrixos-strict-executor.agent.md` -> `On Going DOCS/Growrixos/.github/agents/project-strict-executor.agent.md`
- `agentic-migrator-core.agent.md` -> `Claude Agents/agentic-migrator/.github/agents/agentic-migrator-core.agent.md`

Use these wrappers when you need picker visibility from the root surface but want execution behavior to follow the local project agent contract.

## Safety Rules
- Keep Phase 1 unchanged as the shared frontend entrypoint.
- Use Phase 1.2 after Phase 1.1 when the user wants a no-drama frontend-only Next.js pixel migration from a located replica folder.
- Use Phase 1.3 after Phase 1.1 when the user wants the same folder-in workflow but requires pure native Next.js frontend readiness rather than a bridge or baseline prototype.
- Use Phase 1.5 after Phase 1.4 finishes its native ownership contract and the work remaining is production hardening, SEO/perf/a11y lock, data/token centralization, typed backend handoff, and (optionally) marketplace template packaging. Do not use it to reopen 1.4 ownership decisions.
- Use Phase 1.4 when the source is raw HTML/static pages or a prior Next.js migration is HTML-backed and the job requires verified native ownership evidence rather than another wrapper.
- When shared phase1 or DOC-system phase2 initializes a project root, attach the hybrid canonical project starter package before continuing.
- Choose exactly one frontend-building lane after Phase 1: `[REPLI SYSTEM]` or `[DOC SYSTEM]`.
- Both frontend lanes must converge into the same later Phase 5, 6, and 7 process.
- Treat phase4-7 as an opt-in continuation lane.
- Use `github-agent.agent.md` for workspace Git operations instead of repurposing frontend or backend agents for repo management.
- Use `senior-saas-developer.agent.md` when you want one generic senior generalist for project delivery instead of manually selecting separate plan, execution, refactor, and debug roles.
- Use the meta lane for system structure work before editing delivery lanes directly.
- Use `agent-builder-modes2.agent.md` when the goal is to design an agent in Mode 1 and output one final `agent.md` in Mode 2 without changing shared governance.
- Keep backend/deploy artifacts under `Backend & Deploy/` unless the user explicitly asks to promote them into the main root.
- Do not mutate source frontend projects in place during phase5 import/attach work.
- Use project wrapper entries for project delivery roles; do not route project feature work through `github-agent.agent.md`.
- Do not route system-governance work or workspace Git-topology work through `senior-saas-developer.agent.md`.

## Convergence Contract
- `[REPLI SYSTEM]` and `[DOC SYSTEM]` are frontend-only alternatives.
- They must produce the same kind of frontend-complete outcome: a working Next.js project that can enter the existing backend/deploy continuation lane.
- Phase 5, Phase 6, and Phase 7 stay shared and unchanged.

## Selection Guide
- Choose `[REPLI SYSTEM]` when you want to keep the Phase 1 screenshot-derived site and finish the missing truth behind it.
- Choose `phase1.2-replica-to-nextjs-frontend.agent.md` when the desired workflow is "I locate the Phase 1.1 replicated folder; the system outputs a pixel-perfect frontend-only Next.js project" and production integrations are out of scope.
- Choose `phase1.3-replica-to-native-nextjs-frontend.agent.md` when the desired workflow is "I locate the Phase 1.1 replicated folder; the system outputs a pure native, backend/devops handoff-ready Next.js frontend" and bridge outputs must be blocked instead of accepted.
- Choose `phase1.4-html-to-verified-native-nextjs-frontend.agent.md` when the desired workflow is "I have raw HTML/static pages or a failed HTML-backed Next.js attempt; the system must output a verified pure native Next.js frontend with purity scans and route-by-route ownership proof."
- Choose the `[REPLI SYSTEM]` candidate track when you want to test earlier frontend-only Vercel plus subdomain deployment or a separate full Next.js migration step while preserving the locked REPLI baseline.
- Inside the `[REPLI SYSTEM]` candidate track, choose `phase2.6-nextjs-native-completion.agent.md` when the runtime already builds and looks correct but the project still needs final production-template migration: canonical App Router ownership, reusable component/data architecture, native lead-gen and commerce flows, SEO, tests, and explicit retirement of HTML/legacy/script ownership.
- Choose `[DOC SYSTEM]` when you want to use the Phase 1 replica only as a starting base, then rebuild the site around your own authored plan.
- Inside `[DOC SYSTEM]`, choose `phase2-doc-system-frontend-dev.agent.md` for the standard transformation pass and `phase2.1-doc-system-frontend-dev.agent.md` when the plan requires frontend-specialist execution quality beyond the standard Phase 2 agent.
- Inside `[DOC SYSTEM]`, choose `phase2.2-doc-system-frontend-specialist.agent.md` when you want a more independent startup-theme builder that stays locked to the target `FRONTEND DEV` root and does not go hunting through unrelated references.
- Choose `senior-saas-developer.agent.md` when you want one generic senior SaaS developer to audit the current project first and then decide planning versus execution without manually switching roles.
- Choose `agent-builder-modes2.agent.md` when you want a blueprint-first agent-authoring workflow that ends in one ready-to-use `agent.md` file.

Do not run both frontend lanes on the same site in the same pass.