import Header from "./Header/Header";
import HeroSection from "./Hero/HeroSection";
import CategorySection from "./Categories/CategorySection";
import ProductSection from "./Products/ProductSection";
import FlashSale from "./FlashSale/FlashSale";
import PromoBanner from "./Promo/PromoBanner";
import FeaturesSection from "./Features/FeaturesSection";
import PopularBrands from "./Brands/PopularBrands";
import Newsletter from "./Newsletter/Newsletter";
import Footer from "./Footer/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50/70 text-brand-navy selection:bg-brand-teal selection:text-white">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <CategorySection />
        <ProductSection />
        <FlashSale />
        <PromoBanner />
        <FeaturesSection />
        <PopularBrands />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
