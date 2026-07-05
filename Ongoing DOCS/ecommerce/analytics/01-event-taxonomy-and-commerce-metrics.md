# Event Taxonomy And Commerce Metrics

Document status: analytics source
Owner: Analytics and product

## Purpose

Define event naming and ecommerce metrics for revenue, product, funnel, and operations reporting.

## Event Naming Rules

- Use lowercase dot notation: `domain.action`.
- Include stable IDs and safe metadata.
- Avoid raw personal data in analytics payloads.
- Send server-side events for order and payment milestones.
- Use client events for interaction and funnel steps with consent rules.

## Core Events

- `product.viewed`
- `product.searched`
- `product.filtered`
- `cart.item_added`
- `cart.item_removed`
- `checkout.started`
- `checkout.shipping_selected`
- `payment.attempted`
- `payment.failed`
- `order.completed`
- `return.requested`
- `coupon.applied`
- `review.submitted`

## Metrics

- Gross revenue and net revenue.
- Average order value.
- Conversion rate.
- Cart abandonment rate.
- Checkout abandonment rate.
- Refund rate.
- Repeat purchase rate.
- Product view to add-to-cart rate.
- Coupon usage and margin impact.
- Inventory sell-through and stockout rate.

## Acceptance Criteria

- Every revenue-critical step has an event.
- Event payloads support product, customer segment, channel, campaign, and device analysis.
- Privacy and consent rules are respected.
