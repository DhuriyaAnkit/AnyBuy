import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Tag, Sparkles } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950 text-white shadow-2xl">
          {/* Ambient Lighting Circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-20 h-72 w-72 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-6 sm:p-10 lg:p-14">
            {/* Left Column: Copy & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/30 px-3.5 py-1.5 text-xs font-bold text-orange-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Special Seasonal Promotion</span>
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Big Deals. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                  Bigger Savings.
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-300 max-w-lg leading-relaxed">
                Discover amazing products at prices you&apos;ll love. Save up to 50% on top electronics, home appliances, and designer fashion this week only.
              </p>

              {/* Coupon Code Pill */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-mono font-bold tracking-wider backdrop-blur-md border border-white/15">
                  <Tag className="h-3.5 w-3.5 text-orange-400" />
                  <span>USE CODE:</span>
                  <span className="text-orange-400 font-black">ANYBUY50</span>
                </div>
                <span className="text-xs text-slate-400">Valid on select brands</span>
              </div>

              {/* CTA Button */}
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="#featured"
                  className="group inline-flex items-center gap-2.5 rounded-xl bg-orange-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-200 hover:bg-orange-600 hover:shadow-orange-500/40 active:scale-95"
                >
                  <span>Shop Deals</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Product Showcase */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative h-64 sm:h-80 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80"
                  alt="Exclusive AnyBuy Deals"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/50 p-3 backdrop-blur-md border border-white/10">
                  <p className="text-xs font-bold text-white">Smart Gadgets & Wearables</p>
                  <p className="text-[11px] text-orange-300">Extra $25 cashback on checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
