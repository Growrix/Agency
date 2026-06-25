import { Container, Section } from "@/components/primitives/Container";
import { ServiceCardsViewportGate } from "@/components/marketing/ServiceCardsViewportGate";
import type { PublicServiceRecord } from "@/server/domain/catalog";
import { getOrderedHomeServices } from "@/lib/home-services";
import { homeSection } from "@/lib/homepage-composition";

export function ServiceCards({ services }: { services: PublicServiceRecord[] }) {
  const ordered = getOrderedHomeServices(services);
  const shell = homeSection("services");

  return (
    <Section {...shell} className="home-services-desktop-section">
      <Container>
        <ServiceCardsViewportGate services={ordered} />
      </Container>
    </Section>
  );
}
