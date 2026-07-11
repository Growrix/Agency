import { Hero } from "@/components/site/hero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Shipping Policy",
  pathname: "/shipping",
  description: "Shipping policy route for the commerce template module.",
});

export default function ShippingPage() {
  return (
    <>
      <Hero
        title="Shipping Policy"
        subtitle="Legal"
        description="Shipping estimates and fulfillment responsibilities for commerce workflows."
        image="/images/background/2.webp"
      />
      <section>
        <div className="container">
          <div className="p-4 rounded-1 bg-dark-2">
            <h4>Current Template State</h4>
            <p>
              Shipping carriers, rates, and delivery SLAs are not configured in this template. Connect your fulfillment stack and replace placeholder guidance before production launch.
            </p>
            <ul className="ul-check">
              <li>Estimated processing windows depend on integrated order system.</li>
              <li>Tracking updates require provider webhook integration.</li>
              <li>International shipping rules are currently undefined.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
