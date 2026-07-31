'use client';

import React from 'react';
import { Card } from '@/shared/components/ui/Card';
import { Upload, Calendar, Play } from 'lucide-react';
import { useToast } from '@/shared/providers/ToastProvider';

export function QuickActions() {
  const { addToast } = useToast();

  const actions = [
    { name: 'Upload Resume', icon: Upload, description: 'Analyze ATS keywords', action: () => addToast('Opening resume upload module...', 'info') },
    { name: 'Practice Sandbox', icon: Play, description: 'Benchmark active skills', action: () => addToast('Launching technical coding sandbox...', 'info') },
    { name: 'Mock Interview', icon: Calendar, description: 'Adaptive technical prep', action: () => addToast('Configuring adaptive AI interview session...', 'info') },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-sm font-semibold text-white mb-4 text-left">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map((act) => (
          <button
            key={act.name}
            onClick={act.action}
            className="flex items-center gap-3 p-4 bg-slate-950 border border-slate-800 rounded-md hover:border-blue-600 hover:bg-slate-900 transition-all cursor-pointer text-left w-full"
          >
            <div className="p-2 bg-blue-950 border border-blue-800 text-blue-500 rounded">
              <act.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white block">{act.name}</span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">{act.description}</span>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}
