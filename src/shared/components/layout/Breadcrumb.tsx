'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export function Breadcrumb() {
  const pathname = usePathname() || '/';

  // Parse dynamic pathname into segments
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium" aria-label="Breadcrumb">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-white transition-colors text-slate-500 no-underline"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        const displayLabel = segment.replace(/-/g, ' ');

        return (
          <React.Fragment key={segment}>
            <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
            {isLast ? (
              <span className="text-slate-300 capitalize">{displayLabel}</span>
            ) : (
              <Link
                href={href}
                className="hover:text-white transition-colors capitalize text-slate-500 no-underline"
              >
                {displayLabel}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
