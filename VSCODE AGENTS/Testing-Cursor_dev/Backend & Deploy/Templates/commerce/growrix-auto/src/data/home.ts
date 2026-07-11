import { blogPosts } from "@/data/blog";
import {
  categories,
  dealTabs,
  productListSections,
  products,
  promoTiles,
  vehicleFilterOptions,
} from "@/data/catalog";

export const heroSlides = [
  {
    eyebrowKey: "home.welcome",
    titleTopKey: "home.heroTop",
    titleBottomKey: "home.heroBottom",
    descriptionKey: "home.heroDescription",
    ctaLabelKey: "home.exploreNow",
    ctaHref: "/shop",
    backgroundImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrowKey: "home.slide2Eyebrow",
    titleTopKey: "home.slide2Top",
    titleBottomKey: "home.slide2Bottom",
    descriptionKey: "home.slide2Description",
    ctaLabelKey: "home.slide2Cta",
    ctaHref: "/shop/category/replacement-parts",
    backgroundImage: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrowKey: "home.slide3Eyebrow",
    titleTopKey: "home.slide3Top",
    titleBottomKey: "home.slide3Bottom",
    descriptionKey: "home.slide3Description",
    ctaLabelKey: "home.slide3Cta",
    ctaHref: "/daily-deals",
    backgroundImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
  },
];

export const homeCategories = categories;

export const vehicleFilters = vehicleFilterOptions;

export const bestSellerTabs = [
  { label: "WHEELS & TIRES", categorySlug: "wheels-tires" },
  { label: "OILS & FLUIDS", categorySlug: "oils-fluids" },
  { label: "CAR LIGHTS", categorySlug: "lights-lighting" },
  { label: "SMART DEVICES", categorySlug: "smart-devices" },
  { label: "HEADLIGHTS", categorySlug: "lights-lighting" },
];

export const bestSellerProducts = products;

export const promoCards = promoTiles;

export const productLists = productListSections;

export const dailyDealTabs = dealTabs;

export const brandLogos = ["FATTRESE", "XLLE", "palco", "LOGO BRAND", "LETHROV", "LENTBEY"];

export { blogPosts };

export const featureStrip = [
  { title: "FREE SHIPPING", text: "On orders over $99.00" },
  { title: "MONEY GUARANTEE", text: "30 days money back guarantee" },
  { title: "SAFE SHOPPING", text: "Safe shopping guarantee" },
  { title: "ONLINE SUPPORT", text: "We support 24/7 on day" },
];
