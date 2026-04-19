import Link from "next/link";
import {
  Squares2X2Icon,
  ShoppingBagIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { WHATSAPP_HREF } from "@/lib/nav";

export const metadata = {
  title: "Page Not Found",
  description: "The page could not be found. Continue to services, shop, portfolio, booking, or support.",
};

const DESTINATIONS = [
  { icon: Squares2X2Icon, label: "Services", description: "Browse the four practices.", href: "/services" },
  { icon: BriefcaseIcon, label: "Portfolio", description: "See recent shipped work.", href: "/portfolio" },
  { icon: ShoppingBagIcon, label: "Shop", description: "Templates and starters.", href: "/shop" },
  { icon: CurrencyDollarIcon, label: "Pricing", description: "Engagement models and ranges.", href: "/pricing" },
  { icon: CalendarDaysIcon, label: "Book a call", description: "30-minute discovery.", href: "/book-appointment" },
];

export default function NotFound() {
  return (
    <Section className="pt-16 sm:pt-24 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
      <Container width="content">
        <div className="text-center max-w-2xl mx-auto">
          <Badge tone="warning" dot>404</Badge>
          <h1 className="mt-5 font-display text-6xl sm:text-7xl tracking-tight">
            That page slipped off the grid.
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-7">
            The URL might be old, or we&apos;ve moved things around. Pick a useful destination — or open the concierge.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <LinkButton href="/" size="lg">Go home</LinkButton>
            <LinkButton href="/ai-concierge" variant="outline" size="lg">
              <SparklesIcon className="size-4" /> Open concierge
            </LinkButton>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-center font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
            Or try one of these
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {DESTINATIONS.map((d) => (
              <Link key={d.label} href={d.href}>
                <Card hoverable className="text-center">
                  <d.icon className="mx-auto size-7 text-[var(--color-primary)]" aria-hidden />
                  <p className="mt-3 font-display text-base tracking-tight">{d.label}</p>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">{d.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href={WHATSAPP_HREF}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)]"
          >
            <ChatBubbleLeftRightIcon className="size-4" /> Or message us on WhatsApp
          </Link>
        </div>
      </Container>
    </Section>
  );
}
