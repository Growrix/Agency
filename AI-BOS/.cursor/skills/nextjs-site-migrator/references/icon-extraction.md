# Icon Extraction

Extract repeated inline SVGs from HTML into `components/icons/`.

## Run

`node scripts/migration/extract-icons.mjs <source.html> --manifest Frontend_Nextjs/NN-site-name/.migration/icons-manifest.json`

## Standard icon set (Sunterra)

| Component | HTML usage |
|---|---|
| BrandMark | header, drawer, favicon |
| IconCheck | announce, trust, feature lists |
| IconStar | testimonials, reviews |
| IconPhone | header, sticky CTA |
| IconSun / IconMoon | theme toggle |
| IconMenu / IconClose | drawer |
| NavHome, NavServices, NavCalc, NavQuote, NavContact | bottom nav |
| ServiceResidential, ServiceCommercial, ... | scard + mega |

## Rules

- No emoji as icon substitutes in production components
- All decorative SVGs: `aria-hidden="true" focusable="false"`
- Icon-only buttons: `aria-label` on parent button
