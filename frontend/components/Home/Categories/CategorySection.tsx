import { categories } from "@/data/home/categories";
import CategoryCard from "./CategoryCard";
import Link from "next/link";
import { ArrowRight, Grid } from "lucide-react";

export default function CategorySection() {
  return (
    <section id="categories" className="py-12 sm:py-16 bg-slate-50/50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600">
              <Grid className="h-3.5 w-3.5" />
              <span>Browse Marketplace</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
              Shop by Category
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-500">
              Find everything you need in one place.
            </p>
          </div>

          <Link
            href="#featured"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <span>View All Departments</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
