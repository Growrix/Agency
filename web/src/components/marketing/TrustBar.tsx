import { Container, Section } from "@/components/primitives/Container";
import { TRUST_BAR_ITEMS } from "@/lib/product-led-content";

export function TrustBar() {
  return (
    <Section size="compact" className="border-y border-border bg-inset/40">
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_BAR_ITEMS.map((item) => (
            <li key={item.label} className="text-center sm:text-left">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">{item.label}</p>
              <p className="mt-1 text-sm font-medium text-text">{item.value}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
