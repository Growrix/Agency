---
document_type: page-plan
page_id: blog-detail
route: /blog/[slug]
scope: marketing
build_stage: 4-page-implementation
depends_on:
  - 00-master-ui-architecture.md
  - 01-design-system.md
  - 02-component-system.md
  - blog-page.md
---

# Blog Detail Page

## Page Definition
- Purpose: deliver practical long-form guidance, reinforce authority, and convert engaged readers into enquiries or booked calls.
- Target audience: high-intent readers already evaluating architecture, delivery models, or implementation tradeoffs.
- Primary CTA: Book Appointment.
- Secondary CTA: Explore More Articles.

## Sections In Visual Order

### 1. Breadcrumb and Article Hero
- Content: back-to-blog link, category label, title, summary, author, publish date, reading time, and tags.
- Components: breadcrumb link, metadata strip, tag badges.
- Interaction notes: tags should link back to blog filters.

### 2. Article Body
- Content: structured article sections, practical guidance, key callouts, and scannable headings.
- Components: article typography, section headings, prose blocks, inline insight cards if needed.
- State requirements: slug not found should route to 404 or a controlled fallback.

### 3. Sticky Insight Sidebar
- Content: on-this-page links, related service paths, and trust CTA.
- Components: sticky aside cards, anchor links, consultation CTA.
- Responsive notes: collapse beneath the hero or article body on smaller screens.

### 4. Tag Cluster and Related Topics
- Content: tags for the current article and direct links to related posts using shared taxonomy.
- Components: tag pills, related article cards.

### 5. Comments Section
- Content: existing discussion thread preview plus a comment form with name, email, and message inputs.
- Components: comment cards, form fields, submit button, moderation note.
- State requirements: empty comments, form validation error, submitting, success acknowledgement.

### 6. Final Conversion CTA
- Content: consultation offer tied to the article topic and a path back into services or booking.
- Components: CTA panel, booking button, secondary explore button.

## State Requirements
- Unknown slug must not render a blank article.
- Comment form must expose validation and success states even if comments are mocked client-side.
- Related content should degrade gracefully if fewer matching posts exist.

## Responsive Adaptation
- Desktop uses a reading-focused content column with a right sidebar.
- Tablet reduces sidebar density and prioritizes article flow.
- Mobile stacks metadata, tags, comments, and related reads in one column without losing clear navigation.

## SEO and Metadata
- Title pattern: {Article Title} | Agency Blog.
- Description pattern: article summary or first section summary trimmed for search and social previews.

## Conversion Path
- Primary path: Blog detail -> Comments and trust signals -> Book Appointment.
- Secondary path: Blog detail -> Related post -> Services or portfolio.