# Motion Database

The `bp-09-motion-director` picks ONE motion philosophy and specifies hover states, scroll reveals, page transitions, and loading interactions. All motion must be gated by `prefers-reduced-motion`.

Each entry lists: **Philosophy**, **Signature feel**, **Use cases / industries**, **UX implications**, **Watch-outs**.

---

## M1 — Apple Fluid
- **Philosophy:** Smooth, gentle ease-in-out; momentum; nothing jarring. Motion clarifies, never distracts.
- **Feel:** Premium, calm, effortless.
- **Use cases / industries:** Premium SaaS, hardware, Apple-adjacent product, minimalist brands.
- **UX implications:** Subtle scroll reveals, soft scale on hover, cross-fades; ~200–400ms eases.
- **Watch-outs:** Can feel generic if overused; keep purposeful.

## M2 — Material Motion
- **Philosophy:** Physical, responsive surfaces with meaningful transitions; shared-element continuity.
- **Feel:** Tactile, systematic, predictable.
- **Use cases / industries:** Product apps, dashboards, B2B tools, Android-leaning brands.
- **UX implications:** Elevation changes on interaction, container transforms, ripple feedback.
- **Watch-outs:** Don't over-animate elevation; keep consistent timing tokens.

## M3 — Elastic Motion
- **Philosophy:** Springy overshoot and bounce; lively, characterful.
- **Feel:** Playful, energetic, friendly.
- **Use cases / industries:** Consumer apps, DTC, kids/education, creative brands.
- **UX implications:** Spring easing on entrances, bouncy buttons, rubber-band drags.
- **Watch-outs:** Too much bounce reads cheap in premium/enterprise; tune stiffness.

## M4 — Magnetic Motion
- **Philosophy:** Elements attract toward the cursor; interactive pull on buttons/links.
- **Feel:** Crafted, interactive, premium-playful.
- **Use cases / industries:** Agencies, portfolios, creative studios, launches.
- **UX implications:** Magnetic buttons, cursor-following accents, hover gravity.
- **Watch-outs:** Pointer-only — must degrade gracefully on touch/keyboard.

## M5 — Cinematic Motion
- **Philosophy:** Slow, dramatic, story-paced; scenes that breathe.
- **Feel:** Luxurious, emotional, immersive.
- **Use cases / industries:** Luxury, hospitality, film, automotive, editorial.
- **UX implications:** Slow reveals, parallax, sequenced section entrances, ambient loops.
- **Watch-outs:** Pacing can frustrate task-driven users; keep CTAs immediate.

## M6 — Architectural Motion
- **Philosophy:** Precise, structural, grid-aware; lines draw, blocks slide into place.
- **Feel:** Engineered, deliberate, confident.
- **Use cases / industries:** Architecture, construction, industrial, B2B, consulting.
- **UX implications:** Line-draw SVGs, modular block reveals, measured staggers.
- **Watch-outs:** Keep crisp; avoid softness that contradicts the precise brand.

## M7 — Organic Motion
- **Philosophy:** Natural, flowing, irregular timing; nothing mechanical.
- **Feel:** Human, calm, alive.
- **Use cases / industries:** Wellness, nature, food, sustainability, beauty.
- **UX implications:** Soft blob morphs, gentle drifts, eased fades, breathing scales.
- **Watch-outs:** Avoid randomness that feels unstable; keep subtle.

## M8 — Scroll Storytelling
- **Philosophy:** Scroll is the narrative engine; progress drives scenes (scrollytelling).
- **Feel:** Immersive, guided, editorial.
- **Use cases / industries:** Mission-driven, data stories, product launches, nonprofits.
- **UX implications:** Pinned sections, scroll-linked animation, progress indicators.
- **Watch-outs:** Never hijack scroll fully; offer skip; performance of pin/scrub.

## M9 — Layered Motion
- **Philosophy:** Multiple depth planes move at different rates (parallax depth).
- **Feel:** Deep, dimensional, crafted.
- **Use cases / industries:** Tech, gaming, web3, creative, product.
- **UX implications:** Mouse/scroll parallax, foreground/background separation.
- **Watch-outs:** Motion sickness; reduced-motion fallback; GPU cost.

## M10 — Physics Motion
- **Philosophy:** Real-world physics — gravity, inertia, collisions, drag.
- **Feel:** Interactive, surprising, premium-experimental.
- **Use cases / industries:** Gaming, experimental, creative tech, launches.
- **UX implications:** Draggable/throwable elements, inertia scroll, particle fields.
- **Watch-outs:** Heavy; can hurt usability if core content depends on it; provide static path.

---

## Required specification for `09-motion-system.md`
For the chosen philosophy, define:
- **Hover states** — buttons, links, cards, nav, media.
- **Scroll reveals** — trigger point, stagger, distance, easing token.
- **Page / route transitions** — enter/exit behavior.
- **Loading interactions** — skeletons, spinners, progress, first-paint behavior.
- **Timing tokens** — duration + easing scale (e.g. fast 150ms / base 250ms / slow 450ms).
- **Reduced-motion plan** — what each effect collapses to when `prefers-reduced-motion: reduce`.

## Selection guidance for `bp-09`
1. Match philosophy to the visual style and brand energy.
2. Check `_uniqueness-ledger.md` — avoid repeating motion philosophy for adjacent industries.
3. Justify the choice against the buyer's task urgency (luxury can be slow; lead-gen must stay snappy).
