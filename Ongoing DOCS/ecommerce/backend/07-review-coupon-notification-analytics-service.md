# Review Coupon Notification Analytics Service

Document status: backend contract
Owner: Engagement, marketing, analytics

## Purpose

Define engagement and operational services that support conversion, retention, trust, and reporting.

## Review Service

- Product reviews, ratings, images, helpful votes, moderation.
- Verified purchase rules when required.
- Abuse reporting and admin moderation queue.

## Coupon Loyalty Service

- Promo codes, automatic discounts, gift cards, store credit, rewards, referrals.
- Usage limits, eligibility, stacking, expiration, and ledger records.
- Fraud-aware redemption controls.

## Notification Service

- Email, SMS, WhatsApp, push, and in-app notifications.
- Template management and localization path.
- Retry, bounce/failure handling, and unsubscribe/consent rules.

## Analytics Service

- Event ingestion.
- Revenue and funnel reporting.
- Product, customer, retention, and campaign dashboards.
- Abandoned cart and conversion tracking.

## Rules

- Notifications are triggered from events, not scattered UI code.
- Coupon calculations must be deterministic and auditable.
- Review moderation must protect trust and avoid exposing rejected content.
- Analytics must avoid storing unnecessary sensitive personal data.

## Acceptance Criteria

- Engagement services can operate independently from checkout confirmation.
- Marketing tools cannot bypass pricing, consent, or fraud rules.
- Analytics events are consistent with the taxonomy docs.
