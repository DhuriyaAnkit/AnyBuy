"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import PasswordInput from '../common/PasswordInput';
import AuthButton from '../common/AuthButton';
import AuthAlert from '../common/AuthAlert';
import { ApiException } from '@/lib/api/api-client';

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | string[] | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await login({ email, password, rememberMe });
      router.push(redirectUrl);
      router.refresh();
    } catch (err) {
      if (err instanceof ApiException) {
        setErrorMessage(err.messages);
      } else {
        setErrorMessage('Failed to sign in. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && <AuthAlert type="error" message={errorMessage} />}

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
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />

      {/* Options: Remember Me & Forgot Password */}
      <div className="flex items-center justify-between text-xs pt-1">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
          />
          <span className="font-medium text-slate-600">Remember me</span>
        </label>

        <Link
          href="/auth/forgot-password"
          className="font-bold text-orange-600 hover:text-orange-700 transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <AuthButton isLoading={isLoading}>Sign In</AuthButton>
      </div>

      {/* Bottom Link to Sign Up */}
      <div className="text-center pt-3 border-t border-slate-100">
        <p className="text-xs text-slate-500">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/sign-up"
            className="font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            Create Account
          </Link>
        </p>
      </div>
    </form>
  );
}
