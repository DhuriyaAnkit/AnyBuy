import { Product } from "@/types/home";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  className?: string;
  showClaimedBar?: boolean;
}

export default function ProductGrid({
  products,
  className = "",
  showClaimedBar = false,
}: ProductGridProps) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 ${className}`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showClaimedBar={showClaimedBar}
        />
      ))}
    </div>
  );
}
