# New Site

Scaffold a new single-file HTML template website and start the full build flow.

## Inputs

If the user supplied arguments after the command, parse them as: site name, then optional site type/brief. If the site name is missing, ask for it (and optionally the site type: SaaS, agency, restaurant, portfolio, e-commerce, healthcare, ...). Do not ask for anything else — make senior-level decisions.

## Steps

1. **Determine the serial number**: list `sites/` (create the folder if missing). Find the highest leading integer among files matching `NN. *-website.html`; the new serial is that + 1, zero-padded to 2 digits (first file = `01`).
2. **Build the filename**: kebab-case the site name → `sites/NN. site-name-website.html`.
3. **Scaffold**: copy `.cursor/skills/html-website-builder/assets/boilerplate.html` to that path.
4. **Detect complexity**: if the brief requires **10+ pages/views** (marketing + services + lead-gen + legal + blog, multi-page SPA, e-commerce platform, etc.), use **Complex site mode (2-phase)** from the skill — run **Phase 1 only** (design system + shell + homepage). Do NOT build inner pages in this command when complex.
5. **Build**:
   - **Complex (Phase 1):** delegate to `frontend-architect` with scope locked to Phase 1; delegate tokens to `design-system-architect` first.
   - **Simple (≤5 sections):** follow the skill end-to-end in one pass via `frontend-architect`.
6. **Confirm**: report file path, planned view list (all phases), design direction, and whether this is Phase 1 (awaiting approval) or complete delivery.
7. **Phase 2:** user runs `/new-site-phase2` after approving Phase 1 visuals.
