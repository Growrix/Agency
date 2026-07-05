# Auth Customer API

Document status: API contract
Owner: Backend and auth

## Purpose

Define auth and customer self-service endpoints.

## Auth Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/v1/auth/register` | Create pending customer account. |
| POST | `/api/v1/auth/login` | Authenticate and create session. |
| POST | `/api/v1/auth/logout` | Revoke current session. |
| POST | `/api/v1/auth/refresh` | Rotate refresh token and issue new access token. |
| POST | `/api/v1/auth/verify-email` | Verify email token or OTP. |
| POST | `/api/v1/auth/forgot-password` | Request reset link. |
| POST | `/api/v1/auth/reset-password` | Set new password and invalidate sessions. |
| GET | `/api/v1/auth/sessions` | List active user sessions. |
| DELETE | `/api/v1/auth/sessions/:id` | Revoke a session. |

## Customer Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v1/customer/profile` | Read current customer profile. |
| PATCH | `/api/v1/customer/profile` | Update profile data. |
| GET | `/api/v1/customer/addresses` | List addresses. |
| POST | `/api/v1/customer/addresses` | Create address. |
| PATCH | `/api/v1/customer/addresses/:id` | Update owned address. |
| DELETE | `/api/v1/customer/addresses/:id` | Delete owned address when allowed. |
| GET | `/api/v1/customer/wishlist` | List wishlist items. |
| POST | `/api/v1/customer/wishlist` | Add wishlist item. |
| DELETE | `/api/v1/customer/wishlist/:id` | Remove wishlist item. |

## Rules

- All customer endpoints require ownership checks.
- Auth endpoints must be rate limited.
- Session and password changes require security notifications.
- Address writes must validate country, postal, and phone requirements.

## Acceptance Criteria

- Auth endpoints follow session and token rules from `auth/`.
- Customer APIs never expose other customers' data.
- Validation errors are safe and field-specific where possible.
