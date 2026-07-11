"use client";

import Breadcrumbs from "@/components/shop/Breadcrumbs";
import Link from "next/link";
import { routeConfig } from "@/data/routes";
import { useAuth } from "@/state/AuthContext";
import { useUtility } from "@/state/UtilityContext";

export default function AccountPage() {
  const { session, isAuthenticated } = useAuth();
  const { selectedLanguageLabel, selectedCurrency, t } = useUtility();

  return (
    <div className="bg-white">
      <Breadcrumbs items={["Home", "Account"]} />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <h1 className="text-[34px] font-black uppercase text-[#222]">{t("account.title")}</h1>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="border border-[#eee] bg-[#fafafa] p-6">
            <h2 className="text-[20px] font-black uppercase text-[#222]">{t("account.profileOverview")}</h2>
            <p className="mt-3 text-[14px] leading-7 text-[#666]">
              {t("account.profileDescription")}
            </p>
            {isAuthenticated && session ? (
              <div className="mt-4 rounded-sm border border-[#e5e5e5] bg-white p-3 text-[13px] text-[#444]">
                <p><span className="font-bold">{t("auth.fullName")}:</span> {session.fullName}</p>
                <p className="mt-1"><span className="font-bold">{t("auth.email")}:</span> {session.email}</p>
              </div>
            ) : (
              <div className="mt-4 rounded-sm border border-[#e5e5e5] bg-white p-3 text-[13px] text-[#444]">
                <p className="font-bold text-[#222]">{t("account.guestTitle")}</p>
                <p className="mt-1">{t("account.guestDescription")}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link href={routeConfig.login} className="rounded-sm bg-[#ff3434] px-3 py-1.5 text-[11px] font-bold uppercase text-white">
                    {t("account.signInNow")}
                  </Link>
                  <Link href={routeConfig.register} className="rounded-sm border border-[#ddd] px-3 py-1.5 text-[11px] font-bold uppercase text-[#333] hover:border-[#ff3434] hover:text-[#ff3434]">
                    {t("account.registerNow")}
                  </Link>
                </div>
              </div>
            )}
          </article>

          <article className="border border-[#eee] bg-[#fafafa] p-6">
            <h2 className="text-[20px] font-black uppercase text-[#222]">{t("account.currentPreferences")}</h2>
            <div className="mt-3 space-y-2 text-[14px] text-[#444]">
              <p><span className="font-bold">{t("account.language")}:</span> {selectedLanguageLabel}</p>
              <p><span className="font-bold">{t("account.currency")}:</span> {selectedCurrency}</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
