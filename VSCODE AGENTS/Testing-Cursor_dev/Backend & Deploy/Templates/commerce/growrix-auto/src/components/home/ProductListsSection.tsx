"use client";

import Image from "next/image";
import Link from "next/link";
import { productLists } from "@/data/home";
import { getProductsBySlugs } from "@/data/catalog";
import { productPath } from "@/data/routes";
import { useUtility } from "@/state/UtilityContext";

const titleKeyMap: Record<string, string> = {
  "NEW ARRIVALS": "home.newArrivals",
  "BEST SELLERS": "home.bestSellersColumn",
  "SALE OFF": "home.saleOff",
};

export default function ProductListsSection() {
  const { formatPrice, t } = useUtility();

  return (
    <section id="new-arrivals" className="bg-white py-14 scroll-mt-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-10">
        {productLists.map((column) => (
          <div key={column.title}>
            <h2 className="mb-5 text-[24px] font-black uppercase tracking-tight text-[#111]">{t(titleKeyMap[column.title] ?? column.title)}</h2>
            <div className="space-y-5">
              {getProductsBySlugs(column.slugs).map((item) => (
                <Link key={item.slug} href={productPath(item.slug)} className="group flex gap-4 border-b border-[#ececec] pb-4 transition-colors duration-300 last:border-0 hover:border-[#ffb3b3]">
                  <div className="relative h-16 w-16 shrink-0">
                    <Image src={item.image} alt={item.title} fill sizes="64px" className="object-contain transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium uppercase leading-5 text-[#222] transition-colors duration-300 group-hover:text-[#ff3434]">{item.title}</p>
                    <div className="mt-1 text-[15px] font-bold text-[#ff3434]">
                      {formatPrice(item.price)}{" "}
                      {item.oldPrice ? <span className="ml-2 text-[#999] line-through">{formatPrice(item.oldPrice)}</span> : null}
                    </div>
                    <div className="mt-1 text-[#ffb400]">★★★★★</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
