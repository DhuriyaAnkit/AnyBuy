export interface Category {
  id: string | number;
  name: string;
  slug: string;
  itemCount?: string;
  image: string;
  iconName?: string;
  featured?: boolean;
}

export type BadgeType = "bestseller" | "new" | "discount" | "featured" | "hot";

export interface ProductBadge {
  text: string;
  type?: BadgeType;
}

export interface Product {
  id: string | number;
  name: string;
  category: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  badge?: ProductBadge;
  inStock?: boolean;
  isWishlisted?: boolean;
  description?: string;
  claimedPercentage?: number;
}

export interface FlashSaleProduct extends Product {
  claimedPercentage: number;
  totalUnits?: number;
  remainingUnits?: number;
}

export interface Brand {
  id: string | number;
  name: string;
  logo: string;
  category: string;
  itemCount?: string;
}

export interface Feature {
  id: string | number;
  title: string;
  description: string;
  icon: string;
}

export interface Banner {
  id: string | number;
  title: string;
  subtitle: string;
  tagline?: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  couponCode?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}
