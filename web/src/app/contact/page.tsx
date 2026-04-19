import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Agency. Multiple communication channels for different urgency levels. Response within 2 hours.",
};

const channels = [
  {
    icon: EnvelopeIcon,
    title: "Email",
    description: "For detailed inquiries and project briefs.",
    action: SITE_CONFIG.email,
    actionLabel: "Send Email",
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "WhatsApp",
    description: "For quick questions and urgent matters.",
    action: "Chat now",
    actionLabel: "Open WhatsApp",
    href: SITE_CONFIG.whatsappUrl,
  },
  {
    icon: PhoneIcon,
    title: "Book a Call",
    description: "For project discussions and consultations.",
    action: "Schedule",
    actionLabel: "Book Appointment",
    href: "/book-appointment",
  },
];

export default function ContactPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <Badge variant="primary" className="mb-6">
                Contact
              </Badge>
              <h1
                className="text-4xl sm:text-5xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Let&apos;s Talk
              </h1>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                Choose the channel that fits your urgency. We respond to all
                inquiries within 2 hours during business hours.
              </p>
              <div className="mt-8 space-y-4">
                {channels.map((channel) => (
                  <Card key={channel.title} hover padding="md" as="article">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-[var(--radius-sm)] bg-primary/10 flex items-center justify-center shrink-0">
                        <channel.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold">{channel.title}</h3>
                        <p className="text-sm text-muted mt-1">
                          {channel.description}
                        </p>
                        <LinkButton
                          href={channel.href}
                          variant="ghost"
                          size="sm"
                          className="!px-0 !h-auto mt-2 text-primary hover:!bg-transparent hover:underline"
                          external={channel.href.startsWith("http") || channel.href.startsWith("mailto:")}
                        >
                          {channel.actionLabel}
                          <ArrowRightIcon className="h-3.5 w-3.5" />
                        </LinkButton>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card padding="lg">
                <h2
                  className="text-xl font-bold mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Send an Inquiry
                </h2>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full h-11 px-4 rounded-[var(--radius-md)] border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full h-11 px-4 rounded-[var(--radius-md)] border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-1"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      className="w-full h-11 px-4 rounded-[var(--radius-md)] border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Project inquiry"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-11 px-6 font-semibold rounded-[var(--radius-md)] bg-primary text-white hover:bg-primary-hover transition-colors"
                  >
                    Send Inquiry
                  </button>
                  <p className="text-xs text-muted text-center">
                    We&apos;ll respond within 2 hours during business hours.
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
