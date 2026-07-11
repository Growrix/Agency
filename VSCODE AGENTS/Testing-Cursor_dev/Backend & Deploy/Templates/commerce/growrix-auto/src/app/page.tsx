import NewsletterModal from "@/components/layout/NewsletterModal";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import VehicleFinderSection from "@/components/home/VehicleFinderSection";
import BestSellersSection from "@/components/home/BestSellersSection";
import PromoStripSection from "@/components/home/PromoStripSection";
import ProductListsSection from "@/components/home/ProductListsSection";
import BrandStripSection from "@/components/home/BrandStripSection";
import BlogSection from "@/components/home/BlogSection";
import FeaturesStripSection from "@/components/home/FeaturesStripSection";

export default function Home() {
  return (
    <>
      <NewsletterModal />
      <HeroSection />
      <CategoriesSection />
      <VehicleFinderSection />
      <BestSellersSection />
      <PromoStripSection />
      <ProductListsSection />
      <BrandStripSection />
      <BlogSection />
      <FeaturesStripSection />
    </>
  );
}
