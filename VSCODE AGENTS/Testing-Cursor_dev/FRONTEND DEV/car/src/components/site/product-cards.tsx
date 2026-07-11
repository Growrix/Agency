"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/site";
import { routes } from "@/lib/routes";
import { formatCurrency } from "@/lib/format";
import { useShop } from "@/components/commerce/shop-state";

type ProductCardsProps = {
  slugs?: string[];
};

export function ProductCards({ slugs }: ProductCardsProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const list = slugs
    ? products.filter((product) => slugs.includes(product.slug))
    : products;

  return (
    <div className="row g-4">
      {list.map((product) => (
        <div className="col-xl-3 col-lg-4 col-md-6" key={product.slug}>
          <div className="de__pcard text-center">
            <div className="atr__images">
              {product.badge ? <div className="atr__promo">{product.badge}</div> : null}
              <Link href={routes.productDetail(product.slug)}>
                 <Image className="atr__image-main" src={product.image} alt={product.name} width={800} height={800} />
              </Link>
              <div className="atr__extra-menu">
                <Link className="atr__quick-view" href={routes.productDetail(product.slug)}>
                  <i className="icon_zoom-in_alt" />
                </Link>
                <button
                  type="button"
                  className="atr__add-cart"
                  aria-label={`Add ${product.name} to cart`}
                  onClick={() => addToCart(product.slug, 1)}
                >
                  <i className="icon_cart_alt" />
                </button>
                <button
                  type="button"
                  className={`atr__wish-list${isWishlisted(product.slug) ? " active" : ""}`}
                  aria-label={`Toggle ${product.name} wishlist`}
                  onClick={() => toggleWishlist(product.slug)}
                >
                  <i className="icon_heart_alt" />
                </button>
              </div>
            </div>
            <div className="de-rating-ext">
              <span className="d-stars">
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
                <i className="fa-solid fa-star" />
              </span>
            </div>
            <h3>{product.name}</h3>
            <div className="atr__main-price">{formatCurrency(product.price)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
