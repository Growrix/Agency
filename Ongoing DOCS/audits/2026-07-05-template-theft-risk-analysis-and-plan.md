# Template Theft Risk Analysis and Remediation Plan

Date: 2026-07-05
Scope: Growrix OS web app template catalog, public preview delivery, and paid fulfillment delivery

## Executive Summary

The concern is real, but the threat is narrower than it first appears.

Any HTML page that is rendered in a browser can be copied, saved, inspected, or replayed by a motivated user. That includes the app pages themselves, the `View Source` output, browser network traffic, and `Save Page As`. No combination of response headers can fully stop that. Headers such as `X-Frame-Options`, `X-Content-Type-Options`, `CSP`, `HSTS`, or `Cache-Control` harden transport and embedding behavior, but they do not create source-code secrecy in a client-delivered web page.

What the repo currently does well is separate some paid delivery flows behind authenticated routes and signed download authorization. What it does not yet do is draw a hard line between:

1. public marketing or preview surfaces, which are inherently copyable, and
2. the actual paid template source, which should never be exposed from a public path.

If the business goal is to stop free extraction of the template source before purchase, the fix is architectural. The only realistic solution is to ensure the full template package is never shipped as public HTML in the first place.

## Current State Findings

Evidence from the codebase shows three distinct delivery surfaces:

- Public preview HTML is served directly from `web/public/previews/html-template-websites/*` and `web/public/previews/html-business-profiles/*`.
- The preview route at `web/src/app/api/website-templates-html-preview/[templateSlug]/route.ts` reads HTML from `public/previews/...` and returns it with `Content-Type: text/html`.
- Paid fulfillment is already partially protected: `web/src/app/api/v1/orders/[orderId]/download/route.ts` and `web/src/app/api/v1/downloads/[downloadId]/signed-url/route.ts` require authenticated access before issuing a download URL.

The important implication is this:

- The paid download flow can be protected.
- The public template preview cannot be made secret if it remains browser-readable HTML.

The screenshot behavior you tested is therefore expected, not a bug in the browser or a misconfigured header. It is a product-design risk.

## Threat Model

The likely abuse paths are:

- Browser save of the rendered page HTML.
- Copying source from DevTools or `View Source`.
- Downloading the preview asset directly if its URL is public and guessable.
- Automated mirroring with `curl`, `wget`, or scripted fetches.
- Screenshot-driven reconstruction of the design and layout.
- Serial theft of multiple preview files from public asset paths.

The most damaging scenario is not just casual copying. It is someone reconstructing the exact paid template files from public previews or direct asset access, then redistributing them outside the platform.

## What Cannot Be Solved Completely

These items are not fully solvable for any browser-delivered website:

- Preventing a user from saving a web page they can already see.
- Preventing them from copying markup that is sent to the browser.
- Preventing screenshots or screen recording.
- Preventing someone from manually recreating the design from what they can view.

If the product requires absolute secrecy of the source, then it should not be delivered as browser-exposed HTML. It would need a different distribution model, such as hosted access only, or a server-side rendered service where the user never receives the source package.

## What Should Be Fixed

The real goal is to prevent pre-purchase leakage of the actual template source and reduce the usefulness of public previews for theft.

That means the project should:

1. Stop shipping full template source in public routes.
2. Keep paid fulfillment private, authenticated, and short-lived.
3. Make public preview assets clearly demoted from the real product source.
4. Add deterrence, monitoring, and legal controls for redistribution.

## Recommended Remediation Plan

## Implementation Progress

### 2026-07-05: Phase 1 slice completed

- Preview URL generation now routes through API endpoints instead of direct static public preview HTML paths.
- Direct requests to raw preview source directories are blocked at middleware level for:
	- `/previews/html-template-websites/*`
	- `/previews/html-business-profiles/*`
	- `/previews/website-templates-html/*`
- Both preview APIs now serve redacted preview HTML (not full raw source), including:
	- script stripping
	- inline event handler removal
	- form disablement in preview mode
	- section truncation with a lock notice
	- visible preview-only watermark overlay
