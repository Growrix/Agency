import { Container, Section } from "@/components/primitives/Container";
import { Card } from "@/components/primitives/Card";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { TESTIMONIALS } from "@/lib/content";

export function Testimonials() {
  return (
    <Section size="standard" layout="viewport">
      <Container>
        <SectionHeading
          eyebrow="Proof"
          title="Teams that shipped with GrowrixOS"
          description="Product buyers and service clients share the same bar — launch-ready quality, clear communication, and measurable outcomes."
          align="center"
        />
        <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.08}>
          {TESTIMONIALS.map((item) => (
            <RevealItem key={item.author} className="h-full">
              <Card className="flex h-full flex-col">
                <p className="text-base leading-7 text-pretty">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-medium text-text">{item.author}</p>
                  <p className="text-sm text-text-muted">{item.role}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-primary">{item.metric}</p>
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
