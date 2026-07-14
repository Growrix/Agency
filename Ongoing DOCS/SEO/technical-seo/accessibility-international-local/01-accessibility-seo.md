# Accessibility SEO

Document status: active module

## Purpose

Define accessibility practices that support users, content clarity, and Technical SEO quality.

## Scope

Covers semantic HTML, headings, landmarks, links, forms, alt text, keyboard navigation, focus states, color contrast, reduced motion, and accessible error states.

## Business Value

Accessible sites serve more users, reduce legal and UX risk, and often produce cleaner crawlable structure.

## Dependencies

- `media/01-image-seo.md`
- `on-page/05-internal-linking-navigation.md`
- `testing-auditing/01-testing-strategy.md`

## Concepts

- Accessibility and SEO both benefit from semantic structure and meaningful content.
- Search bots do not replace accessibility testing.
- Good headings and links improve comprehension for users and crawlers.

## Architecture

Accessibility must be included in component design, content editing, route templates, QA, and release gates.

## Best Practices

- Use semantic HTML before ARIA.
- Keep heading hierarchy meaningful.
- Make all interactive controls keyboard accessible.
- Associate form labels and error messages.
- Respect reduced-motion preferences.

## Common Mistakes

- Using clickable divs instead of links or buttons.
- Skipping heading levels for visual reasons.
- Hiding focus outlines.
- Adding images without meaningful alt text.

## Validation Rules

- Public route templates must pass automated accessibility checks and key manual keyboard checks.
- Important links and controls must be accessible by keyboard and screen reader.
- Content structure must be semantic.

## Testing Strategy

Use automated accessibility tools, keyboard testing, screen reader spot checks, color contrast checks, and form error validation.

## Monitoring

Monitor accessibility regressions in CI, user reports, and template-level audits.

## Maintenance

Review accessibility when components, navigation, forms, modals, media, or content templates change.

## Future Enhancements

- Add component-level accessibility acceptance criteria.
- Add screen reader test scripts for critical flows.

## Related Documents

- `media/01-image-seo.md`
- `testing-auditing/01-testing-strategy.md`
- `checklists/01-prelaunch-checklist.md`

## References

- WCAG guidance.
- WAI-ARIA Authoring Practices.
