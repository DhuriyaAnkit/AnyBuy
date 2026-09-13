import Link from "next/link";
import { Zap, Sparkles, Flame, ShieldAlert, Layers } from "lucide-react";

interface NavigationProps {
  className?: string;
}

const navLinks = [
  { label: "All Categories", href: "#categories", icon: Layers, isPrimary: true },
  { label: "Flash Sale", href: "#flash-sale", icon: Flame, isHighlight: true },
  { label: "Featured Deals", href: "#featured", icon: Zap },
  { label: "Why AnyBuy", href: "#features", icon: ShieldAlert },
  { label: "Popular Brands", href: "#brands", icon: Sparkles },
];

export default function Navigation({ className = "" }: NavigationProps) {
  return (
    <nav
      aria-label="Main category navigation"
      className={`hidden lg:flex items-center gap-1 py-2 text-sm font-medium ${className}`}
    >
      {navLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.label}
            href={link.href}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-150 ${
              link.isHighlight
                ? "bg-red-50 text-red-600 hover:bg-red-100 font-semibold"
                : link.isPrimary
                ? "bg-slate-100 text-slate-900 hover:bg-slate-200 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Icon
              className={`h-4 w-4 ${
                link.isHighlight
                  ? "text-red-500 animate-pulse"
                  : link.isPrimary
                  ? "text-slate-700"
                  : "text-slate-400"
              }`}
            />
            <span>{link.label}</span>
          </Link>
        );
      })}

      <div className="ml-auto hidden xl:flex items-center gap-4 text-xs font-semibold text-slate-500">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Free express delivery on orders over $49
        </span>
        <span className="text-slate-300">|</span>
        <Link href="#newsletter" className="hover:text-orange-600 transition-colors">
          Get $20 Off Coupon
        </Link>
      </div>
    </nav>
  );
}
