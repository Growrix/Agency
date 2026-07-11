import Link from "next/link";
import { siteConfig, services } from "@/data/site";
import { routes } from "@/lib/routes";

/**
 * Pixel-perfect mirror of baseline `Car-subdomain/public/index.html` footer.
 * Uses plain `<img>` and the same Bootstrap column ordering so the original
 * baseline grid behaviour is preserved on every breakpoint.
 */
export function SiteFooter() {
  const serviceLinks = services.slice(0, 6);

  return (
    <footer>
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-4 col-sm-6">
            <img src="/images/logo-velocare.svg" className="logo-footer" alt={siteConfig.name} />
            <div className="spacer-20" />
            <p>
              At {siteConfig.name}, we&apos;re dedicated to providing professional, high-quality car detailing services. From routine hand washes to advanced ceramic coatings, we help keep your vehicle looking its best while preserving its value and protecting it from the elements.
            </p>

            <div className="social-icons mb-sm-30">
              {siteConfig.social.map((entry) => (
                <a key={entry.href} href={entry.href} target="_blank" rel="noopener noreferrer" aria-label={entry.label}>
                  <i className={entry.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="col-lg-4 col-sm-12 order-lg-1 order-sm-2">
            <div className="row">
              <div className="col-lg-5">
                <div className="widget">
                  <h5>Company</h5>
                  <ul>
                    <li><Link href={routes.home}>Home</Link></li>
                    <li><Link href={routes.services}>Our Services</Link></li>
                    <li><Link href={routes.gallery}>Gallery</Link></li>
                    <li><Link href={routes.about}>About Us</Link></li>
                    <li><Link href={routes.blog}>Blog</Link></li>
                    <li><Link href={routes.contact}>Contact</Link></li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="widget">
                  <h5>Our Services</h5>
                  <ul>
                    {serviceLinks.map((service) => (
                      <li key={service.slug}>
                        <Link href={routes.serviceDetail(service.slug)}>{service.subtitle}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 order-lg-2 order-sm-1">
            <div className="widget">
              <h5>Contact Us</h5>

              <div className="fw-bold text-white">
                <i className="icofont-location-pin me-2 id-color" />Head Office
              </div>
              {siteConfig.address}

              <div className="spacer-20" />

              <div className="fw-bold text-white">
                <i className="icofont-phone me-2 id-color" />Call Us
              </div>
              {siteConfig.phone}

              <div className="spacer-20" />

              <div className="fw-bold text-white">
                <i className="icofont-envelope me-2 id-color" />Email Us
              </div>
              {siteConfig.email}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
