export type SitePage = {
  title: string;
  slug: string;
  canonicalPath: string;
  htmlPath: string;
  fileName: string;
  screenshot: string;
};

const rawPages = [
  {
    title: "Homepage 1",
    htmlPath: "/index.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-index-html-2026-05-16-02_20_13.png",
  },
  {
    title: "Homepage 2",
    htmlPath: "/homepage-2.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-homepage-2-html-2026-05-16-02_21_34.png",
  },
  {
    title: "Homepage 3",
    htmlPath: "/homepage-3.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-homepage-3-html-2026-05-16-02_22_19.png",
  },
  {
    title: "Homepage 4",
    htmlPath: "/homepage-4.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-homepage-4-html-2026-05-16-02_22_50.png",
  },
  {
    title: "Homepage 5",
    htmlPath: "/homepage-5.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-homepage-5-html-2026-05-16-02_23_23.png",
  },
  {
    title: "Homepage 6",
    htmlPath: "/homepage-6.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-homepage-6-html-2026-05-16-02_23_57.png",
  },
  {
    title: "Homepage 7",
    htmlPath: "/homepage-7.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-homepage-7-html-2026-05-16-02_24_24.png",
  },
  {
    title: "Homepage 8",
    htmlPath: "/homepage-8.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-homepage-8-html-2026-05-16-02_25_27.png",
  },
  {
    title: "Services",
    htmlPath: "/services.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-services-html-2026-05-16-02_26_08.png",
  },
  {
    title: "Services 2",
    htmlPath: "/services-2.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-services-2-html-2026-05-16-02_26_31.png",
  },
  {
    title: "Services 3",
    htmlPath: "/services-3.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-services-3-html-2026-05-16-02_26_55.png",
  },
  {
    title: "Service Single",
    htmlPath: "/service-single.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-service-single-html-2026-05-16-02_27_18.png",
  },
  {
    title: "FAQ",
    htmlPath: "/faq.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-faq-html-2026-05-16-02_27_56.png",
  },
  {
    title: "About",
    htmlPath: "/about.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-about-html-2026-05-16-02_28_21.png",
  },
  {
    title: "Gallery Filter",
    htmlPath: "/gallery.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-gallery-html-2026-05-16-02_28_48.png",
  },
  {
    title: "Gallery Carousel",
    htmlPath: "/gallery-carousel.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-gallery-carousel-html-2026-05-16-02_33_06.png",
  },
  {
    title: "Gallery Slider",
    htmlPath: "/gallery-slider.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-gallery-html-2026-05-16-02_32_37.png",
  },
  {
    title: "Blog",
    htmlPath: "/blog.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-blog-html-2026-05-16-02_29_12.png",
  },
  {
    title: "Blog Single",
    htmlPath: "/blog-single.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-blog-html-2026-05-16-02_29_12.png",
  },
  {
    title: "Team",
    htmlPath: "/team.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-team-html-2026-05-16-02_29_35.png",
  },
  {
    title: "Careers",
    htmlPath: "/careers.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-careers-html-2026-05-16-02_30_15.png",
  },
  {
    title: "Testimonials",
    htmlPath: "/testimonials.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-testimonials-html-2026-05-16-02_30_47.png",
  },
  {
    title: "Shop",
    htmlPath: "/shop.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-shop-html-2026-05-16-02_31_09.png",
  },
  {
    title: "Shop Product Single",
    htmlPath: "/shop-product-single.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-shop-html-2026-05-16-02_31_09.png",
  },
  {
    title: "Car Listing",
    htmlPath: "/car-listing.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-car-listing-html-2026-05-16-02_31_34.png",
  },
  {
    title: "Car List",
    htmlPath: "/car-list.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-car-listing-html-2026-05-16-02_31_34.png",
  },
  {
    title: "Car Single",
    htmlPath: "/car-single.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-car-single-html-2026-05-16-02_32_09.png",
  },
  {
    title: "Locations",
    htmlPath: "/locations.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-locations-html-2026-05-16-02_33_57.png",
  },
  {
    title: "Contact",
    htmlPath: "/contact.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-contact-html-2026-05-16-02_34_18.png",
  },
  {
    title: "Appointment",
    htmlPath: "/appointment.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-contact-html-2026-05-16-02_34_18.png",
  },
  {
    title: "Terms and Conditions",
    htmlPath: "/terms.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-contact-html-2026-05-16-02_34_18.png",
  },
  {
    title: "Privacy Policy",
    htmlPath: "/privacy.html",
    screenshot: "screencapture-madebydesignesia-themes-autodetail-contact-html-2026-05-16-02_34_18.png",
  },
];

const htmlToSlug = (htmlPath: string) => htmlPath.replace(/^\//, "").replace(/\.html$/, "");

const slugToCanonicalPath = (slug: string) => {
  if (slug === "index") {
    return "/";
  }
  return `/${slug}`;
};

export const sitePages: SitePage[] = rawPages.map((page) => {
  const slug = htmlToSlug(page.htmlPath);
  return {
    title: page.title,
    slug,
    canonicalPath: slugToCanonicalPath(slug),
    htmlPath: page.htmlPath,
    fileName: `${slug}.html`,
    screenshot: page.screenshot,
  };
});

export const sitePageBySlug = new Map(sitePages.map((page) => [page.slug, page]));

export const sitePageByCanonicalPath = new Map(
  sitePages.map((page) => [page.canonicalPath, page]),
);
