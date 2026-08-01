'use client';

import React, { useState } from 'react';
import {
  User,
  Zap,
  TrendingUp,
  Sliders,
  Calendar,
  History,
  Check,
} from 'lucide-react';
import { useToast } from '@/shared/providers/ToastProvider';
import { TwinService } from '../services/twinService';
import {
  CareerDigitalTwin,
  TwinVersionRecord,
} from '../schemas';

type ActiveTabType = 'summary' | 'timeline' | 'profiles' | 'history' | 'analytics';

export function TwinWorkspace() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('summary');
  const { addToast } = useToast();

  // 1. Career Digital Twin State (Single source of truth profile)
  const [twin, setTwin] = useState<CareerDigitalTwin | null>({
    id: '123e4567-e89b-12d3-a456-426614177001',
    versionNumber: 1,
    updatedAt: '10:00 AM',
    explanationOfLastUpdate: 'Initial assessment matching baseline skills completed.',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    targetRole: 'Senior Frontend Engineer',
    experienceYears: 4,
    readinessIndex: 78,
    interviewIndex: 74,
    skills: [
      { skillName: 'React.js rendering', currentLevel: 4, targetLevel: 5, confidenceScore: 85 },
      { skillName: 'TypeScript types', currentLevel: 3, targetLevel: 5, confidenceScore: 78 },
      { skillName: 'Webpack performance chunking', currentLevel: 2, targetLevel: 4, confidenceScore: 45 },
    ],
    learningProfile: {
      learningSpeed: 'fast',
      preferredResources: ['Official Docs', 'GitHub Repos'],
      weakTopics: ['Webpack performance', 'GIN indexing partial filters'],
      strongTopics: ['React components state lifecycle', 'Tailwind styling templates'],
      completionRatePercent: 82,
      consistencyPercent: 94,
    },
    interviewProfile: {
      pastSessionsCount: 4,
      questionTypesTested: ['Web performance', 'System design layouts', 'Behavioral STAR'],
      weakAreas: ['Webpack chunking', 'GIN indexing'],
      strongAreas: ['React closure binds', 'Mobile layouts'],
      communicationScore: 85,
      technicalScore: 72,
      leadershipScore: 80,
      improvementTrend: [60, 68, 72, 74],
    },
    projects: [
      {
        projectTitle: 'Multi-Tenant EventBus Middleware',
        technologies: ['TypeScript', 'Zod', 'Redis'],
        complexity: 'HARD',
        architectureBlueprint: 'Pub/sub asynchronous dispatch with reflective zod validations schema.',
        businessValueScore: 85,
        portfolioValueScore: 90,
      },
    ],
    applicationProfile: {
      totalApplications: 12,
      interviewsCount: 4,
      offersCount: 1,
      rejectionsCount: 2,
      activeFollowUpsCount: 3,
    },
    preferences: {
      preferredDomains: ['Web performance', 'AI tooling', 'B2B SaaS'],
      preferredRoles: ['Senior Frontend Developer', 'Fullstack Engineer'],
      preferredCompanies: ['Vercel', 'Linear', 'Stripe'],
      locationStyle: 'remote',
      expectedSalary: '$140,000 / year',
      learningStyle: 'hands-on development coding sandbox',
    },
    memory: {
      mistakesLog: ['Missed Webpack dynamic imported chunk sizes', 'Unconventional GIN partial database indices'],
      achievementsLog: ['Validated asynchronous Pub/sub EventBus', 'Achieved 82% topic mastery Curve score'],
      repeatedWeaknesses: ['Webpack bundle performance'],
      repeatedSuccesses: ['State rendering logic loops validations'],
      careerChangesCount: 1,
    },
    timeline: [
      {
        id: '123e4567-e89b-12d3-a456-426614177111',
        eventTitle: 'Conducted first adaptive mock interview',
        category: 'interviews',
        description: 'Completed technical simulation on state rendering closures. Calculated initial interview index.',
        timestamp: 'Yesterday',
      },
      {
        id: '123e4567-e89b-12d3-a456-426614177112',
        eventTitle: 'Validated EventBus projects repository',
        category: 'projects',
        description: 'Successfully connected Git repository and compiled code. Verified skills with badge.',
        timestamp: '3 Days Ago',
      },
      {
        id: '123e4567-e89b-12d3-a456-426614177113',
        eventTitle: 'Completed baseline assessment',
        category: 'assessment',
        description: 'Completed profile setup goals, uploaded resume, and mapped first technical skill gaps.',
        timestamp: '5 Days Ago',
      },
    ],
  });

  // 2. Twin Version Snapshots History State
  const [twinHistory, setTwinHistory] = useState<TwinVersionRecord[]>([]);

  // --- HANDLERS ---

  const handleEvolveTwin = async (activity: 'assessment' | 'learning' | 'projects' | 'interviews' | 'applications' | 'offers' | 'growth') => {
    if (!twin) return;
    addToast(`Evolving Career Digital Twin on completing '${activity}' task...`, 'info');

    // Create current state snapshot in version history first
    const currentSnapshot: TwinVersionRecord = {
      versionNumber: twin.versionNumber,
      timestamp: new Date().toLocaleTimeString(),
      explanation: twin.explanationOfLastUpdate,
      twinData: twin,
    };
    setTwinHistory([currentSnapshot, ...twinHistory]);

    try {
      const evolved = await TwinService.evolveTwinOnActivity(
        twin,
        activity,
        { score: 92, verifiedBadge: 'Web performance chunking' },
        `Completed and verified ${activity} objectives. Skill confidence updated.`
      );
      setTwinTwin(evolved);
      addToast(`Career Digital Twin evolved to Version ${evolved.versionNumber}!`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Evolution failed.', 'error');
    }
  };

  const setTwinTwin = (evolved: CareerDigitalTwin) => {
    // Increment readiness and skills levels to visually show growth in mock testing
    setTwin({
      ...evolved,
      readinessIndex: Math.min(100, evolved.readinessIndex + 2),
      interviewIndex: Math.min(100, evolved.interviewIndex + 2),
    });
  };

  const handleRollback = (ver: TwinVersionRecord) => {
    setTwin(ver.twinData);
    addToast(`Successfully rolled back Digital Twin to Version ${ver.versionNumber}!`, 'success');
  };

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Career Digital Twin Engine</h1>
          <p className="text-slate-400 text-sm">Evolving stateful representations of skills, experience, and timeline decisions</p>
        </div>

        {twin && (
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 py-1.5 px-3 rounded text-xs text-slate-300 font-semibold shrink-0">
            <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Active State: Version {twin.versionNumber}</span>
          </div>
        )}
      </div>

      {twin && (
        <div className="flex border-b border-slate-800 gap-1 overflow-x-auto text-xs font-semibold scrollbar-none">
          {[
            { id: 'summary', label: 'Evolving Representation', icon: User },
            { id: 'timeline', label: 'Evolving Timeline', icon: Calendar },
            { id: 'profiles', label: 'Profile Sub-metrics', icon: Sliders },
            { id: 'history', label: 'Snapshot Control', icon: History },
            { id: 'analytics', label: 'Growth Curves', icon: TrendingUp },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTabType)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 bg-transparent border-0 cursor-pointer text-xs whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* TAB 1: SUMMARY REPRESENTATION */}
      {activeTab === 'summary' && twin && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 align-top">
          {/* Main indicators scoreboard */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-center space-y-1">
                <span className="text-xs text-slate-500 block">Evolving Readiness index</span>
                <span className="text-2xl font-bold text-blue-500">{twin.readinessIndex}%</span>
              </div>
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-center space-y-1">
                <span className="text-xs text-slate-500 block">Evolving Interview index</span>
                <span className="text-2xl font-bold text-emerald-400">{twin.interviewIndex}%</span>
              </div>
            </div>

            {/* Skills meters lists */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
              <h3 className="text-sm font-semibold text-white">Evolving Skill Confidence quotients</h3>
              <div className="space-y-4 text-xs">
                {twin.skills.map((sk) => (
                  <div key={sk.skillName} className="space-y-1">
                    <div className="flex justify-between items-center text-slate-200">
                      <span>{sk.skillName} (Lvl {sk.currentLevel}/{sk.targetLevel})</span>
                      <span className="font-bold text-blue-500">{sk.confidenceScore}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full" style={{ width: `${sk.confidenceScore}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Evolve triggers cockpit */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-4 text-xs h-fit">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-800">
              <Sliders className="w-4 h-4 text-blue-500" />
              <span>Evolve representation triggers</span>
            </h3>
            <p className="text-[10px] text-slate-500">Trigger activities to automatically calculate readiness metrics and skills levels:</p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => handleEvolveTwin('assessment')}
                className="bg-slate-950 hover:bg-slate-850 text-slate-300 font-semibold py-2 px-3 rounded text-[10px] cursor-pointer border border-slate-850"
              >
                Assess path
              </button>
              <button
                onClick={() => handleEvolveTwin('learning')}
                className="bg-slate-950 hover:bg-slate-850 text-slate-300 font-semibold py-2 px-3 rounded text-[10px] cursor-pointer border border-slate-850"
              >
                Complete Study
              </button>
              <button
                onClick={() => handleEvolveTwin('projects')}
                className="bg-slate-950 hover:bg-slate-850 text-slate-300 font-semibold py-2 px-3 rounded text-[10px] cursor-pointer border border-slate-850"
              >
                Validate Repo
              </button>
              <button
                onClick={() => handleEvolveTwin('interviews')}
                className="bg-slate-950 hover:bg-slate-850 text-slate-300 font-semibold py-2 px-3 rounded text-[10px] cursor-pointer border border-slate-850"
              >
                Mock Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EVOLVING TIMELINE */}
      {activeTab === 'timeline' && twin && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Career Evolution Timeline logs</h3>
            <p className="text-xs text-slate-400">Chronological representation of decisions, milestones completions, and growth actions</p>
          </div>

          <div className="relative pl-6 border-l border-slate-800 space-y-6 ml-3 pt-2">
            {twin.timeline.map((event) => (
              <div key={event.id} className="relative space-y-1.5 text-xs text-left">
                {/* Timeline node icon mapping */}
                <div className="absolute -left-[31px] top-1 rounded-full w-3.5 h-3.5 bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-[8px]" />

                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white block">{event.eventTitle}</span>
                  <span className="text-[10px] bg-slate-950 border border-slate-850 text-slate-500 px-2 py-0.5 rounded font-bold uppercase">
                    {event.category}
                  </span>
                </div>
                <p className="text-slate-400 leading-normal">{event.description}</p>
                <span className="text-[10px] text-slate-500 block">Happened: {event.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SUB-PROFILES */}
      {activeTab === 'profiles' && twin && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Evolving Sub-profile parameters details</h3>
            <p className="text-xs text-slate-400">Evolving states across learning speeds, speech profiles, and verified projects architecture</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {/* Learning Profile details */}
            <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-3">
              <span className="font-bold text-white block border-b border-slate-900 pb-1.5">Learning Profile</span>
              <div className="space-y-1 text-slate-400 leading-normal">
                <div>Learning Speed: <strong className="text-white uppercase">{twin.learningProfile.learningSpeed}</strong></div>
                <div>Completed study percentage: <strong className="text-white">{twin.learningProfile.completionRatePercent}%</strong></div>
                <div>Weak areas focus: <strong className="text-rose-400 block">{twin.learningProfile.weakTopics.join(', ')}</strong></div>
              </div>
            </div>

            {/* Speech Profile details */}
            <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-3">
              <span className="font-bold text-white block border-b border-slate-900 pb-1.5">Communication profile</span>
              <div className="space-y-1 text-slate-400 leading-normal">
                <div>Speaking accuracy quotient: <strong className="text-white">{twin.interviewProfile.communicationScore}/100</strong></div>
                <div>Leadership markers detected: <strong className="text-emerald-400">Verified Strong</strong></div>
                <div>Weak speech segments: <strong className="text-rose-400 block">Nervous pauses</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HISTORY REVISION CONTROL */}
      {activeTab === 'history' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white">Historical Snapshot Revision Logs</h3>
          <p className="text-xs text-slate-400">Review historical twin states snapshots and trigger rollback events if goals change</p>
          <div className="space-y-4 pt-2">
            {twinHistory.map((ver) => (
              <div
                key={ver.versionNumber}
                className="flex justify-between items-center p-4 bg-slate-950 border border-slate-850 rounded text-xs"
              >
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-white">Twin Version snapshot V{ver.versionNumber}</span>
                  <p className="text-xs text-slate-500">Captured at {ver.timestamp} • Explanation: &ldquo;{ver.explanation}&rdquo;</p>
                </div>
                <button
                  onClick={() => handleRollback(ver)}
                  className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-300 py-1.5 px-3 rounded text-xs cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Rollback State</span>
                </button>
              </div>
            ))}
            {twinHistory.length === 0 && (
              <div className="text-center py-12 text-slate-600 text-xs font-semibold">
                No historical snapshots saved yet. Evolve state to log snapshots.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: PROGRESS CURVES */}
      {activeTab === 'analytics' && twin && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-sm font-semibold text-white">Career Progression Curves</h3>
            <p className="text-xs text-slate-400">Progression timelines curves across mock sessions completions and callbacks success rates</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
            <div className="p-4 bg-slate-950 border border-slate-850 rounded">
              <span className="text-slate-500 block">Total Applications</span>
              <span className="text-xl font-bold text-white">{twin.applicationProfile.totalApplications} Jobs</span>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-850 rounded">
              <span className="text-slate-500 block">Callback Interviews</span>
              <span className="text-xl font-bold text-blue-500">{twin.applicationProfile.interviewsCount} scheduled</span>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-850 rounded">
              <span className="text-slate-500 block">Offers Obtained</span>
              <span className="text-xl font-bold text-emerald-400">{twin.applicationProfile.offersCount} Verified</span>
            </div>
          </div>

          {/* SVG Interview curve trend lines */}
          <div className="p-4 bg-slate-950 border border-slate-850 rounded-lg space-y-4 text-xs">
            <span className="font-bold text-slate-300 block">Technical Mock interview index curves over sessions</span>
            <div className="h-32 w-full flex items-end justify-between gap-1 pt-4">
              {twin.interviewProfile.improvementTrend.map((score, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] text-slate-400">{score}%</span>
                  <div className="w-full bg-blue-600/20 hover:bg-blue-600 rounded transition-all" style={{ height: `${score}px` }} />
                  <span className="text-[9px] text-slate-500">Session {idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
