'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { OfflineIndicator } from './OfflineIndicator';
import { Breadcrumb } from './Breadcrumb';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans">
      {/* Sidebar - Desktop Layout */}
      <Sidebar />

      {/* Main Panel Content Container */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Connection Offline Indicator */}
        <OfflineIndicator />

        {/* Global Nav Header */}
        <Header />

        {/* Dynamic Inner Viewport Workspace */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 pb-24 md:pb-8 bg-slate-950 text-slate-100">
          <div className="max-w-7xl mx-auto w-full">
            {/* Dynamic Page Hierarchy Breadcrumbs */}
            <Breadcrumb />
            {children}
          </div>
        </main>

        {/* Thumb Friendly Bottom Mobile Nav bar */}
        <MobileNav />
      </div>
    </div>
  );
}
