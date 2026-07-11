"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import { checkoutPage } from "@/data/pages";
import { routeConfig } from "@/data/routes";
import { useCart } from "@/state/CartContext";
import { useUtility } from "@/state/UtilityContext";

type CheckoutForm = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
};

const initialForm: CheckoutForm = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { formatPrice, t } = useUtility();
  const [formState, setFormState] = useState<CheckoutForm>(initialForm);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0) return;

    clearCart();
    router.push(routeConfig.checkoutSuccess);
  };

  return (
    <div className="bg-white">
      <Breadcrumbs items={checkoutPage.breadcrumb} />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div>
          <h1 className="text-[34px] font-black uppercase text-[#222]">{t("checkout.title")}</h1>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <input
              value={formState.fullName}
              onChange={(event) => setFormState((prev) => ({ ...prev, fullName: event.target.value }))}
              placeholder={t("checkout.fullName")}
              required
              className="h-12 w-full border border-[#ddd] px-4"
            />
            <input
              type="email"
              value={formState.email}
              onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
              placeholder={t("checkout.email")}
              required
              className="h-12 w-full border border-[#ddd] px-4"
            />
            <input
              value={formState.address}
              onChange={(event) => setFormState((prev) => ({ ...prev, address: event.target.value }))}
              placeholder={t("checkout.address")}
              required
              className="h-12 w-full border border-[#ddd] px-4"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={formState.city}
                onChange={(event) => setFormState((prev) => ({ ...prev, city: event.target.value }))}
                placeholder={t("checkout.city")}
                required
                className="h-12 border border-[#ddd] px-4"
              />
              <input
                value={formState.postalCode}
                onChange={(event) => setFormState((prev) => ({ ...prev, postalCode: event.target.value }))}
                placeholder={t("checkout.postalCode")}
                required
                className="h-12 border border-[#ddd] px-4"
              />
            </div>

            <button
              type="submit"
              disabled={items.length === 0}
              className="h-12 w-full bg-[#ff3434] text-[13px] font-bold uppercase text-white disabled:cursor-not-allowed disabled:bg-[#999]"
            >
              {t("common.placeOrder")}
            </button>
          </form>
        </div>

        <aside className="self-start border border-[#eee] bg-[#fafafa] p-6">
          <h2 className="text-[20px] font-black uppercase text-[#222]">{t("checkout.orderSummary")}</h2>
          <p className="mt-3 text-[14px] text-[#666]">{t("checkout.items")}: {items.length}</p>
          <p className="mt-2 text-[20px] font-bold text-[#ff3434]">{formatPrice(subtotal)}</p>
          {items.length === 0 ? (
            <p className="mt-3 text-[13px] text-[#777]">{t("checkout.empty")}</p>
          ) : null}
        </aside>
      </section>
    </div>
  );
}
