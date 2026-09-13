import { Feature } from "@/types/home";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  BadgeCheck,
  Headphones,
  ShoppingBag,
} from "lucide-react";

interface FeatureCardProps {
  feature: Feature;
}

const iconMap: Record<string, React.ElementType> = {
  Truck,
  ShieldCheck,
  RotateCcw,
  BadgeCheck,
  Headphones,
  ShoppingBag,
};

export default function FeatureCard({ feature }: FeatureCardProps) {
  const IconComponent = iconMap[feature.icon] || ShieldCheck;

  return (
    <div className="group relative flex flex-col items-start rounded-2xl border border-[#E5E9ED] bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-teal/50 hover:shadow-sm">
      {/* Feature Icon */}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-brand-teal transition-colors duration-200 group-hover:bg-brand-teal group-hover:text-white shadow-xs">
        <IconComponent className="h-5 w-5" />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-base font-bold text-brand-navy group-hover:text-brand-teal transition-colors">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="mt-1.5 text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}
