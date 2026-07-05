# Auth Overview

Document status: auth source
Owner: Security and backend

## Purpose

Define account, session, identity, and authorization behavior for ecommerce customers and staff.

## Account Types

- Guest session.
- Customer account.
- Support staff account.
- Manager account.
- Admin account.
- Super admin account.

## Auth Capabilities

- Signup and email verification.
- Login with password, magic link, OTP, or social provider where enabled.
- Session creation and device tracking.
- Access token and refresh token rotation.
- Password reset and session invalidation.
- Role-based access control.
- Two-factor authentication for privileged accounts.

## Account States

| State | Meaning |
| --- | --- |
| Pending verification | Account exists but email/OTP has not been verified. |
| Active | Account can authenticate and use allowed features. |
| Suspended | Access is blocked by admin or risk controls. |
| Deleted/anonymized | Account data has been removed or anonymized by policy. |

## Security Rules

- Passwords are hashed with a modern adaptive algorithm.
- Tokens are short-lived, rotated, and revocable.
- Refresh tokens are bound to sessions/devices when possible.
- Staff and admin accounts require stricter controls than customer accounts.
- Sensitive account changes require notification and audit logging.

## Acceptance Criteria

- Customer and staff auth flows are separated by role and permission.
- Ownership checks protect customer data.
- Token, session, and device behavior is documented and testable.
