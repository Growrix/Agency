import type { Metadata } from "next";
import { headers } from "next/headers";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { getAuthenticatedUser } from "@/server/auth/guards";
import { getOrderById } from "@/server/domain/orders";

export const metadata: Metadata = {
  title: "Order Success",
  description: "Checkout success and next-step guidance for Growrix OS orders.",
  robots: { index: false, follow: false },
};

type SuccessPageProps = {
  searchParams?: Promise<{ order?: string | string[]; product?: string | string[] }>;
};

function formatOrderState(order: Awaited<ReturnType<typeof getOrderById>>) {
  if (!order) {
    return "Your order has been received and the team will continue the fulfillment flow.";
  }

  return `Payment: ${order.payment_status}. Fulfillment: ${order.fulfillment_status}.`;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const orderId = Array.isArray(resolved?.order) ? resolved?.order[0] : resolved?.order;
  const productSlug = Array.isArray(resolved?.product) ? resolved?.product[0] : resolved?.product;

  const headerList = await headers();
  const cookieHeader = headerList.get("cookie");
  const user = cookieHeader
    ? await getAuthenticatedUser(new Request("http://localhost/success", { headers: { cookie: cookieHeader } }))
    : null;

  const order = orderId ? await getOrderById(orderId) : null;
  const canViewOrder = Boolean(
    user && order && (user.role === "admin" || order.customer_email === user.email.toLowerCase())
  );

  const desktopView = (
    <Section className="py-16 sm:py-24">
      <Container width="reading">
        <Card>
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Checkout success</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight">Your order is in motion</h1>
          <p className="mt-4 text-sm leading-6 text-text-muted">
            {canViewOrder && order
              ? `Order ${order.order_number} is now recorded. ${formatOrderState(order)}`
              : formatOrderState(order)}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-sm border border-border/60 bg-inset/35 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Next action</p>
              <p className="mt-3 text-sm text-text-muted">
                {canViewOrder && order?.fulfillment_status === "delivered"
                  ? "Your download access is ready in the dashboard."
                  : "Use the customer dashboard to track delivery, appointments, and support requests."}
              </p>
            </div>
            <div className="rounded-sm border border-border/60 bg-inset/35 px-4 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Order context</p>
              <p className="mt-3 text-sm text-text-muted">
                {productSlug ? `Product: ${productSlug}. ` : ""}
                {orderId ? `Reference: ${orderId}.` : "Reference is attached to your checkout session."}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={canViewOrder ? "/dashboard/downloads" : "/dashboard/login?next=/dashboard"}>
              {canViewOrder ? "Open dashboard" : "Sign in to dashboard"}
            </LinkButton>
            <LinkButton href="/digital-products" variant="outline">Browse more digital products</LinkButton>
            <LinkButton href="/contact" variant="outline">Contact the team</LinkButton>
          </div>

          {!canViewOrder ? (
            <p className="mt-6 text-sm text-text-muted">
              Create or sign in to a customer account with the same checkout email to see dashboard access, downloads, and order history.
            </p>
          ) : null}
        </Card>
      </Container>
    </Section>
  );

  const mobileView = (
    <Section className="py-10">
      <Container>
        {/* Centered confirmation block */}
        <div className="home-mobile-marketing flex flex-col items-center text-center">
          {/* Success icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <svg viewBox="0 0 24 24" fill="none" className="size-7 text-primary" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                stroke="currentColor"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <p className="home-mobile-marketing__eyebrow mt-4 font-mono uppercase tracking-[0.18em] text-primary">
            Checkout success
          </p>
          <h1 className="home-mobile-marketing__title mt-2 font-display font-bold tracking-tight">
            Your order is in motion
          </h1>
          <p className="home-mobile-marketing__description mt-2 text-text-muted">
            {canViewOrder && order
              ? `Order ${order.order_number} is now recorded. ${formatOrderState(order)}`
              : formatOrderState(order)}
          </p>

          {/* Full-width primary CTA */}
          <div className="home-mobile-marketing__cta-row home-mobile-marketing__cta-row--center mt-5 w-full flex-col gap-2">
            <LinkButton
              href={canViewOrder ? "/dashboard/downloads" : "/dashboard/login?next=/dashboard"}
              fullWidth
              size="lg"
            >
              {canViewOrder ? "Open dashboard" : "Sign in to dashboard"}
            </LinkButton>
            <LinkButton href="/digital-products" variant="outline" fullWidth size="lg">
              Browse more products
            </LinkButton>
          </div>
        </div>

        {/* Order context cards */}
        <div className="mt-6 grid gap-3">
          <div className="rounded-2xl border border-border/60 bg-inset/35 px-4 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Next action</p>
            <p className="mt-3 text-sm leading-6 text-text-muted">
              {canViewOrder && order?.fulfillment_status === "delivered"
                ? "Your download access is ready in the dashboard."
                : "Use the customer dashboard to track delivery, appointments, and support requests."}
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-inset/35 px-4 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">Order context</p>
            <p className="mt-3 text-sm leading-6 text-text-muted">
              {productSlug ? `Product: ${productSlug}. ` : ""}
              {orderId ? `Reference: ${orderId}.` : "Reference is attached to your checkout session."}
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <LinkButton href="/contact" variant="ghost" size="sm">
            Contact the team
          </LinkButton>
        </div>

        {!canViewOrder ? (
          <p className="mt-5 text-center text-xs leading-5 text-text-muted">
            Sign in with the same checkout email to access your dashboard, downloads, and order history.
          </p>
        ) : null}
      </Container>
    </Section>
  );

  return (
    <MarketingViewportGate
      desktop={desktopView}
      mobile={mobileView}
    />
  );
}
