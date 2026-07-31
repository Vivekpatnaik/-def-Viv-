'use client';

import React from 'react';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { ShieldAlert, Cpu, ArrowUpRight, TrendingUp } from 'lucide-react';

export function AIInsights() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <h3 className="text-sm font-semibold text-white">AI Diagnostics & Market Insights</h3>
        <Badge variant="brand">Claude 3.5 Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Highlight 1: Weakness */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-md flex gap-3 text-left">
          <div className="p-2 bg-rose-950/50 border border-rose-800 text-rose-500 rounded-md shrink-0 h-10 w-10 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1">Critical Skill Gap</span>
            <span className="text-sm font-semibold text-white">Next.js App Router Architecture</span>
            <p className="text-xs text-slate-500 mt-1">Found missing keywords on your active resume. Recruiter call-backs reduced by 40%.</p>
          </div>
        </div>

        {/* Highlight 2: Recommended Project */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-md flex gap-3 text-left">
          <div className="p-2 bg-blue-950/50 border border-blue-800 text-blue-500 rounded-md shrink-0 h-10 w-10 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1">Recommended Project</span>
            <span className="text-sm font-semibold text-white">Distributed Query Orchestrator</span>
            <p className="text-xs text-slate-500 mt-1">Completing this verified project adds proof of Node.js routing and caching competencies.</p>
          </div>
        </div>

        {/* Highlight 3: Most Improved */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-md flex gap-3 text-left">
          <div className="p-2 bg-emerald-950/50 border border-emerald-800 text-emerald-500 rounded-md shrink-0 h-10 w-10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1">Most Improved Skill</span>
            <span className="text-sm font-semibold text-white">Speech pacing & confidence</span>
            <p className="text-xs text-slate-500 mt-1">Your verbal pace is now 125 WPM. Standard HR screening pass probability raised to 85%.</p>
          </div>
        </div>

        {/* Highlight 4: Market Trend */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-md flex gap-3 text-left">
          <div className="p-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-md shrink-0 h-10 w-10 flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1">Market Demand Nudge</span>
            <span className="text-sm font-semibold text-white">Full-stack streaming endpoints</span>
            <p className="text-xs text-slate-500 mt-1">Enterprise job descriptions mentioning server-sent events rose by 25% this month.</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
