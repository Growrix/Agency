"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { Hero } from "@/components/site/hero";
import { useShop } from "@/components/commerce/shop-state";
import { formatCurrency } from "@/lib/format";
import { routes } from "@/lib/routes";

export default function CartPage() {
  const { state, setQty, removeFromCart, findProduct } = useShop();

  const rows = useMemo(
    () =>
      state.cart
        .map((entry) => {
          const product = findProduct(entry.slug);
          if (!product) {
            return null;
          }
          return {
            product,
            qty: entry.qty,
            lineTotal: entry.qty * product.price,
          };
        })
        .filter(Boolean) as Array<{ product: NonNullable<ReturnType<typeof findProduct>>; qty: number; lineTotal: number }>,
    [findProduct, state.cart],
  );

  const subtotal = rows.reduce((sum, item) => sum + item.lineTotal, 0);

  return (
    <>
      <Hero
        title="Cart"
        subtitle="Commerce Flow"
        description="Review quantities, update cart, and continue to checkout."
        image="/images/background/9.webp"
      />

      <section>
        <div className="container">
          {rows.length === 0 ? (
            <div className="p-4 rounded-1 bg-dark-2 text-center">
              <h4 className="mb-2">Your cart is empty.</h4>
              <p className="mb-3">Add products from the shop to continue.</p>
              <Link href={routes.shop} className="btn-main fx-slide"><span>Go To Shop</span></Link>
            </div>
          ) : (
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="p-4 rounded-1 bg-dark-2">
                  {rows.map((row) => (
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 py-3 border-bottom" key={row.product.slug}>
                      <div className="d-flex align-items-center gap-3">
                        <Image src={row.product.image} alt={row.product.name} width={72} height={72} />
                        <div>
                          <h5 className="mb-1">{row.product.name}</h5>
                          <small>{formatCurrency(row.product.price)}</small>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <button className="btn-main btn-line" type="button" onClick={() => setQty(row.product.slug, row.qty - 1)}>
                          <span>-</span>
                        </button>
                        <span>{row.qty}</span>
                        <button className="btn-main btn-line" type="button" onClick={() => setQty(row.product.slug, row.qty + 1)}>
                          <span>+</span>
                        </button>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <strong>{formatCurrency(row.lineTotal)}</strong>
                        <button className="btn-main btn-line" type="button" onClick={() => removeFromCart(row.product.slug)}>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="p-4 rounded-1 bg-dark-2">
                  <h4>Summary</h4>
                  <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
                  <p className="small mb-3">Tax, shipping, and payment capture require configured integrations.</p>
                  <Link href={routes.checkout} className="btn-main fx-slide w-100"><span>Proceed To Checkout</span></Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
