"use client";

import Link from "next/link";
import { announcements, Announcement } from "@/data/home/announcements";

interface AnnouncementTickerProps {
  items?: Announcement[];
}

export default function AnnouncementTicker({ items = announcements }: AnnouncementTickerProps) {
  // Repeat items inside each track so wide screens are always populated without gaps
  const trackItems = [...items, ...items];

  return (
    <div
      role="region"
      aria-label="Promotional announcements"
      className="relative w-full overflow-hidden bg-slate-900 py-2 text-xs font-medium text-slate-200 select-none border-b border-slate-800/80 z-20"
    >
      <div className="flex w-max animate-ticker">
        {/* Track 1 */}
        <div className="flex items-center shrink-0">
          {trackItems.map((item, index) => (
            <div key={`track1-${item.id}-${index}`} className="flex items-center">
              <span className="inline-flex items-center gap-1.5 px-6 whitespace-nowrap">
                {item.icon && <span className="text-sm leading-none">{item.icon}</span>}
                {item.prefix && (
                  <span className="text-orange-400 font-semibold">{item.prefix}</span>
                )}
                {item.text && <span>{item.text}</span>}
                {item.highlight && (
                  <span className="text-white font-bold">{item.highlight}</span>
                )}
                {item.suffix && <span>{item.suffix}</span>}
                {item.link && (
                  <Link
                    href={item.link}
                    className="ml-1 text-orange-400 underline underline-offset-2 hover:text-orange-300 transition-colors"
                  >
                    Shop Now
                  </Link>
                )}
              </span>
              <span className="text-slate-600 text-[10px] select-none" aria-hidden="true">
                •
              </span>
            </div>
          ))}
        </div>

        {/* Track 2 (Seamless duplicate for infinite loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {trackItems.map((item, index) => (
            <div key={`track2-${item.id}-${index}`} className="flex items-center">
              <span className="inline-flex items-center gap-1.5 px-6 whitespace-nowrap">
                {item.icon && <span className="text-sm leading-none">{item.icon}</span>}
                {item.prefix && (
                  <span className="text-orange-400 font-semibold">{item.prefix}</span>
                )}
                {item.text && <span>{item.text}</span>}
                {item.highlight && (
                  <span className="text-white font-bold">{item.highlight}</span>
                )}
                {item.suffix && <span>{item.suffix}</span>}
                {item.link && (
                  <span className="ml-1 text-orange-400 underline underline-offset-2">
                    Shop Now
                  </span>
                )}
              </span>
              <span className="text-slate-600 text-[10px] select-none" aria-hidden="true">
                •
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
