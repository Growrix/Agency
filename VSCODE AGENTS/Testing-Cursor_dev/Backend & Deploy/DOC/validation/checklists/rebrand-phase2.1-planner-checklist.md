# Rebrand Phase 2.1 Planner Readiness Checklist

Human-verifiable readiness gate for Phase 2.1. The agent must pass every applicable item before classifying delivery as `rebrand_plan_complete`.

## System Surface
- [ ] Public wrapper exists at `.github/agents/rebrand-phase2.1-planner.agent.md`.
- [ ] Canonical exists at `Backend & Deploy/.github/agents/rebrand-phase2.1-planner.agent.md`.
- [ ] DOC mirror exists at `Backend & Deploy/DOC/agents/rebrand-phase2.1-planner.agent.md`.
- [ ] Spec exists at `Backend & Deploy/DOC/execution/spec-rules/rebrand-phase2.1-planner-spec.md`.
- [ ] Both READMEs reference Phase 2.1.

## Intake / Preconditions
- [ ] `project_root` resolves and contains `src/data/pages/` + `src/data/global/`.
- [ ] `DOC/migration/phase1.4/summary.md` = `pages_ready_for_hardening` OR `DOC/migration/phase1.5/summary.md` = `hardening_complete`.
- [ ] `target_brand` provided.
- [ ] `target_industry` provided.
- [ ] Source brand, source industry primary keywords, source locale, source geo detected and recorded in `summary.md`.

## Brand Bible
- [ ] `DOC/rebrand/brand-bible.md` exists with: identity, voice/tone (3-5 descriptors), do/don't lexicon, anchor examples per slot type (hero-headline, hero-subheadline, cta-label, testimonial-quote, faq-question, faq-answer, service-card-title, service-card-body, footer-tagline), brand-asset policy (logo / favicon / OG / colors / fonts).
- [ ] Each tone descriptor has one positive + one negative example sentence.
- [ ] Each slot type has 3-5 anchor examples.

## Translation Map
- [ ] `DOC/rebrand/industry-translation-map.json` covers every source-industry term occurring >3 times across data modules.
- [ ] All CTA verbs covered regardless of count.
- [ ] All service/category/product names covered regardless of count.

## Content Inventory
- [ ] `DOC/rebrand/content-inventory.json` covers every text field in `src/data/pages/**` and `src/data/global/**`.
- [ ] Every row has `slot_type`, `char_budget`, `length_policy`.
- [ ] Hero/cta/nav/footer/short-card slots have `length_policy: "strict"`.
- [ ] Paragraph/article/FAQ slots have `length_policy: "relaxed"` (≤ +20% growth).

## Image Swap Plan
- [ ] `DOC/rebrand/image-swap-plan.json` covers every image referenced from data modules + every `<Image>` reference in components pointing to `public/images/`.
- [ ] Every row has `target_subject` + 3-5 `search_queries` + `preferred_orientation` + `preferred_aspect` + `min_resolution`.
- [ ] `source_priority` ladder set: `user_supplied → pexels_api → pixabay_api → workspace_stock → solid_color_svg_placeholder`.
- [ ] `license_constraint` set to `royalty_free_downloadable_no_attribution_on_image`.
- [ ] Logo, favicon, OG share recorded as separate brand-asset rows.
- [ ] No row points to a remote URL as the final reference; every row resolves to a local `public/` path.

## SEO + JSON-LD Plan
- [ ] `DOC/rebrand/seo-plan.json` has `per_route` for every public route with `title_new` (≤60), `description_new` (≤160), `og_image_new`.
- [ ] `global` block covers site name, organization JSON-LD, LocalBusiness JSON-LD (if present), Service JSON-LD entries (if present), robots site reference, sitemap site reference, `manifest.json`, `package.json` name/description.
- [ ] If Phase 1.5 locked JSON-LD, every JSON-LD block referencing brand/industry appears here.

## Surface Leakage Scan
- [ ] `DOC/rebrand/surface-scan.md` enumerates every occurrence of source brand name and top 5 source-industry primary keywords across components, metadata, legal pages, image filenames, alt text, comments.
- [ ] Remediation note per category present.

## Plan Summary
- [ ] `DOC/rebrand/summary.md` saved with target brand + industry + tone + locale + geo, counts, source-priority decisions, unresolved inputs, delivery class, next agent.

## External Inputs (Bangla Protocol if Required)
- [ ] If image-download API credentials needed and not provided, Bangla acquisition request surfaced covering env var names, purpose, secret-or-safe, where-to-find, what-to-copy, what-if-no-account.

## Delivery Classification
- [ ] `delivery_class` computed and stored.
- [ ] `rebrand_plan_complete` only when every gate passes and every artifact is present.

## Handoff
- [ ] On `rebrand_plan_complete`, next agent named: `rebrand-phase2.2-executor.agent.md`.
- [ ] On `REB_P21_PRECONDITION_MISSING`, the failing precondition lane is named (Phase 1.4 or 1.5).
- [ ] On `REB_P21_API_CREDENTIALS_REQUIRED`, the Bangla acquisition request is surfaced and execution paused.

## VS Code + Copilot Compatibility
- [ ] Agent uses only `read`, `search`, `edit`, `execute`, `todo`.
- [ ] Single planning pass.
- [ ] All outputs are deterministic JSON or Markdown under `DOC/rebrand/`.
- [ ] No writes outside `DOC/rebrand/`.
