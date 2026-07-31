'use client';

import React from 'react';
import { NAVIGATION_MAP } from '../../constants/navigation';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
  const coreItems = NAVIGATION_MAP.filter((item) => item.category === 'core');
  const communityItems = NAVIGATION_MAP.filter((item) => item.category === 'community');
  const adminItems = NAVIGATION_MAP.filter((item) => item.category === 'admin');

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800 text-slate-300 h-screen sticky top-0 p-4 shrink-0 overflow-y-auto">
      <div className="flex items-center gap-2 mb-6 px-2 sticky top-0 bg-slate-950 pb-2 z-10">
        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold text-white shrink-0">OS</div>
        <span className="font-semibold text-base text-white">CareerOS AI</span>
      </div>

      <div className="flex-1 flex flex-col gap-5 text-xs">
        {/* Core Journey Sections */}
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 block mb-2">Core Journey</span>
          <nav className="flex flex-col gap-1">
            {coreItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-900 hover:text-white transition-colors text-slate-400 no-underline"
              >
                <item.icon className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Community & Collab */}
        {communityItems.length > 0 && (
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 block mb-2">Collaboration</span>
            <nav className="flex flex-col gap-1">
              {communityItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-900 hover:text-white transition-colors text-slate-400 no-underline"
                >
                  <item.icon className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Admin Section */}
        {adminItems.length > 0 && (
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 block mb-2">Administration</span>
            <nav className="flex flex-col gap-1">
              {adminItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-900 hover:text-white transition-colors text-slate-400 no-underline"
                >
                  <item.icon className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      <div className="border-t border-slate-800 pt-4 mt-4 sticky bottom-0 bg-slate-950">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-900 hover:text-white transition-colors text-slate-400 no-underline text-xs"
        >
          <Settings className="w-4 h-4 text-slate-500 shrink-0" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
