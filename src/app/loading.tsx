'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse w-full">
      <div className="h-10 bg-slate-900 border border-slate-800 rounded-md w-48 mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-32 bg-slate-900 border border-slate-800 rounded-lg p-6"></div>
        <div className="h-32 bg-slate-900 border border-slate-800 rounded-lg p-6"></div>
        <div className="h-32 bg-slate-900 border border-slate-800 rounded-lg p-6"></div>
      </div>
      <div className="h-64 bg-slate-900 border border-slate-800 rounded-lg p-6 mt-4"></div>
    </div>
  );
}
