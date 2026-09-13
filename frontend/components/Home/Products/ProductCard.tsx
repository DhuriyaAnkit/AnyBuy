"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/home";
import { Star, Heart, ShoppingBag, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  variant?: "standard" | "flashSale";
  showClaimedBar?: boolean;
}

export default function ProductCard({
  product,
  variant = "standard",
  showClaimedBar = false,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted || false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const isFlash = variant === "flashSale";

  const badgeColorClass = (() => {
    switch (product.badge?.type) {
      case "bestseller":
        return "bg-brand-orange text-white";
      case "new":
        return "bg-brand-teal-deep text-white";
      case "discount":
      case "hot":
        return "bg-brand-orange text-white";
      default:
        return "bg-brand-teal text-white";
    }
  })();

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 ${
        isFlash
          ? "border-orange-200 hover:border-brand-orange hover:shadow-sm"
          : "border-[#E5E9ED] hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      {/* Top Media Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide shadow-xs ${badgeColorClass}`}
            >
              {product.badge.text}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-xs shadow-xs transition-transform active:scale-90 hover:bg-white hover:scale-110 ${
            isWishlisted ? "text-red-500" : "text-slate-400 hover:text-red-500"
          }`}
        >
          <Heart
            className="h-4 w-4"
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

        {/* Discount Percentage Pill */}
        {product.discountPercentage && product.discountPercentage > 0 && !product.badge && (
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="rounded-md bg-brand-orange px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
              -{product.discountPercentage}%
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        {/* Category */}
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Product Title */}
        <h3 className="mt-1 text-xs sm:text-sm font-bold text-brand-navy line-clamp-2 transition-colors group-hover:text-brand-teal leading-snug">
          {product.name}
        </h3>

        {/* Star Rating & Review Count */}
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <div className="flex items-center text-amber-400">
            <Star className="h-3.5 w-3.5 fill-current" />
          </div>
          <span className="font-bold text-brand-navy">{product.rating.toFixed(1)}</span>
          <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
        </div>

        {/* Pricing */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base sm:text-lg font-black text-brand-navy">
            ${product.currentPrice.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.currentPrice && (
            <span className="text-xs text-slate-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Claimed Bar (For Flash Sale variants) */}
        {showClaimedBar && product.claimedPercentage !== undefined && (
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-[11px] font-semibold">
              <span className="text-brand-orange-dark">Claimed: {product.claimedPercentage}%</span>
              <span className="text-slate-400">Limited Stock</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-brand-orange transition-all duration-500"
                style={{ width: `${product.claimedPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Add to Cart CTA */}
        <div className="mt-4 pt-2 border-t border-[#E5E9ED]">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs sm:text-sm font-bold transition-all duration-150 active:scale-95 focus:outline-none ${
              isAdded
                ? "bg-brand-teal text-white shadow-xs"
                : "bg-brand-orange text-white hover:bg-brand-orange-hover shadow-xs"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
