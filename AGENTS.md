# HTML Template Business — Agent Orientation

This workspace produces **production-grade, single-file HTML template websites** sold as templates. Every deliverable is one self-contained `.html` file that opens by double-click with no build step, no server, and no required network dependency.

## Output contract

- Output directory: `sites/`
- File naming: `NN. site-name-website.html`
  - `NN` = zero-padded serial number, incrementing from the highest existing serial in `sites/` (first file is `01`)
  - `site-name` = kebab-case site name
  - Example: `sites/01. modern-saas-website.html`
- Exactly **one file per website**. All CSS lives in a single `<style>` block, all JS in a single `<script>` block at the end of `<body>`.

## Tech contract (locked — do not deviate)

- **Vanilla HTML5 + custom CSS + vanilla JS only.** No React, no Tailwind, no shadcn, no CDN scripts, no frameworks, no build tools.
- Styling: custom CSS design system built on **CSS custom properties** (design tokens) defined in `:root`.
- Motion: CSS transitions/keyframes + `IntersectionObserver` scroll reveals, always gated by `prefers-reduced-motion`.
- Dark mode: token-swap via `[data-theme="dark"]` plus `prefers-color-scheme` default.
- Migration-ready structure so any section can later be extracted into React/Vue/Svelte:
  - Clear section boundaries (`<section id="..." class="...">` with HTML comments marking component boundaries)
  - Component-scoped BEM-style class naming (`.card`, `.card__title`, `.card--featured`)
  - JS organized as small per-component `initX()` functions called from one `init()` entry point

## Quality bar

Enterprise-grade, not MVP: WCAG AA+ accessibility, Lighthouse 95+ performance / 100 accessibility / 100 SEO / 100 best practices, mobile-first responsive (mobile → tablet → laptop → desktop → ultra-wide), full SEO head (meta, Open Graph, Twitter, JSON-LD).

## How to build a site

1. Use the **`html-website-builder`** skill (`.cursor/skills/html-website-builder/SKILL.md`) — it is the authoritative build playbook.
2. Start from `.cursor/skills/html-website-builder/assets/boilerplate.html`.
3. For complex builds, delegate to the subagents in `.cursor/agents/`:
   - `frontend-architect` — lead orchestrator (12-step build process)
   - `design-system-architect` — produces the CSS token system
   - `accessibility-auditor` — readonly WCAG AA+ audit
   - `performance-optimizer` — Core Web Vitals / asset pass
   - `code-reviewer` — readonly final QA gate
4. Use the `/new-site` command to scaffold a new site file.

---

## Dual output contract — preview vs production

This workspace supports **two delivery tracks**. They are independent; never mix their tech contracts in the same output path.

### Track 1 — Client preview (HTML)

- **Directory:** `sites/`
- **Contract:** Locked vanilla HTML/CSS/JS (see above). No frameworks, no build step.
- **Agents:** `frontend-architect`, `design-system-architect`, `accessibility-auditor`, `performance-optimizer`, `code-reviewer`
- **Skill:** `html-website-builder`
- **Command:** `/new-site`, `/new-site-phase2`

### Track 2 — Production delivery (Next.js)

- **Directory:** `Frontend_Nextjs/`
- **Folder naming:** `NN-site-name/` derived from the source HTML file (e.g. `sites/02. sunterra-solar-website.html` → `Frontend_Nextjs/02-sunterra-solar/`)
- **Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, `next-themes`
- **Content:** Repository pattern with typed schemas — `config/site.config.ts`, `content/*.json`, `lib/content/` (CMS-swappable)
- **Agents:** `nextjs-migration-architect`, `tailwind-design-system-architect`, `nextjs-visual-parity-auditor`, `nextjs-accessibility-auditor`, `nextjs-performance-optimizer`, `nextjs-code-reviewer`
- **Skill:** `nextjs-site-migrator`
- **Commands:** `/migrate-to-next`, `/parity-pass`

**Workflow:** Build and approve HTML in `sites/` first → run `/migrate-to-next` to produce the production Next.js app → run `/parity-pass` for pixel-perfect fidelity before client delivery.

---

## Zero-gate health check (all tracks)

After **any** change, agents must verify **0 gate failures** before declaring work complete. See `.cursor/rules/60-zero-gate-health-check.mdc`.

| Track | Directory | Full verification |
|-------|-----------|-------------------|
| Production site | `web/` | `npm run health:check` (lint → typecheck → perf:budgets → test → build → release gates) |
| HTML templates | `sites/` | html-website-builder QA checklist + auditor subagents |
| Next.js migrations | `Frontend_Nextjs/` | build + nextjs-code-reviewer + parity pass |

Also run `ReadLints` on every touched file and keep root `cspell.json` updated for project-specific terms.
