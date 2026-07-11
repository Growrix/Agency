export type Service = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  heroImage: string;
  includes: string[];
  benefits: string[];
  idealFor: string[];
};

export type ProductCategory =
  | "car_wash"
  | "accessories"
  | "wax_polish"
  | "ceramic_protection"
  | "wheel_cleaners"
  | "interior_cleaners";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  regularPrice?: number;
  description: string;
  image: string;
  images: string[];
  badge?: string;
};

export type Vehicle = {
  slug: string;
  title: string;
  type: string;
  price: string;
  image: string;
  metrics: string[];
  description: string;
  specsLeft: string[];
  specsRight: string[];
  featured?: boolean;
};

export type BlogPost = {
  slug: string;
  title: string;
  intro: string;
  image: string;
  date: string;
  category: string;
  body: string[];
};

export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

export type Location = {
  name: string;
  image: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
};

export const siteConfig = {
  name: "Velocare Auto Studio",
  shortName: "Velocare",
  description: "Premium detailing, paint protection, curated car listings, and detailing products in a production-ready Next.js template.",
  phone: "+1 (213) 555-0198",
  phoneHref: "tel:+12135550198",
  email: "hello@velocareauto.com",
  emailHref: "mailto:hello@velocareauto.com",
  address: "742 Mateo Street, Los Angeles, CA 90021",
  canonicalUrl: "https://velocareauto.com",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/velocareauto", icon: "fa-brands fa-facebook-f" },
    { label: "X", href: "https://x.com/velocareauto", icon: "fa-brands fa-x-twitter" },
    { label: "WhatsApp", href: "https://wa.me/12135550198", icon: "fa-brands fa-whatsapp" },
    { label: "Instagram", href: "https://www.instagram.com/velocare_auto", icon: "fa-brands fa-instagram" },
    { label: "YouTube", href: "https://www.youtube.com/@velocareauto", icon: "fa-brands fa-youtube" },
  ],
} as const;

