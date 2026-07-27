# Hero Database

The `bp-06-hero-system-designer` selects a hero from this library (or composes a justified hybrid) and fully specifies it. This is a **seed library** built to grow to 50+. Add new entries using the schema below; never break the schema.

## Entry schema (required fields)
- **ID & Name**
- **Structure** — the layout anatomy (what sits where).
- **Interaction style** — what the user can do / what moves.
- **Visual hierarchy** — primary → secondary → tertiary focus order.
- **CTA pattern** — how the call-to-action is presented.
- **Ideal industries**
- **Conversion strengths** — why it converts.
- **Watch-outs** — failure modes / accessibility / performance notes.

---

## H01 — Cinematic
- **Structure:** Full-viewport media (image/video) background, centered or lower-left headline, single CTA, scroll hint.
- **Interaction:** Subtle parallax, slow zoom (Ken Burns), muted autoplay video.
- **Hierarchy:** Headline → CTA → ambient media.
- **CTA:** One dominant primary button; secondary as text link.
- **Ideal industries:** Hospitality, luxury, film/media, real estate, automotive.
- **Conversion strengths:** Emotional impact, brand authority, premium signal.
- **Watch-outs:** Video weight (LCP), text contrast over media, reduced-motion fallback.

## H02 — Split Screen
- **Structure:** 50/50 (or 60/40) — copy + CTA on one side, visual/product/form on the other.
- **Interaction:** Independent hover states each side; optional sticky on scroll.
- **Hierarchy:** Headline → CTA → supporting visual.
- **CTA:** Primary in copy column; the visual side can be a form or product.
- **Ideal industries:** SaaS, services, e-commerce PDP-style, B2B.
- **Conversion strengths:** Balances message + proof/form; great for lead capture.
- **Watch-outs:** Stacking order on mobile; equal visual weight can dilute focus.

## H03 — Interactive
- **Structure:** Hero contains a working mini-tool (configurator, slider, toggle, live preview).
- **Interaction:** Direct manipulation updates an on-screen result in real time.
- **Hierarchy:** The tool → its output → supporting headline.
- **CTA:** "See your result / Get my quote" tied to interaction state.
- **Ideal industries:** Fintech, SaaS, product configurators, home services.
- **Conversion strengths:** Engagement, personalization, instant "aha."
- **Watch-outs:** Complexity budget; must work on touch; keyboard operable.

## H04 — Dashboard
- **Structure:** Hero shows a stylized product dashboard / app UI with annotated highlights.
- **Interaction:** Hover tooltips, tab-switch previews, animated counters.
- **Hierarchy:** Headline → product visual → metric callouts.
- **CTA:** "Start free / Book demo."
- **Ideal industries:** B2B SaaS, analytics, fintech, ops tools.
- **Conversion strengths:** Shows the product instantly; reduces "what is it?".
- **Watch-outs:** Don't ship a heavy real screenshot; use optimized art. Avoid clutter.

## H05 — Timeline
- **Structure:** Horizontal/vertical timeline as the hero (process, history, roadmap).
- **Interaction:** Scroll or click to move along the timeline; nodes reveal detail.
- **Hierarchy:** Narrative arc → current node → CTA.
- **CTA:** Appears at the timeline's end / decision point.
- **Ideal industries:** Construction, consulting, agencies, heritage brands, project services.
- **Conversion strengths:** Communicates process and trust through clarity.
- **Watch-outs:** Horizontal scroll UX on mobile; keep nodes scannable.

## H06 — Bento
- **Structure:** Hero is a grid of varied-size rounded tiles (stat, visual, quote, feature, CTA).
- **Interaction:** Per-tile hover lift; some tiles micro-animate.
- **Hierarchy:** Composition reads as a balanced whole → primary tile leads.
- **CTA:** A dedicated CTA tile.
- **Ideal industries:** Product/feature brands, SaaS, hardware, portfolios.
- **Conversion strengths:** Communicates many value points at a glance.
- **Watch-outs:** Mobile reflow order; avoid equal-weight tile soup.

