import Link from "next/link";
import { ChatBubbleLeftRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { WHATSAPP_HREF } from "@/lib/nav";

export function ComingSoon({
  title,
  description,
  eyebrow = "Coming soon",
  alternatives = [],
}: {
  title: string;
  description: string;
  eyebrow?: string;
  alternatives?: { label: string; href: string; description?: string }[];
}) {
  return (
    <Section className="pt-16 sm:pt-24 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
      <Container width="content">
        <div className="text-center max-w-2xl mx-auto">
          <Badge tone="secondary" dot>{eyebrow}</Badge>
          <h1 className="mt-5 font-display text-5xl sm:text-6xl tracking-tight text-balance">{title}</h1>
          <p className="mt-6 text-lg text-text-muted leading-7 text-pretty">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <LinkButton href="/contact" size="lg">
              <EnvelopeIcon className="size-4" /> Get notified
            </LinkButton>
            <LinkButton href="/book-appointment" variant="outline" size="lg">
              Talk to us instead
            </LinkButton>
          </div>
        </div>

        {alternatives.length > 0 && (
          <div className="mt-16">
            <p className="text-center font-mono text-xs uppercase tracking-wider text-text-muted">
              In the meantime
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto">
              {alternatives.map((a) => (
                <Link key={a.label} href={a.href}>
                  <Card hoverable>
                    <p className="font-display text-lg tracking-tight">{a.label}</p>
                    {a.description && (
                      <p className="mt-1 text-sm text-text-muted">{a.description}</p>
                    )}
                    <p className="mt-3 text-sm font-medium text-primary">Open →</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href={WHATSAPP_HREF}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-primary"
          >
            <ChatBubbleLeftRightIcon className="size-4" /> Or message us on WhatsApp
          </Link>
        </div>
      </Container>
    </Section>
  );
}

