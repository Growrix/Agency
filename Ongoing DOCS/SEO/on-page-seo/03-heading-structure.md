# Heading Structure (H1–H6)

Document status: domain guide
Last updated: 2026-07-14

## Rules

1. **One H1 per page** — Primary topic; matches intent, not just branding.
2. **Hierarchy** — H2 for major sections, H3 for subsections; do not skip levels for styling.
3. **Keywords in headings** — Natural inclusion of primary/secondary terms in H2/H3 where readable.
4. **Scannability** — Headings should summarize section value for users and crawlers.

## Common Issues

| Issue | Severity | Fix |
| --- | --- | --- |
| Multiple H1s | High | Consolidate to one; demote others to H2 |
| Empty or generic H1 ("Welcome") | High | Rewrite to intent-aligned topic |
| H2 used for nav labels only | Medium | Ensure content sections have descriptive H2s |
| Heading order jumps H2 → H4 | Medium | Insert proper H3 or re-level |

## Template Outline Format

```text
H1: {primary topic}
  H2: {section 1}
    H3: {subsection}
  H2: {section 2}
```

## Handoff

Semantic HTML implementation validated by Technical or frontend agents; on-page agent owns **wording and outline**.
