'use client';

import React from 'react';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { Compass, CheckCircle } from 'lucide-react';

export function RoadmapWidget() {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-blue-500" />
          <h3 className="text-sm font-semibold text-white">Active Roadmap Milestones</h3>
        </div>
        <Badge variant="brand">Week 2 of 12</Badge>
      </div>

      <div className="space-y-5 text-left">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-300">Overall Progress</span>
            <span className="text-white">15% completed</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div className="bg-blue-600 h-full w-[15%] transition-all duration-1000" />
          </div>
        </div>

        {/* Vertical Nodes */}
        <div className="relative pl-6 border-l-2 border-slate-800 space-y-5 mt-4 ml-3">
          {/* Node 1: Completed */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 bg-emerald-950 border border-emerald-800 text-emerald-500 rounded-full w-4 h-4 flex items-center justify-center">
              <CheckCircle className="w-3 h-3" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white">Milestone 1: Web Foundations</span>
              <p className="text-[10px] text-slate-500 mt-0.5">HTTP protocols, browser caches, and DOM rendering.</p>
            </div>
          </div>

          {/* Node 2: Active */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 bg-blue-600 rounded-full w-4 h-4 ring-4 ring-blue-950" />
            <div>
              <span className="text-xs font-semibold text-blue-500">Milestone 2: Server-Side Frameworks (Active)</span>
              <p className="text-[10px] text-slate-400 mt-0.5">Next.js App Router routing structures, layouts, and server actions.</p>
            </div>
          </div>

          {/* Node 3: Locked */}
          <div className="relative">
            <div className="absolute -left-[31px] top-0 bg-slate-950 border border-slate-800 rounded-full w-4 h-4" />
            <div>
              <span className="text-xs font-semibold text-slate-500">Milestone 3: Advanced Database Tuning</span>
              <p className="text-[10px] text-slate-600 mt-0.5">Composite indexes, partial scans, and pgvector operations.</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
