# Interactive View Registry

Routes that **MUST** be dedicated React views — never prose JSON with embedded HTML forms.

## Interactive (client views required)

| Route | Component | Hook |
|---|---|---|
| quote | QuoteView | useQuoteWizard |
| calculator | CalculatorView | useSolarCalculator |
| inspection | InspectionView | useInspectionForm |
| rebates | RebateCheckerView | useRebateChecker |
| contact | ContactView | useContactForm |
| blog-article | BlogArticleView | — |
| case-study | CaseStudyView | — |
| home hero form | Hero section | useHeroQuoteForm |

## Dynamic (server views OK)

| Route | Pattern |
|---|---|
| blog/[slug] | Server page + content repo |
| case-studies/[slug] | Server page + content repo |

## Prose (JSON + ProsePageView OK)

about, why-solar, why-us, residential, commercial, batteries, ev-chargers, off-grid, maintenance, faq (list page), reviews, certifications, warranty, finance, privacy, terms, cookies, case-studies (index), blog (index)

## Enforcement

`nextjs-code-reviewer` and `nextjs-visual-parity-auditor` block if interactive routes use `dangerouslySetInnerHTML` forms in prose JSON.
