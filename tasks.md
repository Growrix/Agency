# Project Tasks Ledger
<!-- managed by agents - do not hand-edit without coordination -->

## Metadata
- project_root: F:/PROJECTS/Growrixos
- created_by: system-builder
- created_at: 2026-07-14T16:49:00+06:00
- last_updated_by: system-builder
- last_updated_at: 2026-07-15T18:45:00+06:00
- legacy_tasks_source: DOC/PROJECT PLAN/Tasks/tasks.md

## Plan

### Phase TSEO-1 - Technical SEO Cursor Adaptation
- [x] [TSEO-001] Create personal skill bundle ~/.cursor/skills/technical-seo/
  - status: completed
  - owner: system-builder
  - depends_on: none
  - evidence: ~/.cursor/skills/technical-seo/SKILL.md + reference/
- [x] [TSEO-002] Replace technical-seo-architect with Technical_SEO_expert agent
  - status: completed
  - owner: system-builder
  - depends_on: TSEO-001
  - evidence: .cursor/agents/Technical_SEO_expert.md; deleted technical-seo-architect.md
- [x] [TSEO-003] Update global registries (agents_cursor, skills-index, lanes-index)
  - status: completed
  - owner: system-builder
  - depends_on: TSEO-002
  - evidence: ~/.cursor/docs/agents_cursor.md; ~/.cursor/skills/system-builder/registry/skills-index.md; lanes-index.md
- [x] [TSEO-004] Update lane-router.yaml and platform-installation.md
  - status: completed
  - owner: system-builder
  - depends_on: TSEO-003
  - evidence: .cursor/brain/lane-router.yaml; Ongoing DOCS/SEO/agents/platform-installation.md
- [x] [TSEO-005] Run compatibility checklist and validate
  - status: completed
  - owner: system-builder
  - depends_on: TSEO-004
  - evidence: compatibility checklist passed (see log)

### Phase TSEO-AUDIT - Full-Site Technical SEO Audit
- [x] [TSEO-AUDIT-001] Collect evidence: web/ SaaS routes, metadata, JSON-LD, components, tests
  - status: completed
  - owner: Technical_SEO_expert
  - depends_on: none
  - evidence: subagent transcript 68b4bc9d-cc31-4374-afdf-e94552e1deb8
- [x] [TSEO-AUDIT-002] Collect evidence: sites/ HTML templates SEO head and structure
  - status: completed
  - owner: Technical_SEO_expert
  - depends_on: none
  - evidence: subagent transcript 59ab25dd-b796-427b-af7f-ee7dcf9c2052
- [x] [TSEO-AUDIT-003] Collect evidence: Frontend_Nextjs/ migrated sites SEO
  - status: completed
  - owner: Technical_SEO_expert
  - depends_on: none
  - evidence: subagent transcript d39db02d-0811-4bfe-8e3b-a8811e482325
- [x] [TSEO-AUDIT-004] Synthesize findings and produce overall Technical SEO status report
  - status: completed
  - owner: Technical_SEO_expert
  - depends_on: TSEO-AUDIT-001, TSEO-AUDIT-002, TSEO-AUDIT-003
  - evidence: Ongoing DOCS/SEO/technical-seo/audit-reports/2026-07-14-growrixos-full-site-technical-seo-audit.md
- [x] [TSEO-AUDIT-005] Produce AI-executable Technical SEO plan and roadmap
  - status: completed
  - owner: Technical_SEO_expert
  - depends_on: TSEO-AUDIT-004
  - evidence: Ongoing DOCS/SEO/technical-seo/audit-reports/2026-07-14-growrixos-full-site-technical-seo-audit.md (Section 6)

### Phase WEB-SEO - Focused web/ Technical SEO Remediation
- [x] [WEB-SEO-001] Fix root canonical inheritance and per-route metadata
  - status: completed
  - owner: Technical_SEO_expert
  - depends_on: TSEO-AUDIT-005
  - evidence: web/src/lib/seo-metadata.ts; web/src/app/layout.tsx (removed global canonical); per-route buildPageMetadata on services, blog, portfolio, FAQ, about, contact, pricing, digital-products, homepage
- [x] [WEB-SEO-002] Add robots noindex to transactional routes + legal URL consolidation
  - status: completed
  - owner: Technical_SEO_expert
  - depends_on: WEB-SEO-001
  - evidence: sign-in, sign-up, cart, complete-account/layout, live-chat/layout NOINDEX_ROBOTS; web/next.config.ts 301 /privacy-policy→/legal/privacy, /terms-of-service→/legal/terms; DISALLOWED_CRAWL_PATHS updated in site.ts
- [x] [WEB-SEO-003] Add JSON-LD to services, blog, portfolio, FAQ routes
  - status: completed
  - owner: Technical_SEO_expert
  - depends_on: WEB-SEO-001
  - evidence: web/src/lib/seo-structured-data.ts; Service+FAQPage on services/[slug]; BlogPosting on blog/[slug]; CreativeWork on portfolio/[slug]; FAQPage on /faq; Organization.sameAs on homepage
