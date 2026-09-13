"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2, ArrowRight, Mail } from 'lucide-react';
import { authService } from '@/lib/auth/auth.service';
import AuthButton from '../common/AuthButton';
import AuthAlert from '../common/AuthAlert';
import { ApiException } from '@/lib/api/api-client';

export default function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>(() =>
    !token ? 'error' : 'verifying',
  );
  const [message, setMessage] = useState<string>(() =>
    !token ? 'No verification token was provided in the link.' : '',
  );

  // Resend state
  const [resendEmail, setResendEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    async function verify() {
      try {
        const res = await authService.verifyEmail(token as string);
        if (isMounted) {
          setStatus('success');
          setMessage(res.message || 'Email verified successfully!');
        }
      } catch (err) {
        if (isMounted) {
          setStatus('error');
          if (err instanceof ApiException) {
            setMessage(err.message);
          } else {
            setMessage('Failed to verify email. The link may be invalid or expired.');
          }
        }
      }
    }

    verify();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendError(null);
    if (!resendEmail.trim()) {
      setResendError('Please enter your email address.');
      return;
    }

    setIsResending(true);
    try {
      await authService.resendVerification(resendEmail);
      setResendSuccess(true);
    } catch (err) {
      if (err instanceof ApiException) {
        setResendError(err.message);
      } else {
        setResendError('Failed to send verification email. Please try again.');
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="text-center py-4 space-y-6">
      {status === 'verifying' && (
        <div className="space-y-4 py-8">
          <Loader2 className="h-10 w-10 animate-spin text-orange-500 mx-auto" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Verifying your email...</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Please wait while we confirm your AnyBuy account.
            </p>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-4 animate-in fade-in zoom-in-95">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-xs">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Email Verified!</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {message}
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/auth/sign-in"
              className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/25"
            >
              <span>Sign In to Your Account</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-4 animate-in fade-in zoom-in-95">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 shadow-xs">
            <XCircle className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Verification Failed</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {message}
            </p>
          </div>

          {/* Resend Verification Form */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-left">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 text-center">
              Need a new verification link?
            </h2>

            {resendSuccess ? (
              <AuthAlert
                type="success"
                message="A new verification link was sent to your email address."
              />
            ) : (
              <form onSubmit={handleResend} className="space-y-3">
                {resendError && <AuthAlert type="error" message={resendError} />}
                <div className="relative flex items-center">
                  <div className="pointer-events-none absolute left-3.5 flex items-center text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
                <AuthButton isLoading={isResending}>Resend Verification Link</AuthButton>
              </form>
            )}
          </div>

          <div className="pt-3">
            <Link
              href="/auth/sign-in"
              className="text-xs font-bold text-slate-600 hover:text-orange-600 transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
