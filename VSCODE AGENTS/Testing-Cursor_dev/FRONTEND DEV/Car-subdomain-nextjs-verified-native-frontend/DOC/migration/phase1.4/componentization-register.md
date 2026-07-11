# Componentization Register

Generated: 2026-05-23

## Shared Shell Ownership
- Header, footer, and extra panel moved to typed native node data in `src/data/native-shell.json`.
- Runtime rendering owned by `src/components/site/native-node-renderer.tsx`.
- App shell wiring owned by `src/app/layout.tsx`.

## Route Ownership Components
- Per-route page ownership is explicit in `src/app/**/page.tsx` (32 canonical routes plus `/routes`).
- Route content rendering and metadata ownership are centralized in `src/components/site/native-route-page.tsx`.
- Route/page data registry is typed in `src/data/native-content.ts` and sourced from generated `src/data/native-pages.json`.

## Interaction and Behavior Components
- Global interactive shell behavior is owned by `src/components/site/site-behaviors.tsx`.
- Slider bootstrapping ownership is in `src/components/site/swiper-boot.tsx` with variant metadata from `src/data/native-content.ts`.
- Script enhancer ownership is in `src/components/site/page-enhancers.tsx`.

## Forms Ownership
- Contact form ownership: `src/components/forms/contact-form.tsx`.
- Booking form ownership: `src/components/forms/booking-form.tsx`.
- Placeholder nodes in route data (`placeholder: contact|booking`) are resolved by `src/components/site/native-node-renderer.tsx`.

## Data Module Ownership
- Route manifest: `src/data/native-route-list.json`.
- Shell node graph: `src/data/native-shell.json`.
- Page node graph and per-route metadata/scripts: `src/data/native-pages.json`.
- Typed facade and getters: `src/data/native-content.ts`.
