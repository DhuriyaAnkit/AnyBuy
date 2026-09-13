import React from 'react';
import Link from 'next/link';
import Logo from '../../Home/Header/Logo';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-[#F8FAFA] py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Navigation */}
      <div className="container mx-auto max-w-md mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-teal transition-colors py-2 px-3 rounded-xl hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to AnyBuy</span>
        </Link>
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-teal" />
          Secure SSL
        </span>
      </div>

      {/* Center Auth Card */}
      <div className="w-full max-w-md mx-auto">
        <div className="rounded-2xl border border-[#E5E9ED] bg-white p-6 sm:p-8 shadow-sm">
          {/* Brand Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <Logo showTagline={true} />
          </div>

          {children}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <p>© AnyBuy Marketplace. All rights reserved.</p>
          <p className="mt-1">Everything for Everyone.</p>
        </div>
      </div>
    </div>
  );
}
