'use client';

import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
}

export function Badge({ children, variant = 'neutral', className = '', ...props }: BadgeProps) {
  const baseStyle =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border select-none';

  const variants = {
    brand: 'bg-blue-950 text-blue-400 border-blue-800',
    success: 'bg-emerald-950 text-emerald-400 border-emerald-800',
    warning: 'bg-amber-950 text-amber-400 border-amber-800',
    danger: 'bg-rose-950 text-rose-400 border-rose-800',
    neutral: 'bg-slate-950 text-slate-400 border-slate-800',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
