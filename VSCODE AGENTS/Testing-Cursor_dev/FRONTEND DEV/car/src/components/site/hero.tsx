import Link from "next/link";
import Image from "next/image";

type HeroProps = {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  cta?: {
    label: string;
    href: string;
  };
};

export function Hero({ title, subtitle, description, image, cta }: HeroProps) {
  return (
    <section className="jarallax text-light">
      <Image src={image} className="jarallax-img" alt={title} width={1920} height={1080} />
      <div className="de-gradient-edge-top" />
      <div className="container z-1000">
        <div className="row align-items-center">
          <div className="col-lg-9">
            {subtitle ? <div className="subtitle wow fadeInUp mb-3">{subtitle}</div> : null}
            <h1>{title}</h1>
            {description ? <p className="mb-0 col-lg-8">{description}</p> : null}
          </div>
          {cta ? (
            <div className="col-lg-3 text-lg-end mt-4 mt-lg-0">
              <Link className="btn-main fx-slide" href={cta.href}>
                <span>{cta.label}</span>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
