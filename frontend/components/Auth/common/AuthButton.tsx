import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function AuthButton({
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className={`relative flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 px-4 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-all duration-150 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 active:scale-98 disabled:opacity-60 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-orange-500/40 ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-white" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
