import { cn } from "@/lib/utils";

type FilterChip = {
  label: string;
  value: string;
};

type MobileFilterChipsProps = {
  items: FilterChip[];
  active: string;
  onSelect: (value: string) => void;
  className?: string;
};

export function MobileFilterChips({ items, active, onSelect, className }: MobileFilterChipsProps) {
  return (
    <div className={cn("mobile-filter-chips", className)} role="group" aria-label="Filter options">
      <div className="mobile-filter-chips__scroll">
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onSelect(item.value)}
            aria-pressed={active === item.value}
            className={cn(
              "mobile-filter-chips__chip",
              active === item.value && "mobile-filter-chips__chip--active",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
