# Email SMS WhatsApp Integration

Document status: integration contract
Owner: Notifications and CX

## Purpose

Define outbound messaging for transactional, operational, and marketing communication.

## Channels

- Email through Resend, SendGrid, SMTP, or equivalent.
- SMS through Twilio, Vonage, or equivalent.
- WhatsApp through approved provider APIs.
- In-app notifications when account dashboard exists.
- Push notifications when a mobile app or PWA channel exists.

## Transactional Messages

- Email verification.
- Password reset.
- Order confirmation.
- Payment failed or pending.
- Shipping confirmation and tracking.
- Return/refund status.
- Support ticket updates.
- Security notifications.

## Rules

- Transactional messages must be event-driven and retryable.
- Marketing messages require consent and unsubscribe handling.
- Templates require versioning and preview/testing before release.
- Message logs should record channel, recipient, template, status, provider ID, and failure reason.
- Sensitive links require expiration and token protections.

## Acceptance Criteria

- Critical customer messages are observable and retryable.
- Consent and unsubscribe rules are enforced.
- Support can see message history without seeing secrets or raw tokens.
