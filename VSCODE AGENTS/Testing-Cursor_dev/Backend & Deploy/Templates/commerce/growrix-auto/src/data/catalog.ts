import {
  formatPriceByPreference,
  normalizeCurrency,
  normalizeLanguage,
  type CurrencyCode,
  type LanguageCode,
} from "@/lib/localization";

export type Category = {
  slug: string;
  label: string;
  image: string;
  description: string;
};

export type Product = {
  slug: string;
  title: string;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  discountLabel?: string;
  badge?: string;
  image: string;
  rating: number;
  excerpt: string;
  sku: string;
  stock: number;
  tags: string[];
};

export type PromoTile = {
  label: string;
  title: string;
  cta: string;
  image: string;
  targetType: "shop" | "category" | "product";
  targetSlug?: string;
};

export type ProductListSection = {
  title: string;
  slugs: string[];
};

export type DealTab = {
  slug: string;
  label: string;
  categorySlug: string;
};

export const categories: Category[] = [
  {
    slug: "wheels-tires",
    label: "WHEELS & TIRES",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80",
    description: "Premium wheel and tire packages for city and off-road driving.",
  },
  {
    slug: "smart-devices",
    label: "SMART DEVICES",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=400&q=80",
    description: "Connected car devices, trackers, and digital accessories.",
  },
  {
    slug: "oils-fluids",
    label: "OILS & FLUIDS",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80",
    description: "Engine oils and essential fluids for long-term performance.",
  },
  {
    slug: "lights-lighting",
    label: "LIGHTS & LIGHTING",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=400&q=80",
    description: "Headlights, lamps, and interior lighting upgrades.",
  },
  {
    slug: "replacement-parts",
    label: "REPLACEMENT PARTS",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=400&q=80",
    description: "Reliable replacement parts for everyday maintenance.",
  },
  {
    slug: "tools-equipment",
    label: "TOOLS & EQUIPMENT",
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=400&q=80",
    description: "Garage-ready tools and workshop essentials.",
  },
];

export const products: Product[] = [
  {
    slug: "20x9-wheels-fit-gmc-chevy",
    title: "20X9 WHEELS FIT GMC CHEVY",
    categorySlug: "wheels-tires",
    price: 100,
    oldPrice: 120,
    discountLabel: "-17%",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    rating: 4,
    excerpt: "Performance-focused wheel setup with durable road grip and balanced ride comfort.",
    sku: "WHE-1001",
    stock: 18,
    tags: ["wheel", "gmc", "chevy", "performance"],
  },
  {
    slug: "22-5-hole-aluminum-wheel",
    title: "22.5 HOLE ALUMINUM WHEEL",
    categorySlug: "wheels-tires",
    price: 40,
    oldPrice: 65,
    discountLabel: "-38%",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80",
    rating: 5,
    excerpt: "Lightweight aluminum wheel set for better handling and cleaner braking response.",
    sku: "WHE-1002",
    stock: 36,
    tags: ["wheel", "aluminum", "rim"],
  },
  {
    slug: "bf-goodrich-all-terrain-ko",
    title: "BF GOODRICH ALL-TERRAIN KO",
    categorySlug: "wheels-tires",
    price: 60,
    oldPrice: 75,
    discountLabel: "-20%",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80",
    rating: 4,
    excerpt: "All-terrain tire compound designed for long mileage and strong wet-weather traction.",
    sku: "WHE-1003",
    stock: 27,
    tags: ["tire", "all-terrain", "off-road"],
  },
  {
    slug: "carlisle-hd-field-trax-atv-tire",
    title: "CARLISLE HD FIELD TRAX ATV TIRE",
    categorySlug: "wheels-tires",
    price: 190,
    oldPrice: 210,
    discountLabel: "-10%",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80",
    rating: 5,
    excerpt: "Heavy-duty ATV tire with reinforced sidewalls and stable load carrying capacity.",
    sku: "WHE-1004",
    stock: 9,
    tags: ["atv", "tire", "trail"],
  },
  {
    slug: "chevy-silverado-tahoe-gmc-kit",
    title: "CHEVY SILVERADO TAHOE GMC",
    categorySlug: "replacement-parts",
    price: 40,
    oldPrice: 55,
    discountLabel: "-27%",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80",
    rating: 4,
    excerpt: "Replacement fitment kit built for Silverado, Tahoe, and compatible GMC models.",
    sku: "REP-1001",
    stock: 22,
    tags: ["replacement", "gmc", "chevy"],
  },
  {
    slug: "compaloy-series-68-wheel",
    title: "COMPALOY SERIES 68 WHEEL",
    categorySlug: "wheels-tires",
    price: 100,
    oldPrice: 120,
    discountLabel: "NEW",
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?auto=format&fit=crop&w=900&q=80",
    rating: 5,
    excerpt: "Modern wheel profile with premium finish and improved load balance.",
    sku: "WHE-1005",
    stock: 14,
    tags: ["wheel", "new-arrival", "alloy"],
  },
  {
    slug: "hankook-dynapro-off-road",
    title: "HANKOOK DYNAPRO OFF-ROAD",
    categorySlug: "wheels-tires",
    price: 68,
    oldPrice: 72,
    discountLabel: "-6%",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    rating: 4,
    excerpt: "Off-road tread engineered for control across gravel, mud, and rough terrain.",
    sku: "WHE-1006",
    stock: 25,
    tags: ["tire", "off-road", "hankook"],
  },
  {
    slug: "hankook-dynapro-atm-rf10",
    title: "HANKOOK DYNAPRO ATM RF10",
    categorySlug: "wheels-tires",
    price: 30,
    oldPrice: 34,
    discountLabel: "-12%",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=80",
    rating: 4,
    excerpt: "Daily-use all-terrain pattern balancing highway comfort with trail confidence.",
    sku: "WHE-1007",
    stock: 40,
    tags: ["tire", "all-terrain", "daily-use"],
  },
  {
    slug: "car-precision-led-headlight",
    title: "CAR PRECISION LED HEADLIGHT",
    categorySlug: "lights-lighting",
    price: 86,
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=900&q=80",
    rating: 5,
    excerpt: "High-clarity LED beam setup for improved night visibility and lower power draw.",
    sku: "LIG-1001",
    stock: 29,
    tags: ["led", "headlight", "lighting"],
  },
  {
    slug: "car-easy-installation-forland",
    title: "CAR EASY INSTALLATION FORLAND",
    categorySlug: "replacement-parts",
    price: 125,
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80",
    rating: 4,
    excerpt: "Quick-install replacement part engineered for reduced labor time and dependable fit.",
    sku: "REP-1002",
    stock: 13,
    tags: ["replacement", "quick-install", "forland"],
  },
  {
    slug: "evolution-brake-kit-drilled",
    title: "EVOLUTION BRAKE KIT WITH DRILLED",
    categorySlug: "replacement-parts",
    price: 85,
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80",
    rating: 5,
    excerpt: "Drilled brake kit for cooler braking and responsive pedal feel on long drives.",
    sku: "REP-1003",
    stock: 11,
    tags: ["brake", "drilled", "kit"],
  },
  {
    slug: "discount-starter-and-alternator",
    title: "DISCOUNT STARTER AND ALTERNATOR",
    categorySlug: "replacement-parts",
    price: 98,
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80",
    rating: 4,
    excerpt: "Starter and alternator combo unit with tested charging consistency.",
    sku: "REP-1004",
    stock: 16,
    tags: ["starter", "alternator", "electrical"],
  },
  {
    slug: "ac-delco-385-professional",
    title: "AC DELCO 385 PROFESSIONAL",
    categorySlug: "tools-equipment",
    price: 83,
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80",
    rating: 4,
    excerpt: "Professional-grade component designed for extended workshop use.",
    sku: "TOO-1001",
    stock: 19,
    tags: ["tool", "professional", "ac-delco"],
  },
  {
    slug: "road-warrior-hub-pilot",
    title: "ROAD WARRIOR HUB PILOT",
    categorySlug: "tools-equipment",
    price: 1.9,
    image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?auto=format&fit=crop&w=900&q=80",
    rating: 4,
    excerpt: "Hub pilot accessory for steady wheel alignment under mixed load conditions.",
    sku: "TOO-1002",
    stock: 120,
    tags: ["hub", "alignment", "accessory"],
  },
];