export const services: Service[] = [
  {
    slug: "exterior-hand-wash-wax",
    subtitle: "Exterior Hand Wash and Wax",
    title: "Protective shine for daily drivers",
    description: "Our exterior hand wash and wax package removes grime safely, restores paint clarity, and seals your finish with durable wax protection.",
    image: "/images/services/1.webp",
    heroImage: "/images/misc/s1.webp",
    includes: ["Two-bucket hand wash and wheel cleaning", "Paint-safe drying and trim wipe-down", "Premium wax sealant application", "Tire dressing and glass touch-up", "Final quality inspection"],
    benefits: ["Restores gloss and depth", "Protects against dust and UV", "Helps reduce water spotting", "Extends paint life between details", "Improves resale presentation"],
    idealFor: ["Daily commuters", "Weekend family vehicles", "Fleet refresh cycles", "Cars parked outdoors", "Owners preparing for sale"],
  },
  {
    slug: "interior-deep-cleaning",
    subtitle: "Interior Deep Cleaning",
    title: "Cabin reset for comfort and hygiene",
    description: "We deep-clean seats, carpets, dash, vents, and touch points to remove dust, stains, and odors while restoring a fresh interior finish.",
    image: "/images/services/2.webp",
    heroImage: "/images/misc/c1.webp",
    includes: ["Vacuuming and compressed-air dust removal", "Fabric and carpet stain treatment", "Dashboard, console, and vent detailing", "Door panel and trim conditioning", "Interior glass polishing"],
    benefits: ["Healthier cabin environment", "Removes stubborn odors", "Improves seat and trim lifespan", "Enhances daily driving comfort", "Restores like-new interior feel"],
    idealFor: ["Family vehicles", "Rideshare vehicles", "Pet owners", "Smoker vehicle recovery", "Seasonal interior reset"],
  },
  {
    slug: "paint-correction",
    subtitle: "Paint Correction",
    title: "Remove swirls and restore clarity",
    description: "Our multi-stage machine polishing process targets swirl marks, haze, and light scratches to recover gloss and visual depth.",
    image: "/images/services/3.webp",
    heroImage: "/images/misc/p1.webp",
    includes: ["Paint inspection and thickness checks", "Cut and polish stage matching", "Panel-by-panel correction workflow", "Refinement for optical clarity", "Protection-ready final finish"],
    benefits: ["Improves paint clarity", "Reduces swirl visibility", "Boosts shine and depth", "Prepares surface for ceramic coating", "Raises resale appeal"],
    idealFor: ["Dark paint colors", "Cars with wash-induced swirls", "Show preparation", "Pre-sale detailing", "Owners chasing mirror finish"],
  },
  {
    slug: "ceramic-coating-protection",
    subtitle: "Ceramic Coating Protection",
    title: "Long-term gloss and hydrophobic defense",
    description: "Ceramic coating bonds to painted surfaces to resist contamination, improve water behavior, and deliver durable high-gloss protection.",
    image: "/images/services/4.webp",
    heroImage: "/images/misc/p2.webp",
    includes: ["Exterior wash and decontamination", "Paint prep and light correction", "Professional ceramic application", "Curing and finish inspection", "Aftercare guidance"],
    benefits: ["Hydrophobic water behavior", "UV and oxidation resistance", "Lower maintenance effort", "Longer-lasting gloss finish", "Better contamination resistance"],
    idealFor: ["New vehicle protection", "Performance and luxury vehicles", "High-mileage commuters", "Outdoor parked vehicles", "Owners minimizing maintenance time"],
  },
  {
    slug: "engine-bay-detailing",
    subtitle: "Engine Bay Detailing",
    title: "Clean, protected, and inspection-ready engine bay",
    description: "We safely clean and dress engine-bay surfaces to remove grease buildup, improve inspection visibility, and elevate overall presentation.",
    image: "/images/services/5.webp",
    heroImage: "/images/misc/p3.webp",
    includes: ["Sensitive-area masking", "Degreasing and agitation", "Low-moisture rinse method", "Plastic and rubber dressing", "Final safety check"],
    benefits: ["Cleaner maintenance environment", "Improved leak visibility", "Professional under-hood finish", "Reduced grime accumulation", "Stronger resale impression"],
    idealFor: ["Pre-sale preparation", "Collector cars", "Fleet inspections", "Monthly maintenance plans", "Engine bay restoration"],
  },
  {
    slug: "headlight-restoration",
    subtitle: "Headlight Restoration",
    title: "Recover lens clarity and nighttime confidence",
    description: "Our restoration process removes oxidation and haze from headlight lenses, restoring brightness and improving road visibility.",
    image: "/images/services/6.webp",
    heroImage: "/images/misc/p4.webp",
    includes: ["Lens inspection and masking", "Oxidation removal process", "Progressive polishing stages", "UV-resistant sealant", "Output and clarity check"],
    benefits: ["Brighter light output", "Improved driving safety", "Better front-end appearance", "Prevents rapid re-fading", "Cost-effective refresh"],
    idealFor: ["Aged polycarbonate lenses", "Vehicles in sunny climates", "Safety inspection prep", "Pre-sale detailing", "Night commuters"],
  },
];

