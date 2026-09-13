"use client";

import { useState } from "react";
import { featuredProducts } from "@/data/home/products";
import ProductGrid from "./ProductGrid";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const filterTabs = ["All", "Electronics", "Fashion", "Home & Living", "Beauty", "Sports"];

export default function ProductSection() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts =
    activeTab === "All"
      ? featuredProducts
      : featuredProducts.filter((p) => p.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="featured" className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Trending Marketplace Selection</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
              Featured Products
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-500">
              Handpicked products you&apos;ll love.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-150 ${
                  activeTab === tab
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid products={filteredProducts} />

        {/* Bottom Explore Link */}
        <div className="mt-10 text-center">
          <Link
            href="#categories"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-bold text-slate-800 transition-all hover:bg-slate-100 hover:border-slate-300"
          >
            <span>Load More Products</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
