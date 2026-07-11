"use client";

import { featureStrip } from "@/data/home";
import { useUtility } from "@/state/UtilityContext";

const titleKeyByIndex = [
  "home.featureFreeShipping",
  "home.featureMoneyGuarantee",
  "home.featureSafeShopping",
  "home.featureOnlineSupport",
];

const textKeyByIndex = [
  "home.featureFreeShippingText",
  "home.featureMoneyGuaranteeText",
  "home.featureSafeShoppingText",
  "home.featureOnlineSupportText",
];

export default function FeaturesStripSection() {
  const { formatPrice, t } = useUtility();

  return (
    <section className="bg-white py-4">
      <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {featureStrip.map((item, index) => (
          <div key={item.title} className="flex items-center gap-4 rounded-sm border border-[#ececec] bg-[#fafafa] px-5 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#ff3434] text-[#ff3434]">★</div>
            <div>
              <h3 className="text-[13px] font-bold uppercase text-[#111]">{t(titleKeyByIndex[index] ?? item.title)}</h3>
              <p className="text-[12px] text-[#777]">
                {index === 0
                  ? t(textKeyByIndex[index], { amount: formatPrice(99) })
                  : t(textKeyByIndex[index] ?? item.text)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