export const products: Product[] = [
  { slug: "nanoskin-nano-suds-wash-shine-shampoo", name: "Nanoskin NANO SUDS Wash & Shine Shampoo", category: "car_wash", price: 32.99, description: "High-foam wash shampoo built for safe maintenance washes and glossy rinse-off behavior.", image: "/images/shop/products/soap-3a.webp", images: ["/images/shop/products/soap-3a.webp", "/images/shop/products/soap-3b.webp"], badge: "Sale" },
  { slug: "meguiars-gold-class-car-wash-shampoo", name: "Meguiar's Gold Class Car Wash Shampoo", category: "car_wash", price: 11.99, description: "Conditioning shampoo for weekly maintenance washes with rich suds and paint-safe lubrication.", image: "/images/shop/products/soap-1a.webp", images: ["/images/shop/products/soap-1a.webp", "/images/shop/products/soap-1b.webp"], badge: "Sale" },
  { slug: "premium-microfiber-cleaning-towel", name: "Premium Microfiber Cleaning Towel", category: "accessories", price: 7.49, regularPrice: 10.49, description: "Ultra-soft, high-absorbency microfiber towel designed for streak-free and scratch-safe detailing across paint, glass, and trim.", image: "/images/shop/products/towel-1a.webp", images: ["/images/shop/products/towel-1a.webp", "/images/shop/products/towel-1b.webp", "/images/shop/products/towel-1c.webp", "/images/shop/products/towel-1d.webp", "/images/shop/products/towel-1e.webp"], badge: "Sale" },
  { slug: "turtle-wax-original-hard-shell-shine-car-wax", name: "Turtle Wax Original Hard Shell Shine Car Wax", category: "wax_polish", price: 7.49, description: "Classic paste wax for gloss, water behavior, and simple seasonal paint protection.", image: "/images/shop/products/wax-1a.webp", images: ["/images/shop/products/wax-1a.webp"], badge: "Sale" },
  { slug: "3d-pink-car-soap-ph-balanced-formula", name: "3D Pink Car Soap - pH Balanced Formula", category: "car_wash", price: 29.95, description: "pH-balanced soap that preserves wax and coating layers during frequent washes.", image: "/images/shop/products/soap-2a.webp", images: ["/images/shop/products/soap-2a.webp"], badge: "Sale" },
  { slug: "formula-1-bug-tar-remover-16oz", name: "Formula 1 Bug & Tar Remover - 16oz", category: "wax_polish", price: 6.99, description: "Targeted cleaner for road tar, bugs, and stubborn exterior contamination before a detail.", image: "/images/shop/products/wax-2a.webp", images: ["/images/shop/products/wax-2a.webp"], badge: "Sale" },
  { slug: "kenolon-ceramic-shield-v1-box-sio2-coating-kit", name: "Kenolon Ceramic Shield V1 Box - SiO2 Coating Kit", category: "ceramic_protection", price: 59.95, description: "Ceramic coating kit designed for durable gloss, slickness, and hydrophobic surface behavior.", image: "/images/shop/products/coating-1a.webp", images: ["/images/shop/products/coating-1a.webp"], badge: "Sale" },
  { slug: "meguiars-da-microfiber-correction-finishing-kit", name: "Meguiar's DA Microfiber Correction & Finishing Kit", category: "ceramic_protection", price: 129, description: "Correction and finishing kit for dual-action machine polishing workflows.", image: "/images/shop/products/coating-1b.webp", images: ["/images/shop/products/coating-1b.webp"], badge: "Sale" },
  { slug: "sonax-xtreme-polish-wax-3", name: "SONAX XTREME Polish + Wax 3", category: "wax_polish", price: 18.95, description: "Polish and wax blend for paint cleanup, gloss recovery, and short-term protection.", image: "/images/shop/products/wax-3a.webp", images: ["/images/shop/products/wax-3a.webp"], badge: "Sale" },
  { slug: "black-magic-all-wheel-foaming-cleaner", name: "Black Magic All Wheel Foaming Cleaner", category: "wheel_cleaners", price: 6.49, description: "Foaming wheel cleaner for brake dust, road grime, and tire-sidewall cleanup.", image: "/images/shop/products/tire-1a.webp", images: ["/images/shop/products/tire-1a.webp"], badge: "Sale" },
  { slug: "formula-1-detail-express-multi-purpose-interior-cleaner", name: "Formula 1 Detail Express Multi-Purpose Interior Cleaner", category: "interior_cleaners", price: 24.99, description: "Interior cleaner for dash, trim, consoles, and regular cabin refresh work.", image: "/images/shop/products/interior-1a.webp", images: ["/images/shop/products/interior-1a.webp"], badge: "Sale" },
  { slug: "premium-foam-applicator-pad", name: "Premium Foam Applicator Pad", category: "accessories", price: 2.99, description: "Reusable applicator pad for wax, dressing, and interior product application.", image: "/images/shop/products/brush-1a.webp", images: ["/images/shop/products/brush-1a.webp"], badge: "Sale" },
];

