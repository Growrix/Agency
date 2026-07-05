# Auth Session Token Security

Document status: security contract
Owner: Security and auth

## Purpose

Define security controls for credentials, sessions, tokens, OTP, 2FA, devices, and account recovery.

## Controls

- Password hashing with adaptive algorithms.
- Password strength and breached-password checks where feasible.
- Short-lived access tokens.
- Refresh token rotation and reuse detection.
- Secure, HTTP-only, same-site cookies where cookies are used.
- CSRF protection for session-cookie mutations.
- Account lockout or throttling for credential attacks.
- Device/session list with revoke controls.
- 2FA for staff and privileged roles.

## Sensitive Flows

- Login.
- Refresh.
- Logout.
- Password reset.
- Email/phone change.
- Role change.
- Payment settings access.
- Data export.

## Logging Rules

- Log auth events with actor, session, IP metadata, user agent, and result.
- Do not log passwords, OTP codes, reset tokens, full refresh tokens, or secrets.
- Suspicious auth events should trigger alerts or step-up checks.

## Acceptance Criteria

- Token theft, replay, and reuse are considered in design.
- Privileged roles have stronger controls than standard customers.
- Recovery flows do not become account takeover paths.
