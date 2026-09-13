import { flashSaleProducts } from "@/data/home/flashSaleProducts";
import FlashSaleCard from "./FlashSaleCard";
import CountdownTimer from "./CountdownTimer";
import { Flame, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FlashSale() {
  return (
    <section id="flash-sale" className="py-12 sm:py-16 bg-[#F8FAFA] border-b border-[#E5E9ED]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Flash Sale Header with Countdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-[#E5E9ED] gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange text-white shadow-xs">
              <Flame className="h-5 w-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                  Limited Time Deals
                </span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-orange" />
                <span className="text-xs font-semibold text-brand-text-muted">Up to 65% OFF</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-brand-navy">
                Flash Sale
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <CountdownTimer initialHours={4} initialMinutes={32} initialSeconds={18} />
            <Link
              href="#featured"
              className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:text-brand-orange-hover transition-colors"
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
