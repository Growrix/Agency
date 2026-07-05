# Registration Email Verification OTP

Document status: auth contract
Owner: Security and backend

## Purpose

Define signup, email verification, and OTP behavior.

## Registration Flow

```text
Register -> validate input -> create pending user -> hash password -> send verification -> verify -> activate account -> login
```

## Required Fields

- Email.
- Password when password signup is used.
- Name or display name when required by UX.
- Consent fields where marketing or legal rules require them.

## Verification Rules

- Email verification tokens must expire.
- OTP codes must be rate limited and single-use.
- Verification should not leak whether an email exists beyond safe UX messaging.
- Re-send actions require throttling.
- Verified email changes require re-verification.

## Failure States

- Email already registered.
- Invalid password rules.
- Expired verification token.
- Invalid or replayed OTP.
- Too many attempts.
- Disposable or blocked domain where policy applies.

## Acceptance Criteria

- Registration cannot create an active account without required verification.
- OTP and verification attempts are rate limited and auditable.
- Successful verification transitions account state predictably.
