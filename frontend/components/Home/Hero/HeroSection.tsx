import HeroContent from "./HeroContent";
import HeroBanner from "./HeroBanner";

export default function HeroSection() {
  return (
    <section
      aria-label="Hero Introduction"
      className="relative overflow-hidden bg-gradient-to-b from-orange-50/40 via-white to-slate-50 py-10 sm:py-16 lg:py-20 border-b border-slate-200/60"
    >
      {/* Subtle grid background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <HeroContent />
          <HeroBanner />
        </div>
      </div>
    </section>
  );
}
