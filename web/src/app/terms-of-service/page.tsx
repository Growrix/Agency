import { Container, Section } from "@/components/ui/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions governing the use of Agency services and digital products.",
};

export default function TermsOfServicePage() {
  return (
    <Section className="pt-16 sm:pt-20 lg:pt-28">
      <Container size="lg">
        <h1
          className="text-4xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Terms of Service
        </h1>
        <p className="text-muted mb-8">
          Last updated: {new Date().toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <article className="prose prose-neutral max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              1. Agreement to Terms
            </h2>
            <p className="text-muted leading-relaxed">
              By accessing or using Agency&apos;s website and services (&quot;Services&quot;), you agree to be
              bound by these Terms of Service. If you do not agree, do not use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              2. Services
            </h2>
            <p className="text-muted leading-relaxed">
              Agency provides custom software development, digital products, AI agent development,
              and related consulting services. The specific scope of work for custom projects is
              defined in individual project agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              3. Digital Products
            </h2>
            <p className="text-muted leading-relaxed mb-3">
              When you purchase a digital product from our shop:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>You receive a non-exclusive, non-transferable license to use the product</li>
              <li>You may use the product for personal and commercial projects</li>
              <li>You may not redistribute, resell, or sublicense the product</li>
              <li>You may not claim the product as your own original work</li>
              <li>All sales are final unless otherwise stated in the product description</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              4. Custom Project Agreements
            </h2>
            <p className="text-muted leading-relaxed">
              Custom development projects are governed by separate project agreements that outline
              scope, timeline, deliverables, payment terms, and intellectual property rights.
              These terms supplement (but do not replace) these general Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              5. Payment Terms
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>Digital product payments are processed securely via Stripe</li>
              <li>Custom project payments follow the schedule defined in your project agreement</li>
              <li>All prices are in EUR unless otherwise stated</li>
              <li>Applicable taxes will be added at checkout</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              6. Intellectual Property
            </h2>
            <p className="text-muted leading-relaxed">
              All content on this website — including text, graphics, logos, and software — is the
              property of Agency and protected by intellectual property laws. For custom projects,
              IP ownership is transferred to the client upon full payment as specified in the
              project agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              7. AI Concierge
            </h2>
            <p className="text-muted leading-relaxed">
              Our AI concierge provides informational responses only. AI-generated answers do not
              constitute binding offers, quotes, or commitments. For binding agreements, please
              speak with a team member directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              8. Limitation of Liability
            </h2>
            <p className="text-muted leading-relaxed">
              To the maximum extent permitted by law, Agency shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of our
              Services. Our total liability shall not exceed the amount you paid for the specific
              service or product giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              9. Termination
            </h2>
            <p className="text-muted leading-relaxed">
              We may terminate or suspend your access to our Services at any time, without prior
              notice, for conduct that we believe violates these Terms or is harmful to other
              users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              10. Governing Law
            </h2>
            <p className="text-muted leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws.
              Any disputes shall be resolved through good-faith negotiation first, and if
              necessary, through binding arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              11. Contact
            </h2>
            <p className="text-muted leading-relaxed">
              For questions about these Terms, please contact us at{" "}
              <a href="mailto:legal@agency.dev" className="text-primary hover:underline">
                legal@agency.dev
              </a>{" "}
              or through our{" "}
              <a href="/contact" className="text-primary hover:underline">
                contact page
              </a>
              .
            </p>
          </section>
        </article>
      </Container>
    </Section>
  );
}
