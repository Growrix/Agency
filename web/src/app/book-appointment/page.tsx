import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "Schedule a 30-minute discovery call with Growrix OS.",
};

export default function BookPage() {
  return (
    <ComingSoon
      eyebrow="Booking · Connecting calendar"
      title="The booking flow is being wired up."
      description="We're integrating Calendly so you can pick a slot in seconds. In the meantime, the contact form or WhatsApp is the fastest way to reach us."
      alternatives={[
        { label: "Contact form", href: "/contact", description: "Send a brief — we'll respond in 2 business hours." },
        { label: "WhatsApp", href: "https://wa.me/0000000000", description: "Conversational, fast." },
        { label: "AI Concierge", href: "/ai-concierge", description: "Pre-qualify your project." },
      ]}
    />
  );
}
