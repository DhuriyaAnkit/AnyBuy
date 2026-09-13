import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import AuthLayout from '@/components/Auth/common/AuthLayout';
import ResetPasswordForm from '@/components/Auth/ResetPassword/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Reset Password | AnyBuy - Everything for Everyone',
  description: 'Enter your new password to restore access to your AnyBuy account.',
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="py-8 text-center text-xs text-slate-400">Loading form...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
