'use client';

import React from 'react';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';

interface GaugeProps {
  label: string;
  score: number;
  weightLabel: string;
}

export function ReadinessGauge({ label, score, weightLabel }: GaugeProps) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (score / 100) * circumference;

  // Determine accessible colors based on Design System rules (Section 3.4)
  const colorMap =
    score >= 80 ? 'text-emerald-500' : score >= 50 ? 'text-amber-500' : 'text-rose-500';

  return (
    <Card className="flex flex-col items-center justify-center p-6 text-center space-y-3">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</h3>
      <div className="relative w-24 h-20 flex items-center justify-center">
        {/* SVG Circular progress */}
        <svg className="w-20 h-20 -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="stroke-slate-800"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            className={`transition-all duration-1000 ${colorMap}`}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-lg font-bold text-white">{score}%</span>
      </div>
      <Badge variant={score >= 80 ? 'success' : score >= 50 ? 'warning' : 'danger'}>
        {weightLabel}
      </Badge>
    </Card>
  );
}
