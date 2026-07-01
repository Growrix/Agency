import {
  ArrowDownTrayIcon,
  LockClosedIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

type TrustItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  hint: string;
};

const ITEMS: TrustItem[] = [
  { icon: LockClosedIcon, title: "Secure Checkout", hint: "SSL Encrypted" },
  { icon: UserGroupIcon, title: "Trusted by 10,000+", hint: "Customers" },
  { icon: ArrowDownTrayIcon, title: "Instant Access", hint: "Digital Download" },
];

export function CheckoutTrustRow() {
  return (
    <ul className="grid gap-2 rounded-md border border-border/55 bg-surface/50 p-3 sm:grid-cols-3">
      {ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.title} className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              <Icon className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-text">{item.title}</span>
              <span className="block text-[11px] text-text-muted">{item.hint}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
