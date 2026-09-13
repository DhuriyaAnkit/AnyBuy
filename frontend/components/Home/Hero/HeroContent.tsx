import Link from "next/link";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="flex flex-col items-start justify-center text-left py-4 lg:py-8">
      {/* Eyebrow badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-50/80 px-3.5 py-1.5 text-xs font-bold text-orange-600 shadow-xs backdrop-blur-xs">
        <Sparkles className="h-3.5 w-3.5 text-orange-500 animate-spin" style={{ animationDuration: '3s' }} />
        <span>The All-In-One Modern Marketplace</span>
      </div>

      {/* Main Heading */}
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08]">
        Everything <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600">
          for Everyone.
        </span>
      </h1>

      {/* Supporting Text */}
      <p className="mt-4 max-w-xl text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
        Discover millions of products, all in one place. From cutting-edge tech and trending fashion to home essentials and daily groceries—experience seamless shopping with AnyBuy.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
        <Link
          href="#featured"
          className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:bg-orange-600 hover:shadow-orange-500/35 active:scale-98 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Shop Now</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href="#categories"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-98 focus:outline-none"
        >
          <span>Explore Categories</span>
        </Link>
      </div>

      {/* Trust Metrics */}
      <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 border-t border-slate-200/80 pt-6 w-full max-w-lg">
        <div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">5M+</p>
          <p className="text-xs font-medium text-slate-500">Products Listed</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">99.8%</p>
          <p className="text-xs font-medium text-slate-500">Happy Buyers</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">24h</p>
          <p className="text-xs font-medium text-slate-500">Fast Dispatch</p>
        </div>
      </div>
    </div>
  );
}
