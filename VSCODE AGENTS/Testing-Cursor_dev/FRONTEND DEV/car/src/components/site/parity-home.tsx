import Link from "next/link";
import { services } from "@/data/site";
import { routes } from "@/lib/routes";

/**
 * Pixel-perfect mirror of baseline `Car-subdomain/public/index.html` content
 * region. Mirrors the baseline DOM 1:1 (classes, `data-bgimage`, `wow`/
 * `jarallax` / `owl-carousel` / `twentytwenty` markers) so the vendor JS
 * runtime restored by VendorScripts wires up animations, slider, parallax,
 * carousels, and the before/after comparison without any divergence.
 *
 * Internal links use Next.js `<Link>` to canonical routes; legacy `.html`
 * targets remain reachable via `[slug]/page.tsx` redirects.
 */
export function HomeParityContent() {
  const heroServices = services.slice(0, 6);
  const fallbackServiceSlug = heroServices[0]?.slug ?? "exterior-hand-wash-wax";

  return (
    <>
      {/* HERO SWIPER */}
      <section className="text-light no-top no-bottom relative overflow-hidden">
        <div className="mh-700">
          <div className="abs w-100 bottom-0 z-2 pb-4">
            <div className="container">
              <div className="row g-4 justify-content-between align-items-bottom">
                <div className="col-lg-8">
                  <div className="sw-text-wrapper">
                    <div className="subtitle wow fadeInUp">Car Detailing Service</div>
                    <h1 className="fs-72 fs-xs-10vw text-uppercase wow fadeInUp">
                      The Ultimate <span className="id-color">Car Detailing</span> Service
                    </h1>
                  </div>
                </div>

                <div className="col-lg-3">
                  <div className="spacer-double" />
                  <p className="mb-0 wow fadeInUp" data-wow-delay=".2s">
                    At Velocare Auto Studio, we deliver reliable, efficient detailing for personal cars and fleets, restoring showroom shine, extending vehicle life, and protecting your investment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="swiper-inner" data-bgimage="url(/images/slider/1.webp)">
                  <div className="gradient-edge-top h-20 op-5" />
                  <div className="gradient-edge-bottom h-50" />
                  <div className="sw-overlay op-6" />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="swiper-inner" data-bgimage="url(/images/slider/2.webp)">
                  <div className="gradient-edge-top h-20 op-5" />
                  <div className="gradient-edge-bottom h-50" />
                  <div className="sw-overlay op-6" />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="swiper-inner" data-bgimage="url(/images/slider/3.webp)">
                  <div className="gradient-edge-top h-20 op-5" />
                  <div className="gradient-edge-bottom h-50" />
                  <div className="sw-overlay op-6" />
                </div>
              </div>
            </div>

            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>
        </div>
      </section>

      {/* ABOUT + STATS */}
      <section className="pb-0">
        <div className="container relative z-1">
          <div className="row g-4 gx-5 align-items-center">
            <div className="col-lg-6">
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className=" rounded-1 overflow-hidden wow zoomIn">
                        <img src="/images/misc/p1.webp" className="w-100 wow scaleIn" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="row g-4">
                    <div className="spacer-single sm-hide" />
                    <div className="col-lg-12">
                      <div className=" rounded-1 overflow-hidden wow zoomIn" data-wow-delay=".3s">
                        <img src="/images/misc/p2.webp" className="w-100 wow scaleIn" alt="" data-wow-delay=".3s" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="subtitle wow fadeInUp" data-wow-delay=".2s">About Us</div>
              <h2 className="wow fadeInUp" data-wow-delay=".4s">Restoring Lasting Shine, Inside and Out</h2>
              <p className="wow fadeInUp" data-wow-delay=".6s">
                At Velocare Auto Studio, we&apos;re passionate about making every vehicle look its absolute best - inside and out. From restoring showroom-level gloss to deep-cleaning interiors, our expert team delivers flawless results with care and precision.
              </p>
              <Link className="btn-main fx-slide wow fadeInUp" href={routes.services} data-wow-delay=".6s">
                <span>Read More</span>
              </Link>
            </div>
          </div>

          <div className="spacer-double" />

          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="de_count text-center wow fadeInRight" data-wow-delay=".0s">
                <i className="id-color fs-40 d-inline-block mb-3 icofont-briefcase-2" />
                <h3 className="fs-40 mb-0 lh-1-1">
                  <span className="timer" data-to="65250" data-speed="3000">0</span>+
                </h3>
                Hours of Works
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="de_count text-center wow fadeInRight" data-wow-delay=".2s">
                <i className="id-color fs-40 d-inline-block mb-3 icofont-thumbs-up" />
                <h3 className="fs-40 mb-0 lh-1-1">
                  <span className="timer" data-to="23160" data-speed="3000">0</span>+
                </h3>
                Happy Customers
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="de_count text-center wow fadeInRight" data-wow-delay=".4s">
                <i className="id-color fs-40 d-inline-block mb-3 icofont-users-alt-3" />
                <h3 className="fs-40 mb-0 lh-1-1">
                  <span className="timer" data-to="1500" data-speed="3000">0</span>+
                </h3>
                Experienced Workers
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="de_count text-center wow fadeInRight" data-wow-delay=".6s">
                <i className="id-color fs-40 d-inline-block mb-3 icofont-badge" />
                <h3 className="fs-40 mb-0 lh-1-1">
                  <span className="timer" data-to="20" data-speed="3000">0</span>+
                </h3>
                Years of Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JARALLAX BANNER */}
      <section className="pb-80 jarallax" aria-label="section">
        <img src="/images/background/3.webp" className="jarallax-img" alt="" />
        <div className="gradient-edge-top" />
        <div className="sw-overlay" />
        <div className="container relative z-2">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-10">
              <img src="/images/misc/c1.webp" className="w-100" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="bg-dark-2">
        <div className="container">
          <div className="row g-4 justify-content-center mb-2">
            <div className="col-lg-6">
              <div className="text-center">
                <div className="subtitle">Welcome to Velocare Auto Studio</div>
                <h2>Premium Car Detailing</h2>
                <p>From deep interior cleaning to long-lasting ceramic coating, we restore and protect your vehicle with precision, care, and a commitment to perfection.</p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {heroServices.map((service, index) => {
              const delay = `${(index * 0.2).toFixed(1)}s`;
              const number = String(index + 1).padStart(2, "0");
              return (
                <div className="col-lg-4 col-sm-6" key={service.slug}>
                  <div className="hover rounded-1 overflow-hidden relative text-light text-center wow fadeInRight" data-wow-delay={delay}>
                    <img src={service.image} className="hover-scale-1-1 w-100" alt="" />
                    <div className="abs w-100 px-4 hover-op-1 z-4 hover-mt-40 abs-centered">
                      <div className="mb-3">{service.description}</div>
                      <Link className="btn-main fx-slide" href={routes.serviceDetail(service.slug)}>
                        <span>View Details</span>
                      </Link>
                    </div>
                    <h3 className="abs fs-32 lh-1 p-4 top-0" style={{ insetInlineStart: 0 }}>{number}</h3>
                    <div className="abs bg-blur z-2 top-0 w-100 h-100 hover-op-1" />
                    <div className="abs z-2 bottom-0 mb-3 w-100 text-center hover-op-0">
                      <h4 className="mb-3">{service.subtitle}</h4>
                    </div>
                    <div className="gradient-edge-bottom color abs w-100 h-40 bottom-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BRAND CAROUSEL */}
      <section className="bg-dark-2 pt-0" aria-label="section">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-12 wow fadeInUp">
              <div className="owl-6 no-alpha owl-carousel owl-theme">
                {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
                  <img key={n} src={`/images/logo-brands/${n}.webp`} className="w-100 px-lg-5 p-4" alt="" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TWENTYTWENTY BEFORE/AFTER */}
      <section>
        <div className="container">
          <div className="row g-4 gx-5 align-items-center">
            <div className="col-lg-6">
              <div className="subtitle">Real Results</div>
              <h2>Before &amp; After: Complete Auto Transformations</h2>
              <p>See the dramatic difference ceramic coating makes - restoring clarity, depth, and shine while adding a durable layer of protection. Every detail counts, and the results speak for themselves.</p>
            </div>

            <div className="col-lg-6">
              <div className="twentytwenty-container rounded-1">
                <img src="/images/before-after/1b.webp" alt="" className="img-responsive" />
                <img src="/images/before-after/1a.webp" alt="" className="img-responsive" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS OWL */}
      <section className="bg-dark-2">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-12">
              <div className="row">
                <div className="owl-carousel owl-theme owl-3-dots wow fadeInUp">
                  {[
                    { name: "John Smith", date: "7 December 2024", quote: "My car looked brand new after their full detail service. Every inch was spotless! Great attention to detail and friendly staff." },
                    { name: "Jessica Lee", date: "12 January 2025", quote: "Incredible service! The ceramic coating really made my paint pop. Definitely coming back for future detailing needs." },
                    { name: "Michael Brown", date: "2 February 2025", quote: "Super clean interior and spotless engine bay. The team was fast, professional, and clearly passionate about what they do." },
                    { name: "Rachel Adams", date: "15 March 2025", quote: "Loved how easy it was to book. The detailers were on time, courteous, and left my SUV shining inside and out." },
                    { name: "Liam Carter", date: "8 April 2025", quote: "These guys know their craft. Headlight restoration alone made my car look five years newer. Worth every penny!" },
                    { name: "Emily Nguyen", date: "20 May 2025", quote: "I&apos;ve used a few detailers before, but this place is top-notch. My car feels fresh, smells amazing, and looks flawless!" },
                    { name: "Noah Williams", date: "5 June 2025", quote: "Professional, quick, and detailed. My black paint looks like a mirror after the ceramic coating. Five stars all day." },
                    { name: "Ava Johnson", date: "14 June 2025", quote: "Interior deep clean was amazing! All the stains and pet hair are gone. The car smells so fresh now. Highly recommended." },
                    { name: "Lucas Evans", date: "21 June 2025", quote: "They removed scratches I thought were permanent. The paint correction gave my car a second life. Amazing results!" },
                    { name: "Sophia Martinez", date: "30 June 2025", quote: "Super impressed with how clean and glossy my car looked after just one session. The team was respectful and efficient." },
                  ].map((review, idx) => (
                    <div className="item" key={review.name}>
                      <div className="bg-dark rounded-1 p-30">
                        <div className="d-flex justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <img className="w-40px circle me-3" alt="" src={`/images/testimonial/${idx + 1}.webp`} />
                            <div className="mt-2">
                              <div className="text-white fw-bold lh-1">{review.name}</div>
                              <small>{review.date}</small>
                            </div>
                          </div>
                          <img src="/images/misc/google-icon.svg" className="w-30px" alt="" />
                        </div>
                        <div className="de-rating-ext mb-2">
                          <span className="d-stars">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                          </span>
                          <span className="ms-2 text-white">5.0</span>
                        </div>
                        <p>&quot;{review.quote.replace(/&apos;/g, "'")}&quot;</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPOINTMENT CTA STRIP */}
      <section className="bg-color text-light pt-60 pb-50">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-9">
              <h3 className="mb-0 fs-32">Want your car to shine like new again?</h3>
            </div>
            <div className="col-lg-3 text-lg-end">
              <Link className="btn-main fx-slide btn-line" href={routes.appointment}>
                <span>Make Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-dark text-light">
        <div className="container relative z-1">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="subtitle id-color">Trusted &amp; Affordable</div>
              <h2>Why Choose Our Car Detailing?</h2>
              <p>From deep interior cleaning to long-lasting ceramic coating, we restore and protect your vehicle with precision, care, and a commitment to perfection.</p>
            </div>
          </div>

          <div className="row g-4">
            {[
              { title: "Expert Technicians", body: "Our detailers are skilled professionals with years of experience in car care." },
              { title: "Tailored Packages", body: "Detailing options customized to your car's condition and your preferences." },
              { title: "Affordable Pricing", body: "Competitive rates with no hidden fees - quality service that fits your budget." },
              { title: "Aftercare Support", body: "We provide post-service tips and care advice to keep your car looking sharp." },
            ].map((item) => (
              <div className="col-lg-3 col-md-6" key={item.title}>
                <div className="bg-dark-2 p-40 h-100 rounded-1">
                  <div className="relative wow fadeInUp">
                    <h4>{item.title}</h4>
                    <p className="mb-0">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARALLAX DIVIDER */}
      <section className="relative jarallax mh-500" aria-label="section">
        <div className="gradient-edge-top" />
        <div className="gradient-edge-bottom" />
        <img src="/images/background/3.webp" className="jarallax-img" alt="" />
      </section>

      {/* FAQ ACCORDION */}
      <section>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="subtitle id-color wow fadeInUp" data-wow-delay=".0s">Everything You Need to Know</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Frequently Asked Questions</h2>
            </div>

            <div className="col-lg-7">
              <div className="accordion s2 wow fadeInUp">
                <div className="accordion-section">
                  {[
                    { q: "What is car detailing?", a: "Car detailing is a thorough cleaning, restoration, and finishing of a vehicle to produce a show-quality cleanliness and polish, both inside and out." },
                    { q: "How often should I get my car detailed?", a: "It depends on your usage, but most experts recommend detailing every 3-6 months to maintain your car's appearance and protect its value." },
                    { q: "What's included in a full detailing service?", a: "A full detail typically includes exterior wash and polish, interior vacuuming and shampooing, leather conditioning, window cleaning, and engine bay cleaning." },
                    { q: "Will detailing remove scratches and stains?", a: "Light scratches and stains can often be removed through polishing and deep cleaning. Heavier damage may require paint correction or special treatment." },
                    { q: "How long does a detailing session take?", a: "Depending on the vehicle size and service level, a full detailing can take between 2 to 6 hours. We'll let you know the estimated time during booking." },
                  ].map((item, idx) => {
                    const id = `accordion-a${idx + 1}`;
                    return (
                      <div key={id}>
                        <div className="accordion-section-title" data-tab={`#${id}`}>
                          {item.q}
                        </div>
                        <div className="accordion-section-content" id={id}>
                          {item.a}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM GRID */}
      <section className="bg-dark-2 pt-50 relative no-bottom">
        <div className="container relative z-2">
          <div className="row g-4">
            <div className="col-lg-8 offset-lg-2 mb-4 text-center">
              <div className="subtitle id-color wow fadeInUp mb-3">Our Instagram</div>
              <h2 className="wow fadeInUp">@velocare_auto</h2>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row g-0">
            {[0, 1].map((half) => (
              <div className="col-md-6" key={half}>
                <div className="row g-0">
                  {Array.from({ length: 4 }, (_, i) => half * 4 + i + 1).map((n) => (
                    <div className="col-3" key={n}>
                      <Link href={routes.gallery} className="d-block hover relative overflow-hidden text-light">
                        <img src={`/images/gallery-square/${n}.webp`} className="w-100 hover-scale-1-1" alt="" />
                        <div className="abs abs-centered fs-24 text-white hover-op-0">
                          <i className="fa-brands fa-instagram" />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Anchor used by services menu fallback when service catalog is empty */}
        <span className="visually-hidden d-none" aria-hidden="true">
          {fallbackServiceSlug}
        </span>
      </section>
    </>
  );
}