export const vehicles: Vehicle[] = [
  { slug: "bmw-x5", title: "BMW X5", type: "SUV", price: "$42,000", image: "/images/cars/1.webp", metrics: ["18000 Mi", "3.0L", "Gasoline", "Automatic", "5 Seats", "2024"], description: "The BMW X5 balances responsive performance, refined comfort, and premium build quality for everyday luxury and confident long-distance driving.", specsLeft: ["3.0L Turbo Inline-6 engine", "8-speed automatic transmission", "All-wheel drive", "Adaptive LED headlights", "Premium alloy wheels"], specsRight: ["Digital driver display", "Leather interior", "Panoramic sunroof", "Driver assistance package", "Dual-zone climate control"], featured: true },
  { slug: "audi-a4", title: "Audi A4", type: "Sedan", price: "$38,500", image: "/images/cars/2.webp", metrics: ["12000 Mi", "2.0L Turbo", "Gasoline", "Automatic", "5 Seats", "2023"], description: "The Audi A4 delivers balanced dynamics, clean cabin design, and excellent technology integration for drivers who want practical luxury.", specsLeft: ["2.0L turbocharged engine", "7-speed dual-clutch gearbox", "Quattro all-wheel drive", "LED matrix lighting", "Sport suspension"], specsRight: ["Virtual cockpit display", "Comfort leather seats", "Wireless smartphone integration", "Parking assist sensors", "Multi-zone climate control"], featured: true },
  { slug: "mercedes-c300", title: "Mercedes C300", type: "Sedan", price: "$55,000", image: "/images/cars/3.webp", metrics: ["9000 Mi", "2.0L", "Gasoline", "Automatic", "5 Seats", "2024"], description: "The Mercedes C300 combines executive-class refinement with sharp handling and modern infotainment in a compact luxury package.", specsLeft: ["2.0L turbo engine", "9-speed automatic transmission", "Rear or all-wheel drive", "Adaptive braking assist", "Advanced LED package"], specsRight: ["Premium ambient lighting", "High-resolution cockpit display", "Heated seating", "360 camera support", "Smart voice assistant"] },
  { slug: "tesla-model-3", title: "Tesla Model 3", type: "Electric", price: "$60,000", image: "/images/cars/4.webp", metrics: ["5000 Mi", "Dual Motor", "Electric", "Automatic", "5 Seats", "2024"], description: "The Tesla Model 3 offers quick acceleration, minimalist interior design, and electric efficiency for drivers focused on modern mobility.", specsLeft: ["Dual-motor electric drivetrain", "Long-range battery pack", "Fast-charging compatibility", "Regenerative braking", "Low center-of-gravity handling"], specsRight: ["Large central display", "Advanced autopilot support", "OTA software updates", "Panoramic glass roof", "Premium sound package"] },
  { slug: "toyota-fortuner", title: "Toyota Fortuner", type: "SUV", price: "$47,000", image: "/images/cars/5.webp", metrics: ["22000 Mi", "2.8L", "Diesel", "Automatic", "7 Seats", "2023"], description: "Toyota Fortuner is a practical body-on-frame SUV with dependable diesel performance, strong road presence, and family-ready flexibility.", specsLeft: ["2.8L diesel powertrain", "Automatic transmission", "High ground clearance", "Off-road drive modes", "Tow-capable chassis"], specsRight: ["Three-row seating", "Rear camera support", "Durable interior trim", "Navigation and connectivity", "Multi-terrain readiness"] },
  { slug: "honda-civic", title: "Honda Civic", type: "Sedan", price: "$35,000", image: "/images/cars/6.webp", metrics: ["15000 Mi", "1.8L", "Gasoline", "Manual", "5 Seats", "2023"], description: "Honda Civic remains a benchmark for reliability, fuel efficiency, and engaging daily performance in the compact segment.", specsLeft: ["1.8L efficient engine", "Manual or automatic options", "Balanced chassis setup", "Economical running costs", "Everyday comfort tuning"], specsRight: ["Modern infotainment stack", "Safety assist suite", "Comfort cloth seating", "Spacious cabin layout", "Low-maintenance ownership"] },
  { slug: "ford-mustang", title: "Ford Mustang", type: "Coupe", price: "$72,000", image: "/images/cars/7.webp", metrics: ["8000 Mi", "5.0L V8", "Gasoline", "Automatic", "4 Seats", "2024"], description: "Ford Mustang delivers iconic performance character with strong V8 output, aggressive styling, and modern driving assistance.", specsLeft: ["5.0L V8 performance engine", "Performance-tuned suspension", "Rear-wheel drive dynamics", "Track-ready braking package", "Selectable drive modes"], specsRight: ["Digital performance cluster", "Sport seating profile", "Launch-oriented calibration", "Performance telemetry", "Premium cockpit finish"] },
  { slug: "jeep-wrangler", title: "Jeep Wrangler", type: "SUV", price: "$58,000", image: "/images/cars/8.webp", metrics: ["13000 Mi", "3.6L", "Gasoline", "Automatic", "5 Seats", "2023"], description: "Jeep Wrangler combines rugged capability with open-air flexibility, making it ideal for drivers who split time between city roads and weekend trails.", specsLeft: ["3.6L V6 powertrain", "4x4 capability", "Off-road traction systems", "Removable roof panels", "High approach angles"], specsRight: ["Washable interior options", "Trail-ready instrument panel", "Navigation and mapping", "Durable cargo layout", "Adventure accessory support"] },
  { slug: "rolls-royce-phantom", title: "Rolls-Royce Phantom", type: "Luxury Sedan", price: "$390,000", image: "/images/cars/9.webp", metrics: ["4000 Mi", "6.75L V12", "Gasoline", "Automatic", "5 Seats", "2024"], description: "Rolls-Royce Phantom represents ultra-luxury motoring with exceptional craftsmanship, silent ride quality, and bespoke interior finishing.", specsLeft: ["6.75L V12 engine", "Ultra-refined ride control", "Bespoke body finish", "Premium luxury chassis", "Rear executive comfort"], specsRight: ["Hand-finished interior", "Signature starlight roof", "Rear privacy package", "Flagship infotainment", "Concierge-level options"] },
];

