import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/types/home";

interface BrandCardProps {
  brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link
      href="#featured"
      className="group relative flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md hover:shadow-orange-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
    >
      {/* Brand Visual / Logo */}
      <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-xl bg-slate-50 p-2 transition-transform duration-300 group-hover:scale-105">
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 64px, 80px"
        />
      </div>

      {/* Brand Title */}
      <h3 className="mt-3 text-xs sm:text-sm font-bold text-slate-800 transition-colors group-hover:text-orange-600">
        {brand.name}
      </h3>

      {/* Category or Product Count */}
      <span className="text-[11px] font-medium text-slate-400">
        {brand.itemCount || brand.category}
      </span>
    </Link>
  );
}
