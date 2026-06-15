# Deliverable Templates

Markdown skeletons for the 12 project files. Each agent fills its file using the matching skeleton. Keep headings stable so projects are comparable. Replace all bracketed prompts with real, specific content — never leave placeholders or TODOs.

Every file should begin with this front block:

```
# <Project Name> — <Document Title>
Project: <NN-project-name>  |  Stage: <NN>  |  Author agent: <bp-agent-id>
Status: draft | locked
```

---

## 01-industry-report.md
```
## Business summary
## Industry & sub-industry
## Target audience (segments, demographics, psychographics)
## Market maturity (emerging / growing / mature / saturated)
## Buyer psychology — why do customers buy?
## Why now? (urgency triggers)
## Conversion triggers (what makes them act)
## Conversion blockers (what stops them)
## Trust factors (what they need to believe)
## Customer awareness level (unaware → most aware) + dominant level
## Primary conversion goal
## Key takeaways for downstream agents
```

## 02-competitor-analysis.md
```
## Method & sources
## Typical competitor websites (patterns observed)
## Overused patterns / industry clichés (what EVERYONE does)
## Whitespace opportunities (what NOBODY does)
## Things to deliberately avoid
## Visual & UX gaps we can exploit
## Differentiation openings (handed to positioning)
## Challenge to Stage 01 (any contradictions found)
```

## 03-brand-positioning.md
```
## Positioning statement (one sentence)
## Core value proposition
## Messaging hierarchy (primary → secondary → tertiary messages)
## Differentiation strategy (the angle nobody else owns)
## Brand voice & tone
## Proof points / reasons to believe
## What we are NOT (anti-positioning)
## Challenge to Stage 02 (is the differentiation real and defensible?)
```

## 04-visual-architecture.md
```
## Chosen primary visual style (one, from the style library)
## Why this style (vs the obvious industry choice)
## What it signals to the buyer
## Layout philosophy
## Design language (shapes, texture, imagery direction)
## Grid system (from the grid database) + why
## Motion style direction (high-level; detailed later in Stage 09)
## Color direction (palette story, light + dark intent)
## Typography direction (pairing + personality)
## Uniqueness check vs prior projects (style/grid not reused for this industry)
## Challenge to Stage 03 (does the visual express the positioning?)
```

## 05-homepage-composition.md
```
## Chosen composition (from the composition library) + why
## Section order (top → bottom) with purpose of each
## Narrative flow (the story the scroll tells)
## Conversion sequence (where/why each ask appears)
## Justification vs default (why not Hero→Features→Testimonials→CTA)
## Mobile narrative considerations
## Challenge to Stage 04 (does the composition suit the style + audience?)
```

## 06-hero-system.md
```
## Chosen hero type (from the hero database) + why
## Layout anatomy (what sits where)
## Interactions (what moves / what the user can do)
## Visual hierarchy (primary → secondary → tertiary)
## CTA structure (primary + secondary)
## Responsive behavior (desktop → mobile)
## Reduced-motion fallback
## Uniqueness check vs prior projects (hero not reused for this industry)
## Challenge to Stage 05 (does the hero open the chosen narrative?)
```

## 07-conversion-system.md
```
## Primary conversion goal (restated)
## CTA hierarchy (primary / secondary / tertiary) — and WHY each exists
## Lead magnets / offers
## Booking / contact / funnel strategy
## Form strategy (length, steps, fields, friction reduction)
## Trust & risk reversal elements
## Micro-conversions along the journey
## Measurement / success signals
## Challenge to Stage 06 (does the hero CTA align with the funnel?)
```

## 08-interactive-experience.md
```
## Signature interactive tool (industry-specific) — name + concept
## Why this tool fits the buyer + industry
## What the user inputs / what they get out
## Where it lives in the journey
## How it drives conversion (ties to Stage 07)
## Secondary interactive moments (optional)
## Accessibility & fallback (keyboard/touch/no-JS path)
## Uniqueness check vs prior projects (tool not reused)
## Challenge to Stage 07 (does the tool advance the funnel?)
```

## 09-motion-system.md
```
## Chosen motion philosophy (from the motion database) + why
## Timing tokens (durations + easings)
## Hover states (buttons, links, cards, nav, media)
## Scroll reveals (triggers, stagger, distance, easing)
## Page / route transitions
## Loading interactions (skeletons, spinners, progress, first paint)
## Signature motion moments
## Reduced-motion plan (what each effect collapses to)
## Uniqueness check vs prior projects (motion not reused)
## Challenge to Stage 04/08 (does motion match style + interactions?)
```

## 10-component-system.md
```
## Component style families (card / nav / CTA / form) + rationale
## Buttons (variants + all states)
## Forms (style + all states + validation + aria-live)
## Cards (variants)
## Modals / dialogs
## Tables
## Alerts / toasts
## Navigation (desktop + mobile)
## Badges / tabs / accordions (as needed)
## Radius scale (token ladder)
## Typography scale (display → caption, clamp(), pairing, weights)
## Elevation scale (light + dark)
## Spacing scale + container widths + section padding
## Uniqueness check vs prior projects (component families varied)
```

## 11-frontend-blueprint.md
```
## Breakpoints (named, with px) 
## Grid system spec (columns, gutters, margins per breakpoint)
## Mobile layout (per major section)
## Tablet layout (per major section)
## Desktop layout (per major section)
## Ultra-wide behavior
## Theme system (light/dark token strategy, toggle + system pref)
## Component hierarchy (page → sections → components → primitives)
## Responsive behavior rules (nav, hero, grids, tables, forms)
## State coverage map (loading/empty/error for dynamic UI)
## Accessibility architecture (landmarks, focus order, skip links)
## Performance architecture (asset strategy, animation budget)
## Handoff notes for engineers (no code — architecture only)
```

## 12-final-website-masterplan.md
```
## Executive summary (the website in one paragraph)
## Strategy recap (industry → positioning, condensed)
## Visual DNA (style + grid + color + type)
## Homepage composition + section-by-section spec
## Hero system summary
## Conversion system summary
## Signature interactive tool
## Motion system summary
## Component system summary
## Frontend/responsive blueprint summary
## Uniqueness fingerprint (the 7 dimensions for this project)
## Open questions / assumptions
## Build-ready checklist (can a designer + engineer execute without questions?)
```
