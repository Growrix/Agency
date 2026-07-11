import Link from "next/link";
import { Hero } from "@/components/site/hero";
import { createPageMetadata } from "@/lib/metadata";
import { routes } from "@/lib/routes";

export const metadata = createPageMetadata({
  title: "Account",
  pathname: "/account",
  description: "Frontend account access placeholder with explicit not-configured auth state.",
});

export default function AccountPage() {
  return (
    <>
      <Hero
        title="Account"
        subtitle="Auth Entry"
        description="Authentication integration is not configured in this template yet."
        image="/images/background/6.webp"
      />
      <section>
        <div className="container">
          <div className="p-4 rounded-1 bg-dark-2 text-center">
            <h4 className="mb-2">Account integration is not configured.</h4>
            <p className="mb-4">Connect your chosen auth provider to unlock login, registration, and order history flows.</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link href={routes.contact} className="btn-main fx-slide"><span>Contact Support</span></Link>
              <Link href={routes.shop} className="btn-main btn-line"><span>Continue Shopping</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
