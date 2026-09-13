"use client";

import { useState, FormEvent } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <section id="newsletter" className="py-12 sm:py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 sm:p-12 lg:p-16 text-center text-white shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 mb-6">
              <Mail className="h-7 w-7" />
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Stay in the Loop
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-md leading-relaxed">
              Get the latest deals, new arrivals and exclusive offers delivered straight to your inbox.
            </p>

            {/* Subscription Form */}
            {isSubmitted ? (
              <div className="mt-8 flex items-center gap-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 px-6 py-4 text-emerald-300 text-sm font-semibold animate-in fade-in zoom-in-95">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>Thank you for subscribing! Your $20 welcome voucher is on its way.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex w-full max-w-md flex-col sm:flex-row items-center gap-2.5"
              >
                <div className="relative w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-slate-700 bg-white/10 px-4 py-3.5 text-sm text-white placeholder:text-slate-400 focus:border-orange-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>

                <button
                  type="submit"
                  className="group flex w-full sm:w-auto flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-orange-600 active:scale-95 focus:outline-none"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}

            <p className="mt-4 text-[11px] text-slate-400">
              🔒 We respect your privacy. Unsubscribe at any time with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
