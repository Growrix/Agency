# Auth Clerk Migration — API and Data

## Schema change

```typescript
export type UserRecord = {
  id: string;
  clerk_user_id?: string;
  email: string;
  password_hash: string; // sentinel: "clerk-auth" | legacy migration only
  role: Role;
  first_name?: string;
  last_name?: string;
  created_at: string;
  updated_at: string;
};
```

## Mirror sync API (internal)

- `syncClerkUser(clerkUserId)` — fetch from Clerk Backend API, upsert mirror
- `getUserByClerkId(clerkUserId)` — primary lookup in guards
- `getUserByEmail(email)` — fallback for email-based commerce linking

## Webhook route

- `POST /api/webhooks/clerk`
- Uses `verifyWebhook` from `@clerk/nextjs/webhooks`
- Maps Clerk payload to `UserRecord`

## Deprecated routes

| Route | Status |
|-------|--------|
| `POST /api/v1/auth/login` | 410 Gone with message to use Clerk sign-in |
| `POST /api/v1/auth/register` | 410 Gone |
| `POST /api/v1/auth/logout` | Clerk sign-out via UI |

## Unchanged contracts

- `/api/v1/me/**` response shape unchanged; auth source becomes Clerk
- Order/download ownership still keyed by mirror user email and internal id

## Supabase

- Keep `getSupabaseAdminClient` for `app_state` persistence
- Remove `getSupabaseAuthClient` usage from user lifecycle
