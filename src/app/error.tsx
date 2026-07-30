'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RotateCcw, HelpCircle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error securely to Sentry or internal logging gateways
    console.error('[GlobalError] Unhandled route execution crash:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8">
      <div className="w-16 h-16 rounded-full bg-rose-950/50 border border-rose-800 flex items-center justify-center text-rose-500 mb-6 animate-pulse">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Something went wrong</h1>
      <p className="text-slate-400 max-w-md mb-8 text-sm">
        We encountered a temporary technical discrepancy while processing this workspace page. You can safely retry or message our support channel.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
        <button
          onClick={() => reset()}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-md transition-colors cursor-pointer border-0 w-full sm:w-auto text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retry Workspace</span>
        </button>
        <button
          onClick={() => {
            window.location.href = '#';
          }}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium px-5 py-2.5 rounded-md transition-colors cursor-pointer w-full sm:w-auto text-sm"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Contact Support</span>
        </button>
      </div>
    </div>
  );
}
