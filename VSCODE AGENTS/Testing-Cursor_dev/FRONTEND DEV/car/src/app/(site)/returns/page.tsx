import { Hero } from "@/components/site/hero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Returns Policy",
  pathname: "/returns",
  description: "Returns and refund policy route for commerce support flows.",
});

export default function ReturnsPage() {
  return (
    <>
      <Hero
        title="Returns Policy"
        subtitle="Legal"
        description="Returns policy for product transactions once commerce integrations are connected."
        image="/images/background/1.webp"
      />
      <section>
        <div className="container">
          <div className="p-4 rounded-1 bg-dark-2">
            <h4>Current Template State</h4>
            <p>
              Refunds and returns are not operational until payment and order persistence providers are configured.
            </p>
            <ul className="ul-check">
              <li>Eligibility windows must be set by business policy.</li>
              <li>Refund routing depends on payment gateway integration.</li>
              <li>Return-label automation requires carrier integration.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
