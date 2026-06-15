# Website Blueprint Factory — Master Agent Guide

This is your plain-English cheat sheet for the **Website Blueprint Factory**: a team of AI agents inside Cursor that plans world-class websites *before* anyone writes a single line of code. Think of it like a real creative agency (Pentagram, Fantasy, Ueno) packed into your editor.

The big idea: most AI tools jump straight to "designing a website." This system refuses to. It thinks like a strategist first (Who's the customer? Why do they buy? What does everyone else do badly?) and only *then* makes design choices. The result is 12 documents that a designer could design from, an engineer could build from, and a creative director would actually approve.

**Important:** these agents produce **plans and documents only** — never code or a finished website. Building the site is a separate step.

---

## How to think about it (10th-grade version)

Imagine you're opening a custom sneaker brand. You wouldn't pick the shoe's color first. You'd ask: who buys these, what do other brands get wrong, what makes us different — *then* design. This factory does exactly that for websites. Each agent is one specialist on the team, and they pass their work down an assembly line. Later workers are allowed to "talk back" to earlier ones if something seems off.

Everything one project produces lands in a folder: `blueprints/NN-project-name/` (for example `blueprints/01-northwind-pest-control/`), with 12 numbered files inside.

---

## The agents (in order)

### Conductor — `bp-director`
- **Role it plays:** The Creative Director who runs the whole room.
- **What it does:** Starts the project folder, runs all 12 stages in order, makes sure nobody skips ahead to design, and stitches everything into the final plan.
- **How it does it:** Calls each specialist agent one by one, checks the "gates" between stages, and loops back if the uniqueness check fails.
- **Goal:** Deliver a complete, build-ready blueprint that feels custom-made.
- **Use it when:** You want the *entire* website planned in one go. This is the one you'll use most.

### 01 — `bp-01-industry-intelligence`
- **Role it plays:** The market researcher.
- **What it does:** Figures out the industry, the audience, and *why people actually buy* (and why they hesitate).
- **How it does it:** Studies the business, names the buyer's psychology, trust factors, and what triggers or blocks a sale.
- **Goal:** Give everyone downstream the truth about the customer.
- **Output:** `01-industry-report.md`

### 02 — `bp-02-competitor-intelligence`
- **Role it plays:** The "spy" who studies the competition.
- **What it does:** Finds what *every* competitor website does (the boring clichés) and what *nobody* does (the opportunity).
- **How it does it:** Can search the web for real competitor sites, then lists patterns to copy-proof against and gaps to exploit.
- **Goal:** Make sure our site doesn't look like everyone else's.
- **Output:** `02-competitor-analysis.md`

### 03 — `bp-03-positioning-strategist`
- **Role it plays:** The brand strategist.
- **What it does:** Decides the one thing this brand will stand for that rivals can't easily copy, plus the message hierarchy.
- **How it does it:** Turns the research + competitor gaps into a sharp positioning statement and value proposition.
- **Goal:** Own a clear, defensible spot in the customer's mind.
- **Output:** `03-brand-positioning.md`

### 04 — `bp-04-visual-architecture-director` (the most important design agent)
- **Role it plays:** The art director who sets the "look and feel."
- **What it does:** Picks the website's visual DNA — ONE main style (from a library of 17), the layout philosophy, the grid, color and type direction.
- **How it does it:** Matches the style to the positioning, bans "generic SaaS blue" defaults, and checks past projects so it doesn't repeat itself.
- **Goal:** A distinctive visual identity that fits the brand perfectly.
- **Output:** `04-visual-architecture.md`

### 05 — `bp-05-homepage-composition-architect`
- **Role it plays:** The storyteller / journey designer.
- **What it does:** Decides the order of homepage sections and the story the scroll tells.
- **How it does it:** Chooses a narrative pattern (Storytelling, Authority, Marketplace, etc.) instead of the lazy "Hero → Features → Testimonials → CTA."
- **Goal:** A homepage that guides visitors toward action naturally.
- **Output:** `05-homepage-composition.md`

### 06 — `bp-06-hero-system-designer`
- **Role it plays:** The designer of the "first impression" (the top of the page).
- **What it does:** Designs the hero section — layout, what moves, what the main button is.
- **How it does it:** Picks a hero type from a database of 20+ proven patterns and fully specs it for desktop and mobile.
- **Goal:** A first screen that grabs attention and starts the journey.
- **Output:** `06-hero-system.md`

### 07 — `bp-07-conversion-architect`
- **Role it plays:** The "turn visitors into customers" expert.
- **What it does:** Plans every call-to-action, lead magnet, form, and booking flow — and explains why each one exists.
- **How it does it:** Builds a CTA hierarchy tied to the buyer's journey and reduces friction.
- **Goal:** More leads/sales, with no pointless buttons.
- **Output:** `07-conversion-system.md`

### 08 — `bp-08-interactive-experience-designer`
- **Role it plays:** The inventor of the "cool tool."
- **What it does:** Creates at least one interactive feature unique to the industry (a cost calculator, configurator, quiz, visualizer, etc.).
- **How it does it:** Designs what the user types in, what they get out, and how it leads to a sale.
- **Goal:** A memorable, useful tool no competitor has.
- **Output:** `08-interactive-experience.md`

### 09 — `bp-09-motion-director`
- **Role it plays:** The animation director.
- **What it does:** Decides how the site *moves* — hovers, scroll reveals, page transitions, loading.
- **How it does it:** Picks one motion philosophy (e.g. Apple Fluid, Cinematic, Physics) and specifies timings, always with a "reduce motion" fallback.
- **Goal:** Motion that feels intentional and premium, never gimmicky.
- **Output:** `09-motion-system.md`

### 10 — `bp-10-component-system-architect`
- **Role it plays:** The design-system builder (the LEGO-brick maker).
- **What it does:** Defines buttons, forms, cards, modals, tables, alerts, navigation, and the four "scales" (corner roundness, text sizes, shadow depth, spacing).
- **How it does it:** Locks exact values so the whole site is consistent and an engineer could build it.
- **Goal:** A reusable kit of parts that all look like one family.
- **Output:** `10-component-system.md`

### 11 — `bp-11-uniqueness-enforcer` (the gatekeeper, read-only)
- **Role it plays:** The strict judge who prevents copy-paste websites.
- **What it does:** Scores the project on 7 things (style, hero, grid, motion, layout order, components, the special tool) and compares it to all past projects.
- **How it does it:** If the new project matches an old one on 3+ of the 7, it **rejects** it and sends the team back to Stage 04 to try again.
- **Goal:** Every website feels like a different product — even within the same industry.
- **Output:** A PASS/REJECT verdict + a new row in `blueprints/_uniqueness-ledger.md`.

### 12 — `bp-12-frontend-execution-architect`
- **Role it plays:** The technical architect who hands it to engineers.
- **What it does:** Turns the strategy into build-ready frontend architecture (breakpoints, responsive layouts, theme system, component hierarchy) and writes the final master plan.
- **How it does it:** Describes *architecture*, not code, then merges all 11 prior docs into one source of truth.
- **Goal:** A document an engineer can build from without asking questions.
- **Output:** `11-frontend-blueprint.md` + `12-final-website-masterplan.md`

---

## Which agent do I need? (quick picker)

- "Plan a whole website for me" → run **`/new-blueprint`** (uses `bp-director`).
- "Who is the customer and why do they buy?" → `bp-01-industry-intelligence`
- "What are competitors doing? How do I stand out?" → `bp-02-competitor-intelligence`
- "What should this brand stand for?" → `bp-03-positioning-strategist`
- "What should it look like?" → `bp-04-visual-architecture-director`
- "What order should the homepage sections go in?" → `bp-05-homepage-composition-architect`
- "Design the top of the page" → `bp-06-hero-system-designer`
- "Get more leads / sales" → `bp-07-conversion-architect`
- "Add a cool interactive tool" → `bp-08-interactive-experience-designer`
- "How should it animate?" → `bp-09-motion-director`
- "Define the buttons/cards/forms system" → `bp-10-component-system-architect`
- "Make sure it's not a repeat of an old project" → `bp-11-uniqueness-enforcer`
- "Make it build-ready for engineers" → `bp-12-frontend-execution-architect`

---

## How to use these agents in Cursor

### Option A — run the whole factory (recommended)
In the chat, type the slash command:

```
/new-blueprint a premium pest-control company serving Austin homeowners
```

The director will create `blueprints/NN-.../`, run all 12 stages, enforce uniqueness, and report back. This is the best way to get a complete, consistent blueprint.

### Option B — run one agent at a time
Mention the agent by name with `@`, and tell it which project folder to work in. Run them in numerical order so each has the earlier files as context:

```
@bp-04-visual-architecture-director  Work in blueprints/01-northwind-pest-control/. Read stages 01-03 and produce 04-visual-architecture.md.
```

Use this when you want to redo or refine a single stage without rerunning everything.

### Option C — regenerate after a rejection
If `bp-11-uniqueness-enforcer` says REJECT, just tell the director to "regenerate from Stage 04," and it will pick new visual choices until the project is different enough.

---

## Best-practice tips for great results

- **Always go in order.** Strategy (01-03) before design (04+). The whole system breaks if you design first.
- **Give a real brief.** Even one or two sentences about the business, location, and goal dramatically improves output. The agents will fill gaps with senior assumptions and label them.
- **Use a strong/"thinking" model** for `bp-04` (visual director) and `bp-12` (final architect) — these make the heaviest decisions. The director and other stages run fine on the default model.
- **Trust the gatekeeper.** If Stage 11 rejects, let it regenerate — that's the feature that keeps every site unique.
- **Grow the libraries.** Over time, add more heroes/styles/motions to the files in `.cursor/skills/website-blueprint-factory/references/` so the factory has even more variety to pull from.
- **Keep the ledger.** Don't delete `blueprints/_uniqueness-ledger.md` — it's the memory that stops two sites from looking alike.

---

## Where everything lives

- **Agents:** `.cursor/agents/bp-*.md`
- **Playbook + databases:** `.cursor/skills/website-blueprint-factory/` (`SKILL.md` + `references/`)
- **Command:** `.cursor/commands/new-blueprint.md` (the `/new-blueprint` slash command)
- **Project outputs:** `blueprints/NN-project-name/` (12 files each)
- **Uniqueness memory:** `blueprints/_uniqueness-ledger.md`

> This factory only makes **plans**. To turn an approved blueprint into a real website, use the separate HTML build track (`/new-site`) — it's intentionally kept apart so strategy and building never get mixed.
