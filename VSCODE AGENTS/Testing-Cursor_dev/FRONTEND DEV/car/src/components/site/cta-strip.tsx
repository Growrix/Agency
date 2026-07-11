import Link from "next/link";

type CtaStripProps = {
  title: string;
  description: string;
  button: {
    label: string;
    href: string;
  };
};

export function CtaStrip({ title, description, button }: CtaStripProps) {
  return (
    <section className="pt-60 pb-60 bg-dark-2">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-8">
            <h2 className="mb-2">{title}</h2>
            <p className="mb-0">{description}</p>
          </div>
          <div className="col-lg-4 text-lg-end">
            <Link href={button.href} className="btn-main fx-slide">
              <span>{button.label}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
