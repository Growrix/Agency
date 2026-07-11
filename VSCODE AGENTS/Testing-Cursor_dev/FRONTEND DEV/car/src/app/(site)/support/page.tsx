import { Hero } from "@/components/site/hero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Support",
  pathname: "/support",
  description: "Support route for operational assistance and escalation requests.",
});

export default function SupportPage() {
  return (
    <>
      <Hero
        title="Customer Support"
        subtitle="Help Center"
        description="Support routing for booking, listing, and commerce questions."
        image="/images/background/3.webp"
      />
      <section>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="p-4 rounded-1 bg-dark-2 h-100">
                <h4>Order Assistance</h4>
                <p>Questions about product orders, cart behavior, or checkout intent records.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="p-4 rounded-1 bg-dark-2 h-100">
                <h4>Service Scheduling</h4>
                <p>Need to update or cancel a booking request? Use contact channels for changes.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="p-4 rounded-1 bg-dark-2 h-100">
                <h4>Fleet & Enterprise</h4>
                <p>For recurring or high-volume requests, ask for fleet onboarding support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
