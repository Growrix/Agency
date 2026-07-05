# Customer Journey And Sales Funnel

Document status: source of truth
Owner: Product, marketing, CX

## Purpose

Define how visitors become customers, how customers complete purchases, and how the store retains them after checkout.

## Journey Stages

| Stage | Customer question | Platform response |
| --- | --- | --- |
| Awareness | What does this store offer? | Home, landing pages, categories, campaigns, SEO pages. |
| Discovery | Which product fits me? | Search, filters, sort, compare, best sellers, recommendations. |
| Evaluation | Can I trust this? | Reviews, Q&A, product media, policies, delivery estimates, guarantees. |
| Conversion | How fast can I buy? | Cart, checkout, guest checkout, coupons, payment options. |
| Fulfillment | Where is my order? | Order status, tracking, notifications, invoices. |
| Support | What if something goes wrong? | Support tickets, returns, refunds, exchanges, messages. |
| Retention | Why come back? | Rewards, referrals, subscriptions, personalized recommendations. |

## Funnel Rules

- Product discovery must support browse, search, filter, sort, and promotion-led entry points.
- Checkout must minimize required fields while preserving fraud, tax, shipping, and payment requirements.
- Trust content must be close to purchase decisions: policies, reviews, delivery, returns, payment security.
- Customers should be able to recover abandoned carts and failed payments.
- Post-purchase screens must route customers toward tracking, account creation, support, and related products.

## Required Frontend Surfaces

- Home and campaign landing pages.
- Category, collection, brand, deals, trending, featured, and search pages.
- Product detail pages with media, reviews, Q&A, related products, wishlist, compare.
- Cart, checkout, success, failed payment, and order status pages.
- Customer dashboard for orders, invoices, downloads, wishlist, addresses, payments, returns, rewards, support.

## Data Implications

- Track session, attribution, cart, checkout, order, and retention events.
- Persist wishlist, recently viewed, search history, and recommendations when consent allows.
- Store campaign and coupon attribution on orders.

## Analytics Implications

- Measure product view, add to cart, checkout started, payment attempted, order completed, refund requested.
- Track source, campaign, coupon, device, and user type.
- Report abandonment by funnel step and failure reason.

## Acceptance Criteria

- Every major user stage has a page, API, data model, and analytics event owner.
- Failed and edge states are part of the journey, not afterthoughts.
- Retention features are designed from the first release even if launched in later phases.
