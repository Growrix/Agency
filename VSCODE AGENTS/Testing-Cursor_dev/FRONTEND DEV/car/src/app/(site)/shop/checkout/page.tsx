"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Hero } from "@/components/site/hero";
import { useShop } from "@/components/commerce/shop-state";
import { formatCurrency } from "@/lib/format";
import { routes } from "@/lib/routes";

export default function CheckoutPage() {
  const { state, findProduct, clearCart } = useShop();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const rows = useMemo(
    () =>
      state.cart
        .map((entry) => {
          const product = findProduct(entry.slug);
          if (!product) {
            return null;
          }
          return { product, qty: entry.qty, lineTotal: product.price * entry.qty };
        })
        .filter(Boolean) as Array<{ product: NonNullable<ReturnType<typeof findProduct>>; qty: number; lineTotal: number }>,
    [findProduct, state.cart],
  );

  const subtotal = rows.reduce((sum, item) => sum + item.lineTotal, 0);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const payload = {
      kind: "quote",
      name: (event.currentTarget.elements.namedItem("name") as HTMLInputElement).value,
      email: (event.currentTarget.elements.namedItem("email") as HTMLInputElement).value,
      phone: (event.currentTarget.elements.namedItem("phone") as HTMLInputElement).value,
      message: `Checkout intent with ${rows.length} line items. Subtotal: ${formatCurrency(subtotal)}.`,
    };

    await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    clearCart();
    router.push(routes.checkoutSuccess);
  }

  return (
    <>
      <Hero
        title="Checkout"
        subtitle="Commerce Contract"
        description="Checkout entry is native and validated. Payment capture is pending configured provider integration."
        image="/images/background/12.webp"
      />

      <section>
        <div className="container">
          {rows.length === 0 ? (
            <div className="p-4 rounded-1 bg-dark-2 text-center">
              <h4 className="mb-2">No items in cart.</h4>
              <p className="mb-3">Add products before entering checkout.</p>
              <Link className="btn-main fx-slide" href={routes.shop}><span>Return To Shop</span></Link>
            </div>
          ) : (
            <div className="row g-4">
              <div className="col-lg-7">
                <form className="p-4 rounded-1 bg-dark-2" onSubmit={handleSubmit}>
                  <h4 className="mb-3">Checkout Details</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input className="form-control" name="name" type="text" placeholder="Full Name" required />
                    </div>
                    <div className="col-md-6">
                      <input className="form-control" name="email" type="email" placeholder="Email" required />
                    </div>
                    <div className="col-12">
                      <input className="form-control" name="phone" type="tel" placeholder="Phone" required />
                    </div>
                    <div className="col-12">
                      <p className="mb-0 small">
                        This template checkout returns a truthful not-configured delivery contract until payment, tax, and fulfillment providers are connected.
                      </p>
                    </div>
                  </div>
                  <button className="btn-main fx-slide mt-4" type="submit" disabled={submitting}>
                    <span>{submitting ? "Submitting..." : "Place Order Request"}</span>
                  </button>
                </form>
              </div>
              <div className="col-lg-5">
                <div className="p-4 rounded-1 bg-dark-2">
                  <h4 className="mb-3">Order Summary</h4>
                  {rows.map((row) => (
                    <div className="d-flex justify-content-between mb-2" key={row.product.slug}>
                      <span>{row.product.name} × {row.qty}</span>
                      <strong>{formatCurrency(row.lineTotal)}</strong>
                    </div>
                  ))}
                  <div className="border-top pt-3 mt-3 d-flex justify-content-between">
                    <span>Subtotal</span>
                    <strong>{formatCurrency(subtotal)}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
