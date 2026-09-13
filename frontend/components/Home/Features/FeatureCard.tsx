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
    <div className="group relative flex flex-col items-start rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5">
      {/* Feature Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white shadow-xs">
        <IconComponent className="h-6 w-6" />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}
