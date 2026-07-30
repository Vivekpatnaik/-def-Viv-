'use client';

import React from 'react';
import { Home, FileText, Compass, Calendar, Briefcase, Settings } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { name: 'Dashboard', icon: Home, href: '/' },
  { name: 'Resume Intel', icon: FileText, href: '#' },
  { name: 'Career Roadmap', icon: Compass, href: '#' },
  { name: 'Practice Sandbox', icon: Calendar, href: '#' },
  { name: 'Applications', icon: Briefcase, href: '#' },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800 text-slate-300 h-screen sticky top-0 p-4 shrink-0">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold text-white">OS</div>
        <span className="font-semibold text-lg text-white">CareerOS AI</span>
      </div>
      <nav className="flex-1 flex flex-col gap-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-900 hover:text-white transition-colors"
          >
            <item.icon className="w-5 h-5 text-slate-400" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="border-t border-slate-800 pt-4">
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-900 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5 text-slate-400" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
