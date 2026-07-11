import Link from "next/link";
import type { ReactNode } from "react";

type RouteCard = {
  title: string;
  href: string;
  summary?: string;
  badge?: string;
};

type RouteGridProps = {
  heading: string;
  description: string;
  items: RouteCard[];
  footer?: ReactNode;
};

export function RouteGrid({ heading, description, items, footer }: RouteGridProps) {
  return (
    <section className="pt-80 pb-80">
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-8">
            <h1 className="mb-2">{heading}</h1>
            <p className="mb-0">{description}</p>
          </div>
        </div>
        <div className="row g-4">
          {items.map((item) => (
            <div className="col-lg-4 col-md-6" key={`${item.href}-${item.title}`}>
              <Link href={item.href} className="d-block p-4 rounded-1 bg-dark-2 h-100">
                {item.badge ? <small className="id-color d-block mb-2">{item.badge}</small> : null}
                <h4 className="mb-2">{item.title}</h4>
                {item.summary ? <p className="mb-0">{item.summary}</p> : null}
              </Link>
            </div>
          ))}
        </div>
        {footer ? <div className="mt-4">{footer}</div> : null}
      </div>
    </section>
  );
}
