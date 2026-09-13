"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Sparkles, Flame, ShieldAlert, ChevronRight, User as UserIcon, LogOut } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "@/lib/auth/AuthContext";

const mobileLinks = [
  { label: "Shop All Categories", href: "#categories", icon: ShoppingBag },
  { label: "Flash Sale Deals", href: "#flash-sale", icon: Flame, isHighlight: true },
  { label: "Featured Products", href: "#featured", icon: Sparkles },
  { label: "Why AnyBuy", href: "#features", icon: ShieldAlert },
  { label: "Popular Brands", href: "#brands", icon: ShoppingBag },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleSignOut = async () => {
    setIsOpen(false);
    await logout();
  };

  return (
    <div className="lg:hidden">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 focus:outline-none"
        aria-label="Open mobile navigation menu"
        aria-expanded={isOpen}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <aside
            className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-2xl transition-transform"
            aria-label="Mobile Navigation"
          >
            {/* Header in Drawer */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <Logo showTagline={false} />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* User Quick Bar */}
            <div className="mt-5 rounded-2xl bg-slate-50 p-4 border border-[#E5E9ED]">
              {isAuthenticated && user ? (
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal text-white font-bold text-sm shadow-xs">
                      {user.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-brand-navy truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal text-white shadow-xs">
                      <UserIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-brand-navy">Welcome, Shopper!</p>
                      <p className="text-xs text-slate-500">Sign in for exclusive deals</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link
                      href="/auth/sign-in"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 rounded-xl bg-brand-orange py-2 text-center text-xs font-bold text-white shadow-xs hover:bg-brand-orange-hover"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/sign-up"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 rounded-xl border border-brand-teal bg-white py-2 text-center text-xs font-semibold text-brand-teal hover:bg-teal-50"
                    >
                      Join AnyBuy
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Nav Links */}
            <nav className="mt-6 flex-1 overflow-y-auto space-y-1">
              <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Explore Marketplace
              </p>
              {mobileLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-teal-50/70 hover:text-brand-teal transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`h-4 w-4 ${
                          link.isHighlight ? "text-brand-orange" : "text-slate-400"
                        }`}
                      />
                      <span>{link.label}</span>
                    </div>
                    <span className="text-slate-300">→</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Support info */}
            <div className="border-t border-slate-100 pt-4 text-xs text-slate-500">
              <p className="font-semibold text-slate-700">Need Help?</p>
              <p className="mt-1">support@anybuy.com • 24/7 Toll-Free</p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
