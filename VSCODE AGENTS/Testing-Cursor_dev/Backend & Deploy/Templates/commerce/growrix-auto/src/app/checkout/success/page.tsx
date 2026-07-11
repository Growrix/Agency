import Link from "next/link";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import { getServerPreferences } from "@/lib/serverPreferences";
import { routeConfig } from "@/data/routes";

export default async function CheckoutSuccessPage() {
  const { t } = await getServerPreferences();

  return (
    <div className="bg-white">
      <Breadcrumbs items={["Home", "Checkout", "Success"]} />

      <section className="mx-auto max-w-3xl px-4 pb-16 pt-4 text-center sm:px-6 lg:px-10">
        <h1 className="text-[34px] font-black uppercase text-[#222]">{t("checkout.successTitle")}</h1>
        <p className="mt-4 text-[15px] leading-7 text-[#666]">
          {t("checkout.successMessage")}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={routeConfig.shop} className="rounded-sm bg-[#ff3434] px-5 py-2 text-[12px] font-bold uppercase text-white">
            {t("common.continueShopping")}
          </Link>
          <Link href={routeConfig.account} className="rounded-sm border border-[#ddd] px-5 py-2 text-[12px] font-bold uppercase text-[#333] hover:border-[#ff3434] hover:text-[#ff3434]">
            {t("common.viewAccount")}
          </Link>
        </div>
      </section>
    </div>
  );
}
