import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";

export const metadata: Metadata = {
  title: "AI Concierge",
  description: "Get instant, business-aware answers about Growrix services, pricing, and timelines.",
};

export default function AIConciergePage() {
  return (
    <ComingSoon
      eyebrow="AI Concierge · Training"
      title="The concierge is being trained on our service playbook."
      description="It will answer scope, pricing, timeline, and product-fit questions instantly and route you to the right next step. Until then, our team responds in 2 business hours."
      alternatives={[
        { label: "FAQ", href: "/faq", description: "Searchable answers." },
        { label: "Contact form", href: "/contact", description: "Send a brief." },
        { label: "WhatsApp", href: "https://wa.me/0000000000", description: "Conversational." },
      ]}
    />
  );
}
