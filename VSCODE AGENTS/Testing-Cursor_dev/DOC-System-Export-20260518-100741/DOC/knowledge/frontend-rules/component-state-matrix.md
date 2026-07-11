# Component State Matrix

Every shared component MUST declare every state in the matrix below for its component class. The component_system_planner enforces this; the reviewer rejects component specs that miss a required state.

## Atoms

### Button
States: `default`, `hover`, `focus-visible`, `active`, `loading`, `disabled`.
Variants: `primary`, `secondary`, `ghost`, `destructive`, `text-link`.
Required behavior:
- Loading: `aria-busy=true`, original label hidden or replaced by spinner; clickable area preserved.
- Disabled: `aria-disabled=true`, pointer cursor removed, contrast still meets WCAG.
- Icon-only: requires `aria-label`.

### Input / Textarea
States: `default`, `focus-visible`, `filled`, `error`, `success`, `disabled`, `read-only`.
Required behavior: visible label, persistent helper text slot, error message rendered with `aria-describedby`.

### Select
States: `default`, `focus-visible`, `open`, `selected`, `error`, `disabled`.

### Checkbox / Radio / Switch
States: `default`, `hover`, `focus-visible`, `checked`, `indeterminate` (checkbox only), `disabled`.

### Badge
States: `default`. Optional variants by semantic color.

### Icon
States: not interactive in isolation. Decorative icons require `aria-hidden=true`. Semantic icons require an `aria-label` or accompanying text.

### Avatar
States: `default`, `loading`, `fallback`.

### Tooltip
States: `closed`, `opening`, `open`, `closing`. Behavior: keyboard-accessible (focus opens), ESC closes.

### Spinner
States: `idle`, `running`. `running` must have `role=status` and `aria-live=polite`.

### Divider
States: `default`. No interaction.

## Molecules

### Card
States: `default`, `hover`, `focus-within`, `selected`, `loading` (skeleton), `disabled`.
Variants: per project (service-card, product-card, proof-card, case-study-card, utility-card, listing-card, etc.).

### FeatureBlock
States: `default`. Optional `revealed` if scroll-driven.

### StatBlock
States: `default`, `count-up-running`, `count-up-complete` (only when reduced-motion not requested; else `default` only).

### PricingTier
States: `default`, `featured`, `expanded`, `unavailable`.

### Testimonial
States: `default`, `loading`, `expanded` (full quote view).

### MediaBlock
States: `default`, `loading` (image skeleton), `error` (fallback graphic).

### ContentBlock
States: `default`. May host nested rich-text.

### FormRow
States: `default`, `focus-within`, `error`, `success`, `disabled`.

### SearchBar
States: `default`, `focus`, `typing`, `submitting`, `results-shown`, `no-results`, `error`.

### FilterBar
States: `default`, `with-filters-applied`, `loading`.

### SortControl
States: `default`, `open`, `applied`.

### PaginationControl
States: `default`, `loading-next`, `at-start`, `at-end`.

### Breadcrumbs
States: `default`. Last item is current and not a link.

### StepIndicator
States: per step: `pending`, `current`, `complete`, `error`.

### TabGroup
States: per tab: `default`, `hover`, `focus-visible`, `active`, `disabled`.

### AccordionItem
States: `closed`, `open`, `hover`, `focus-visible`, `disabled`.

### AlertMessage
States: `default`, `dismissed`. Accessibility: `role=alert` for error/critical only.

### ToastMessage
States: `entering`, `visible`, `exiting`. `role=status` (polite) by default; `role=alert` for errors.

### MetricTile
States: `default`, `loading`, `empty`, `error`.

### MenuGroup / DropdownMenu
States: `closed`, `open`, item: `default`, `hover`, `focus-visible`, `disabled`.

### ActionBar (sticky bottom mobile, etc.)
States: `default`, `with-secondary-actions-open`.

### ProductTile / PortfolioTile / ArticleTile / ListingTile
States: `default`, `hover`, `focus-within`, `loading`, `unavailable` (when relevant).

