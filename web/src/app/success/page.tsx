import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  LifebuoyIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { CheckoutGuaranteeCard } from "@/components/checkout/CheckoutGuaranteeCard";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { CheckoutTrustRow } from "@/components/checkout/CheckoutTrustRow";
import { getAuthenticatedUser } from "@/server/auth/guards";
import { getOrderById } from "@/server/domain/orders";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Checkout confirmation and next-step guidance for Growrix OS orders.",
  robots: { index: false, follow: false },
};

type SuccessPageProps = {
  searchParams?: Promise<{ order?: string | string[]; product?: string | string[] }>;
};

function firstString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function formatOrderState(order: Awaited<ReturnType<typeof getOrderById>>) {
  if (!order) {
    return "Your order has been received and the team will continue the fulfillment flow.";
  }
  return `Payment ${order.payment_status.replace(/_/g, " ")} · Fulfillment ${order.fulfillment_status.replace(/_/g, " ")}.`;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const orderId = firstString(resolved?.order);
  const productSlug = firstString(resolved?.product);

  const headerList = await headers();
  const cookieHeader = headerList.get("cookie");
  const user = cookieHeader
    ? await getAuthenticatedUser(
        new Request("http://localhost/success", { headers: { cookie: cookieHeader } }),
      )
    : null;

  const order = orderId ? await getOrderById(orderId).catch(() => null) : null;
  const canViewOrder = Boolean(
    user && order && (user.role === "admin" || order.customer_email === user.email.toLowerCase()),
  );

  return (
    <Section size="compact" className="pb-16">
      <Container>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary"
          >
            <ArrowLeftIcon className="size-4" />
            Go to dashboard
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-success/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-success">
            <LockClosedIcon className="size-3.5" aria-hidden />
            Payment confirmed
          </span>
        </div>

        <header className="mb-8 max-w-2xl">
          <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            Your order is <span className="text-primary">in motion</span>
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-muted sm:text-base">
            {canViewOrder && order
              ? `Order ${order.order_number} is now recorded. ${formatOrderState(order)}`
              : formatOrderState(order)}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="min-w-0 space-y-6">
            <CheckoutSteps
              active="confirmation"
              hrefOverrides={{
                cart: "/cart",
                information: "/checkout",
                payment: orderId ? `/checkout/payment?order=${encodeURIComponent(orderId)}` : "/checkout/payment",
                confirmation: orderId ? `/success?order=${encodeURIComponent(orderId)}` : "/success",
              }}
            />

            <Card>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-success/15 text-success"
                  >
                    <CheckCircleIcon className="size-6" />
                  </span>
                  <div>
                    <p className="font-display text-lg tracking-tight">Payment confirmed</p>
                    <p className="mt-1 text-sm text-text-muted">
                      A receipt is on its way to your email. Delivery updates land in your dashboard.
                    </p>
                  </div>
                </div>
                <LinkButton
                  href={canViewOrder ? "/dashboard/downloads" : "/dashboard/login?next=/dashboard"}
                  size="lg"
                >
                  {canViewOrder ? "Open dashboard" : "Sign in to dashboard"}{" "}
                  <ArrowUpRightIcon className="size-4" />
                </LinkButton>
              </div>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card variant="inset" className="p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <DocumentTextIcon className="size-4 text-primary" aria-hidden />
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    Order context
                  </p>
                </div>
                <p className="mt-3 text-sm leading-6 text-text-muted">
                  {productSlug ? `Product: ${productSlug}. ` : ""}
                  {orderId
                    ? `Reference: ${orderId}.`
                    : "Reference is attached to your checkout session."}
                </p>
              </Card>
              <Card variant="inset" className="p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <LifebuoyIcon className="size-4 text-primary" aria-hidden />
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    Next action
                  </p>
                </div>
                <p className="mt-3 text-sm leading-6 text-text-muted">
                  {canViewOrder && order?.fulfillment_status === "delivered"
                    ? "Your download access is ready in the dashboard."
                    : "Use the customer dashboard to track delivery, appointments, and support requests."}
                </p>
              </Card>
            </div>

            {!canViewOrder ? (
              <Card>
                <p className="text-sm leading-6 text-text-muted">
                  Sign in or create a customer account with the same checkout email to see
                  dashboard access, downloads, and order history.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <LinkButton href="/sign-in?next=/dashboard">Sign in</LinkButton>
                  <LinkButton href="/sign-up?next=/dashboard" variant="outline">
                    Create account
                  </LinkButton>
                </div>
              </Card>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <LinkButton href="/digital-products" variant="outline">
                Browse more digital products
              </LinkButton>
              <LinkButton href="/contact" variant="ghost">
                Contact the team
              </LinkButton>
            </div>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-4">
              <CheckoutGuaranteeCard />
              <CheckoutTrustRow />
              <Card>
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  What to expect
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                  <li>1. Confirmation email with receipt (usually within a minute).</li>
                  <li>2. Fulfillment updates delivered to your dashboard.</li>
                  <li>3. 30-day money-back guarantee if anything isn&apos;t right.</li>
                </ul>
              </Card>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
