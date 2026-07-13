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
import { CheckoutSteps, type CheckoutStep } from "@/components/checkout/CheckoutSteps";
import { CheckoutTrustRow } from "@/components/checkout/CheckoutTrustRow";
import { getAuthenticatedUser } from "@/server/auth/guards";
import { getOrderById } from "@/server/domain/orders";

const ORDER_FLOW_STEPS: CheckoutStep[] = [
  { id: "cart", label: "Cart", href: "/cart" },
  { id: "information", label: "Information", href: "/checkout?cart=1" },
  { id: "confirmation", label: "Confirmation", href: "/success" },
];

export const metadata: Metadata = {
  title: "Order received",
  description: "Order confirmation and next-step guidance for Growrix OS orders.",
  robots: { index: false, follow: false },
};

type SuccessPageProps = {
  searchParams?: Promise<{
    order?: string | string[];
    product?: string | string[];
    ref?: string | string[];
    status?: string | string[];
  }>;
};

function firstString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function toTitleCase(value: string) {
  return value
    .replace(/_/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function isManualFollowUpOrder(order: Awaited<ReturnType<typeof getOrderById>> | null) {
  if (!order) return true;
  return order.payment_status === "pending";
}

function getLeadMessage(order: Awaited<ReturnType<typeof getOrderById>> | null) {
  if (!order) {
    return "Your order request has been recorded. The Growrix OS team will contact you shortly to confirm scope and next steps.";
  }

  if (isManualFollowUpOrder(order)) {
    return `Order ${order.order_number} has been placed successfully. The Growrix OS team will contact you shortly using your submitted details to continue the process.`;
  }

  return `Order ${order.order_number} is confirmed. Payment ${toTitleCase(order.payment_status)} and fulfillment ${toTitleCase(order.fulfillment_status)}.`;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const orderId = firstString(resolved?.order);
  const productSlug = firstString(resolved?.product);
  const orderRef = firstString(resolved?.ref);
  const status = firstString(resolved?.status);

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
  const manualFlow = isManualFollowUpOrder(order);
  const showPlacedBadge = status === "placed" || manualFlow;

  return (
    <Section size="compact" className="pb-16">
      <Container>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary"
          >
            <ArrowLeftIcon className="size-4" />
            Go to account
          </Link>
          <span
            className={[
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
              showPlacedBadge
                ? "border border-primary/25 bg-primary/10 text-primary"
                : "border border-success/25 bg-success/10 text-success",
            ].join(" ")}
          >
            <LockClosedIcon className="size-3.5" aria-hidden />
            {showPlacedBadge ? "Order placed" : "Payment confirmed"}
          </span>
        </div>

        <header className="mb-8 max-w-2xl">
          <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            Your order is <span className="text-primary">received</span>
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-muted sm:text-base">
            {getLeadMessage(order)}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="min-w-0 space-y-6">
            <CheckoutSteps
              active="confirmation"
              steps={ORDER_FLOW_STEPS}
              hrefOverrides={{
                cart: "/cart",
                information: "/checkout?cart=1",
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
                    <p className="font-display text-lg tracking-tight">
                      {manualFlow ? "Order placed successfully" : "Payment confirmed"}
                    </p>
                    <p className="mt-1 text-sm text-text-muted">
                      {manualFlow
                        ? "Thank you. Growrix OS will contact you for consultation, scope confirmation, and the next progress steps."
                        : "A receipt is on its way to your email. Delivery updates land in your dashboard."}
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
                  {order?.order_number
                    ? `Order number: ${order.order_number}.`
                    : orderRef
                      ? `Order number: ${orderRef}.`
                      : orderId
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
                  {manualFlow
                    ? "Our team will review your request and contact you to align scope, timeline, and payment process."
                    : canViewOrder && order?.fulfillment_status === "delivered"
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
                  {manualFlow ? (
                    <>
                      <li>1. Order confirmation lands in your email shortly.</li>
                      <li>2. Growrix OS team contacts you to finalize requirements and timeline.</li>
                      <li>3. Delivery progress and updates continue after scope confirmation.</li>
                    </>
                  ) : (
                    <>
                      <li>1. Confirmation email with receipt (usually within a minute).</li>
                      <li>2. Fulfillment updates delivered to your dashboard.</li>
                      <li>3. 30-day money-back guarantee if anything isn&apos;t right.</li>
                    </>
                  )}
                </ul>
              </Card>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
