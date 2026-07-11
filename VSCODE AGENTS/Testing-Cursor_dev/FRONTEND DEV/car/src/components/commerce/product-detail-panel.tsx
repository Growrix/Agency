"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { products, type Product } from "@/data/site";
import { formatCurrency } from "@/lib/format";
import { useShop } from "@/components/commerce/shop-state";
import { routes } from "@/lib/routes";

export function ProductDetailPanel({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const router = useRouter();

  const related = useMemo(
    () => products.filter((entry) => entry.slug !== product.slug).slice(0, 4),
    [product.slug],
  );

  return (
    <>
      <section>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <Image src={product.image} className="w-100 rounded-1" alt={product.name} width={900} height={900} />
            </div>
            <div className="col-lg-6">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <h3 className="mb-3">{formatCurrency(product.price)}</h3>
              {product.regularPrice ? <p className="text-decoration-line-through">{formatCurrency(product.regularPrice)}</p> : null}
              <div className="d-flex align-items-center gap-2 mb-3">
                <button className="btn-main btn-line" type="button" onClick={() => setQty((value) => Math.max(1, value - 1))}>
                  <span>-</span>
                </button>
                <input
                  className="form-control"
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(event) => setQty(Math.max(1, Number(event.target.value || 1)))}
                  style={{ maxWidth: 90 }}
                />
                <button className="btn-main btn-line" type="button" onClick={() => setQty((value) => value + 1)}>
                  <span>+</span>
                </button>
              </div>
              <div className="d-flex gap-3 flex-wrap">
                <button
                  className="btn-main fx-slide"
                  type="button"
                  onClick={() => {
                    addToCart(product.slug, qty);
                    router.push(routes.cart);
                  }}
                >
                  <span>Add To Cart</span>
                </button>
                <button className="btn-main btn-line" type="button" onClick={() => toggleWishlist(product.slug)}>
                  <span>{isWishlisted(product.slug) ? "Remove Wishlist" : "Add Wishlist"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark-2">
        <div className="container">
          <h3 className="mb-4">Related Products</h3>
          <div className="row g-4">
            {related.map((item) => (
              <div className="col-lg-3 col-md-6" key={item.slug}>
                <Link href={`/shop/${item.slug}`} className="d-block p-3 rounded-1 bg-dark-3 h-100">
                  <Image src={item.image} alt={item.name} className="w-100 mb-3" width={800} height={800} />
                  <h5 className="mb-1">{item.name}</h5>
                  <small>{formatCurrency(item.price)}</small>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
