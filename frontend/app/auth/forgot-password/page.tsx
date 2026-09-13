import React from 'react';
import type { Metadata } from 'next';
import AuthLayout from '@/components/Auth/common/AuthLayout';
import ForgotPasswordForm from '@/components/Auth/ForgotPassword/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password | AnyBuy - Everything for Everyone',
  description: 'Reset your AnyBuy account password securely.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
