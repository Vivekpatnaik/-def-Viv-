'use client';

import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Automatically route home visitors to the main Career Operating System dashboard
    if (typeof window !== 'undefined') {
      window.location.replace('/dashboard');
    }
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-[60vh] text-center">
      <div className="w-12 h-12 rounded-full border-2 border-blue-600 border-t-transparent animate-spin mb-4" />
      <h1 className="text-xl font-bold text-white mb-1">Loading CareerOS AI...</h1>
      <p className="text-xs text-slate-500">Redirecting to your candidate workspace</p>
    </div>
  );
}
