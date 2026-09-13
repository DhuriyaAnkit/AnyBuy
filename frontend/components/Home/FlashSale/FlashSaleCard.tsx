import { FlashSaleProduct } from "@/types/home";
import ProductCard from "../Products/ProductCard";

interface FlashSaleCardProps {
  product: FlashSaleProduct;
}

export default function FlashSaleCard({ product }: FlashSaleCardProps) {
  return (
    <ProductCard
      product={product}
      variant="flashSale"
      showClaimedBar={true}
    />
  );
}
