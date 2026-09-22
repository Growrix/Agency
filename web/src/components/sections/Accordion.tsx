"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export type AccordionItem = { question: string; answer: string };

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item) => (
        <Disclosure key={item.question} as="div">
          {({ open }: { open: boolean }) => (
            <>
              <DisclosureButton className="flex w-full items-center justify-between py-5 text-left">
                <span className="font-display text-lg font-medium tracking-tight">{item.question}</span>
                <ChevronDownIcon
                  className={cn("h-5 w-5 text-text-muted transition-transform duration-200", open && "rotate-180 text-primary")}
                  aria-hidden
                />
              </DisclosureButton>
              {/*
                `static` keeps the answer in the rendered HTML even while collapsed.
                Headless UI unmounts a managed panel when closed, which meant FAQ
                answers never reached crawlers or AI answer engines — the page shipped
                questions with no answers. `hidden` still removes a collapsed answer
                from the accessibility tree and from view, so behavior is unchanged
                for users while the text stays in the source.
              */}
              <DisclosurePanel
                static
                hidden={!open}
                className="pb-5 -mt-1 text-text-muted leading-7 text-pretty"
              >
                {item.answer}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
