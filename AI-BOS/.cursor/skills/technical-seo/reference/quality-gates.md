# Quality Gates

## Blocking Gates

Block or escalate release when evidence shows:

- Indexable public routes return invalid status codes
- SEO-critical content is not renderable
- Canonical, robots, sitemap, redirect, and internal-link signals conflict
- Staging or preview environments are indexable
- Important routes missing metadata or duplicate metadata at scale
- Sitemap URLs include noindex, redirected, 404, or non-canonical URLs
- Migration redirects missing for high-value old URLs
- Core public route templates fail critical accessibility or performance thresholds
- HTTPS or critical security headers missing on production
- Monitoring and analytics absent for production launch

## Non-Blocking Gates

Report but do not block for:

- Minor metadata length improvements
- Optional structured data enhancements
- Low-impact internal-link opportunities
- Cosmetic performance opportunities outside critical route templates

## Evidence Requirements

Each gate decision includes:

- Route or route group
- Evidence source
- Handbook reference
- Severity
- Required fix or mitigation
- Retest method

## Release Decision Labels

| Label | Meaning |
|-------|---------|
| **Pass** | No blocking issues in reviewed scope |
| **Conditional Pass** | Risks exist with owner, mitigation, and acceptance |
| **Blocked** | Critical or high-risk issue must be fixed before release |
| **Inconclusive** | Required evidence is missing |