### ChatPrompt (suggestion chip)
States: `default`, `hover`, `selected`, `disabled`.

## Organisms

### Header / Navbar
States: `default`, `scrolled`, `mobile-open`, `submenu-open`.

### Footer
States: `default`. Includes legal, deep links, locale switch (if i18n).

### HeroSection
States: `default`, `loading-media`, `error-media`.
Variants: per project (service hero, product hero, portfolio hero, utility hero, AI hero).

### FeatureSection / ContentSection
States: `default`, `revealed` (on scroll).

### TestimonialSection
States: `default`, `loading`, `empty`.

### PricingSection
States: `default`, `monthly`, `annual`. Featured tier marked.

### FAQSection
States: `default`. Each item per AccordionItem states.

### CTASection
States: `default`, `submitting` (if includes form).

### FormSection
States: `default`, `submitting`, `success`, `server-error`, `validation-error`.

### ContactSection
States: `default`, `submitting`, `success`, `server-error`, `validation-error`.

### GridSection / ListingSection
States: `default`, `loading` (skeleton), `populated`, `empty`, `filtered-empty`, `error`.

### DetailSection
States: `default`, `loading`, `not-found`, `error`.

### ComparisonSection
States: `default`. May include a row-by-row comparison toggle.

### MediaGallery
States: `default`, `lightbox-open`, `loading`, `error`.

### SearchPanel
States: `default`, `focus`, `typing`, `loading-results`, `results-shown`, `no-results`, `error`.

### FilterPanel
States: `default`, `mobile-sheet-open`, `applying`, `applied`, `reset`.

### CheckoutSection
States: `default`, `validating`, `redirecting-to-payment`, `payment-success`, `payment-failed`, `coupon-applied`, `coupon-invalid`.

### AuthSection (sign-in / sign-up / reset)
States: `default`, `submitting`, `success`, `invalid-credentials`, `server-error`, `mfa-required`.

### DashboardShell
States: `default`, `sidebar-collapsed`, `sidebar-expanded` (mobile drawer).

### SidebarNavigation
States: per item: `default`, `hover`, `focus-visible`, `active`.

### TopBar (in app)
States: `default`, `with-banner` (announcement), `with-trial-warning`.

### DataTableSection
States: `loading`, `populated`, `empty`, `filtered-empty`, `error`. Row states: `default`, `hover`, `selected`, `expanded`.

### Modal / Dialog
States: `closed`, `entering`, `open`, `submitting`, `success`, `error`, `closing`. Focus-trap mandatory.

### Drawer / Sheet
States: same as Modal. Sheet variants for mobile bottom and side.

### CommandPanel (cmd+k)
States: `closed`, `open`, `searching`, `result-selected`.

### ChatWidget
States: `collapsed`, `greeting`, `active-conversation`, `loading-response`, `streaming`, `handoff`, `offline`, `error`.

### NotificationCenter
States: `closed`, `open`, `empty`, `populated`, `loading`, `error`.

### MobileBottomNav
States: per item: `default`, `active`, `with-badge`.

## Loading skeleton policy

- Every list/grid/detail section has a skeleton state, not a spinner.
- Skeletons mirror the populated layout (same heights, same column counts).
- Skeleton shimmer respects `prefers-reduced-motion` (static fill instead of animated).

## Empty state policy

- Every empty state must offer a next action ("create your first…", "try a different filter").
- Empty states never show only an illustration with no copy.

## Error state policy

- Every error state must offer a recovery action (retry, contact, alternative path).
- Server errors must distinguish recoverable (5xx) from blocked (403, 401).

## Focus-visible policy

- All interactive elements MUST have a visible focus ring using `--color-focus-ring` and `--shadow-focus`.
- Mouse-only "hover" affordances MUST NOT replace focus rings.

## Mobile parity

- No state may be reachable only by hover.
- All state changes must be available via tap, long-press, or sheet on mobile.

## Output

Each component spec emitted by `component_system_planner` MUST list every required state for its class above and define visual + behavioral notes for each. Reviewer enforces via constraint **F3**.
