import { Container, Section } from "@/components/ui/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How we collect, use, and protect your personal data. GDPR-compliant.",
};

export default function PrivacyPolicyPage() {
  return (
    <Section className="pt-16 sm:pt-20 lg:pt-28">
      <Container size="lg">
        <h1
          className="text-4xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Privacy Policy
        </h1>
        <p className="text-muted mb-8">
          Last updated: {new Date().toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <article className="prose prose-neutral max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              1. Data Controller
            </h2>
            <p className="text-muted leading-relaxed">
              Agency (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is the data controller responsible for your
              personal data. If you have questions about this policy or our data practices, contact
              us at <a href="mailto:privacy@agency.dev" className="text-primary hover:underline">privacy@agency.dev</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              2. Information We Collect
            </h2>
            <p className="text-muted leading-relaxed mb-3">
              We collect information you provide directly, including:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>Name and email address when you submit a contact form or book an appointment</li>
              <li>Billing information when you make a purchase (processed by Stripe)</li>
              <li>Messages you send through our contact form or AI concierge</li>
              <li>Any other information you voluntarily provide</li>
            </ul>
            <p className="text-muted leading-relaxed mt-3">
              We also collect technical data automatically:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>IP address and approximate location</li>
              <li>Browser type and operating system</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring URL</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              3. How We Use Your Data
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>To respond to inquiries and provide customer support</li>
              <li>To process transactions and send purchase confirmations</li>
              <li>To schedule and manage appointments</li>
              <li>To improve our website and services</li>
              <li>To send marketing communications (only with your consent)</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              4. Legal Basis for Processing (GDPR)
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li><strong>Consent:</strong> For marketing communications and AI concierge interactions</li>
              <li><strong>Contract:</strong> To fulfill purchases and service agreements</li>
              <li><strong>Legitimate interest:</strong> To improve our services and prevent fraud</li>
              <li><strong>Legal obligation:</strong> To comply with applicable laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              5. Data Sharing
            </h2>
            <p className="text-muted leading-relaxed">
              We do not sell your personal data. We share data only with:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li><strong>Stripe:</strong> For payment processing</li>
              <li><strong>Vercel:</strong> For website hosting and analytics</li>
              <li><strong>Email service providers:</strong> For transactional and marketing emails</li>
              <li><strong>Legal authorities:</strong> When required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              6. Your Rights
            </h2>
            <p className="text-muted leading-relaxed mb-3">
              Under GDPR, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>Access your personal data</li>
              <li>Rectify inaccurate data</li>
              <li>Request erasure of your data</li>
              <li>Restrict or object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-muted leading-relaxed mt-3">
              To exercise these rights, email us at{" "}
              <a href="mailto:privacy@agency.dev" className="text-primary hover:underline">
                privacy@agency.dev
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              7. Cookies
            </h2>
            <p className="text-muted leading-relaxed">
              We use essential cookies for site functionality and optional analytics cookies
              (with your consent) to understand how visitors use our site. You can manage your
              cookie preferences at any time through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              8. Data Retention
            </h2>
            <p className="text-muted leading-relaxed">
              We retain personal data only as long as necessary for the purposes described in this
              policy, or as required by law. Contact form submissions are retained for 12 months.
              Purchase records are retained for 7 years for tax compliance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              9. Changes to This Policy
            </h2>
            <p className="text-muted leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any
              significant changes by posting the new policy on this page and updating the
              &quot;last updated&quot; date above.
            </p>
          </section>
        </article>
      </Container>
    </Section>
  );
}
