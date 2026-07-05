# Login Session JWT Refresh

Document status: auth contract
Owner: Security and backend

## Purpose

Define login, session, access token, refresh token, and logout behavior.

## Login Flow

```text
Login -> validate credentials -> check account state -> create session -> issue access token -> issue refresh token -> load dashboard or return URL
```

## Token Rules

- Access tokens are short-lived.
- Refresh tokens rotate on use.
- Refresh token reuse triggers session risk handling.
- Tokens include only necessary claims.
- Server-side session records remain the revocation source.

## Session Rules

- Sessions track device, IP metadata, user agent, created time, last used time, and revocation state.
- Users can view and revoke active sessions.
- Password reset and suspicious activity should invalidate relevant sessions.
- Staff sessions may require shorter lifetimes and step-up authentication.

## API Rules

- Protected APIs require valid access tokens or secure session cookies.
- Refresh endpoints must be CSRF-aware when cookies are used.
- Logout revokes the refresh/session path, not only the client token.

## Acceptance Criteria

- Expired access tokens can be refreshed only with a valid refresh path.
- Reused, revoked, or expired refresh tokens are rejected.
- Logout and session revocation prevent further use.
