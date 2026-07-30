'use client';

import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { useAuth } from '../../providers/AuthProvider';
import { Sun, Moon, Search, Bell } from 'lucide-react';

export function Header() {
  const { toggleTheme, theme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between px-6 bg-slate-900 border-b border-slate-800 shrink-0 sticky top-0 z-40">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Quick search... (Press ⌘K)"
            className="w-full bg-slate-950 border border-slate-800 rounded-md py-1.5 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder-slate-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications Toggle */}
        <button
          className="p-2 text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer"
          aria-label="View notifications"
        >
          <Bell className="w-5 h-5" />
        </button>

        {/* Profile Card */}
        {user && (
          <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-semibold text-white">
              AR
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-sm font-medium text-white">{user.fullName}</span>
              <span className="text-xs text-slate-400 capitalize">{user.role}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
