# Spec Template — Per-Page

Emitted by `page_planner`. One file per route, written to `<output_root>/pages/<route-slug>.md`.

`<output_root>` MUST resolve to `DOC/output/runs/<timestamp>/planning/frontend`.

The per-page spec is the artifact codegen reads to produce the page. It MUST be complete enough that no decision is left to codegen.
## Authoring philosophy — outcomes over templates

**Section names describe UX outcomes, not React component names.**
- Write: `"3. Solar impact metrics strip"` not `"3. FeatureSection"`.
- Write: `"2. Full-bleed hero with left-anchored headline and right-side panel image"` not `"2. HeroSection"`.
- The developer resolves what component to build. The spec resolves what the user sees and experiences.

**Visual contracts are binding.**
For every public page, the hero and primary section MUST carry an explicit visual composition contract. The developer MUST implement the declared layout split, media framing, and motion signature — these are not suggestions.

**Every route's hero must be visually distinct.**
The page planner MUST ensure no two routes share the same hero composition (same layout split + same media framing + same typographic scale relationship simultaneously). Write a `visual-differentiation-note` per spec confirming this.
For trust-critical marketing routes and any page covered by a visual reference lock, the per-page spec must also carry an explicit visual composition contract so implementation can be reviewed by screenshot parity instead of prose interpretation alone.

## File frontmatter

```yaml
---
document_type: page-spec
page_id: <slug>
route: /...
project_archetype: marketing_site|saas_app|...
visual_archetype: knowledge/frontend-rules/visual-archetypes/<file>.md
build_stage: 4-page-implementation
auth: public|protected
data_source: static|cms|database|integration|mixed
depends_on:
  - master-ui-architecture.md
  - design-system.md
  - component-system.md
  - motion-system.md
  - content-library.md
content_keys_used:
  - "<surface>.<context>.<key>"
  - ...
---
```

## Required sections (in this order)

### 1. Page Definition
- Purpose (1 sentence).
- Target user intent (1 sentence).
- Primary CTA (label + content key + destination).
- Secondary CTA (label + content key + destination).
- KPI to optimize (e.g., booking rate, demo signup rate, CTR).
- Min sections exempt? (only `true` for 404 / legal / utility).

### 2. Sections in Visual Order
Per section, render this block:

```markdown
### N. <Section Name>
- **Purpose:** <1 line>
- **Content keys:**
  - <key1>
  - <key2>
- **Components:** <Component1>, <Component2>
- **Data source:** static | cms.<query> | database.<query> | integration.<call>
- **Interactions:**
  - <interaction1>
  - <interaction2>
- **States:** loading | empty | error | success | not-found (only those that apply)
- **Responsive:**
  - desktop: <description>
  - tablet:  <description>
  - mobile:  <description>
- **Motion:**
  - macro: <token> + <effect> (purpose: clarity|feedback|hierarchy)
  - micro: <token> + <effect> (purpose: ...)
  - reduced-motion: <fallback>
- **Accessibility:**
  - <ARIA / focus / heading-level note>
```

For trust-critical marketing pages (`/`, `/services`, `/reviews`, `/quote`, and any page declared reference-locked), every primary section must also state:
- **Visual contract:**
  - desktop composition: <panel split / card rail / overlap / shell structure>
  - tablet composition: <stacking and reorder rules>
  - mobile composition: <text-first/media-first, CTA order, dock behavior>
  - media framing: <ratio, crop, subject placement>
  - trust surface: <badge row / aggregate / license slot / phone slot>

### 3. Page-Level State Requirements
- Loading skeleton (where & what).
- Error fallback (where & how to recover).
- Empty/filtered-empty (where applicable).
- Auth state (when protected: redirect or block).
- Network offline (where applicable, e.g., chat, real-time).

### 4. Responsive Adaptation Summary
A single block summarizing how the page composition transforms across breakpoints. Reference responsive declarations from each section.

### 5. SEO and Metadata
```yaml
seo:
  title:        "..."
  description:  "..."
  og_title:     "..."
  og_description: "..."
  og_image:     <key or path>
  canonical:    "<url pattern>"
  schema_org:
    "@context": "https://schema.org"
    "@type":    "..."
    properties:
      ...
```

### 6. Conversion Path
- `primary_path`: ordered surfaces.
- `secondary_path`: ordered alternative.
- `exit_points`: legitimate next destinations.

### 7. Accessibility Plan
```yaml
accessibility:
  landmarks: [header, main, footer, nav]
  skip_link: "#main-content"
  heading_outline:
    - h1: <key>
    - h2: <key>
    - h2: <key>
  notable_aria:
    - "<note>"
  contrast_checks:
    - "<check result>"
  motion_prefers_reduced:
    - "<adapted behavior>"
```

### 8. Performance Plan
```yaml
performance:
  lcp_target_ms: 2500
  hero_image:
    path_or_key: <key>
    format: avif
    weight_kb_target: 200
    priority: true
  route_js_budget_kb_gz: 90
  client_components:
    - <name>: <reason it must be client>
  defer_below_fold: true
```

### 9. Data Fetching Plan
For each section with a non-static data source:
- Fetch location: server component / route handler / client.
- Cache strategy: `force-cache` | `revalidate: <seconds>` | `no-store`.
- Failure mode: how the section degrades if the source fails.

### 10. Form Plan (if the page contains a form)
- Field list with labels (content keys), types, required-flag, validation rules (zod).
- Submit endpoint and method.
- Success state behavior.
- Error states (validation / server-error / network).
- Privacy notice content key (placed adjacent to submit).

### 11. Analytics Plan
- Page-view event name + properties.
- Conversion events (CTA clicks, form submits, signups, purchases).
- All event names referenced from a typed events constant module.

### 12. Open Questions
Anything the page_planner could not resolve from the brief and rules — flagged for the human.

### 13. Asset Brief (required for media-bearing pages)
- Required photo slots.
- Subject guidance per slot.
- Allowed fallback sources.
- Banned fallback sources.
- Alt-text intent.

## Reviewer checks per page spec

- ≥7 sections (or `min_sections_exempt: true` with reason).
- Every section has every required field.
- Every content key resolves to `content-library.md`.
- Every component referenced exists in `component-system.md`.
- SEO block present with title ≤60 and description ≤155.
- Schema.org JSON-LD present where industry pack mandates.
- Accessibility heading outline matches actual H1/H2 structure.
- Performance budgets present and not violated by the composition.
- Conversion path present.
- No raw color/spacing/ms values anywhere.
- Trust-critical pages include visual contracts strong enough for desktop and mobile screenshot review.
- Media-bearing pages include an asset brief.
