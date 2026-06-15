---
name: html-website-builder
description: Build a production-grade, single-file HTML template website (vanilla HTML/CSS/JS, no frameworks). Use whenever the user asks to build, create, or scaffold a website, landing page, template, or HTML site, or to add/redesign sections of an existing site in sites/.
---

# HTML Website Builder

Authoritative playbook for building one self-contained, enterprise-grade `.html` website file. The tech contract is locked (see `AGENTS.md`): vanilla HTML5 + custom CSS (tokens) + vanilla JS. No frameworks, no CDNs, no build step.

## Output contract

- Save to `sites/NN. site-name-website.html`
- `NN` = next zero-padded serial: list `sites/`, find the highest leading number, add 1 (first file = `01`)
- `site-name` = kebab-case site name
- One file. One `<style>` block. One `<script>` block.

## Complex site mode (2-phase) — REQUIRED for large builds

**Trigger** when ANY of these apply:
- Brief requests **10+ distinct pages/views**
- Brief includes multi-page SPA (marketing + services + lead-gen + legal + blog)
- User says "phase", "homepage first", or "2-phase"
- E-commerce, lead-gen platform, or enterprise multi-section site with 15+ required views

**Never build 20+ views in one pass.** Breadth-first one-shot builds produce average visuals.

### Phase 1 — Design system + shell + homepage (STOP for approval)

1. Analyze requirements and list ALL planned views (for Phase 2), but **build only Phase 1 scope**
2. Delegate token system to `design-system-architect` first
3. Build global shell: header, nav/mega menu, footer, mobile bottom nav, FAB, sticky CTAs, theme toggle
4. Build the **complete homepage** with every section fully polished — dedicated CSS per section, premium hero art (not form-only), zero inline `style=` attributes
5. Hash router: only `#/` (home) fully active; other routes show styled placeholder or minimal 404 until Phase 2
6. Interactivity for shell + homepage only (scroll reveal, counters, hero form, announce rotator, etc.)
7. Run `accessibility-auditor` + `performance-optimizer`; fix all blocking findings
8. **STOP** — report file path, design summary, and wait for explicit user "continue phase 2" before adding inner views

**Phase 1 quality bar:** The homepage alone should look template-ready. Target ~2,500–3,500 lines for Phase 1 alone on complex sites.

### Phase 2 — Inner pages (after user approval)

Use `/new-site-phase2` or explicit user continuation.

1. Re-read the Phase 1 file — **do not change the design system or homepage** unless fixing bugs
2. Add all remaining views using locked Phase 1 templates:
   - **Tier A:** `.page-hero` + `.content__prose` (About, legal, FAQ)
   - **Tier B:** page-hero + features + CTA (service pages)
   - **Tier C:** lead-gen flows (quote, calculator, inspection) — re-skin with Phase 1 form components
   - **Tier D:** trust/content (case studies, blog, reviews)
3. Expand router with all routes; port proven JS logic from reference files if rebuilding
4. Full audit trio: `accessibility-auditor`, `performance-optimizer`, `code-reviewer`

### Simple site mode (single-phase)

Landing pages, portfolios, or sites with **≤5 sections and ≤3 views** may use the single-phase process below in one pass.

## Build process (follow in order)

### Step 1 — Analyze requirements

Identify: site type (SaaS, agency, restaurant, portfolio, e-commerce, healthcare, ...), brand personality, target audience, required sections, primary CTA. If the user gave minimal input, make confident senior-level decisions — do not stall on questions for template work.

### Step 2 — Architecture and component map

List the sections top-to-bottom (e.g., Nav → Hero → Logos → Features → How-it-works → Testimonials → Pricing → FAQ → CTA → Footer) and the reusable components they share (buttons, cards, badges, section-heading pattern, form fields).

### Step 3 — Design system

Produce the full token block per `references/design-system.md` BEFORE writing any section markup. Choose a distinctive palette and type treatment that fits the brand — avoid generic "bootstrap blue" defaults. Verify AA contrast for every text/bg pair in both themes.

### Step 4 — Scaffold

Copy `assets/boilerplate.html` as the starting skeleton. Fill in head metadata (title, description, OG/Twitter, JSON-LD per `references/seo-checklist.md`).

### Step 5 — Build sections

Build each section mobile-first inside comment boundaries:

```html
<!-- ========== SECTION: Hero ========== -->
<section id="hero" class="hero">...</section>
<!-- ========== /SECTION: Hero ========== -->
```

Use the patterns in `references/component-patterns.md`. Real, persuasive copy — never lorem ipsum. Inline SVG for all graphics/icons.

### Step 6 — Interactivity

Implement JS as per-component `initX()` functions: theme toggle (persisted), mobile nav (focus-trapped), scroll reveal (`IntersectionObserver` + reduced-motion guard), form validation (inline errors, `aria-live` status), plus any section-specific behavior (tabs, accordion, counters).

### Step 7 — Responsive pass

Verify mentally (and with the browser if available) at 320, 375, 768, 1024, 1280, 1920, 2560px. No horizontal scroll, no broken grids, touch targets ≥ 44px.

### Step 8 — Accessibility pass

Run `references/accessibility-checklist.md` line by line. Fix everything.

### Step 9 — Performance and SEO pass

Run `references/performance-checklist.md` and `references/seo-checklist.md` line by line.

### Step 10 — Code review and refactor

Self-review: no duplication, no unused CSS/JS, no hardcoded values where a token exists, consistent BEM naming, valid HTML. Refactor before declaring done. For high-stakes builds, delegate audits to the `accessibility-auditor`, `performance-optimizer`, and `code-reviewer` subagents.

## Final QA checklist (all must pass)

- [ ] File named `NN. site-name-website.html`, located in `sites/`
- [ ] Opens by double-click with zero console errors
- [ ] No external network dependencies
- [ ] Design tokens complete; no raw values in component CSS
- [ ] Dark mode works (toggle + system preference + persistence)
- [ ] Responsive 320px → 2560px, mobile-first
- [ ] Keyboard-only navigation works end-to-end; focus visible everywhere
- [ ] WCAG AA contrast in both themes
- [ ] `prefers-reduced-motion` respected
- [ ] Full SEO head + JSON-LD
- [ ] All images sized (no CLS); only `transform`/`opacity` animated
- [ ] Section comment boundaries present; JS is per-component `initX()` functions
- [ ] Real copy, no placeholders or TODOs
