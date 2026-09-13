import Link from "next/link";
import { FooterSection } from "@/types/home";

interface FooterColumnProps {
  section: FooterSection;
}

export default function FooterColumn({ section }: FooterColumnProps) {
  return (
    <div className="flex flex-col">
      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
        {section.title}
      </h3>
      <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
        {section.links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-slate-400 hover:text-teal-300 transition-colors duration-150 inline-block"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
