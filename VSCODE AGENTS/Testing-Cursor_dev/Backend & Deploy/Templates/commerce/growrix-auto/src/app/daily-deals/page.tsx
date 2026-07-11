import Link from "next/link";
import { dealsPage } from "@/data/pages";
import { dailyDealTabs } from "@/data/home";
import { getProductsByCategory } from "@/data/catalog";
import { categoryPath, routeConfig } from "@/data/routes";
import ProductCard from "@/components/shop/ProductCard";
import { getServerPreferences } from "@/lib/serverPreferences";

export default async function DailyDealsPage() {
  const { t } = await getServerPreferences();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 text-[14px] text-[#777] sm:px-6 lg:px-10">
        <Link href="/" className="hover:text-[#ff3434]">{t("common.home")}</Link> <span className="px-2">›</span> <span>{t("common.dailyDeals")}</span>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <h1 className="text-[34px] font-black uppercase text-[#222]">{t("dailyDeals.title")}</h1>
        <div className="mt-6 flex flex-wrap gap-0 border-b border-[#ddd]">
          {dailyDealTabs.map((tab, index) => (
            <Link key={tab.slug} href={categoryPath(tab.categorySlug)} className={`border px-5 py-4 text-[14px] ${index === 0 ? "border-b-white bg-white text-[#222]" : "bg-[#f5f5f5] text-[#666]"}`}>
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-4">
          {getProductsByCategory(dailyDealTabs[0].categorySlug).slice(0, 4).map((product) => (
            <div key={product.slug}>
              <ProductCard product={product} />
              <div className="mt-3 grid grid-cols-4 gap-1 text-center text-[#222]">
                {dealsPage.timers.map((timer) => (
                  <div key={`${product.slug}-${timer}`} className="border border-[#ddd] bg-white px-2 py-3">
                    <div className="text-[16px] font-black">{timer.split(" ")[0]}</div>
                    <div className="text-[11px] uppercase text-[#888]">
                      {timer.includes("DAYS") ? t("dailyDeals.days") : null}
                      {timer.includes("HOURS") ? t("dailyDeals.hours") : null}
                      {timer.includes("MINS") ? t("dailyDeals.mins") : null}
                      {timer.includes("SECS") ? t("dailyDeals.secs") : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href={routeConfig.shop} className="bg-[#ff3434] px-7 py-3 text-[13px] font-bold uppercase text-white">{t("common.loadMore")}</Link>
        </div>
      </section>
    </div>
  );
}
