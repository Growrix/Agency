# Auth Clerk Migration — Frontend

## Layout

- Add client wrapper `ClerkAppProvider` with `ClerkProvider` inside `<body>` in root layout.
- Pass publishable key from env; use `afterSignOutUrl="/"`.

## Login pages

| Route | Component | Redirect |
|-------|-----------|----------|
| `/admin/login` | `<SignIn />` | `/admin` |
| `/dashboard/login` | `<SignIn />` | `next` query or `/dashboard` |

Remove custom form POST to `/api/v1/auth/login` and `CustomerAuthPanel` password fields.

## Shells

- Admin dashboard: optional `<UserButton />` in header
- Customer dashboard: `<UserButton />` for sign-out

## Styling

- Use Clerk `appearance` prop to align with Growrix tokens (primary color, border radius).
- Respect `prefers-reduced-motion`.

## Deprecated UI

- `AdminLoginForm.tsx` — replace with Clerk sign-in wrapper
- `CustomerAuthPanel.tsx` — replace with Clerk sign-in wrapper
