'use client';

import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(() => {
    if (typeof window !== 'undefined') {
      return !window.navigator.onLine;
    }
    return false;
  });

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bg-rose-600 text-white text-center py-2 px-4 text-xs font-semibold flex items-center justify-center gap-2 z-50 shrink-0 sticky top-0">
      <WifiOff className="w-4 h-4 animate-pulse" />
      <span>You are currently browsing offline. Some real-time AI and database operations may be unavailable.</span>
    </div>
  );
}
