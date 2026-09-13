import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import AuthLayout from '@/components/Auth/common/AuthLayout';
import SignInHeader from '@/components/Auth/SignIn/SignInHeader';
import SignInForm from '@/components/Auth/SignIn/SignInForm';

export const metadata: Metadata = {
  title: 'Sign In | AnyBuy - Everything for Everyone',
  description: 'Sign in to your AnyBuy marketplace account to manage orders, wishlist, and profile.',
};

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignInHeader />
      <Suspense fallback={<div className="py-8 text-center text-xs text-slate-400">Loading form...</div>}>
        <SignInForm />
      </Suspense>
    </AuthLayout>
  );
}
