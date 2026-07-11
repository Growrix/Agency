"use client";

import { useState } from "react";
import { useCart } from "@/state/CartContext";
import { useUtility } from "@/state/UtilityContext";

type AddToCartButtonProps = {
  productSlug: string;
};

export default function AddToCartButton({ productSlug }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const { t } = useUtility();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(productSlug, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="rounded-sm bg-[#ff3434] px-6 py-3 text-[13px] font-bold uppercase text-white transition-colors hover:bg-[#d92424]"
    >
      {added ? t("product.added") : t("product.addToCart")}
    </button>
  );
}
