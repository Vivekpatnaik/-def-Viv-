'use client';

import React from 'react';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { CheckCircle2, Play, Clock, Sparkles } from 'lucide-react';
import { useToast } from '@/shared/providers/ToastProvider';

export interface Task {
  id: string;
  task: string;
  reason: string;
  estimatedMinutes: number;
  priority: 'high' | 'medium' | 'low';
}

interface TodayPlanProps {
  tasks: Task[];
}

export function TodayPlan({ tasks }: TodayPlanProps) {
  const { addToast } = useToast();

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-500" />
          <h2 className="text-sm font-semibold text-white">{"Today's Operating Plan"}</h2>
        </div>
        <span className="text-xs text-slate-500 font-medium">3 targeted hiring goals</span>
      </div>

      <div className="space-y-4">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-slate-950 border border-slate-800 rounded-md hover:border-slate-700 transition-colors gap-4"
          >
            <div className="flex gap-3 text-left">
              <CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-slate-200">{t.task}</span>
                <p className="text-xs text-slate-400 mt-1">{t.reason}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-4 h-4" />
                <span>{t.estimatedMinutes}m</span>
              </div>
              <Badge variant={t.priority === 'high' ? 'danger' : t.priority === 'medium' ? 'warning' : 'neutral'}>
                {t.priority}
              </Badge>
              <button
                onClick={() => {
                  addToast(`Workspace module initiated: ${t.task}`, 'info');
                }}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-1.5 px-3 rounded border-0 text-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
