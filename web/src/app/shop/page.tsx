import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Shop — Templates, Starters, and Kits",
  description: "The Signal Atelier shop is opening soon with templates, MCP starters, and automation kits.",
};

export default function ShopPage() {
  return (
    <ComingSoon
      eyebrow="Shop · Opening soon"
      title="Templates, MCP starters, and automation kits — almost ready."
      description="We're polishing the launch catalog. Get notified when checkout opens, or talk to us if you want early access."
      alternatives={[
        { label: "Browse services", href: "/services", description: "Custom builds available now." },
        { label: "See portfolio", href: "/portfolio", description: "Recent shipped work." },
        { label: "Book a call", href: "/book-appointment", description: "Get a tailored proposal." },
      ]}
    />
  );
}
