import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { CheckoutGuaranteeCard } from "@/components/checkout/CheckoutGuaranteeCard";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { CheckoutTrustRow } from "@/components/checkout/CheckoutTrustRow";
import { getOrderById } from "@/server/domain/orders";
import { PaymentAutoRedirect } from "./PaymentAutoRedirect";

export const metadata: Metadata = {
  title: "Payment",
  description: "Secure payment step for your Growrix OS order.",
  robots: { index: false, follow: false },
};

type PaymentPageProps = {
  searchParams?: Promise<{
    order?: string | string[];
    checkout?: string | string[];
    status?: string | string[];
  }>;
};

function firstString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const orderId = firstString(resolved?.order);
  const checkoutUrl = firstString(resolved?.checkout);
  const status = firstString(resolved?.status);

  if (status === "success") {
    redirect(orderId ? `/success?order=${encodeURIComponent(orderId)}` : "/success");
  }

  const order = orderId ? await getOrderById(orderId).catch(() => null) : null;

  return (
    <Section size="compact" className="pb-16">
      <Container>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary"
          >
            <ArrowLeftIcon className="size-4" />
            Back to checkout
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <LockClosedIcon className="size-3.5" aria-hidden />
            Secure payment
          </span>
        </div>

        <header className="mb-8 max-w-2xl">
          <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            You&apos;re moments from launch
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-muted sm:text-base">
            {checkoutUrl
              ? "Redirecting you to Stripe's secure checkout page to complete payment."
              : "Payment integration is completing. Follow the button below if this page doesn't advance automatically."}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="min-w-0 space-y-6">
            <CheckoutSteps
              active="payment"
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
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    <ShieldCheckIcon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-text">Stripe hosted checkout</p>
                    <p className="mt-1 text-sm text-text-muted">
                      Card entry, 3DS challenge, and receipts all live on Stripe&apos;s PCI-compliant surface.
                    </p>
                  </div>
                </div>
                {checkoutUrl ? (
                  <LinkButton href={checkoutUrl} size="lg">
                    Continue to Stripe <ArrowUpRightIcon className="size-4" />
                  </LinkButton>
                ) : (
                  <Button type="button" size="lg" disabled>
                    Waiting for Stripe
                  </Button>
                )}
              </div>
            </Card>

            {order ? (
              <Card variant="inset" className="p-4 sm:p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  Order in progress
                </p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-text-muted">Reference</dt>
                    <dd className="font-mono text-xs">{order.order_number}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-text-muted">Payment status</dt>
                    <dd className="capitalize">{order.payment_status.replace(/_/g, " ")}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-text-muted">Fulfillment</dt>
                    <dd className="capitalize">{order.fulfillment_status.replace(/_/g, " ")}</dd>
                  </div>
                </dl>
              </Card>
            ) : null}

            {!checkoutUrl ? (
              <Card>
                <p className="text-sm text-text-muted">
                  If you weren&apos;t redirected automatically, return to checkout and start the flow again.
                  Your billing information is still saved.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <LinkButton href="/checkout" variant="outline">
                    Return to checkout
                  </LinkButton>
                  <LinkButton href="/contact" variant="ghost">
                    Contact the team
                  </LinkButton>
                </div>
              </Card>
            ) : null}
          </div>

          <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-4">
              <CheckoutGuaranteeCard />
              <CheckoutTrustRow />
              <Card>
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  What happens next
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-text-muted">
                  <li>1. Complete payment on Stripe&apos;s secure page.</li>
                  <li>2. Receive an email confirmation immediately after.</li>
                  <li>3. Access downloads and next steps from your dashboard.</li>
                </ul>
              </Card>
            </div>
          </aside>
        </div>

        {checkoutUrl ? <PaymentAutoRedirect href={checkoutUrl} /> : null}
      </Container>
    </Section>
  );
}
