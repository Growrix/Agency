import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure Stripe-powered checkout opens with the shop launch.",
};

export default function CheckoutPage() {
  return (
    <ComingSoon
      eyebrow="Checkout · Opening soon"
      title="Secure Stripe checkout opens with the shop."
      description="Once the shop is live, you'll be able to buy templates, starters, and kits directly. Want a custom invoice in the meantime?"
      alternatives={[
        { label: "Contact us", href: "/contact", description: "Custom invoicing available." },
        { label: "See pricing", href: "/pricing", description: "Service pricing today." },
        { label: "Browse services", href: "/services", description: "Custom builds available now." },
      ]}
    />
  );
}
