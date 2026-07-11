/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Section } from "@/data/site-content";
import { ContactForm } from "@/components/site/contact-form";
import { FaqAccordion } from "@/components/site/faq-accordion";

type SectionRendererProps = {
  section: Section;
};

function sectionHeading(heading: string, description?: string) {
  return (
    <header className="mb-8 max-w-3xl">
      <h2 className="font-(family-name:--lumoria-font-heading) text-3xl font-semibold text-(--lumoria-color-secondary)">
        {heading}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-8 text-foreground">
          {description}
        </p>
      ) : null}
    </header>
  );
}

export function SectionRenderer({ section }: SectionRendererProps) {
  if (section.type === "intro") {
    return (
      <section className="rounded-(--lumoria-radius-hero) bg-white p-8 shadow-(--lumoria-shadow-soft)">
        {sectionHeading(section.heading)}
        <p className="text-base leading-8 text-foreground">
          {section.body}
        </p>
        {section.cta ? (
          <Link
            href={section.cta.href}
            className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
          >
            {section.cta.label}
          </Link>
        ) : null}
      </section>
    );
  }

  if (section.type === "split") {
    return (
      <section className="grid gap-8 rounded-(--lumoria-radius-hero) bg-white p-8 shadow-(--lumoria-shadow-soft) md:grid-cols-2">
        <div className={section.reverse ? "md:order-2" : ""}>
          {sectionHeading(section.heading)}
          <p className="text-base leading-8 text-foreground">
            {section.body}
          </p>
          {section.cta ? (
            <Link
              href={section.cta.href}
              className="mt-5 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
            >
              {section.cta.label}
            </Link>
          ) : null}
        </div>
        <div className={section.reverse ? "md:order-1" : ""}>
          <img
            src={section.image}
            alt={section.imageAlt}
            className="h-full max-h-105 w-full rounded-2xl object-cover"
            loading="lazy"
          />
        </div>
      </section>
    );
  }

  if (section.type === "grid") {
    const gridClass =
      section.columns === 2
        ? "md:grid-cols-2"
        : section.columns === 4
        ? "md:grid-cols-2 xl:grid-cols-4"
        : "md:grid-cols-2 xl:grid-cols-3";

    return (
      <section>
        {sectionHeading(section.heading, section.description)}
        <div className={`grid gap-6 ${gridClass}`}>
          {section.items.map((item) => {
            const content = (
              <article className="overflow-hidden rounded-2xl border border-(--lumoria-color-border) bg-white shadow-(--lumoria-shadow-soft)">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                ) : null}
                <div className="p-5">
                  {item.meta ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                      {item.meta}
                    </p>
                  ) : null}
                  <h3 className="mt-1 font-(family-name:--lumoria-font-heading) text-xl font-semibold text-(--lumoria-color-secondary)">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-foreground">
                    {item.body}
                  </p>
                </div>
              </article>
            );

            return item.href ? (
              <Link key={`${item.title}-${item.href}`} href={item.href}>
                {content}
              </Link>
            ) : (
              <div key={item.title}>{content}</div>
            );
          })}
        </div>
      </section>
    );
  }

  if (section.type === "stats") {
    return (
      <section className="rounded-(--lumoria-radius-hero) bg-[#161616] p-8 text-white">
        {section.heading ? (
          <h2 className="font-(family-name:--lumoria-font-heading) text-3xl font-semibold text-white">
            {section.heading}
          </h2>
        ) : null}
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {section.items.map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-white/20 bg-white/5 px-5 py-6"
            >
              <p className="font-(family-name:--lumoria-font-heading) text-4xl font-semibold text-white">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-white/80">{item.label}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "timeline") {
    return (
      <section>
        {sectionHeading(section.heading)}
        <div className="space-y-4">
          {section.items.map((item) => (
            <article
              key={`${item.year}-${item.title}`}
              className="rounded-2xl border border-(--lumoria-color-border) bg-white p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {item.year}
              </p>
              <h3 className="mt-1 font-(family-name:--lumoria-font-heading) text-xl font-semibold text-(--lumoria-color-secondary)">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-foreground">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "faq") {
    return (
      <section>
        {sectionHeading(section.heading)}
        <FaqAccordion items={section.items} />
      </section>
    );
  }

  if (section.type === "pricing") {
    return (
      <section>
        {sectionHeading(section.heading)}
        <div className="grid gap-6 md:grid-cols-3">
          {section.plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-2xl border p-6 ${
                plan.featured
                  ? "border-primary bg-[#161616] text-white"
                  : "border-(--lumoria-color-border) bg-white"
              }`}
            >
              <p
                className={`text-sm font-semibold uppercase tracking-widest ${
                  plan.featured ? "text-white/90" : "text-primary"
                }`}
              >
                {plan.name}
              </p>
              <p className="mt-3 font-(family-name:--lumoria-font-heading) text-4xl font-semibold">
                {plan.price}
              </p>
              <p className={`mt-1 text-sm ${plan.featured ? "text-white/80" : "text-foreground"}`}>
                {plan.cycle}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-6">
                {plan.features.map((feature) => (
                  <li key={feature}>- {feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-8 rounded-(--lumoria-radius-hero) border border-(--lumoria-color-border) bg-white p-8 md:grid-cols-2">
      <div>
        {sectionHeading(section.heading)}
        <p className="text-sm leading-7 text-foreground">
          {section.description}
        </p>
        <ul className="mt-5 space-y-2 text-sm text-(--lumoria-color-secondary)">
          <li>
            <strong>Office:</strong> {section.office}
          </li>
          <li>
            <strong>Phone:</strong> {section.phone}
          </li>
          <li>
            <strong>Email:</strong> {section.email}
          </li>
        </ul>
      </div>

      <ContactForm />
    </section>
  );
}
