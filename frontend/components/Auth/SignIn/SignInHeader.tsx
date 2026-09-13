import React from 'react';

export default function SignInHeader() {
  return (
    <div className="text-center mb-6">
      <h1 className="text-2xl font-black tracking-tight text-slate-900">
        Sign in to your account
      </h1>
      <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
        Welcome back! Please enter your details to continue.
      </p>
    </div>
  );
}
