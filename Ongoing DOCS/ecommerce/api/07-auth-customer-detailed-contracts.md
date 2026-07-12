# Auth Customer Detailed Contracts

Document status: active API implementation contract
Owner: Auth, customer experience, security, backend, QA

## Purpose

Define exact auth and customer-account API behavior so sign-up, login, sessions, dashboard, addresses, support, and ownership checks are implemented consistently.

## Shared Rules

- Auth endpoints must use the shared API response shape from `api/01-api-standards.md`.
- Cookie-authenticated mutations require CSRF protection.
- Customer-owned resources require server-side ownership checks.
- Sensitive account actions create security/audit events.
- Do not expose password hashes, token hashes, raw OTPs, refresh tokens, or provider secrets.

## Endpoint Summary

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/register` | Public | Create customer account. |
| POST | `/api/v1/auth/login` | Public | Create session. |
| POST | `/api/v1/auth/logout` | Customer/staff | Revoke current session. |
| POST | `/api/v1/auth/refresh` | Secure refresh path | Rotate access/refresh tokens or session cookie. |
| POST | `/api/v1/auth/password/forgot` | Public | Start reset flow. |
| POST | `/api/v1/auth/password/reset` | Public token | Complete reset and revoke risky sessions. |
| GET | `/api/v1/me` | Customer/staff | Current user profile and permissions. |
| PATCH | `/api/v1/me/profile` | Customer | Update customer profile. |
| GET | `/api/v1/me/addresses` | Customer | List owned addresses. |
| POST | `/api/v1/me/addresses` | Customer | Create address. |
| PATCH | `/api/v1/me/addresses/:id` | Customer | Update owned address. |
| DELETE | `/api/v1/me/addresses/:id` | Customer | Archive owned address. |
| GET | `/api/v1/me/sessions` | Customer | List active sessions/devices. |
| DELETE | `/api/v1/me/sessions/:id` | Customer | Revoke owned session. |
| GET | `/api/v1/me/orders` | Customer | List owned orders. |
| GET | `/api/v1/me/orders/:id` | Customer | Read owned order detail. |
| POST | `/api/v1/me/support-tickets` | Customer | Create support ticket. |

## Register Request
```json
{
  "email": "buyer@example.com",
  "password": "safe-password-value",
  "name": "Buyer Name",
  "marketingConsent": false,
  "returnUrl": "/checkout"
}
```

Response:
```json
{
  "data": {
    "userId": "usr_123",
    "accountState": "pending_verification",
    "verificationRequired": true,
    "nextAction": "verify_email"
  },
  "meta": {
    "requestId": "req_123"
  },
  "error": null
}
```

## Login Request
```json
{
  "email": "buyer@example.com",
  "password": "safe-password-value",
  "returnUrl": "/checkout?plan=pro"
}
```

Response:
```json
{
  "data": {
    "user": {
      "id": "usr_123",
      "email": "buyer@example.com",
      "name": "Buyer Name",
      "roles": ["customer"],
      "permissions": []
    },
    "session": {
      "id": "sess_123",
      "expiresAt": "2026-07-19T10:00:00Z"
    },
    "returnUrl": "/checkout?plan=pro"
  },
  "meta": {
    "requestId": "req_123"
  },
  "error": null
}
```

## Address Request
```json
{
  "label": "Home",
  "name": "Buyer Name",
  "phone": "+10000000000",
  "line1": "123 Main St",
  "line2": "Apt 4",
  "city": "Dhaka",
  "region": "Dhaka",
  "postalCode": "1207",
  "country": "BD",
  "isDefaultShipping": true,
  "isDefaultBilling": true
}
```

Rules:
- Updating saved addresses never mutates completed order snapshots.
- Deleting an address archives it when historical references exist.
- Validation returns field-level address errors.

## Session Response
```json
{
  "data": {
    "sessions": [
      {
        "id": "sess_123",
        "deviceLabel": "Windows Chrome",
        "createdAt": "2026-07-12T10:00:00Z",
        "lastUsedAt": "2026-07-12T11:00:00Z",
        "current": true
      }
    ]
  },
  "meta": {},
  "error": null
}
```

## Customer Order Response

Customer order endpoints return the same order source state as admin views, filtered for customer-safe visibility:

- Order summary and immutable items.
- Payment state without provider secrets.
- Invoice/download links when available.
- Fulfillment/tracking state.
- Return/cancel/support eligibility.
- Customer-visible notes only.

## Required Error Behavior

| Case | HTTP | Error code |
| --- | --- | --- |
| Invalid credentials | 401 | `INVALID_CREDENTIALS` |
| Unverified account | 403 | `ACCOUNT_VERIFICATION_REQUIRED` |
| Suspended account | 403 | `ACCOUNT_SUSPENDED` |
| Expired reset token | 400 | `RESET_TOKEN_EXPIRED` |
| Address not owned | 404 or 403 | `NOT_FOUND` or `FORBIDDEN` by security policy |
| Session not owned | 404 | `NOT_FOUND` |

## Tests

- Register, verify, login, refresh, logout.
- Password reset invalidates sessions according to policy.
- Customer cannot read another customer's order/address/session.
- Return URL is preserved through auth redirect.
- CSRF protection rejects cookie-authenticated mutation without valid token.

## Acceptance Criteria

- Customer auth and account APIs are buildable without guessing payloads or ownership rules.
- Auth flows preserve checkout return state.
- Customer dashboard APIs expose only owner-safe data.
