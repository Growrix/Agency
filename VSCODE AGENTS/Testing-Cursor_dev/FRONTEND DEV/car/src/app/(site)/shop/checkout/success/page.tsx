import Link from "next/link";
import { Hero } from "@/components/site/hero";
import { routes } from "@/lib/routes";

export default function CheckoutSuccessPage() {
  return (
    <>
      <Hero
        title="Order Request Received"
        subtitle="Checkout Result"
        description="This confirms frontend checkout flow completion. Integration delivery remains explicitly not configured."
        image="/images/background/13.webp"
      />
      <section>
        <div className="container">
          <div className="p-4 rounded-1 bg-dark-2 text-center">
            <h3 className="mb-3">Thank you. Your request has been recorded.</h3>
            <p className="mb-4">
              Payment capture and fulfillment are pending provider integration. This template currently records checkout intent only.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link href={routes.shop} className="btn-main fx-slide"><span>Continue Shopping</span></Link>
              <Link href={routes.contact} className="btn-main btn-line"><span>Contact Support</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
