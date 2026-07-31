'use client';

import React from 'react';
import { Card } from '@/shared/components/ui/Card';
import { useToast } from '@/shared/providers/ToastProvider';

interface TrackerStage {
  label: string;
  count: number;
  colorClass: string;
}

const STAGES: TrackerStage[] = [
  { label: 'Saved', count: 12, colorClass: 'bg-slate-800 text-slate-400' },
  { label: 'Applied', count: 8, colorClass: 'bg-blue-950 text-blue-400' },
  { label: 'OA', count: 4, colorClass: 'bg-amber-950 text-amber-400' },
  { label: 'Interview', count: 2, colorClass: 'bg-emerald-950 text-emerald-400' },
  { label: 'Offer', count: 1, colorClass: 'bg-emerald-900 text-white' },
];

export function TrackerKanban() {
  const { addToast } = useToast();

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold text-white">Application Pipeline</h3>
        <span className="text-xs text-slate-500 font-medium">1 active offer</span>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {STAGES.map((s) => (
          <button
            key={s.label}
            onClick={() => {
              addToast(`Navigating to applications tracker: ${s.label} column.`, 'info');
            }}
            className="flex flex-col items-center justify-center p-3 bg-slate-950 border border-slate-800 rounded hover:border-slate-700 hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <span className="text-sm font-bold text-white mb-1">{s.count}</span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{s.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}
