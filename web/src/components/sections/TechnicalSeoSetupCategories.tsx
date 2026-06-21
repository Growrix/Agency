import {
  ChartBarIcon,
  CheckCircleIcon,
  MagnifyingGlassCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { Card } from "@/components/primitives/Card";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import type { SeoSetupCategory } from "@/lib/technical-seo-service-content";

const CATEGORY_ICONS = [
  MagnifyingGlassCircleIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
] as const;

export function TechnicalSeoSetupCategories({
  categories,
  footerNote,
}: {
  categories: readonly SeoSetupCategory[];
  footerNote: string;
}) {
  return (
    <>
      <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.08}>
        {categories.map((cat, index) => {
          const Icon = CATEGORY_ICONS[index] ?? MagnifyingGlassCircleIcon;
          return (
            <RevealItem key={cat.id} className="h-full min-w-0">
              <Card hoverable className="flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex size-12 items-center justify-center rounded-[14px] bg-primary/10 text-primary">
                    <Icon className="size-6" aria-hidden />
                  </div>
                  {cat.badge ? <Badge tone="secondary">{cat.badge}</Badge> : null}
                </div>
                <h3 className="mt-5 font-display text-xl tracking-tight">{cat.title}</h3>
                <div className="mt-4 border-t border-border" />
                <ul className="mt-4 flex-1 space-y-3">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      <span className="text-sm leading-6 text-text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
      <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-7 text-text-muted">{footerNote}</p>
    </>
  );
}
