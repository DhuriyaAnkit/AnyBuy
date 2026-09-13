import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import AuthLayout from '@/components/Auth/common/AuthLayout';
import VerifyEmailContent from '@/components/Auth/VerifyEmail/VerifyEmailContent';

export const metadata: Metadata = {
  title: 'Verify Email | AnyBuy - Everything for Everyone',
  description: 'Verify your AnyBuy account email address.',
};

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="py-8 text-center text-xs text-slate-400">Loading verification...</div>}>
        <VerifyEmailContent />
      </Suspense>
    </AuthLayout>
  );
}
