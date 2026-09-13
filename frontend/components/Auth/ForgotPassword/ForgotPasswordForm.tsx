"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { authService } from '@/lib/auth/auth.service';
import AuthButton from '../common/AuthButton';
import AuthAlert from '../common/AuthAlert';
import { ApiException } from '@/lib/api/api-client';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | string[] | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      if (err instanceof ApiException) {
        setErrorMessage(err.messages);
      } else {
        setErrorMessage('Unable to process your request. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-4 space-y-4 animate-in fade-in zoom-in-95">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-xs">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-slate-900">Instructions Sent</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            If an account exists for <strong className="text-slate-800">{email}</strong>, we&apos;ll send password reset instructions to your inbox.
          </p>
        </div>
        <div className="pt-3">
          <Link
            href="/auth/sign-in"
            className="inline-flex items-center justify-center gap-2 w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Reset your password
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
          Enter your account email and we will send you a password reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && <AuthAlert type="error" message={errorMessage} />}

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-bold text-slate-700">
            Email Address
          </label>
          <div className="relative flex items-center">
            <div className="pointer-events-none absolute left-3.5 flex items-center text-slate-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all hover:border-slate-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
        </div>

        <div className="pt-2">
          <AuthButton isLoading={isLoading}>Send Reset Link</AuthButton>
        </div>

        <div className="text-center pt-3 border-t border-slate-100">
          <Link
            href="/auth/sign-in"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
