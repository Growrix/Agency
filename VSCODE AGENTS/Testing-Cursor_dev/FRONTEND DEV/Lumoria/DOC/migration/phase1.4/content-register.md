# Content Register

Date: 2026-05-23

## Content Sources
- Screenshot references from On Going DOCS/Reference Style/Lumoria
- Localized media assets under public/lumoria-assets
- Legacy localized HTML snapshots retained only as migration evidence under public/lumoria-pages

## Native Typed Content Ownership
- src/data/site-content.ts now owns:
  - page route map and page metadata content
  - navigation and footer link structures
  - reusable service, team, portfolio, blog, awards, timeline, pricing, and FAQ datasets
  - contact and flow content contracts
- src/data/screenshotRoutes.ts remains as screenshot route inventory evidence

## Runtime Ownership Decision
- Runtime route rendering no longer reads content from HTML snapshot files
- Runtime content now flows from typed data modules into native components

## Status
- Phase 1.4 typed content ownership gate: PASS
