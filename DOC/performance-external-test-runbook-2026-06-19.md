# External Performance Test Runbook (HAR Follow-Up)

This runbook standardizes how we collect external evidence after the HAR follow-up optimizations.

## Test URLs

- `https://www.growrixos.com/`
- `https://www.growrixos.com/blog`
- `https://www.growrixos.com/digital-products/category/website-templates-html-preview`

## Required Platforms and Runs

### 1) Pingdom

- Locations: Sydney + one US location (Washington DC or San Francisco)
- Runs: 3 per URL per location
- Export for each run:
  - Full-page screenshot
  - HAR file
  - Summary panel screenshot (load time, requests, page size)

### 2) PageSpeed Insights (PSI)

- Device profiles: Mobile + Desktop
- Runs: 1 per URL per profile
- Export for each run:
  - Public report URL
  - JSON export (if available)
  - Screenshot of Core Web Vitals panel

### 3) WebPageTest

- Profile: Mobile
- Runs: 3 (median run)
- Repeat view: Enabled
- Export for each run set:
  - Public result URL
  - Waterfall screenshot
  - Filmstrip screenshot
  - Core timings panel screenshot

### 4) GTmetrix (optional but recommended)

- Locations: 2
- Runs: 3 per URL per location (median result)
- Export:
  - Public report URL
  - Top issues screenshot
  - Waterfall screenshot

### 5) Google Search Console / CWV

- Capture status screenshot for:
  - Mobile CWV
  - Desktop CWV
- Collect once before rollout and again 7-14 days after deploy.

## Evidence Naming Convention

Store files using:

- `<platform>_<url-key>_<location-or-profile>_run-<n>_<yyyymmdd>.png`
- `<platform>_<url-key>_<location-or-profile>_run-<n>_<yyyymmdd>.har`

Suggested `url-key` values:

- `home`
- `blog`
- `preview-category`

## Internal Validation Completed in This Pass

- `npm run perf:budgets --prefix web` passed
- `npm run lint --prefix web` passed
- `npx playwright test tests/e2e/release-gates.spec.ts --project=desktop-chrome` passed (6/6)
- `npm run build --prefix web` passed

## Submission Checklist

- [ ] Pingdom evidence complete (all runs, both locations, all URLs)
- [ ] PSI evidence complete (mobile + desktop, all URLs)
- [ ] WebPageTest evidence complete (median + repeat view)
- [ ] GTmetrix evidence complete (if collected)
- [ ] Search Console before/after screenshots included
- [ ] Evidence package shared for delta consolidation
