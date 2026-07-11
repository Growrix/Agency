"use client";

import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/site/hero";
import { useShop } from "@/components/commerce/shop-state";
import { formatCurrency } from "@/lib/format";
import { routes } from "@/lib/routes";

export default function WishlistPage() {
  const { state, findProduct, addToCart, toggleWishlist } = useShop();
  const items = state.wishlist
    .map((slug) => findProduct(slug))
    .filter((product): product is NonNullable<ReturnType<typeof findProduct>> => product !== undefined);

  return (
    <>
      <Hero
        title="Wishlist"
        subtitle="Commerce Flow"
        description="Saved products can be moved to cart in one click."
        image="/images/background/10.webp"
      />
      <section>
        <div className="container">
          {items.length === 0 ? (
            <div className="p-4 rounded-1 bg-dark-2 text-center">
              <h4 className="mb-2">Your wishlist is empty.</h4>
              <p className="mb-3">Use the heart icon in the shop to save products.</p>
              <Link href={routes.shop} className="btn-main fx-slide"><span>Browse Products</span></Link>
            </div>
          ) : (
            <div className="row g-4">
              {items.map((product) => (
                <div className="col-lg-4 col-md-6" key={product.slug}>
                  <div className="p-4 rounded-1 bg-dark-2 h-100">
                    <Image src={product.image} alt={product.name} className="w-100 mb-3" width={800} height={800} />
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <p className="mb-3"><strong>{formatCurrency(product.price)}</strong></p>
                    <div className="d-flex gap-2">
                      <button className="btn-main fx-slide" type="button" onClick={() => addToCart(product.slug, 1)}>
                        <span>Add To Cart</span>
                      </button>
                      <button className="btn-main btn-line" type="button" onClick={() => toggleWishlist(product.slug)}>
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
