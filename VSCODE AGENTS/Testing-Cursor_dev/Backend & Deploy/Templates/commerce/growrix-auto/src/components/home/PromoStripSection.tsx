import Image from "next/image";
import Link from "next/link";
import { promoCards } from "@/data/home";
import { categoryPath, productPath, routeConfig } from "@/data/routes";

function resolvePromoHref(card: (typeof promoCards)[number]) {
  if (card.targetType === "category" && card.targetSlug) {
    return categoryPath(card.targetSlug);
  }

  if (card.targetType === "product" && card.targetSlug) {
    return productPath(card.targetSlug);
  }

  return routeConfig.shop;
}

export default function PromoStripSection() {
  return (
    <section className="bg-white py-2">
      <div className="mx-auto grid max-w-7xl gap-2 px-4 sm:px-6 lg:grid-cols-3 lg:px-10">
        {promoCards.map((card) => (
          <article key={card.image} className="group relative min-h-47.5 overflow-hidden text-white">
            <Image src={card.image} alt={card.title || card.label} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#ffcf4a]">{card.label}</p>
              <div>
                {card.title ? <h3 className="max-w-62.5 text-[24px] font-black uppercase leading-tight">{card.title}</h3> : null}
                <Link
                  href={resolvePromoHref(card)}
                  className="mt-4 inline-flex rounded-sm bg-[#ff3434] px-4 py-2 text-[12px] font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#d92424]"
                >
                  {card.cta}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
