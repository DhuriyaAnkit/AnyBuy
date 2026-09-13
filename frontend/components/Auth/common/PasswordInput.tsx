"use client";

import React, { useState, InputHTMLAttributes } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showIcon?: boolean;
}

export default function PasswordInput({
  label = 'Password',
  error,
  showIcon = true,
  className = '',
  id = 'password',
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold text-slate-700">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {showIcon && (
          <div className="pointer-events-none absolute left-3.5 flex items-center text-slate-400">
            <Lock className="h-4 w-4" />
          </div>
        )}

        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={`w-full rounded-xl border bg-white py-2.5 ${
            showIcon ? 'pl-10' : 'pl-3.5'
          } pr-10 text-sm text-brand-navy placeholder:text-[#8A95A3] transition-all duration-150 focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal/25 ${
            error ? 'border-red-400' : 'border-[#E5E9ED] hover:border-slate-300'
          } ${className}`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 focus:outline-none focus:text-slate-900"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-slate-500" />
          ) : (
            <Eye className="h-4 w-4 text-slate-400" />
          )}
        </button>
      </div>

      {error && <p className="text-xs font-semibold text-red-500 mt-1">{error}</p>}
    </div>
  );
}
