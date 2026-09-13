import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  /**
   * Layout/style variant:
   * - 'default': Horizontal layout with mascot + ANYBUY + tagline
   * - 'compact': Horizontal layout with mascot + ANYBUY (tagline hidden)
   * - 'stacked': Centered vertical layout with mascot on top, brand below
   * - 'light': Optimized for dark backgrounds (white text)
   * - 'dark': Optimized for light backgrounds (default teal/slate text)
   */
  variant?: "default" | "compact" | "stacked" | "light" | "dark";
  /** Whether to show the "Your Everything Marketplace" tagline (defaults to true for default/stacked, false for compact) */
  showTagline?: boolean;
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
  /** Optional link destination, set to null or empty string to render as a plain div */
  href?: string | null;
  /** Priority loading for above-the-fold header images */
  priority?: boolean;
}

export default function Logo({
  variant = "default",
  showTagline,
  size = "md",
  className = "",
  href = "/",
  priority = true,
}: LogoProps) {
  const isLight = variant === "light";
  const isCompact = variant === "compact";
  const isStacked = variant === "stacked";

  // Tagline is shown by default unless explicitly disabled or if compact variant is chosen
  const shouldShowTagline = showTagline ?? (!isCompact);

  // Dimension mapping based on size preset
  const dimensions = {
    sm: {
      mascotWidth: 32,
      mascotHeight: 34,
      titleSize: "text-lg",
      taglineSize: "text-[9px]",
      gap: "gap-2",
    },
    md: {
      mascotWidth: 42,
      mascotHeight: 45,
      titleSize: "text-xl sm:text-2xl",
      taglineSize: "text-[10px] sm:text-[11px]",
      gap: "gap-2.5",
    },
    lg: {
      mascotWidth: 64,
      mascotHeight: 68,
      titleSize: "text-2xl sm:text-3xl",
      taglineSize: "text-xs sm:text-sm",
      gap: "gap-3",
    },
  }[size];

  const content = (
    <div
      className={`inline-flex items-center select-none transition-transform duration-200 active:scale-[0.98] ${
        isStacked ? "flex-col text-center" : "flex-row"
      } ${dimensions.gap} ${className}`}
    >
      {/* Official AnyBuy Shopping-Bag Mascot */}
      <div className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/images/anybuy-icon.png"
          alt="AnyBuy - Your Everything Marketplace"
          width={dimensions.mascotWidth}
          height={dimensions.mascotHeight}
          priority={priority}
          className="object-contain drop-shadow-xs"
        />
      </div>

      {/* Brand Typography */}
      <div className={`flex flex-col justify-center ${isStacked ? "items-center mt-1" : "items-start"}`}>
        <span
          className={`font-black tracking-tight leading-none uppercase ${dimensions.titleSize} ${
            isLight ? "text-white" : "text-brand-teal"
          }`}
          style={{ fontFamily: "inherit" }}
        >
          ANY<span className={isLight ? "text-teal-400" : "text-brand-teal-deep"}>BUY</span>
        </span>

        {shouldShowTagline && (
          <span
            className={`font-medium tracking-normal leading-tight mt-0.5 ${dimensions.taglineSize} ${
              isLight ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Your Everything Marketplace
          </span>
        )}
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link
      href={href}
      className="group inline-flex items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal p-0.5"
      aria-label="AnyBuy - Your Everything Marketplace"
    >
      {content}
    </Link>
  );
}
