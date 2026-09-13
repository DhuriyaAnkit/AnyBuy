import Link from "next/link";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="flex flex-col items-start justify-center text-left py-4 lg:py-8">
      {/* Eyebrow badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-brand-teal-deep shadow-xs">
        <Sparkles className="h-3.5 w-3.5 text-brand-teal" />
        <span>The All-In-One Marketplace</span>
      </div>

      {/* Main Heading */}
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08]">
        Everything <br />
        <span className="text-brand-orange">
          for Everyone.
        </span>
      </h1>

      {/* Supporting Text */}
      <p className="mt-4 max-w-xl text-base sm:text-lg text-brand-text-secondary font-normal leading-relaxed">
        Discover millions of products, all in one place. From cutting-edge tech and trending fashion to home essentials and daily groceries—experience seamless shopping with AnyBuy.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
        <Link
          href="#featured"
          className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand-orange px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-150 hover:bg-brand-orange-hover hover:shadow active:scale-98 focus:outline-none"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Shop Now</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href="#categories"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-brand-teal bg-white px-7 py-3.5 text-sm font-semibold text-brand-teal shadow-xs transition-all duration-150 hover:bg-teal-50 active:scale-98 focus:outline-none"
        >
          <span>Explore Categories</span>
        </Link>
      </div>

      {/* Trust Metrics */}
      <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 border-t border-[#E5E9ED] pt-6 w-full max-w-lg">
        <div>
          <p className="text-2xl sm:text-3xl font-black text-brand-navy">5M+</p>
          <p className="text-xs font-medium text-brand-text-muted">Products Listed</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-black text-brand-navy">99.8%</p>
          <p className="text-xs font-medium text-brand-text-muted">Happy Buyers</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-black text-brand-navy">24h</p>
          <p className="text-xs font-medium text-brand-text-muted">Fast Dispatch</p>
        </div>
      </div>
    </div>
  );
}