## H07 — Magazine
- **Structure:** Editorial cover — oversized headline, kicker, byline-style meta, large feature image, multi-column hints.
- **Interaction:** Minimal; refined hover on links, slow reveal.
- **Hierarchy:** Headline dominates → image → CTA as quiet link/button.
- **CTA:** Understated, editorial.
- **Ideal industries:** Editorial luxury, fashion, publishing, premium services.
- **Conversion strengths:** Sophistication, brand voice, curation.
- **Watch-outs:** Too quiet for hard conversion; pair with clear secondary path.

## H08 — Layered
- **Structure:** Multiple overlapping depth layers (background, mid shapes, foreground card/product).
- **Interaction:** Parallax depth on scroll/mouse; layers move at different speeds.
- **Hierarchy:** Foreground subject → headline → background ambiance.
- **CTA:** On the foreground layer.
- **Ideal industries:** Tech, creative, gaming, web3, product launches.
- **Conversion strengths:** Depth and craft signal premium engineering.
- **Watch-outs:** Motion-sickness; gate behind reduced-motion; perf of many layers.

## H09 — Floating Card
- **Structure:** A prominent elevated card (offer/form/product) floats over a soft background.
- **Interaction:** Card hover lift; background subtle motion.
- **Hierarchy:** Card content → headline → background.
- **CTA:** Inside the card (form submit / primary button).
- **Ideal industries:** Lead-gen services, fintech, SaaS signup, bookings.
- **Conversion strengths:** Focuses attention on the single action.
- **Watch-outs:** Card must not crop on small screens; keep one action.

## H10 — Search First
- **Structure:** Headline + large search bar as the primary element, popular categories below.
- **Interaction:** Autocomplete, suggested queries, animated placeholder.
- **Hierarchy:** Search → categories → headline.
- **CTA:** The search itself is the CTA.
- **Ideal industries:** Marketplaces, directories, travel, real estate, e-commerce, docs.
- **Conversion strengths:** Immediate task start; intent capture.
- **Watch-outs:** Empty-state guidance; mobile keyboard behavior.

## H11 — Comparison
- **Structure:** Side-by-side comparison (you vs them, plan A vs B) as hero.
- **Interaction:** Toggle, hover-highlight rows, animated checkmarks.
- **Hierarchy:** Comparison table → winning column → CTA.
- **CTA:** Under the favored option.
- **Ideal industries:** SaaS, insurance, telecom, switching-incentive services.
- **Conversion strengths:** Frames you as the obvious choice.
- **Watch-outs:** Don't overload; keep rows scannable on mobile.

## H12 — Before / After
- **Structure:** Draggable or split before/after media as the hero focus.
- **Interaction:** Drag slider reveals transformation.
- **Hierarchy:** The reveal → headline → CTA.
- **CTA:** "Get this result."
- **Ideal industries:** Renovation, med-spa, cleaning, detailing, design, dentistry.
- **Conversion strengths:** Tangible proof of outcome.
- **Watch-outs:** Touch drag support; needs genuinely strong imagery.

## H13 — Interactive Map
- **Structure:** Map as hero with pins/regions; side panel for detail.
- **Interaction:** Zoom, click pins, filter by region.
- **Hierarchy:** Map → selected location → CTA.
- **CTA:** "Find near me / Book this location."
- **Ideal industries:** Multi-location services, real estate, travel, franchises, logistics.
- **Conversion strengths:** Localization, relevance, "serves my area."
- **Watch-outs:** Map performance and a11y; provide list fallback.

## H14 — 3D Scene
- **Structure:** Interactive 3D object/scene centerpiece with orbiting copy.
- **Interaction:** Rotate/zoom the model; scroll drives camera.
- **Hierarchy:** 3D subject → headline → CTA.
- **CTA:** Anchored, persistent.
- **Ideal industries:** Hardware, automotive, gaming, web3, premium product.
- **Conversion strengths:** Wow factor, product tangibility.
- **Watch-outs:** Heavy; needs strong perf budget + static fallback; battery/mobile.

## H15 — Immersive Canvas
- **Structure:** Full-bleed generative/particle/WebGL canvas with minimal overlaid copy.
- **Interaction:** Mouse/scroll reactive field; ambient generative motion.
- **Hierarchy:** Atmosphere → headline → single CTA.
- **CTA:** Minimal, centered.
- **Ideal industries:** Creative agencies, music, art, experimental tech, launches.
- **Conversion strengths:** Memorable, award-show craft signal.
- **Watch-outs:** Heavy GPU; reduced-motion + low-power fallback mandatory.

