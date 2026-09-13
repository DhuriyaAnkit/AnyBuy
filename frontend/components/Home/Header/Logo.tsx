import Link from "next/link";
import { ShoppingBag } from "lucide-react";

interface LogoProps {
  showTagline?: boolean;
  className?: string;
  variant?: "light" | "dark";
}

export default function Logo({
  showTagline = true,
  className = "",
  variant = "dark",
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 transition-transform duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-0.5 ${className}`}
      aria-label="AnyBuy - Back to Homepage"
    >
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 shadow-md shadow-orange-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-500/30">
        <ShoppingBag className="h-5 w-5 text-white" />
        <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-900 ring-2 ring-white">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
        </span>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <span
            className={`text-2xl font-black tracking-tight ${
              isLight ? "text-white" : "text-slate-900"
            }`}
          >
            Any<span className="text-orange-500">Buy</span>
          </span>
          <span className="ml-1 rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-orange-600 uppercase dark:bg-orange-950/40 dark:text-orange-400">
            Market
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[11px] font-medium tracking-wide ${
              isLight ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Everything for Everyone.
          </span>
        )}
      </div>
    </Link>
  );
}