export const blogPosts: BlogPost[] = [
  { slug: "ceramic-coating-benefits-what-every-car-owner-should-know", title: "Ceramic Coating Benefits: What Every Car Owner Should Know", intro: "Ceramic coating creates a durable protective layer that improves gloss, reduces contamination buildup, and lowers long-term maintenance effort.", image: "/images/blog/1.webp", date: "May 18, 2026", category: "Protection", body: ["Ceramic coating is not magic, but it is a durable surface technology that makes maintenance easier when the paint has been prepared correctly.", "A proper coating workflow starts with decontamination, correction, panel wipe, application, leveling, and curing. Skipping preparation is the fastest way to lose durability.", "For daily drivers, ceramic protection is most valuable when combined with safe wash habits and periodic inspections."] },
  { slug: "5-detailing-mistakes-that-could-damage-your-cars-appearance", title: "5 Detailing Mistakes That Could Damage Your Car Appearance", intro: "Small detailing mistakes can dull paint and interior surfaces. This guide highlights common errors and how to avoid them.", image: "/images/blog/2.webp", date: "May 14, 2026", category: "Education", body: ["The most common detailing damage comes from dirty wash media, aggressive towels, harsh cleaners, and skipped rinse steps.", "Always separate wheels from paint, work panel by panel, and use clean drying towels with adequate lubrication.", "When in doubt, test chemicals on a small area and avoid high-friction scrubbing on delicate surfaces."] },
  { slug: "how-to-protect-car-paint-against-sun-dirt-rain-and-dust", title: "How to Protect Car Paint Against Sun, Dirt, Rain and Dust", intro: "Paint protection starts with consistent washing, safe drying, and the right surface protection products for your climate.", image: "/images/blog/3.webp", date: "May 11, 2026", category: "Paint Care", body: ["UV, mineral deposits, and abrasive dust all shorten paint life when they sit on the surface for too long.", "A protection plan should include routine washing, decontamination as needed, and a wax, sealant, or ceramic layer suited to the vehicle.", "Covered parking and quick removal of bird droppings or tree sap make a measurable difference."] },
  { slug: "engine-bay-detailing-improve-performance-and-impress-buyers", title: "Engine Bay Detailing: Improve Presentation and Buyer Confidence", intro: "A clean engine bay improves inspection visibility and gives potential buyers confidence that the car has been maintained properly.", image: "/images/blog/4.webp", date: "May 8, 2026", category: "Detailing", body: ["Engine bay detailing is mostly about controlled cleaning, not flooding components with water.", "Protect sensitive electronics, use gentle agitation, rinse carefully, and finish plastics with a non-greasy dressing.", "The result helps mechanics inspect leaks and makes a vehicle feel cared for during resale conversations."] },
  { slug: "car-detailing-through-the-years-how-techniques-have-evolved", title: "Car Detailing Through the Years: How Techniques Have Evolved", intro: "Modern detailing combines advanced chemistry, better tools, and process discipline to deliver repeatable premium results.", image: "/images/blog/5.webp", date: "May 4, 2026", category: "Studio", body: ["Detailing has moved from one-step cleaning to specialized workflows for paint, trim, interiors, glass, wheels, and coatings.", "New tools reduce risk while delivering better consistency across vehicle types and finishes.", "The best studios combine technology with inspection discipline and clear customer communication."] },
  { slug: "interior-detailing-tips-to-refresh-seats-dash-and-more-fast", title: "Interior Detailing Tips to Refresh Seats, Dash, and More Fast", intro: "Fast interior wins come from dust-first workflows, safe cleaners, and trim protection that keeps surfaces looking fresh.", image: "/images/blog/6.webp", date: "May 1, 2026", category: "Interior", body: ["Start interiors dry: vacuum, brush, and blow out dust before introducing liquid cleaners.", "Match cleaners to materials and avoid oversaturating electronics, stitching, and porous surfaces.", "Finish with glass, touch points, and a low-sheen protectant for a clean factory-style look."] },
];

