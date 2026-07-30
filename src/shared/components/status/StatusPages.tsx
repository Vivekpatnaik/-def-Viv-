'use client';

import React from 'react';
import { ShieldAlert, ShieldX, Wrench, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * Unauthorized Access View (401)
 */
export function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8">
      <div className="w-16 h-16 rounded-full bg-amber-950/50 border border-amber-800 flex items-center justify-center text-amber-500 mb-6">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Unauthorized access</h1>
      <p className="text-slate-400 max-w-md mb-8 text-sm">
        You must be authenticated and active to access this CareerOS workspace. Please sign in to verify your identity.
      </p>
      <Link
        href="/"
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-md transition-colors border-0 text-sm no-underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return Home</span>
      </Link>
    </div>
  );
}

/**
 * Forbidden Access View (403)
 */
export function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8">
      <div className="w-16 h-16 rounded-full bg-rose-950/50 border border-rose-800 flex items-center justify-center text-rose-500 mb-6">
        <ShieldX className="w-8 h-8" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Access forbidden</h1>
      <p className="text-slate-400 max-w-md mb-8 text-sm">
        Your current account level does not have permissions to modify these enterprise workspace controls.
      </p>
      <Link
        href="/"
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-md transition-colors border-0 text-sm no-underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Dashboard</span>
      </Link>
    </div>
  );
}

/**
 * System Maintenance View (503)
 */
export function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8">
      <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 mb-6">
        <Wrench className="w-8 h-8 animate-pulse" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Scheduled Maintenance</h1>
      <p className="text-slate-400 max-w-md mb-8 text-sm">
        We are currently upgrading our core AI engine and optimizing database indexes to accelerate your placement times. We will return shortly.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium px-5 py-2.5 rounded-md transition-colors cursor-pointer text-sm"
      >
        <span>Reload Page</span>
      </button>
    </div>
  );
}
