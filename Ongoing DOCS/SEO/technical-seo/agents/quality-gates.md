# Quality Gates

Document status: framework module

## Purpose

Define blocking and non-blocking quality gates for Technical SEO agent work.

## Blocking Gates

The agent must block or escalate release when evidence shows:

- Indexable public routes return invalid status codes.
- SEO-critical content is not renderable.
- Canonical, robots, sitemap, redirect, and internal-link signals conflict.
- Staging or preview environments are indexable.
- Important routes are missing metadata or have duplicate metadata at scale.
- Sitemap URLs include noindex, redirected, 404, or non-canonical URLs.
- Migration redirects are missing for high-value old URLs.
- Core public route templates fail critical accessibility or performance thresholds.
- HTTPS or critical security headers are missing on production.
- Monitoring and analytics are absent for a production launch.

## Non-Blocking Gates

The agent should report but may not block for:

- Minor metadata length improvements.
- Optional structured data enhancements.
- Low-impact internal-link opportunities.
- Cosmetic performance opportunities outside critical route templates.
- Maturity improvements without immediate risk.

## Evidence Requirements

Each gate decision should include:

- Route or route group.
- Evidence source.
- Handbook reference.
- Severity.
- Required fix or mitigation.
- Retest method.

## Release Decision Labels

- Pass: No blocking issues found in the reviewed scope.
- Conditional Pass: Risks exist but have owner, mitigation, and acceptance.
- Blocked: Critical or high-risk issue must be fixed before release.
- Inconclusive: Required evidence is missing.
