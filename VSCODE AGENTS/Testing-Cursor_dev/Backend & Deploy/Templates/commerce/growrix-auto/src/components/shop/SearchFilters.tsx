"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { vehicleFilters } from "@/data/home";
import { useUtility } from "@/state/UtilityContext";

type SearchFiltersProps = {
  tone?: "light" | "dark";
};

export default function SearchFilters({ tone = "light" }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useUtility();
  const isDark = tone === "dark";

  const fieldClasses = isDark
    ? "h-12 rounded-sm border border-white/70 bg-black/35 px-4 text-[14px] text-white placeholder:text-white/75"
    : "h-12 rounded-sm border border-[#ddd] bg-white px-4 text-[14px] text-[#444] placeholder:text-[#777]";

  const initialValues = useMemo(
    () => ({
      make: searchParams.get("make") ?? "",
      model: searchParams.get("model") ?? "",
      year: searchParams.get("year") ?? "",
      q: searchParams.get("q") ?? "",
    }),
    [searchParams],
  );

  const [values, setValues] = useState(initialValues);

  const updateValue = (key: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (values.q) params.set("q", values.q);
    if (values.make) params.set("make", values.make);
    if (values.model) params.set("model", values.model);
    if (values.year) params.set("year", values.year);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="mt-8 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
      <input
        value={values.q}
        onChange={(event) => updateValue("q", event.target.value)}
        placeholder={t("search.placeholder")}
        className={fieldClasses}
      />

      <select
        value={values.make}
        onChange={(event) => updateValue("make", event.target.value)}
        className={fieldClasses}
      >
        <option value="" className="bg-white text-[#111]">{t("search.selectMake")}</option>
        {vehicleFilters.make.map((item) => (
          <option key={item} value={item} className="bg-white text-[#111]">
            {item}
          </option>
        ))}
      </select>

      <select
        value={values.model}
        onChange={(event) => updateValue("model", event.target.value)}
        className={fieldClasses}
      >
        <option value="" className="bg-white text-[#111]">{t("search.selectModel")}</option>
        {vehicleFilters.model.map((item) => (
          <option key={item} value={item} className="bg-white text-[#111]">
            {item}
          </option>
        ))}
      </select>

      <select
        value={values.year}
        onChange={(event) => updateValue("year", event.target.value)}
        className={fieldClasses}
      >
        <option value="" className="bg-white text-[#111]">{t("search.selectYear")}</option>
        {vehicleFilters.year.map((item) => (
          <option key={item} value={item} className="bg-white text-[#111]">
            {item}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleSearch}
        className="h-12 rounded-sm bg-[#ff3434] px-6 text-[13px] font-bold uppercase tracking-wide text-white"
      >
        {t("common.searchAction")}
      </button>
    </div>
  );
}
