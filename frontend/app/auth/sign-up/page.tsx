import React from 'react';
import type { Metadata } from 'next';
import AuthLayout from '@/components/Auth/common/AuthLayout';
import SignUpHeader from '@/components/Auth/SignUp/SignUpHeader';
import SignUpForm from '@/components/Auth/SignUp/SignUpForm';

export const metadata: Metadata = {
  title: 'Create an Account | AnyBuy - Everything for Everyone',
  description: 'Join AnyBuy and discover millions of products in one all-in-one marketplace.',
};

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpHeader />
      <SignUpForm />
    </AuthLayout>
  );
}
