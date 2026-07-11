"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/site-content";

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = openIndex === index;

        return (
          <article
            key={item.question}
            className="overflow-hidden rounded-2xl border border-(--lumoria-color-border) bg-white"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
            >
              <span className="font-(family-name:--lumoria-font-heading) text-lg font-semibold text-(--lumoria-color-secondary)">
                {item.question}
              </span>
              <span className="ml-4 text-primary">
                {open ? "-" : "+"}
              </span>
            </button>

            {open ? (
              <div className="border-t border-(--lumoria-color-border) px-5 py-4 text-sm leading-7 text-foreground">
                {item.answer}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
