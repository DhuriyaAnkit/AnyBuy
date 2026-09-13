import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types/home";
import { ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`#featured`}
      className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-[#E5E9ED] bg-white p-3 sm:p-4 text-center shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-teal/50 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
    >
      {/* Category Image */}
      <div className="relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full bg-slate-100 ring-4 ring-slate-100 transition-all duration-300 group-hover:ring-slate-200 group-hover:scale-105">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 96px, 112px"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-slate-900/10 transition-opacity duration-300 group-hover:opacity-0" />
      </div>

      {/* Category Title & Details */}
      <div className="mt-3 flex flex-col items-center">
        <h3 className="text-xs sm:text-sm font-bold text-brand-navy transition-colors duration-200 group-hover:text-brand-teal line-clamp-1">
          {category.name}
        </h3>
        {category.itemCount && (
          <span className="mt-0.5 text-[11px] font-medium text-slate-400">
            {category.itemCount}
          </span>
        )}
      </div>

      {/* Floating mini arrow on hover */}
      <span className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-teal-50 text-brand-teal opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1">
        <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
