"use client";

import { useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import {
  HOME_READY_MADE_SOLUTIONS_COPY,
  READY_MADE_SOLUTION_TABS,
} from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { HERO_TITLE_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";

export function ReadyMadeSolutionsSection() {
  const [activeTabId, setActiveTabId] = useState(READY_MADE_SOLUTION_TABS[0]?.id ?? "templates");
  const activeTab =
    READY_MADE_SOLUTION_TABS.find((tab) => tab.id === activeTabId) ?? READY_MADE_SOLUTION_TABS[0];
  const shell = homeSection("ready-made-solutions");

  return (
    <Section {...shell} className="overflow-x-hidden">
      <Container className="min-w-0">
        <SectionHeading
          eyebrow={HOME_READY_MADE_SOLUTIONS_COPY.eyebrow}
          title={HOME_READY_MADE_SOLUTIONS_COPY.title}
          description={HOME_READY_MADE_SOLUTIONS_COPY.description}
          titleClassName={HERO_TITLE_CLASS}
        />

        <div
          className="mt-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Solution categories"
        >
          {READY_MADE_SOLUTION_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTabId(tab.id)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-surface text-text-muted hover:border-primary/40 hover:text-text",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3" role="tabpanel">
          {activeTab.solutions.map((solution) => (
            <Card key={solution.title} className="flex h-full flex-col overflow-hidden p-0">
              <div
                className={cn(
                  "flex h-36 items-end border-b border-border bg-gradient-to-br p-5",
                  solution.accent,
                )}
                aria-hidden
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  {solution.imageAlt}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl tracking-tight">{solution.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-text-muted">{solution.description}</p>
                <LinkButton href={solution.href} variant="outline" size="sm" className="mt-5 w-full sm:w-auto">
                  View Solution <ArrowUpRightIcon className="size-3.5" />
                </LinkButton>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
