---
document_type: page-plan
page_id: blog-overview
route: /blog
scope: marketing
build_stage: 4-page-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
  - home-page.md
---

# Blog Overview Page

## Page Definition
- Purpose: turn educational content into a trust-building acquisition surface that supports SEO, showcases technical depth, and routes readers into service or consultation flows.
- Target audience: founders, product teams, operators, and technical buyers researching SaaS architecture, websites, MCP servers, automation, and delivery strategy.
- Primary CTA: Read an Article.
- Secondary CTA: Book Appointment.

## Sections In Visual Order

### 1. Header and Navigation
- Content: standard global header with Blog added to the primary route model.
- Components: header, utility ribbon, booking CTA.
- State requirements: default, scrolled, mobile drawer open.

### 2. Blog Hero
- Content: editorial headline, short value statement, featured tag cluster, and clear CTA into the latest featured article.
- Components: hero block, eyebrow badge, CTAs, metadata row.
- Responsive notes: maintain an editorial first impression with compact supporting metadata on mobile.

### 3. Featured Article Rail
- Content: one lead article with larger visual weight plus supporting highlights for two additional posts.
- Components: large featured card, supporting cards, tags, reading-time metadata.
- Interaction notes: featured card should route directly to the article slug.

### 4. Blog Listing With Sidebar Menu
- Content: article cards in the main column and a sticky sidebar with category links, popular tags, editorial picks, and a conversion CTA.
- Components: listing cards, sidebar cards, filter links, CTA panel.
- State requirements: loaded, filtered-empty, and initial empty fallback.
- Interaction notes: sidebar links should work as query-param filters so views remain shareable.

### 5. Topic Tags and Filtering
- Content: visible selected filter state, tag pills, category counts, and a clear reset action.
- Components: filter chips, active-state badges, reset link.
- Interaction notes: filters should preserve shareable URLs and avoid hidden client-only state.

### 6. Newsletter or Consultation CTA Band
- Content: invite readers to book a strategy session or continue through another trust path like portfolio.
- Components: CTA band, dual buttons, reassurance copy.

### 7. Footer
- Content: standard global footer with Blog discoverability retained in the information architecture.
- Components: footer groups, legal links, contact utilities.

## State Requirements
- Listing handles category and tag filtering via query params.
- Empty state explains that no articles match the current filter and offers a reset path.
- Sidebar remains useful even when the filtered result set is small.

## Responsive Adaptation
- Desktop uses a two-column editorial layout with a sticky sidebar.
- Tablet keeps the sidebar below the hero and above the article grid if space becomes constrained.
- Mobile collapses sidebar modules into stacked cards above the listing and keeps tags horizontally scrollable when needed.

## SEO and Metadata
- Title: Agency Blog | SaaS Build Notes, Automation Playbooks, and Technical Guides.
- Description: Practical articles on SaaS product delivery, website performance, MCP servers, automation systems, and technical decision-making.

## Conversion Path
- Primary path: Blog hero -> Featured article -> Blog detail -> Book Appointment.
- Secondary path: Blog listing -> Tag filter -> Related article -> Services or portfolio.