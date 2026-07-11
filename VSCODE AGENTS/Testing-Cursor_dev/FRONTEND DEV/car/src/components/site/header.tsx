import Link from "next/link";
import { siteConfig, services } from "@/data/site";
import { routes } from "@/lib/routes";

/**
 * Pixel-perfect mirror of baseline `Car-subdomain/public/index.html` header.
 * Uses plain `<img>` and the full baseline mega-menu so designesia.js can
 * attach jQuery dropdown / menu-btn / btn-extra behaviour without any DOM
 * divergence. Internal links resolve to canonical Next.js routes.
 */
export function SiteHeader() {
  return (
    <header className="transparent">
      <div id="topbar">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex justify-content-between xs-hide">
                <div className="d-flex">
                  <div className="topbar-widget">
                    <Link href={routes.appointment}>
                      <img src="/images/svg-white/bell.svg" alt="" />
                      Book this week and get 15% off your first detailing package.
                    </Link>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="topbar-widget me-5">
                    <a href={siteConfig.phoneHref}>
                      <img src="/images/svg-white/phone.svg" alt="" />
                      Call us: {siteConfig.phone}
                    </a>
                  </div>
                  <div className="topbar-widget">
                    <a href={siteConfig.emailHref}>
                      <img src="/images/svg-white/envelope.svg" alt="" />
                      Message us: {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix" />
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex sm-pt10">
              <div className="de-flex-col">
                {/* logo begin */}
                <div id="logo">
                  <Link href={routes.home}>
                    <img className="logo-main" src="/images/logo-velocare.svg" alt={siteConfig.name} />
                    <img className="logo-mobile" src="/images/logo-velocare-mobile.svg" alt={siteConfig.shortName} />
                  </Link>
                </div>
                {/* logo end */}
              </div>

              <div className="de-flex-col header-col-mid">
                {/* mainmenu begin */}
                <ul id="mainmenu">
                  <li>
                    <Link className="menu-item" href={routes.home}>Home</Link>
                    <ul>
                      <li><Link href={routes.home}>Homepage 1</Link></li>
                      <li><Link href={routes.home2}>Homepage 2</Link></li>
                      <li><Link href={routes.home3}>Homepage 3</Link></li>
                      <li><Link href={routes.home4}>Homepage 4</Link></li>
                      <li><Link href={routes.home5}>Homepage 5</Link></li>
                      <li><Link href={routes.home6}>Homepage 6</Link></li>
                      <li><Link href={routes.home7}>Homepage 7</Link></li>
                      <li><Link href={routes.home8}>New: Homepage 8</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link className="menu-item" href={routes.services}>Services</Link>
                    <ul>
                      <li><Link href={routes.services}>All Services Style 1</Link></li>
                      <li><Link href={routes.services2}>All Services Style 2</Link></li>
                      <li><Link href={routes.services3}>All Services Style 3</Link></li>
                      <li><Link href={routes.serviceDetail(services[0]?.slug ?? "exterior-hand-wash-wax")}>Service Single</Link></li>
                      <li><Link href={routes.faq}>FAQ</Link></li>
                    </ul>
                  </li>
                  <li>
                    <a className="menu-item" href="#">Pages</a>
                    <ul>
                      <li><Link href={routes.about}>About Us</Link></li>
                      <li><Link href={routes.gallery}>Gallery</Link></li>
                      <li><Link href={routes.blog}>Blog</Link></li>
                      <li><Link href={routes.team}>Our Team</Link></li>
                      <li><Link href={routes.careers}>Careers</Link></li>
                      <li><Link href={routes.testimonials}>Testimonials</Link></li>
                    </ul>
                  </li>
                  <li>
                    <Link className="menu-item" href={routes.shop}>Shop</Link>
                  </li>
                  <li>
                    <a className="menu-item" href="#">Listing</a>
                    <ul>
                      <li><Link href={routes.listing}>Car Listing</Link></li>
                      <li><Link href={routes.listingDetail("bmw-x5")}>Car Single</Link></li>
                    </ul>
                  </li>
                  <li>
                    <a className="menu-item" href="#">Gallery</a>
                    <ul>
                      <li><Link href={routes.gallery}>Gallery Filter</Link></li>
                      <li><Link href={routes.galleryCarousel}>Gallery Carousel</Link></li>
                      <li><Link href={routes.gallerySlider}>Gallery Slider</Link></li>
                    </ul>
                  </li>
                  <li>
                    <a className="menu-item" href="#">Workshop</a>
                    <ul>
                      <li><Link href={routes.locations}>Locations</Link></li>
                      <li><Link href={routes.contact}>Contact</Link></li>
                    </ul>
                  </li>
                </ul>
                {/* mainmenu end */}
              </div>

              <div className="de-flex-col">
                <div className="menu_side_area">
                  <Link href={routes.appointment} className="btn-main fx-slide hover-white">
                    <span>Make Appointment</span>
                  </Link>
                  <span id="menu-btn" />
                </div>

                <div id="btn-extra">
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
