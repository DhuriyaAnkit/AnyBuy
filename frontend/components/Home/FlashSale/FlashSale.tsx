import { flashSaleProducts } from "@/data/home/flashSaleProducts";
import FlashSaleCard from "./FlashSaleCard";
import CountdownTimer from "./CountdownTimer";
import { Flame, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FlashSale() {
  return (
    <section id="flash-sale" className="py-12 sm:py-16 bg-gradient-to-b from-red-50/40 via-orange-50/30 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Flash Sale Header with Countdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-orange-200/60 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20">
              <Flame className="h-6 w-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-red-600">
                  Limited Time Deals
                </span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
                <span className="text-xs font-semibold text-slate-500">Up to 65% OFF</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
                Flash Sale
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <CountdownTimer initialHours={4} initialMinutes={32} initialSeconds={18} />
            <Link
              href="#featured"
              className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              <span>View All Flash Deals</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {flashSaleProducts.map((product) => (
            <FlashSaleCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