- Added shared server-side redaction utility for consistent behavior across template preview families.
- Hardened Clerk activation guard to require both publishable and secret keys, preventing release-gate crashes from partial Clerk configuration.

### 2026-07-05: Phase 3 slice completed

- Paid download authorization no longer returns the raw asset URL directly.
- Authorization now issues a short-lived signed grant token (15-minute TTL) and returns an internal delivery URL.
- Added dedicated delivery route:
	- `/api/v1/downloads/[downloadId]/deliver?grant=...`
- Delivery route validates token signature, expiry, download ownership/admin scope, and download status before redirecting to the underlying asset URL.
- Download usage count is now consumed at actual delivery time (grant redemption), not at signed-link issuance time.
- Order-level download endpoint now redirects to the internal grant URL rather than exposing the final asset URL directly.
- Added audit trail events for both grant issuance and grant redemption to improve misuse monitoring and forensics.
- Added grant issuance and redemption rate limiting on authenticated and redemption endpoints to reduce automated abuse.
- Added request-level forensic metadata on grant events:
	- SHA-256 hashed requester IP
	- SHA-256 hashed requester user-agent
	- grant token `jti` correlation ID on redemption
- Added integration coverage to verify:
	- signed URL now points to internal grant-based delivery route
	- delivery route redirects to the actual asset only after grant validation

### 2026-07-05: Phase 4 slice started

- Added persistent per-asset fingerprint storage on issued download records (`asset_fingerprint`).
- Added fingerprint propagation into grant issuance and grant redemption audit logs for improved leak attribution.
- Added integration assertion coverage to ensure signed download authorization payloads include `asset_fingerprint`.

### 2026-07-05: Phase 5 slice started

- Added failed grant redemption auditing in delivery route with a new `download.grant_rejected` event for unauthorized/forbidden/rate-limited attempts.
- Rejection audit metadata now captures download ID, reason code/status/message, grant presence flag, and request context for incident review.
- Added integration coverage to verify invalid grant redemption returns `401` and emits `download.grant_rejected` audit evidence.

### 2026-07-05: Phase 2 slice started

- Strengthened preview redaction output to further constrain public demo surfaces:
	- strip `noscript` and `template` blocks
	- replace embedded `iframe` content with locked placeholders
	- lock anchor navigation to inert href values and mark links as preview-locked
- Added integration coverage to verify preview API responses are redacted and constrained (no scripts/comments, overlay present, links locked).
- Added strict preview response policy headers (`Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`) to reduce execution and exfiltration risk in preview mode.
- Redaction now also removes redirect/base primitives (`meta refresh`, `base`) to prevent preview-driven navigation rewriting.

Status:

- Phase 1 (Immediate Containment): in progress with first containment slice implemented.
- Phase 3 (Harden Paid Delivery): in progress with first signed-grant slice implemented.
- Phase 4 (Add Theft Deterrence): in progress with first fingerprinting slice implemented.
- Phase 5 (Monitoring and Enforcement): in progress with first detection/auditing slice implemented.
- Phase 2 (Separate Preview From Fulfillment): in progress with first constrained-preview slice implemented.

### Phase 1: Immediate Containment

Goal: remove the easiest leakage paths without redesigning the whole store.

- Inventory every public template file under `web/public/previews/` and classify each one as preview-only or fulfillment-grade.
- If any preview file is a full copy of the paid template, replace it with a reduced preview version.
- Ensure no paid source file is served from a predictable public path.
- Keep the existing authenticated download routes as the only path to paid delivery.
- Add explicit `noindex` and `nofollow` metadata where appropriate, but treat that as crawl hygiene only, not security.

Acceptance criteria:

- Public URLs no longer expose the full paid HTML source.
- A user can still browse a preview, but the preview is not the final downloadable asset.
- Paid files require authenticated access or short-lived signed URLs.

### Phase 2: Separate Preview From Fulfillment

Goal: ensure the browser only receives a public demo, not the complete product package.

