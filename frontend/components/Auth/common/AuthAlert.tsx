import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthAlertProps {
  type: 'error' | 'success';
  message: string | string[];
}

export default function AuthAlert({ type, message }: AuthAlertProps) {
  if (!message || (Array.isArray(message) && message.length === 0)) return null;

  const isError = type === 'error';

  return (
    <div
      className={`rounded-2xl p-3.5 text-xs font-medium flex items-start gap-2.5 animate-in fade-in zoom-in-95 duration-150 ${
        isError
          ? 'bg-red-50 text-red-700 border border-red-200/80'
          : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
      }`}
      role="alert"
    >
      {isError ? (
        <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
      ) : (
        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
      )}
      <div className="flex-1">
        {Array.isArray(message) ? (
          <ul className="list-disc list-inside space-y-0.5">
            {message.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
}