export const promoTiles: PromoTile[] = [
  {
    label: "Special Offers",
    title: "MERCEDES BENZ AUTO PARTS",
    cta: "SHOP NOW",
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80",
    targetType: "category",
    targetSlug: "replacement-parts",
  },
  {
    label: "SPECIAL OFFERS AT THE LOWEST OF PRICES",
    title: "",
    cta: "SHOP NOW",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    targetType: "shop",
  },
  {
    label: "Sale up to 70% Off",
    title: "FERRARI BRAND AUTO PARTS",
    cta: "SHOP NOW",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
    targetType: "category",
    targetSlug: "wheels-tires",
  },
];

export const productListSections: ProductListSection[] = [
  {
    title: "NEW ARRIVALS",
    slugs: [
      "car-precision-led-headlight",
      "car-easy-installation-forland",
      "evolution-brake-kit-drilled",
      "discount-starter-and-alternator",
    ],
  },
  {
    title: "BEST SELLERS",
    slugs: [
      "ac-delco-385-professional",
      "road-warrior-hub-pilot",
      "car-easy-installation-forland",
      "hankook-dynapro-off-road",
    ],
  },
  {
    title: "SALE OFF",
    slugs: [
      "20x9-wheels-fit-gmc-chevy",
      "22-5-hole-aluminum-wheel",
      "bf-goodrich-all-terrain-ko",
      "carlisle-hd-field-trax-atv-tire",
    ],
  },
];

export const dealTabs: DealTab[] = [
  { slug: "baby-car-seats", label: "Baby Car Seats", categorySlug: "replacement-parts" },
  { slug: "car-motorbike-care", label: "Car & Motorbike Care", categorySlug: "oils-fluids" },
  { slug: "vehicle-electronics", label: "Car & Vehicle Electronics", categorySlug: "smart-devices" },
];

export const vehicleFilterOptions = {
  make: ["Toyota", "BMW", "Ford", "Mercedes", "Chevrolet"],
  model: ["Sedan", "SUV", "Truck", "Coupe", "Hatchback"],
  year: ["2024", "2023", "2022", "2021", "2020"],
};

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getProductsBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product));
}

export function productToCurrency(
  price: number,
  currency: CurrencyCode = "USD",
  language: LanguageCode = "en",
) {
  return formatPriceByPreference(
    price,
    normalizeCurrency(currency),
    normalizeLanguage(language),
  );
}
