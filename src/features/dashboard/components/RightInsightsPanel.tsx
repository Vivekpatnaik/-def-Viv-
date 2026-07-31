'use client';

import React from 'react';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { Bot, TrendingUp, Calendar, ChevronRight } from 'lucide-react';

export function RightInsightsPanel() {
  return (
    <div className="space-y-6 text-left">
      {/* Widget 1: AI Coach Copilot */}
      <Card className="p-6 border-blue-900 bg-slate-900/50">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="w-5 h-5 text-blue-500 animate-pulse" />
          <h3 className="text-sm font-semibold text-white">AI Coach Copilot</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          {"\"Alex, you have made outstanding progress in communication practice. However, your database indexing scores remain a clear vulnerability. To maximize your callback rate, prioritize the database indexing exercises this evening.\""}
        </p>
        <button className="flex items-center justify-between w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-xs text-blue-500 hover:text-blue-400 hover:border-slate-700 transition-all cursor-pointer">
          <span>Message Coach</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </Card>

      {/* Widget 2: Industry Hiring Trends */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          <h3 className="text-sm font-semibold text-white">Market Hiring Trends</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Node.js Server Roles</span>
            <Badge variant="success">+18% MoM</Badge>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Next.js Specialists</span>
            <Badge variant="success">+24% MoM</Badge>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">SQL Tuning Experts</span>
            <Badge variant="neutral">Steady</Badge>
          </div>
        </div>
      </Card>

      {/* Widget 3: Upcoming reminders */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-semibold text-white">Upcoming Events</h3>
        </div>
        <div className="space-y-3 text-xs">
          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded">
            <span className="font-semibold text-white">Google Mock Interview</span>
            <p className="text-[10px] text-slate-500 mt-1">Tomorrow, 3:00 PM (Adaptive Setup)</p>
          </div>
          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded">
            <span className="font-semibold text-white">Resume Sync Nudge</span>
            <p className="text-[10px] text-slate-500 mt-1">Friday, 12:00 PM (Automatic update)</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
