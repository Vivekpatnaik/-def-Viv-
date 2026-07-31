'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function Card({ title, description, children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-left ${className}`}
      {...props}
    >
      {title && <h3 className="text-base font-semibold text-white mb-1">{title}</h3>}
      {description && <p className="text-xs text-slate-400 mb-4">{description}</p>}
      {children}
    </div>
  );
}
