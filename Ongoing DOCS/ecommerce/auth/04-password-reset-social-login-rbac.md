# Password Reset Social Login RBAC

Document status: auth contract
Owner: Security and backend

## Purpose

Define account recovery, social identity, two-factor authentication, roles, and permissions.

## Password Reset Flow

```text
Forgot password -> send reset link -> verify token -> set new password -> invalidate sessions -> notify user
```

## Social Login Rules

- Supported providers may include Google, GitHub, Facebook, Apple, and Microsoft.
- Provider identity must be linked to a verified email or a verified account association flow.
- Social login must not bypass account suspension, role checks, or 2FA requirements.

## 2FA Rules

- Admin and super admin accounts should require 2FA.
- 2FA enrollment, recovery codes, disable flow, and backup verification need audit logs.
- Step-up authentication is required for sensitive admin actions.

## RBAC Rules

- Permissions are checked server-side for every protected mutation.
- Roles should compose permissions rather than hardcode route-only checks.
- Customer ownership checks are separate from staff permissions.
- Role changes require privileged permission and audit logging.

## Acceptance Criteria

- Password reset invalidates risky sessions.
- Social login maps safely to internal accounts.
- RBAC protects admin and customer data at API boundaries.