- Build a dedicated preview representation for templates that is intentionally incomplete.
- Use screenshots, poster frames, or trimmed demo sections for catalog browsing.
- If a live iframe is needed, make it a constrained demo version with limited content and hidden implementation details.
- Keep the actual product source in private object storage or another private delivery layer.
- Generate a download package only after purchase or license validation.

Recommended pattern:

- Public surface = marketing copy, screenshots, a reduced interactive demo.
- Private surface = licensed download bundle.

Acceptance criteria:

- The public preview can be saved, but what is saved is only the demo surface.
- The paid package is never exposed through the preview route.

### Phase 3: Harden Paid Delivery

Goal: make theft of purchased files harder to automate and easier to investigate.

- Keep `web/src/app/api/v1/orders/[orderId]/download/route.ts` and `web/src/app/api/v1/downloads/[downloadId]/signed-url/route.ts` as authenticated gates.
- Issue short-lived, per-user signed download URLs.
- Store fulfillment assets in private storage rather than in a public directory.
- Log each issuance, download count, user identity, order ID, and asset fingerprint.
- Apply download quotas and expiry windows.

Suggested improvements:

- 15 minute signed URL TTL for initial delivery.
- Max download count per asset.
- Admin override only for support cases.
- Audit trail for every issued URL and download event.

Acceptance criteria:

- No paid asset is accessible without authentication or an unexpired signed URL.
- Every download leaves an audit trail.

### Phase 4: Add Theft Deterrence

Goal: make leaked copies traceable.

- Embed buyer-specific watermarks in generated downloads where feasible.
- Add canary strings or subtle unique markers per order or per buyer.
- Include license metadata inside the download package.
- Add a visible license footer in the template and documentation.
- Store a fingerprint of each issued asset version.

This does not stop theft, but it makes leak attribution possible.

### Phase 5: Monitoring and Enforcement

Goal: detect misuse and respond quickly.

- Crawl for identical template fingerprints across suspicious domains.
- Monitor download volume spikes and repeated failed access attempts.
- Keep a takedown workflow ready for redistributed copies.
- Document escalation steps for support and legal review.

## Practical Security Controls

These controls help, but none of them are a complete defense by themselves:

- `Cache-Control: no-store` for sensitive authenticated downloads.
- `X-Robots-Tag: noindex, nofollow` for preview and private routes.
- Auth gating on all paid fulfillment routes.
- Short-lived signed URLs.
- Private object storage for final template packages.
- Rate limiting and abuse detection on download authorization endpoints.
- Watermarking and fingerprinting for issued assets.

Do not rely on these as a source-code protection layer. They are defense-in-depth only.

## What Not To Do

- Do not assume browser download suppression is possible for HTML content.
- Do not try to solve the issue with front-end-only tricks like disabling right-click, text selection, or keyboard shortcuts. Those are trivial to bypass and create a false sense of security.
- Do not keep full paid template source in `public/` if the business goal is to protect the source.
- Do not treat SEO headers as security controls.

## Recommended Product Decision

The site should explicitly adopt two product classes:

1. Preview assets: public, low-risk, copyable, and intentionally incomplete.
2. Fulfillment assets: private, authenticated, signed, and versioned.

If a given template is currently identical in the public preview and the paid download, the preview must be reduced first. That is the core fix.

## Implementation Order

1. Audit every public preview file and identify any full-fidelity source exposure.
2. Move fulfillment-grade files out of public paths.
3. Keep only reduced previews in public storage or generated preview routes.
4. Make paid downloads private and short-lived.
5. Add unique fingerprints and watermarking.
6. Add logging, abuse monitoring, and takedown process documentation.

## Success Criteria

The remediation is working if all of the following are true:

- A visitor can preview the product without receiving the complete source package.
- The actual downloadable template is only accessible after authenticated authorization.
- Direct access to public preview URLs no longer yields the same code that buyers receive.
- Leaked copies can be traced back to a specific issued asset or order.

## Bottom Line

This is a serious business risk, but it is not solved by more headers. The real fix is to stop exposing full template source in public browser-delivered HTML and to move paid fulfillment into private, authenticated delivery with traceability. Anything less only reduces friction for theft; it does not prevent it.