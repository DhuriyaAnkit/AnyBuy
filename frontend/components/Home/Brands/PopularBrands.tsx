import { popularBrands } from "@/data/home/brands";
import BrandCard from "./BrandCard";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PopularBrands() {
  return (
    <section id="brands" className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-teal">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Official Partners</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-brand-navy">
              Popular Brands
            </h2>
            <p className="mt-1 text-sm sm:text-base text-brand-text-secondary">
              Shop authentic goods from the world&apos;s leading brands.
            </p>
          </div>

          <Link
            href="#featured"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-brand-teal-deep hover:text-brand-teal transition-colors"
          >
            <span>Explore All Brands</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Brands Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {popularBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
