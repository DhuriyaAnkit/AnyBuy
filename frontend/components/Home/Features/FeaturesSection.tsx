import { features } from "@/data/home/features";
import FeatureCard from "./FeatureCard";
import { ShieldAlert } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-12 sm:py-16 bg-[#F8FAFA] border-b border-[#E5E9ED]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-teal mb-2">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Customer First Guarantee</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-brand-navy">
            Why Shop with AnyBuy?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-brand-text-secondary">
            We are dedicated to delivering a seamless, dependable, and world-class marketplace experience.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
