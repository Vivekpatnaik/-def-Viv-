'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8">
      <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 mb-6">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Workspace not found</h1>
      <p className="text-slate-400 max-w-md mb-8 text-sm">
        The workspace route you are searching for does not exist or may have been consolidated to prioritize your hiring pipeline.
      </p>
      <Link
        href="/"
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-md transition-colors border-0 text-sm no-underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </Link>
    </div>
  );
}
