export interface Announcement {
  id: string;
  icon?: string;
  prefix?: string;
  highlight?: string;
  text: string;
  suffix?: string;
  link?: string;
}

export const announcements: Announcement[] = [
  {
    id: "mega-deal",
    icon: "⭐",
    prefix: "Weekend Mega Deal:",
    highlight: "Up to 60% OFF",
    text: "top tech & fashion!",
    link: "/#flash-deals",
  },
  {
    id: "free-shipping",
    icon: "🚚",
    text: "Free shipping on worldwide orders over",
    highlight: "$49",
  },
  {
    id: "support",
    icon: "🕐",
    text: "24/7 Dedicated Customer Support",
  },
  {
    id: "track-order",
    icon: "📦",
    text: "Track Order & Hassle-Free Returns",
  },
];
