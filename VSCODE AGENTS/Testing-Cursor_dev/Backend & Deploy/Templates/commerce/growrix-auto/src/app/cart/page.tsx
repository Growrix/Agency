"use client";

import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import { cartPage } from "@/data/pages";
import { getProductBySlug } from "@/data/catalog";
import { routeConfig } from "@/data/routes";
import { useCart } from "@/state/CartContext";
import { useUtility } from "@/state/UtilityContext";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { formatPrice, t } = useUtility();

  return (
    <div className="bg-white">
      <Breadcrumbs items={cartPage.breadcrumb} />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <h1 className="text-[34px] font-black uppercase text-[#222]">{t("cart.title")}</h1>

        {items.length === 0 ? (
          <div className="mt-8 border border-[#eee] bg-[#fafafa] px-6 py-10 text-[14px] text-[#666]">
            {t("cart.empty")}
            <div className="mt-4">
              <Link href={routeConfig.shop} className="inline-flex rounded-sm bg-[#ff3434] px-5 py-2 text-[12px] font-bold uppercase text-white">
                {t("common.goToShop")}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-8 space-y-4">
              {items.map((item) => {
                const product = getProductBySlug(item.productSlug);
                if (!product) return null;

                return (
                  <article key={item.productSlug} className="grid gap-4 border border-[#ececec] p-4 md:grid-cols-[96px_1fr_auto_auto_auto] md:items-center">
                    <div className="relative h-24 w-24 overflow-hidden bg-[#fafafa]">
                      <Image src={product.image} alt={product.title} fill sizes="96px" className="object-contain" />
                    </div>

                    <div>
                      <p className="text-[14px] font-bold uppercase text-[#222]">{product.title}</p>
                      <p className="mt-1 text-[13px] text-[#666]">{product.excerpt}</p>
                    </div>

                    <p className="text-[14px] font-bold text-[#ff3434]">{formatPrice(product.price)}</p>

                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.productSlug, Number(event.target.value))}
                      className="h-10 w-20 border border-[#ddd] px-2 text-[14px]"
                    />

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productSlug)}
                      className="h-10 rounded-sm border border-[#ddd] px-4 text-[12px] font-bold uppercase text-[#333] hover:border-[#ff3434] hover:text-[#ff3434]"
                    >
                      {t("common.remove")}
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col items-start gap-4 border border-[#eee] bg-[#fafafa] p-6 md:flex-row md:items-center md:justify-between">
              <p className="text-[18px] font-bold uppercase text-[#222]">
                {t("cart.subtotal")}: <span className="text-[#ff3434]">{formatPrice(subtotal)}</span>
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-sm border border-[#ddd] px-5 py-2 text-[12px] font-bold uppercase text-[#333] hover:border-[#ff3434] hover:text-[#ff3434]"
                >
                  {t("common.clearCart")}
                </button>
                <Link href={routeConfig.checkout} className="rounded-sm bg-[#ff3434] px-5 py-2 text-[12px] font-bold uppercase text-white">
                  {t("common.proceedCheckout")}
                </Link>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
