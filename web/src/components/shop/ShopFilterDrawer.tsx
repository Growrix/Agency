"use client";

import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { SHOP_MARKETPLACE_COPY } from "@/lib/product-led-content";
import { buildShopHref, type ShopFilterGroup, type ShopFilterState } from "@/lib/shop-filters";
import { cn } from "@/lib/utils";

function DrawerFilterGroup({
  group,
  filters,
  onSelect,
}: {
  group: ShopFilterGroup;
  filters: ShopFilterState;
  onSelect: () => void;
}) {
  const allHref = buildShopHref(filters, { [group.key]: undefined });
  const isAllActive = !group.activeValue;

  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">{group.label}</p>
      <ul className="space-y-0.5">
        <li>
          <Link
            href={allHref}
            scroll={false}
            onClick={onSelect}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors",
              isAllActive
                ? "border-l-2 border-primary bg-primary/10 font-semibold text-primary"
                : "text-text-muted hover:bg-inset hover:text-text",
            )}
          >
            All {group.label}
          </Link>
        </li>
        {group.options.map((option) => {
          const isActive = group.activeValue === option.value;
          return (
            <li key={option.value}>
              <Link
                href={buildShopHref(filters, { [group.key]: option.value })}
                scroll={false}
                onClick={onSelect}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "border-l-2 border-primary bg-primary/10 font-semibold text-primary"
                    : "text-text-muted hover:bg-inset hover:text-text",
                )}
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export type ShopFilterDrawerProps = {
  open: boolean;
  onClose: () => void;
  filters: ShopFilterState;
  filterGroups: ShopFilterGroup[];
};

export function ShopFilterDrawer({ open, onClose, filters, filterGroups }: ShopFilterDrawerProps) {
  const { mobile } = SHOP_MARKETPLACE_COPY;

  return (
    <>
      {open ? (
        <div className="shop-mobile__drawer-overlay" onClick={onClose} aria-hidden />
      ) : null}

      <aside
        role="dialog"
        aria-label={mobile.drawerTitle}
        aria-modal="true"
        className={cn("shop-mobile__drawer", open && "shop-mobile__drawer--open")}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="font-display text-base font-semibold tracking-tight">{mobile.drawerTitle}</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-muted hover:bg-inset hover:text-text"
            aria-label="Close filters"
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>

        <div className="space-y-6">
          {filterGroups.map((group) => (
            <DrawerFilterGroup key={group.key} group={group} filters={filters} onSelect={onClose} />
          ))}
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <LinkButton href={mobile.doneForYouCta.href} variant="outline" size="sm" fullWidth>
            {mobile.doneForYouCta.label}
          </LinkButton>
        </div>
      </aside>
    </>
  );
}
