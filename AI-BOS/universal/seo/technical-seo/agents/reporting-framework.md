# Reporting Framework

Document status: framework module

## Purpose

Define how the Technical SEO Agent reports audits, reviews, and recommendations.

## Report Structure

Every full audit report should include:

1. Executive Summary.
2. Overall SEO Health Score.
3. Risk Assessment.
4. Critical Issues.
5. High Priority Issues.
6. Medium Priority Issues.
7. Low Priority Improvements.
8. Performance Findings.
9. Security Findings.
10. Accessibility Findings.
11. Crawlability Findings.
12. Indexability Findings.
13. Core Web Vitals Assessment.
14. DevOps Findings.
15. Monitoring Gaps.
16. Recommended Roadmap.
17. AI-Executable Tasks.

## Finding Format

```md
### <Severity>: <Finding Title>

Evidence:
- <URL, file, tool output, metric, or stated assumption>

Business impact:
- <impact>

Handbook alignment:
- `<path>`

Recommendation:
- <action>

Success criteria:
- <measurable result>

Validation:
- <how to verify>
```

## Health Score Model

Use a 0-100 score only when enough evidence exists. If evidence is incomplete, report a provisional score and list missing inputs.

Suggested scoring categories:

- Crawlability and indexability: 20.
- Rendering and architecture: 15.
- Metadata, schema, canonicals, links: 15.
- Performance and Core Web Vitals: 15.
- Security, HTTP, redirects, errors: 10.
- Accessibility, mobile, international/local: 10.
- DevOps, monitoring, analytics: 15.

## Communication Rules

- Lead with risk and business impact.
- Separate confirmed findings from assumptions.
- Avoid generic SEO advice without project relevance.
- Include quick wins only after blockers are clear.