export const team: TeamMember[] = [
  { name: "Marcus Lee", role: "Lead Detail Specialist", image: "/images/team/1.webp" },
  { name: "Priya Shah", role: "Paint Correction Lead", image: "/images/team/2.webp" },
  { name: "Noah Carter", role: "Ceramic Coating Technician", image: "/images/team/3.webp" },
  { name: "Elena Ruiz", role: "Client Experience Manager", image: "/images/team/4.webp" },
];

export const testimonials = [
  { quote: "The finish on my black SUV finally looks deep again. The team explained every step and the result was better than expected.", name: "Jordan M.", role: "BMW X5 Owner", image: "/images/testimonial/1.webp" },
  { quote: "Velocare handles our small fleet monthly. The scheduling is smooth and every vehicle returns consistent.", name: "Ari L.", role: "Fleet Coordinator", image: "/images/testimonial/2.webp" },
  { quote: "I came in for a ceramic coating and left with a full aftercare plan. The car is much easier to wash now.", name: "Maya T.", role: "Tesla Model 3 Owner", image: "/images/testimonial/3.webp" },
];

export const locations: Location[] = [
  { name: "Velocare HQ", image: "/images/locations/s1.webp", address: "742 Mateo Street, Los Angeles, CA 90021", phone: "+1 (213) 555-0198", email: "hello@velocareauto.com", hours: "Mon-Sat, 8:00 AM - 6:00 PM" },
  { name: "Velocare East", image: "/images/locations/s2.webp", address: "1180 Mission Road, Los Angeles, CA 90033", phone: "+1 (213) 555-0174", email: "east@velocareauto.com", hours: "Mon-Fri, 9:00 AM - 5:30 PM" },
  { name: "Velocare North", image: "/images/locations/s3.webp", address: "2111 Riverside Drive, Los Angeles, CA 90039", phone: "+1 (213) 555-0136", email: "north@velocareauto.com", hours: "Tue-Sat, 8:30 AM - 5:30 PM" },
];

export const faqs = [
  { question: "How long does a full detail take?", answer: "Most full details take four to eight hours depending on size, condition, and protection package." },
  { question: "Do you offer fleet detailing?", answer: "Yes. Fleet requests are handled through the quote form so scheduling, volume, and vehicle types are documented before confirmation." },
  { question: "Is ceramic coating included with paint correction?", answer: "No. Paint correction prepares the surface. Ceramic coating is a separate protection step selected during booking." },
  { question: "Can I buy products without booking a service?", answer: "Yes. The shop is available as a frontend commerce module. Checkout delivery requires a configured payment/order integration before production transactions can be accepted." },
];

export const galleryItems = Array.from({ length: 8 }, (_, index) => ({
  src: `/images/gallery-square/${index + 1}.webp`,
  alt: `Velocare detailing gallery ${index + 1}`,
  category: index % 3 === 0 ? "Exterior" : index % 3 === 1 ? "Interior" : "Facilities",
}));

export const categoryLabels: Record<ProductCategory, string> = {
  car_wash: "Car Wash",
  accessories: "Accessories",
  wax_polish: "Wax & Polish",
  ceramic_protection: "Ceramic Protection",
  wheel_cleaners: "Wheel Cleaners",
  interior_cleaners: "Interior Cleaners",
};
