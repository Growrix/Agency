import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import {
  ShieldCheckIcon,
  LockClosedIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase securely with Stripe.",
};

export default function CheckoutPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="lg">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Back to Shop
          </Link>

          <h1
            className="text-3xl font-bold tracking-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Checkout
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Card padding="lg">
                <h2
                  className="text-lg font-bold mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Billing Information
                </h2>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="checkoutFirstName" className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <input
                        id="checkoutFirstName"
                        name="firstName"
                        type="text"
                        required
                        className="w-full h-11 px-4 rounded-[var(--radius-md)] border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="checkoutLastName" className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <input
                        id="checkoutLastName"
                        name="lastName"
                        type="text"
                        required
                        className="w-full h-11 px-4 rounded-[var(--radius-md)] border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="checkoutEmail" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      id="checkoutEmail"
                      name="email"
                      type="email"
                      required
                      className="w-full h-11 px-4 rounded-[var(--radius-md)] border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <hr className="my-6 border-border" />

                  <h2
                    className="text-lg font-bold mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Payment
                  </h2>

                  {/* Stripe payment element placeholder */}
                  <div className="p-8 rounded-[var(--radius-md)] bg-inset border border-border text-center">
                    <LockClosedIcon className="h-8 w-8 text-muted mx-auto mb-3" />
                    <p className="text-sm text-muted">
                      Stripe payment form will be loaded here.
                    </p>
                    <p className="text-xs text-muted mt-1">
                      Secure, PCI-compliant payment processing.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 px-6 font-semibold rounded-[var(--radius-md)] bg-primary text-white hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
                  >
                    <LockClosedIcon className="h-4 w-4" />
                    Pay with Stripe
                  </button>
                </form>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card padding="lg" className="sticky top-24">
                <h2
                  className="text-lg font-bold mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">No items in cart</span>
                    <span>€0</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>€0</span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mt-4">
                  <label htmlFor="coupon" className="block text-sm font-medium mb-1">
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="coupon"
                      name="coupon"
                      type="text"
                      className="flex-1 h-9 px-3 rounded-[var(--radius-sm)] border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter code"
                    />
                    <button className="h-9 px-3 text-sm font-medium rounded-[var(--radius-sm)] border border-border hover:bg-inset transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <ShieldCheckIcon className="h-4 w-4 text-primary" />
                    Secure checkout powered by Stripe
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <LockClosedIcon className="h-4 w-4 text-primary" />
                    Your data is encrypted and protected
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
