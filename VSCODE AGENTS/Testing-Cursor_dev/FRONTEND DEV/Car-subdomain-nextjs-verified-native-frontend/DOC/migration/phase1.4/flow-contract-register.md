# Flow Contract Register

Generated: 2026-05-23

## Contact Form Contract
- Route: `/contact`
- Owner: `src/components/forms/contact-form.tsx`
- Validation states:
  - required: name, email, phone, message
  - email format validation
- Submission states:
  - `idle`
  - `submitting`
  - `success`
  - `error`
  - `not-configured`
- Integration boundary:
  - Uses `NEXT_PUBLIC_CONTACT_ENDPOINT`
  - Requires `NEXT_PUBLIC_CONTACT_DELIVERY_ENABLED=true`
  - Displays explicit not-configured message when disabled/unset

## Booking Form Contract
- Route: `/appointment`
- Owner: `src/components/forms/booking-form.tsx`
- Validation states:
  - required: service, date, time, name, email, phone
  - optional: message
  - email format validation
- Submission states:
  - `idle`
  - `submitting`
  - `success`
  - `error`
  - `not-configured`
- Integration boundary:
  - Uses `NEXT_PUBLIC_BOOKING_ENDPOINT`
  - Requires `NEXT_PUBLIC_BOOKING_DELIVERY_ENABLED=true`
  - Displays explicit not-configured message when disabled/unset

## Route/Redirect Contract
- Canonical route owners: explicit `src/app/**/page.tsx` files.
- Legacy `.html` aliases: redirect-only via `next.config.ts` using `src/data/native-route-list.json`.
- Canonical-not-found contract: `src/app/not-found.tsx` and route smoke checks in `scripts/qa-native-checks.mjs`.
