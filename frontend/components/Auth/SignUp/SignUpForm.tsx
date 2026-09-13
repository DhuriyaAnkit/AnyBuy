"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Mail, User as UserIcon, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import PasswordInput from '../common/PasswordInput';
import AuthButton from '../common/AuthButton';
import AuthAlert from '../common/AuthAlert';
import { ApiException } from '@/lib/api/api-client';

export default function SignUpForm() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | string[] | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both entries.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      await register({ name, email, password });
      setIsSuccess(true);
    } catch (err) {
      if (err instanceof ApiException) {
        setErrorMessage(err.messages);
      } else {
        setErrorMessage('Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-4 space-y-4 animate-in fade-in zoom-in-95">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-xs">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Check your email!</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            We sent a verification link to <strong className="text-slate-800">{email}</strong>. Please click the link in your inbox to verify your account.
          </p>
        </div>
        <div className="pt-3">
          <Link
            href="/auth/sign-in"
            className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-colors"
          >
            <span>Go to Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && <AuthAlert type="error" message={errorMessage} />}

      {/* Name Field */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-xs font-bold text-slate-700">
          Full Name
        </label>
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute left-3.5 flex items-center text-slate-400">
            <UserIcon className="h-4 w-4" />
          </div>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all hover:border-slate-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>
      </div>

      {/* Email Field */}
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
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all hover:border-slate-300 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </div>
      </div>

      {/* Password Field */}
      <PasswordInput
        id="password"
        label="Password"
        autoComplete="new-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="At least 8 characters (e.g. Pass123!)"
      />

      {/* Confirm Password Field */}
      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        autoComplete="new-password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Re-enter your password"
      />

      {/* Submit Button */}
      <div className="pt-2">
        <AuthButton isLoading={isLoading}>Create Account</AuthButton>
      </div>

      {/* Bottom Link to Sign In */}
      <div className="text-center pt-3 border-t border-slate-100">
        <p className="text-xs text-slate-500">
          Already have an account?{' '}
          <Link
            href="/auth/sign-in"
            className="font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
}
