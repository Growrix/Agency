import { categories, products } from "@/data/catalog";
import { blogPosts } from "@/data/blog";
import { supportLinks } from "@/data/support";

export const routeConfig = {
  home: "/",
  shop: "/shop",
  dailyDeals: "/daily-deals",
  about: "/about-us",
  contact: "/contact-us",
  cart: "/cart",
  checkout: "/checkout",
  checkoutSuccess: "/checkout/success",
  account: "/account",
  login: "/account/login",
  register: "/account/register",
  search: "/search",
  blog: "/blog",
};

export function productPath(slug: string) {
  return `/shop/product/${slug}`;
}

export function categoryPath(slug: string) {
  return `/shop/category/${slug}`;
}

export function blogPath(slug: string) {
  return `/blog/${slug}`;
}

export function supportPath(slug: string) {
  return `/${slug}`;
}

export const requiredRoutes = [
  routeConfig.home,
  routeConfig.dailyDeals,
  routeConfig.about,
  routeConfig.contact,
  routeConfig.shop,
  ...categories.map((category) => categoryPath(category.slug)),
  ...products.map((product) => productPath(product.slug)),
  routeConfig.cart,
  routeConfig.checkout,
  routeConfig.checkoutSuccess,
  routeConfig.account,
  routeConfig.login,
  routeConfig.register,
  routeConfig.search,
  routeConfig.blog,
  ...blogPosts.map((post) => blogPath(post.slug)),
  ...supportLinks.map((item) => supportPath(item.slug)),
];
