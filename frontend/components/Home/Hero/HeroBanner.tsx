import Image from "next/image";
import Link from "next/link";
import { Star, Flame, ArrowUpRight, CheckCircle } from "lucide-react";

export default function HeroBanner() {
  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Background ambient decorative glow */}
      <div className="absolute -top-10 -right-10 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />

      {/* Main Collage Grid Card */}
      <div className="relative rounded-3xl border border-slate-200/80 bg-white/80 p-4 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Main Showcase Item (Electronics/Gadgets) */}
          <div className="group relative col-span-2 sm:col-span-1 h-56 sm:h-64 overflow-hidden rounded-2xl bg-slate-100 shadow-xs">
            <Image
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
              alt="Premium Electronics at AnyBuy"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 350px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-4 flex flex-col justify-end">
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-extrabold text-white uppercase tracking-wider">
                Tech Deals
              </span>
              <p className="mt-1 text-sm sm:text-base font-bold text-white leading-snug">
                Audio & Smart Gear
              </p>
              <p className="text-xs text-orange-200">Up to 45% OFF</p>
            </div>
          </div>

          {/* Secondary Showcase (Fashion & Style) */}
          <div className="group relative col-span-2 sm:col-span-1 h-56 sm:h-64 overflow-hidden rounded-2xl bg-slate-100 shadow-xs">
            <Image
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80"
              alt="Fashion and Style at AnyBuy"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 350px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-4 flex flex-col justify-end">
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[10px] font-extrabold text-white uppercase tracking-wider backdrop-blur-xs">
                New Season
              </span>
              <p className="mt-1 text-sm sm:text-base font-bold text-white leading-snug">
                Trending Apparel
              </p>
              <p className="text-xs text-slate-300">Over 20,000+ Styles</p>
            </div>
          </div>
        </div>

        {/* Floating Mini Category Badges */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="relative h-7 w-7 rounded-full ring-2 ring-white overflow-hidden bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Customer"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <div className="relative h-7 w-7 rounded-full ring-2 ring-white overflow-hidden bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Customer"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
              <div className="relative h-7 w-7 rounded-full ring-2 ring-white overflow-hidden bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                  alt="Customer"
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-slate-600">4.9/5 from 80k+ Reviews</span>
            </div>
          </div>

          <Link
            href="#categories"
            className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700"
          >
            <span>See 20+ Categories</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Floating Interactive Micro-Badge 1 */}
        <div className="absolute -top-4 -left-4 hidden sm:flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2 shadow-lg border border-slate-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <CheckCircle className="h-4 w-4" />
          </span>
          <div className="text-left">
            <p className="text-[11px] font-bold text-slate-900 leading-none">Verified Sellers</p>
            <p className="text-[10px] text-slate-500 leading-tight">100% Guaranteed</p>
          </div>
        </div>

        {/* Floating Interactive Micro-Badge 2 */}
        <div className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-2.5 rounded-2xl bg-slate-900 px-4 py-2.5 shadow-xl text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500 text-white">
            <Flame className="h-4 w-4 fill-current" />
          </span>
          <div className="text-left">
            <p className="text-[11px] font-bold text-white leading-none">Daily Flash Drops</p>
            <p className="text-[10px] text-orange-300 leading-tight">Save up to 70% Today</p>
          </div>
        </div>
      </div>
    </div>
  );
}
