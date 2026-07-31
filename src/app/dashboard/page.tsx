'use client';

import React from 'react';
import { ReadinessGauge } from '@/features/dashboard/components/ReadinessGauge';
import { TodayPlan, Task } from '@/features/dashboard/components/TodayPlan';
import { AIInsights } from '@/features/dashboard/components/AIInsights';
import { RoadmapWidget } from '@/features/dashboard/components/RoadmapWidget';
import { TrackerKanban } from '@/features/dashboard/components/TrackerKanban';
import { QuickActions } from '@/features/dashboard/components/QuickActions';
import { RightInsightsPanel } from '@/features/dashboard/components/RightInsightsPanel';
import { useAuthStore } from '@/shared/store/authStore';
import { Sparkles, Zap, Trophy, ShieldCheck } from 'lucide-react';

const STATIC_TASKS: Task[] = [
  {
    id: 'task-1',
    task: 'Quantify Achievements on your Resume',
    reason: 'Your resume overall score is low. Rewrite at least three bullet points using the STAR methodology.',
    estimatedMinutes: 30,
    priority: 'high',
  },
  {
    id: 'task-2',
    task: 'Solve Intermediate Coding Challenge',
    reason: 'Consistency is key to passing technical coding assessments. Solve one database-indexing problem.',
    estimatedMinutes: 45,
    priority: 'medium',
  },
  {
    id: 'task-3',
    task: 'Hone Speech Clarity and Verbal Delivery',
    reason: 'Explain a technical system architecture topic for 3 minutes inside the communication practices module.',
    estimatedMinutes: 15,
    priority: 'low',
  },
];

export default function DashboardPage() {
  const { user } = useAuthStore();

  const welcomeName = user?.fullName || 'Candidate';
  const userRole = user?.role || 'student';

  return (
    <div className="space-y-8">
      {/* 1. Header welcome banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-slate-900 border border-slate-800 rounded-lg gap-4 text-left">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-white">Welcome, {welcomeName}</h1>
            <Sparkles className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-xs text-slate-400">
            Targeting <span className="font-semibold text-white">Senior Frontend Engineer</span> roles • Mapped to example.com
          </p>
        </div>

        {/* Dynamic Streak / Stats badges */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-300">
            <Zap className="w-4 h-4 text-amber-500 fill-current" />
            <span>4 Day Streak</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-300">
            <Trophy className="w-4 h-4 text-amber-500 fill-current" />
            <span>1,200 XP</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="capitalize">{userRole} Premium</span>
          </div>
        </div>
      </div>

      {/* 2. Three-column grid layout as defined in Section 5.1 of the Design Bible */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left & Middle Column (Col span 2) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Readiness gauges indicators list */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ReadinessGauge label="Hiring Readiness" score={82} weightLabel="Excellent" />
            <ReadinessGauge label="Resume Score" score={92} weightLabel="Highly Optimized" />
            <ReadinessGauge label="Coding Practice" score={75} weightLabel="Solid Progress" />
            <ReadinessGauge label="Interview Readiness" score={80} weightLabel="Ready" />
          </div>

          {/* Quick Actions Panel */}
          <QuickActions />

          {/* Daily targeted tasks plan list */}
          <TodayPlan tasks={STATIC_TASKS} />

          {/* AI Diagnostics list */}
          <AIInsights />

          {/* Core Roadmap Widget */}
          <RoadmapWidget />

          {/* Applications Tracker summary */}
          <TrackerKanban />
        </div>

        {/* Right side context insights Panel */}
        <div className="space-y-8">
          <RightInsightsPanel />
        </div>
      </div>
    </div>
  );
}
