import { brandConfig } from "@/data/brand";

export const aboutPage = {
  title: "ABOUT US",
  breadcrumb: ["Home", "About Us"],
  heroImage: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80",
  intro: [
    `${brandConfig.siteName} is a clean automotive storefront concept focused on premium parts, trusted brands, and a fast shopping experience.`,
    "The layout combines a bold visual hierarchy with practical product discovery, so the template feels like a real e-commerce destination instead of a generic landing page.",
  ],
  team: [
    { name: "Michael Phelps", role: "Founder, CEO", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
    { name: "Vladimir Radskin", role: "Web Designer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80" },
    { name: "Tommy Hilfiger", role: "Developer", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80" },
    { name: "Anna Johanson", role: "Testing Website", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80" },
  ],
  mapImage: "https://images.unsplash.com/photo-1524666041070-9d87656c25bb?auto=format&fit=crop&w=1600&q=80",
};

export const contactPage = {
  title: "CONTACT US",
  breadcrumb: ["Home", "Contact Us"],
  intro: "We love to hear from you! Please let us know if you have any questions or concerns and we will get back to you within 2 business days. Thanks!",
  image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
  fields: ["Name", "Email", "Phone Number", "Leave A Comment"],
};

export const dealsPage = {
  title: "DAILY DEALS",
  breadcrumb: ["Home", "Daily Deals"],
  timers: ["4584 DAYS", "22 HOURS", "38 MINS", "59 SECS"],
};

export const blogPage = {
  title: "BLOG",
  breadcrumb: ["Home", "Blog"],
};

export const shopPage = {
  title: "SHOP",
  breadcrumb: ["Home", "Shop"],
  subtitle: "Discover premium automotive products with complete browsing and purchase flows.",
};

export const cartPage = {
  title: "MY CART",
  breadcrumb: ["Home", "My Cart"],
};

export const checkoutPage = {
  title: "CHECKOUT",
  breadcrumb: ["Home", "Checkout"],
};

export const accountPage = {
  title: "MY ACCOUNT",
  breadcrumb: ["Home", "Account"],
};

export const searchPage = {
  title: "SEARCH RESULTS",
  breadcrumb: ["Home", "Search"],
};
