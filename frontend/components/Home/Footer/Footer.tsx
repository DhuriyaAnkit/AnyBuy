import Logo from "../Header/Logo";
import FooterColumn from "./FooterColumn";
import { FooterSection } from "@/types/home";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
} from "lucide-react";

const footerSections: FooterSection[] = [
  {
    title: "Shop",
    links: [
      { label: "Electronics", href: "#categories" },
      { label: "Fashion", href: "#categories" },
      { label: "Beauty", href: "#categories" },
      { label: "Home & Living", href: "#categories" },
      { label: "Grocery", href: "#categories" },
    ],
  },
  {
    title: "Customer Support",
    links: [
      { label: "Help Center", href: "#features" },
      { label: "Contact Us", href: "#features" },
      { label: "Returns & Exchanges", href: "#features" },
      { label: "Shipping Policies", href: "#features" },
    ],
  },
  {
    title: "About AnyBuy",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      {/* Upper Footer: Brand info & Nav columns */}
      <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info column (spans 2 on large screens) */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Logo variant="light" />

            <p className="mt-4 text-sm text-slate-400 max-w-sm leading-relaxed">
              AnyBuy is an all-in-one marketplace delivering millions of authentic products from verified brands right to your doorstep. Everything for Everyone.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-slate-400 hover:bg-brand-teal hover:text-white transition-all shadow-xs"
                aria-label="Follow AnyBuy on Instagram"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-slate-400 hover:bg-brand-teal hover:text-white transition-all shadow-xs"
                aria-label="Follow AnyBuy on Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-slate-400 hover:bg-brand-teal hover:text-white transition-all shadow-xs"
                aria-label="Follow AnyBuy on X (Twitter)"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-slate-400 hover:bg-brand-teal hover:text-white transition-all shadow-xs"
                aria-label="Subscribe to AnyBuy on YouTube"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Nav link columns */}
          {footerSections.map((section) => (
            <FooterColumn key={section.title} section={section} />
          ))}
        </div>

        {/* Security & Payment highlights */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-teal-400" />
              <span>256-Bit SSL Encrypted</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-orange" />
              <span>Money Back Guarantee</span>
            </span>
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-slate-500">Accepted Payments:</span>
            <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px] font-bold">
              <span className="rounded bg-slate-900 px-2 py-1 border border-slate-800">VISA</span>
              <span className="rounded bg-slate-900 px-2 py-1 border border-slate-800">MC</span>
              <span className="rounded bg-slate-900 px-2 py-1 border border-slate-800">AMEX</span>
              <span className="rounded bg-slate-900 px-2 py-1 border border-slate-800">PAYPAL</span>
            </div>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="mt-6 text-center text-xs text-slate-600">
          <p>© AnyBuy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
