import { Container, Section, LinkButton } from "@/components/ui/container";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NotFound() {
  return (
    <Section className="pt-20 sm:pt-28 lg:pt-36 pb-20">
      <Container size="md" className="text-center">
        <div
          className="text-8xl sm:text-9xl font-bold text-primary/20"
          style={{ fontFamily: "var(--font-display)" }}
        >
          404
        </div>
        <h1
          className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Page Not Found
        </h1>
        <p className="mt-4 text-muted text-lg max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let us help you find what you need.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <LinkButton href="/">
            <HomeIcon className="h-4 w-4" />
            Back to Home
          </LinkButton>
          <LinkButton href="/services" variant="outline">
            <MagnifyingGlassIcon className="h-4 w-4" />
            Browse Services
          </LinkButton>
          <LinkButton href="/ai-concierge" variant="ghost">
            <ChatBubbleLeftRightIcon className="h-4 w-4" />
            Ask AI Concierge
          </LinkButton>
        </div>

        <div className="mt-12 p-6 rounded-[var(--radius-lg)] bg-surface border border-border text-left">
          <h2 className="font-semibold mb-3">Popular pages</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { label: "Services", href: "/services" },
              { label: "Portfolio", href: "/portfolio" },
              { label: "Pricing", href: "/pricing" },
              { label: "Shop", href: "/shop" },
              { label: "Contact", href: "/contact" },
              { label: "Book Appointment", href: "/book-appointment" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-primary transition-colors py-1"
              >
                → {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