## H16 — Command Center
- **Structure:** Dense, organized control-panel hero — multiple live widgets/KPIs framed as a "mission control."
- **Interaction:** Live-updating counters, mini charts, status indicators.
- **Hierarchy:** Primary KPI → supporting widgets → CTA.
- **CTA:** "Open the console / Get access."
- **Ideal industries:** Data platforms, ops/monitoring, fintech, B2B analytics, security.
- **Conversion strengths:** Signals power and capability instantly.
- **Watch-outs:** Cognitive load; keep one clear focal KPI.

## H17 — Narrative Journey
- **Structure:** Scroll-driven hero that unfolds a short story across the first viewport(s).
- **Interaction:** Scroll triggers sequential reveal/scene changes (scrollytelling).
- **Hierarchy:** Scene 1 hook → progressive scenes → CTA.
- **CTA:** Lands at the narrative payoff.
- **Ideal industries:** Mission-driven brands, nonprofits, premium DTC, editorial.
- **Conversion strengths:** Emotional investment before the ask.
- **Watch-outs:** Don't trap the scroll; provide skip; reduced-motion path.

## H18 — Typographic Statement
- **Structure:** Giant kinetic/static typographic headline as the entire hero; minimal else.
- **Interaction:** Kinetic type, hover distortion, or staggered reveal.
- **Hierarchy:** The words ARE the hero → CTA beneath.
- **CTA:** One quiet but clear action.
- **Ideal industries:** Agencies, fashion, editorial, bold DTC, music.
- **Conversion strengths:** Pure brand voice and confidence.
- **Watch-outs:** Needs a strong line; ensure legibility and a11y of effects.

## H19 — Product Hotspot
- **Structure:** Single hero product image with interactive hotspots calling out features.
- **Interaction:** Click/hover hotspots reveal tooltips/popovers.
- **Hierarchy:** Product → hotspots → CTA.
- **CTA:** "Buy / Configure."
- **Ideal industries:** Hardware, consumer electronics, appliances, automotive, beauty.
- **Conversion strengths:** Educates on features without leaving the hero.
- **Watch-outs:** Touch target sizing; keyboard reachable hotspots.

## H20 — Booking First
- **Structure:** Headline + inline booking/availability widget (date/time/service) as hero.
- **Interaction:** Pick service → date → time inline; live availability.
- **Hierarchy:** Booking widget → headline → trust strip.
- **CTA:** "Check availability / Book now."
- **Ideal industries:** Salons, clinics, restaurants, trades, hospitality, events.
- **Conversion strengths:** Shortest path from intent to booked.
- **Watch-outs:** Don't overwhelm; progressive disclosure; mobile date pickers.

---

## Selection guidance for `bp-06`
1. Filter heroes by the **conversion goal** and **buyer awareness** (Stage 01) and the **composition** (Stage 05).
2. Ensure the hero expresses the chosen **visual style** (Stage 04) — e.g. Immersive Canvas suits Cyberpunk/Futuristic, not Healthcare.
3. Check `_uniqueness-ledger.md`: do not reuse the same hero type for the same/adjacent industry.
4. Fully specify in `06-hero-system.md`: layout, interactions, hierarchy, CTA structure, responsive behavior, and reduced-motion fallback.

## Expansion note (toward 50+)
To extend this library, append entries H21+ using the schema. Candidate future entries: Carousel Story, Tabbed Hero, Stat Wall, Video Testimonial Hero, Live Feed, Quiz Start, Pricing-First, Map+Search Combo, Mosaic Gallery, Sticky Scene, Ticker Hero, Calculator Hero, Avatar/AI Chat Hero, Countdown Launch, Manifesto Hero, Logo Constellation, Split Diagonal, Full-Bleed Quote, Animated Illustration Scene, Card Stack Swipe, Spotlight Reveal, Horizontal Scroll Gallery, Grid Reveal, Portal/Door Transition, Data Globe, Waveform/Audio Hero, AR Preview Hero, Side Drawer Hero, Modal-First Hero, Magazine Cover Split.
