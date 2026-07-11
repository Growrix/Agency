import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <ul className="crumb">
      {items.map((item) => (
        <li key={`${item.label}-${item.href ?? "active"}`} className={item.href ? "" : "active"}>
          {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
        </li>
      ))}
    </ul>
  );
}
