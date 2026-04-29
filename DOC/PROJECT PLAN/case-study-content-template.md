---
document_type: cms-content-template
content_type: case-study
status: active
last_updated: 2026-04-30
---

# Case Study Content Template

## Purpose
- Use this template to prepare complete `caseStudy` entries for portfolio slug pages.
- Keep the content proof-driven, specific, and commercially useful.

## Writing Rules
- Project name should match how the brand is known publicly.
- Summary should explain what was built and why it mattered.
- Metric should be a strong headline proof point.
- Challenge, strategy, and results should be concrete.
- Gallery images should be real product or project screenshots.

## Copy Template

```yaml
name: "Three Circles"
slug: "three-circles"
industry: "Interior Design"
serviceSlug: "websites"
summary: "A premium company website for an interior design brand focused on elegant presentation, stronger trust, and easier inquiry conversion."
metric: "+37% more qualified inquiries in the first 60 days"
accent: "from-stone-500 to-amber-700"
published: true
featuredRank: 12
heroImage:
  instruction: "Upload a real homepage or branded hero screenshot"
heroImageAlt: "Homepage view of the Three Circles interior design company website"
client: "Three Circles"
year: "2026"
duration: "4 weeks"
team: "Strategy, Design, Frontend, CMS"
challenge:
  - "The previous website looked generic and did not reflect the premium nature of the brand."
  - "The inquiry path was weak and did not support trust-building."
strategy:
  - "Redesigned the content hierarchy around trust, service clarity, and featured work."
  - "Built a more premium visual system with stronger spacing, typography, and CTA rhythm."
  - "Prepared the content structure for easier CMS updates."
build:
  - label: "Platform"
    value: "Next.js + Sanity"
    hint: "Fast editing and modern frontend stack"
  - label: "Scope"
    value: "Marketing website"
    hint: "Service pages, proof blocks, lead capture"
results:
  - label: "Qualified inquiries"
    value: "+37%"
    hint: "First 60 days"
  - label: "Time on site"
    value: "+22%"
    hint: "After relaunch"
  - label: "Bounce rate"
    value: "-18%"
    hint: "Homepage improvement"
gallery:
  - instruction: "Upload 2-5 real supporting screenshots with proper alt text"
```

## Field Intent Guide
- `name`: Public project title.
- `slug`: Public portfolio URL key.
- `industry`: Visible industry label.
- `serviceSlug`: Connects the case study to a service route.
- `summary`: Short overview used in cards and detail page intro.
- `metric`: Headline proof point.
- `accent`: Gradient styling pair.
- `heroImage`: Main portfolio image.
- `client`, `year`, `duration`, `team`: Quick project context.
- `challenge`: What problem existed before the work.
- `strategy`: What decisions or changes were made.
- `build`: Key implementation facts.
- `results`: Measurable outcome entries.
- `gallery`: Supporting visuals.

## AI Prompt Hint
```text
Create a complete Growrix OS case study using the project template in DOC/PROJECT PLAN/case-study-content-template.md. Make it specific, realistic, commercially credible, and focused on measurable business outcomes.
```
