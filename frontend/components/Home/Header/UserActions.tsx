"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, User as UserIcon, ChevronDown, LogOut, Package, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

interface UserActionsProps {
  className?: string;
  cartCount?: number;
  wishlistCount?: number;
}

export default function UserActions({
  className = "",
  cartCount = 3,
  wishlistCount = 2,
}: UserActionsProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleSignOut = async () => {
    setShowUserMenu(false);
    await logout();
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-4 ${className}`}>
      {/* Wishlist Button */}
      <Link
        href="#featured"
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-brand-navy hover:bg-teal-50/70 hover:text-brand-teal transition-colors focus:outline-none"
        aria-label={`Wishlist, ${wishlistCount} saved items`}
      >
        <Heart className="h-5 w-5" />
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-bold text-white shadow-xs">
            {wishlistCount}
          </span>
        )}
      </Link>

      {/* Cart Button */}
      <Link
        href="#featured"
        className="relative flex items-center gap-2 rounded-full border border-[#E5E9ED] bg-white px-3 py-1.5 text-brand-navy transition-all hover:border-brand-teal hover:text-brand-teal shadow-xs"
        aria-label={`Shopping cart, ${cartCount} items`}
      >
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-bold text-white shadow-xs">
              {cartCount}
            </span>
          )}
        </div>
        <div className="hidden xl:flex flex-col text-left">
          <span className="text-[10px] font-medium leading-none text-slate-500">Cart</span>
          <span className="text-xs font-bold leading-none text-brand-navy">$177.98</span>
        </div>
      </Link>

      {/* Account Area */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-2 rounded-full border border-[#E5E9ED] bg-white p-1.5 sm:px-3 sm:py-1.5 text-brand-navy transition-colors hover:border-brand-teal focus:outline-none shadow-xs"
          aria-expanded={showUserMenu}
          aria-haspopup="true"
          aria-label="User account menu"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-teal text-white font-bold text-xs shadow-xs">
            {isAuthenticated && user ? (
              <span>{getInitials(user.name)}</span>
            ) : (
              <UserIcon className="h-4 w-4" />
            )}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[10px] leading-tight text-slate-500">
              {isAuthenticated && user ? `Hello, ${user.name.split(' ')[0]}` : "Welcome"}
            </span>
            <span className="text-xs font-bold leading-tight text-brand-navy">
              {isAuthenticated ? "My Account" : "Sign In"}
            </span>
          </div>
          <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-slate-400" />
        </button>

        {/* Dropdown Menu */}
        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-60 rounded-xl border border-[#E5E9ED] bg-white p-3 shadow-md z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {isAuthenticated && user ? (
              <>
                {/* User Info Header */}
                <div className="border-b border-slate-100 pb-3 mb-2 px-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-brand-navy truncate">{user.name}</p>
                    <span className="rounded bg-teal-50 border border-teal-100 px-1.5 py-0.5 text-[9px] font-bold text-brand-teal-deep uppercase">
                      {user.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{user.email}</p>
                </div>

                {/* Logged in Navigation Links */}
                <ul className="space-y-1 text-xs font-medium text-slate-700">
                  <li>
                    <Link
                      href="#featured"
                      className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-teal-50/70 hover:text-brand-teal transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Package className="h-4 w-4 text-slate-400" />
                      <span>My Orders</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#featured"
                      className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-teal-50/70 hover:text-brand-teal transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Heart className="h-4 w-4 text-slate-400" />
                      <span>Saved Wishlist</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#features"
                      className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-teal-50/70 hover:text-brand-teal transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Shield className="h-4 w-4 text-slate-400" />
                      <span>Customer Support</span>
                    </Link>
                  </li>
                  <li className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </>
            ) : (
              <>
                {/* Guest Header */}
                <div className="border-b border-slate-100 pb-3 mb-2">
                  <p className="text-xs font-bold text-brand-navy">Welcome to AnyBuy!</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Everything for Everyone.</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Link
                      href="/auth/sign-in"
                      className="flex-1 rounded-xl bg-brand-orange py-2 text-center text-xs font-bold text-white hover:bg-brand-orange-hover transition-colors shadow-xs"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/sign-up"
                      className="flex-1 rounded-xl border border-brand-teal py-2 text-center text-xs font-semibold text-brand-teal hover:bg-teal-50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Register
                    </Link>
                  </div>
                </div>

                <ul className="space-y-1 text-xs font-medium text-slate-700">
                  <li>
                    <Link
                      href="#featured"
                      className="block rounded-lg px-2.5 py-1.5 hover:bg-teal-50/70 hover:text-brand-teal transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#features"
                      className="block rounded-lg px-2.5 py-1.5 hover:bg-teal-50/70 hover:text-brand-teal transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Help Center
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
