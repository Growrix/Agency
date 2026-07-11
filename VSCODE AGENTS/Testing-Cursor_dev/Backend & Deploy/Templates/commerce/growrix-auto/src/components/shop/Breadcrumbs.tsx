"use client";

import Link from "next/link";
import { translateByBreadcrumbLabel } from "@/lib/localization";
import { useUtility } from "@/state/UtilityContext";

type BreadcrumbsProps = {
  items: string[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { selectedLanguage } = useUtility();

  const labels = items.map((item) => translateByBreadcrumbLabel(selectedLanguage, item));

  return (
    <div className="mx-auto max-w-7xl px-4 py-5 text-[14px] text-[#777] sm:px-6 lg:px-10">
      <Link href="/" className="hover:text-[#ff3434]">
        {labels[0]}
      </Link>
      {labels.slice(1).map((item, index) => (
        <span key={`${item}-${index}`}>
          <span className="px-2">›</span>
          <span>{item}</span>
        </span>
      ))}
    </div>
  );
}
