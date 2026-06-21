import { CheckIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import type { SeoDeliverableCategory } from "@/lib/technical-seo-service-content";

export function SeoDeliverablesChecklist({ categories }: { categories: SeoDeliverableCategory[] }) {
  return (
    <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2" stagger={0.07}>
      {categories.map((category) => (
        <RevealItem key={category.title} className="h-full min-w-0">
          <Card hoverable className="h-full p-5 sm:p-6">
            <h3 className="font-display text-lg tracking-tight sm:text-xl">{category.title}</h3>
            <ul className="mt-5 space-y-2.5" aria-label={`${category.title} deliverables`}>
              {category.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-text-muted">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
