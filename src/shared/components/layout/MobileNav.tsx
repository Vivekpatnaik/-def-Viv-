'use client';

import React from 'react';
import { Home, FileText, Compass, Calendar, Briefcase } from 'lucide-react';
import Link from 'next/link';

const mobileItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Resume', icon: FileText, href: '#' },
  { name: 'Roadmap', icon: Compass, href: '#' },
  { name: 'Practice', icon: Calendar, href: '#' },
  { name: 'Jobs', icon: Briefcase, href: '#' },
];

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950 border-t border-slate-800 flex items-center justify-around z-40 px-2">
      {mobileItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors py-1"
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] font-medium">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
