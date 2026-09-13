"use client";

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { authService } from '@/lib/auth/auth.service';
import PasswordInput from '../common/PasswordInput';
import AuthButton from '../common/AuthButton';
import AuthAlert from '../common/AuthAlert';
import { ApiException } from '@/lib/api/api-client';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | string[] | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!token) {
      setErrorMessage('Missing password reset token. Please check your reset link.');
      return;
    }

    if (!newPassword || !confirmPassword) {
      setErrorMessage('Please fill in both password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword({ token, newPassword });
      setIsSuccess(true);
    } catch (err) {
      if (err instanceof ApiException) {
        setErrorMessage(err.messages);
      } else {
        setErrorMessage('Failed to reset password. The link may have expired.');
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
          <h2 className="text-xl font-bold text-slate-900">Password Updated!</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Your password has been successfully reset. You can now sign in with your new credentials.
          </p>
        </div>
        <div className="pt-3">
          <Link
            href="/auth/sign-in"
            className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/25"
          >
            <span>Sign In to AnyBuy</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Create new password
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
          Choose a strong password with at least 8 characters.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && <AuthAlert type="error" message={errorMessage} />}

        {!token && (
          <AuthAlert
            type="error"
            message="No reset token was found in the URL. Please click the full link sent to your email."
          />
        )}

        <PasswordInput
          id="newPassword"
          label="New Password"
          autoComplete="new-password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="At least 8 characters"
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat new password"
        />

        <div className="pt-2">
          <AuthButton isLoading={isLoading} disabled={!token}>
            Reset Password
          </AuthButton>
        </div>

        <div className="text-center pt-3 border-t border-slate-100">
          <Link
            href="/auth/sign-in"
            className="text-xs font-bold text-slate-600 hover:text-orange-600 transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