- [x] [WEB-SEO-004] Fix SearchAction, sitemap, nav link, release gates
  - status: completed
  - owner: Technical_SEO_expert
  - depends_on: WEB-SEO-001
  - evidence: removed invalid SearchAction from homepage; sitemap static routes omit lastModified; nav.ts mobile SEO link→/services/technical-seo; release-gates.spec.ts expanded (15 tests)
- [x] [WEB-SEO-005] Run health:check validation and update audit report
  - status: completed
  - owner: Technical_SEO_expert
  - depends_on: WEB-SEO-002, WEB-SEO-003, WEB-SEO-004
  - evidence: lint/typecheck/perf:budgets/test/build/release-gates pass (15/15); commit 0350ba0; Ongoing DOCS/SEO/technical-seo/audit-reports/2026-07-14-web-seo-remediation.md

### Phase SEO-SUITE - Complete SEO Agent Suite
- [x] [SEO-001] Restructure handbook Ongoing DOCS/Technical_SEO → Ongoing DOCS/SEO/technical-seo + shared root
  - status: completed
  - owner: system-builder
  - depends_on: none
  - evidence: Ongoing DOCS/SEO/README.md; Ongoing DOCS/SEO/00-documentation-map.md; git mv to technical-seo/
- [x] [SEO-002] Create On_Page_SEO_expert agent, handbook, personal skill
  - status: completed
  - owner: system-builder
  - depends_on: SEO-001
  - evidence: .cursor/agents/On_Page_SEO_expert.md; Ongoing DOCS/SEO/on-page-seo/; ~/.cursor/skills/on-page-seo/
- [x] [SEO-003] Create Off_Page_SEO_expert agent, handbook, personal skill
  - status: completed
  - owner: system-builder
  - depends_on: SEO-001
  - evidence: .cursor/agents/Off_Page_SEO_expert.md; Ongoing DOCS/SEO/off-page-seo/; ~/.cursor/skills/off-page-seo/
- [x] [SEO-004] Update Technical_SEO_expert paths to Ongoing DOCS/SEO/technical-seo/
  - status: completed
  - owner: system-builder
  - depends_on: SEO-001
  - evidence: .cursor/agents/Technical_SEO_expert.md; ~/.cursor/skills/technical-seo/ updated
- [x] [SEO-005] Update registries and lane-router.yaml
  - status: completed
  - owner: system-builder
  - depends_on: SEO-002, SEO-003, SEO-004
  - evidence: ~/.cursor/docs/agents_cursor.md; skills-index.md; lanes-index.md; .cursor/brain/lane-router.yaml
- [x] [SEO-006] Compatibility checklist and platform-installation.md
  - status: completed
  - owner: system-builder
  - depends_on: SEO-005
  - evidence: Ongoing DOCS/SEO/agents/platform-installation.md; compatibility checklist passed

### Phase WEB-PERF - Homepage Performance Remediation
- [x] [WEB-PERF-001] Write Pingdom/HAR audit report
  - status: completed
  - owner: Technical_SEO_expert
  - depends_on: none
  - evidence: Ongoing DOCS/SEO/technical-seo/audit-reports/2026-07-15-growrixos-homepage-pingdom-performance-audit.md
- [x] [WEB-PERF-002] Narrow Clerk proxy matcher to skip handshake on marketing routes
  - status: completed
  - owner: Technical_SEO_expert
  - depends_on: WEB-PERF-001
  - evidence: web/src/proxy.ts — createRouteMatcher + legacyProxy for marketing routes
- [x] [WEB-PERF-003] Add E2E regression for homepage 200 without Clerk handshake
  - status: completed
  - owner: Technical_SEO_expert
  - depends_on: WEB-PERF-002
  - evidence: web/tests/e2e/release-gates.spec.ts security headers test
- [x] [WEB-PERF-004] Run health:check validation
  - status: completed
  - owner: Technical_SEO_expert
  - depends_on: WEB-PERF-003
  - evidence: npm run health:check exit 0; release-gates 15/15 pass

## Log
- 2026-07-14T16:49:00+06:00 | system-builder | intake | Started Technical SEO Cursor adaptation per approved plan
- 2026-07-14T17:05:00+06:00 | system-builder | complete | All TSEO tasks completed; Technical_SEO_expert + @technical-seo skill active
- 2026-07-14T17:15:00+06:00 | Technical_SEO_expert | audit_start | Launched full-site Technical SEO audit across web/, sites/, Frontend_Nextjs/
- 2026-07-14T17:30:00+06:00 | Technical_SEO_expert | audit_complete | Full-site audit report saved to Ongoing DOCS/SEO/technical-seo/audit-reports/
- 2026-07-14T19:00:00+06:00 | senior-saas-developer | email_url_fix | Fixed transactional email localhost links via resolveAppBaseUrl()
- 2026-07-14T18:45:00+06:00 | Technical_SEO_expert | web_seo_remediation | Completed focused web/ SEO remediation (WEB-SEO-001..005); release-gates 15/15 pass; commit 0350ba0
- 2026-07-15T18:45:00+06:00 | Technical_SEO_expert | web_perf_remediation | Homepage Clerk handshake fix; audit report; health:check 15/15 pass
