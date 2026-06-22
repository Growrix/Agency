# Conversion QA Checklist

Use after either direction. Fix all **P0/P1** items before sign-off.

## Both directions

- [ ] Serial + naming convention matches (`NN. site-name-website.html` ↔ `Frontend_Nextjs/NN-site-name/`)
- [ ] All routes/views from map file implemented
- [ ] Brand, nav, and primary CTAs present on every view
- [ ] Dark mode works (`[data-theme="dark"]` or `next-themes`)
- [ ] `prefers-reduced-motion` respected
- [ ] Keyboard navigation + visible `:focus-visible` on all interactives
- [ ] Single `<h1>` per view/page
- [ ] No emoji used as icons

---

## HTML → Next.js (Track A)

- [ ] Source HTML untouched in `sites/`
- [ ] `MIGRATION-MAP.md` / `.json` written in target folder
- [ ] No copy/nav/brand hardcoded in TSX (uses `config/` + `content/`)
- [ ] Interactive routes are React views — not prose JSON with embedded forms
- [ ] Component CSS in `@layer components`; icons in `components/icons/`
- [ ] `pnpm build` passes, zero TS errors
- [ ] `nextjs-accessibility-auditor` PASS
- [ ] `nextjs-performance-optimizer` PASS
- [ ] `nextjs-code-reviewer` PASS
- [ ] `nextjs-visual-parity-auditor` PASS (zero P0/P1)
- [ ] Dev server HTTP 200 validated (no duplicate server)

---

## Next.js → HTML (Track B)

- [ ] Exactly one `.html` file in `sites/`
- [ ] One `<style>` block, one `<script>` block — no external deps
- [ ] Opens offline by double-click
- [ ] Zero Tailwind/React/Next artifacts in output
- [ ] Section comment boundaries on every extractable block
- [ ] Hash router covers all App Router paths
- [ ] `:root` tokens match source Next app
- [ ] BEM class names preserved from migration
- [ ] JS `init()` calls all `initX()` functions
- [ ] `accessibility-auditor` PASS
- [ ] `performance-optimizer` PASS
- [ ] `code-reviewer` PASS
- [ ] Parity vs original HTML or live Next app (if available)

---

## Sign-off artifacts

| Direction | Artifact | Location |
|---|---|---|
| HTML → Next | `MIGRATION-MAP.md`, `PARITY-SIGNOFF.md` | `Frontend_Nextjs/NN-site-name/` |
| Next → HTML | `EXPORT-MAP.md`, `EXPORT-SIGNOFF.md` | `Frontend_Nextjs/NN-site-name/` (optional) |
