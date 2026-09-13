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
    <div className="relative min-h-screen flex flex-col justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-100px] left-1/4 h-80 w-80 rounded-full bg-orange-400/15 blur-3xl" />
        <div className="absolute top-[-50px] right-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Top Navigation */}
      <div className="container mx-auto max-w-md mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-orange-600 transition-colors py-2 px-3 rounded-xl hover:bg-white/80"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to AnyBuy</span>
        </Link>
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          Secure SSL
        </span>
      </div>

      {/* Center Auth Card */}
      <div className="w-full max-w-md mx-auto">
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50">
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
