import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appointment",
  description:
    "Schedule a free project consultation. Discuss your goals, timeline, and budget. Confirmation within 2 hours.",
};

export default function BookAppointmentPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <Badge variant="primary" className="mb-6">
                Book Appointment
              </Badge>
              <h1
                className="text-4xl sm:text-5xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Schedule a{" "}
                <span className="text-primary">Free Consultation</span>
              </h1>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                Tell us about your project. We&apos;ll match you with the
                right team member and prepare a focused discussion around
                your goals, timeline, and budget.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: CalendarDaysIcon,
                    title: "30-Minute Discovery Call",
                    text: "Focused conversation about your project needs and our approach.",
                  },
                  {
                    icon: ClockIcon,
                    title: "Confirmation Within 2 Hours",
                    text: "We confirm appointments quickly. No back-and-forth email chains.",
                  },
                  {
                    icon: ChatBubbleLeftRightIcon,
                    title: "No Commitment Required",
                    text: "Free consultation. Get actionable advice regardless of engagement decision.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-[var(--radius-sm)] bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-[var(--radius-md)] bg-inset border border-border">
                <p className="text-sm text-muted">
                  <strong>Prefer to ask first?</strong>{" "}
                  <LinkButton
                    href="/ai-concierge"
                    variant="ghost"
                    size="sm"
                    className="!px-0 !h-auto text-primary hover:!bg-transparent hover:underline inline"
                  >
                    Ask our AI Concierge
                  </LinkButton>{" "}
                  or{" "}
                  <LinkButton
                    href={SITE_CONFIG.whatsappUrl}
                    variant="ghost"
                    size="sm"
                    className="!px-0 !h-auto text-primary hover:!bg-transparent hover:underline inline"
                    external
                  >
                    message us on WhatsApp
                  </LinkButton>
                  .
                </p>
              </div>
            </div>

            {/* Booking Form */}
            <div>
              <Card padding="lg">
                <h2
                  className="text-xl font-bold mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Request an Appointment
                </h2>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium mb-1"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="w-full h-11 px-4 rounded-[var(--radius-md)] border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="w-full h-11 px-4 rounded-[var(--radius-md)] border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="bookEmail"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="bookEmail"
                      name="email"
                      type="email"
                      required
                      className="w-full h-11 px-4 rounded-[var(--radius-md)] border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium mb-1"
                    >
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      className="w-full h-11 px-4 rounded-[var(--radius-md)] border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a service</option>
                      <option value="saas">SaaS Application</option>
                      <option value="website">Website</option>
                      <option value="mcp">MCP Server</option>
                      <option value="automation">Automation</option>
                      <option value="other">Not sure / Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="preferredDate"
                      className="block text-sm font-medium mb-1"
                    >
                      Preferred Date & Time
                    </label>
                    <input
                      id="preferredDate"
                      name="preferredDate"
                      type="datetime-local"
                      className="w-full h-11 px-4 rounded-[var(--radius-md)] border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium mb-1"
                    >
                      Project Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                      placeholder="Brief description of your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-11 px-6 font-semibold rounded-[var(--radius-md)] bg-primary text-white hover:bg-primary-hover transition-colors"
                  >
                    Confirm Appointment
                  </button>
                  <p className="text-xs text-muted text-center">
                    We&apos;ll confirm your appointment within 2 hours.
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
