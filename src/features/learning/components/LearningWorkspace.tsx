'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Layers,
  Sparkles,
  TrendingUp,
  Clock,
  Award,
  ShieldCheck,
  Code,
} from 'lucide-react';
import { useToast } from '@/shared/providers/ToastProvider';
import { LearningService } from '../services/learningService';
import {
  LearningPlan,
  PrepModule,
  RevisionTask,
  PracticeQuestion,
  ProjectRecommendation,
  LearningAnalytics,
} from '../schemas';

type ActiveTabType = 'timeline' | 'modules' | 'revision' | 'practice' | 'projects' | 'analytics';

export function LearningWorkspace() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('timeline');
  const [isProcessing, setIsProcessing] = useState(false);
  const { addToast } = useToast();

  // Mock Career Memory Data
  const mockMemory = {
    userGoal: 'Become a Senior Frontend Engineer at Vercel within 6 Months',
    weakTopics: ['Webpack bundling, SQL indices, GIN constraints'],
  };

  // 1. Daily Prep Timeline State
  const [learningPlan, setLearningPlan] = useState<LearningPlan | null>({
    id: '123e4567-e89b-12d3-a456-426614176001',
    dailyTasks: [
      {
        id: '123e4567-e89b-12d3-a456-426614176011',
        title: 'Fulfill NextJS Server Components and layout rendering loops guides',
        priority: 'CRITICAL',
        timeToCompleteMinutes: 45,
        officialResourceUrl: 'https://nextjs.org/docs',
        officialResourceTitle: 'NextJS Server Components Docs',
        outcome: 'Understand hydration cycles and reduce layout CLS below 0.1.',
      },
      {
        id: '123e4567-e89b-12d3-a456-426614176012',
        title: 'Review React State documentation on mounting closures',
        priority: 'HIGH',
        timeToCompleteMinutes: 30,
        officialResourceUrl: 'https://react.dev/learn',
        officialResourceTitle: 'React State Lifecycle Guides',
        outcome: 'Prevent memory leaks and mounting closures in react hooks.',
      },
    ],
    weeklyTheme: 'Web Performance, Bundling, & GIN Constraints',
    weeklyStudyHoursGoal: 20,
    monthlyTargetMilestone: 'Achieve 85% placement readiness score',
  });

  // 2. Prep Modules State
  const [prepModules, setPrepModules] = useState<PrepModule[]>([
    {
      moduleTitle: 'Technical Web Architectures',
      category: 'technical',
      topicsList: ['React renders', 'NextJS SSR', 'Vercel CDN routing'],
      completionPercentage: 80,
    },
    {
      moduleTitle: 'Aptitude & Quantitative Analytics',
      category: 'aptitude',
      topicsList: ['Probability statistics', 'Binary tree search complexity'],
      completionPercentage: 55,
    },
    {
      moduleTitle: 'Verbal communication pitches',
      category: 'verbal',
      topicsList: ['STAR scenario layouts', 'Accent clarity rules'],
      completionPercentage: 90,
    },
  ]);

  // 3. Smart Revision Cockpit State
  const [revisionTasks, setRevisionTasks] = useState<RevisionTask[]>([
    {
      id: '123e4567-e89b-12d3-a456-426614176201',
      conceptTitle: 'Webpack Dynamic Chunking',
      quickNotes: 'Split bundles dynamically using import() to prevent excessive initial load durations and LCP blocks.',
      isWeakTopic: true,
      lastRevisedAt: 'Yesterday',
      revisionPriority: 'CRITICAL',
    },
    {
      id: '123e4567-e89b-12d3-a456-426614176202',
      conceptTitle: 'GIN Partial Indices Filter',
      quickNotes: 'Configure partial filters on Supabase PostgreSQL schemas to speed up matching text queries.',
      isWeakTopic: false,
      lastRevisedAt: '3 Days Ago',
      revisionPriority: 'HIGH',
    },
  ]);

  // 4. Practice Workspace State
  const [practiceQuestions, setPracticeQuestions] = useState<PracticeQuestion[]>([
    {
      id: '123e4567-e89b-12d3-a456-426614176301',
      title: 'Multitenancy query index performance simulation',
      type: 'coding',
      description: 'Implement a structured database migration mapping multi-tenant partial filter indexes on UUID fields in PostgreSQL.',
      idealResponseSummary: 'Query must contain CREATE INDEX with WHERE filters mapping active client tenant IDs.',
      userAnswerText: 'CREATE INDEX idx_tenant_active ON users (id) WHERE tenant_id IS NOT NULL;',
      isPassed: true,
    },
  ]);

  // 5. Portfolio Projects State
  const [projects, setProjects] = useState<ProjectRecommendation[]>([
    {
      id: '123e4567-e89b-12d3-a456-426614176401',
      title: 'Decoupled Asynchronous EventBus Pipeline',
      scale: 'medium',
      techStack: ['TypeScript', 'Zod', 'Redis'],
      complexity: 'HARD',
      architectureBlueprint: 'Construct a pub/sub asynchronous event dispatcher validating message payloads against robust reflective Zod schemas.',
      portfolioValueProposition: 'Proves technical capability to architect loose-coupling and robust serverless integrations.',
    },
  ]);

  // 6. Analytics State
  const [analytics, setAnalytics] = useState<LearningAnalytics | null>({
    totalLearningHours: 34,
    completionRatePercent: 88,
    consistencyStreakDays: 14,
    revisionAccuracyPercent: 92,
    skillGrowthPercent: 12,
    topicMasteryDistribution: [
      { topicName: 'NextJS Server Hooks', masteryScore: 90 },
      { topicName: 'SQL Partial Indexes', masteryScore: 78 },
      { topicName: 'STAR communication', masteryScore: 85 },
    ],
  });

  // --- HANDLERS ---

  const handleGeneratePlan = async () => {
    setIsProcessing(true);
    addToast('Orchestrating weekly curriculum and scheduling daily plans...', 'info');
    try {
      const res = await LearningService.generateLearningPlan(mockMemory);
      setLearningPlan(res);
      addToast('Daily prep curriculum generated!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Curriculum orchestration failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFetchModules = async () => {
    setIsProcessing(true);
    addToast('Updating study modules completions rates...', 'info');
    try {
      const res = await LearningService.getPrepModules(mockMemory);
      setPrepModules(res);
      addToast('Study modules updated successfully!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Modules fetch failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateRevision = async () => {
    setIsProcessing(true);
    addToast('Scanning weak topics and preparing notes...', 'info');
    try {
      const res = await LearningService.generateRevisionPlan(mockMemory);
      setRevisionTasks(res);
      addToast('Smart revision cards compiled!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Revision cards failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGeneratePractice = async () => {
    setIsProcessing(true);
    addToast('Formulating coding challenges and scenarios...', 'info');
    try {
      const res = await LearningService.generatePracticeQuestions(mockMemory);
      setPracticeQuestions(res);
      addToast('New practice scenarios loaded!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Practice load failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFetchProjects = async () => {
    setIsProcessing(true);
    addToast('Architecting project ideas andtech-stacks...', 'info');
    try {
      const res = await LearningService.getProjectRecommendations(mockMemory);
      setProjects(res);
      addToast('Project blueprints architected successfully!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Projects recommend failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFetchAnalytics = async () => {
    setIsProcessing(true);
    addToast('Assembling time-logs and topic mastery curves...', 'info');
    try {
      const res = await LearningService.getLearningAnalytics(mockMemory);
      setAnalytics(res);
      addToast('Mastery metrics and trends compiled!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Analytics fetch failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Learning Orchestration Operating System</h1>
          <p className="text-slate-400 text-sm">Targeted preparation modules, revision flashcards, coding sandboxes, and portfolio project suggestions</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 py-1.5 px-3 rounded text-xs text-slate-300 font-semibold shrink-0">
          <Clock className="w-4 h-4 text-blue-500 animate-pulse" />
          <span>Active Streak: {analytics?.consistencyStreakDays || 14} Days</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-1 overflow-x-auto text-xs font-semibold scrollbar-none">
        {[
          { id: 'timeline', label: 'Daily Prep Plan', icon: Calendar },
          { id: 'modules', label: 'Study Modules', icon: Layers },
          { id: 'revision', label: 'Smart Revision', icon: Award },
          { id: 'practice', label: 'Practice Sandbox', icon: Code },
          { id: 'projects', label: 'Verified Projects', icon: Sparkles },
          { id: 'analytics', label: 'Mastery Curves', icon: TrendingUp },
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

      {/* TAB 1: DAILY PREP PLAN */}
      {activeTab === 'timeline' && learningPlan && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 align-top">
          {/* Main vertical tasks schedule timeline */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Today&apos;s Curriculum tasks</span>
              <button
                onClick={handleGeneratePlan}
                disabled={isProcessing}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1 px-3 rounded text-[10px] border-0 cursor-pointer"
              >
                Orchestrate path
              </button>
            </div>

            <div className="relative pl-6 border-l border-slate-800 space-y-6 ml-3 pt-2">
              {learningPlan.dailyTasks.map((task, idx) => (
                <div key={task.id} className="relative space-y-3">
                  {/* Timeline indicator node */}
                  <div className={`absolute -left-[30px] top-1.5 w-3 h-3 rounded-full border bg-slate-950 ${
                    idx === 0 ? 'border-blue-500' : 'border-slate-800'
                  }`} />

                  <div className="p-4 bg-slate-900 border border-slate-800 rounded text-xs space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white leading-normal">{task.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${
                        task.priority === 'CRITICAL' ? 'bg-red-950 text-red-400 border-red-800 font-bold' :
                        task.priority === 'HIGH' ? 'bg-amber-950 text-amber-500 border-amber-800' :
                        'bg-slate-850 text-slate-400 border-slate-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>

                    <div className="border-t border-slate-950 pt-2.5 space-y-2 text-[11px] text-slate-400">
                      <div className="flex justify-between items-center text-[10px]">
                        <span>Official Reference resource:</span>
                        <a
                          href={task.officialResourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-400 font-semibold no-underline"
                        >
                          {task.officialResourceTitle}
                        </a>
                      </div>
                      <p className="italic">Expected Outcome: {task.outcome}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Time tracker card */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-4 text-xs h-fit">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-800">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span>Orchestrator target scopes</span>
            </h3>
            <div className="space-y-3 text-slate-400">
              <div className="space-y-1">
                <span className="text-slate-500 block">Weekly Theme Focus:</span>
                <span className="text-white font-bold block">{learningPlan.weeklyTheme}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block">Weekly Study Hour target:</span>
                <span className="text-blue-400 font-bold block">{learningPlan.weeklyStudyHoursGoal} Hours</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block">Monthly Milestone objective:</span>
                <span className="text-emerald-400 font-bold block">{learningPlan.monthlyTargetMilestone}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STUDY MODULES */}
      {activeTab === 'modules' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Target preparation OS modules</h3>
              <p className="text-xs text-slate-400">Monitor completion rates across technical, logical, and verbal categories</p>
            </div>
            <button
              onClick={handleFetchModules}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
            >
              Update Completion Rates
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {prepModules.map((mod) => (
              <div key={mod.moduleTitle} className="p-4 bg-slate-950 border border-slate-850 rounded space-y-3 text-xs">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-200">{mod.moduleTitle}</span>
                  <span className="text-blue-500">{mod.completionPercentage}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full" style={{ width: `${mod.completionPercentage}%` }} />
                </div>
                <div className="text-[10px] text-slate-500 leading-normal">
                  <strong className="text-slate-400 block mb-0.5">Focus Syllabus:</strong>
                  {mod.topicsList.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SMART REVISION COCKPIT */}
      {activeTab === 'revision' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Smart Memory retention cockpit</h3>
              <p className="text-xs text-slate-400">Quick concept summaries, revision alerts, and weak topics lists</p>
            </div>
            <button
              onClick={handleGenerateRevision}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
            >
              Refresh revision cards
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {revisionTasks.map((card) => (
              <div key={card.id} className="p-4 bg-slate-950 border border-slate-850 rounded space-y-3 text-xs">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-white">{card.conceptTitle}</span>
                  {card.isWeakTopic && (
                    <span className="text-[9px] bg-red-950 text-red-400 border border-red-900 px-2 py-0.5 rounded font-bold uppercase">
                      Weak Topic
                    </span>
                  )}
                </div>
                <p className="text-slate-400 leading-normal italic text-[11px]">&ldquo;{card.quickNotes}&rdquo;</p>
                <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-900 pt-2">
                  <span>Last Revised: {card.lastRevisedAt || 'Never'}</span>
                  <span>Priority: {card.revisionPriority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PRACTICE WORKSPACE */}
      {activeTab === 'practice' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Case studies scenarios & Coding problems</h3>
              <p className="text-xs text-slate-400">Interactive sandbox assignments aligned with goal priorities</p>
            </div>
            <button
              onClick={handleGeneratePractice}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
            >
              Load new scenarios
            </button>
          </div>

          <div className="space-y-4">
            {practiceQuestions.map((q) => (
              <div key={q.id} className="p-4 bg-slate-950 border border-slate-850 rounded space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">{q.title}</span>
                  <span className="text-[10px] bg-slate-900 text-slate-400 border border-slate-850 px-2 py-0.5 rounded font-bold uppercase">
                    {q.type}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">{q.description}</p>

                <div className="space-y-2">
                  <span className="font-bold text-slate-400 block">Your Response Solution:</span>
                  <textarea
                    defaultValue={q.userAnswerText}
                    className="w-full h-24 bg-slate-900 border border-slate-800 rounded p-3 text-slate-100 text-xs outline-none focus:border-blue-600"
                  />
                </div>

                <div className="flex justify-between items-center border-t border-slate-900 pt-3">
                  <div className="text-[10px] text-slate-500 font-semibold italic">
                    Ideal Response Outcome: {q.idealResponseSummary}
                  </div>
                  <button
                    onClick={() => addToast('Solution compiled and validated successfully!', 'success')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-1 px-3 rounded text-[10px] border-0 cursor-pointer"
                  >
                    Compile & Grade
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SYSTEMS & PROJECTS */}
      {activeTab === 'projects' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Portfolio-Scale project Blueprints</h3>
              <p className="text-xs text-slate-400">Architected projects tech-stacks, blueprints, and portfolio hiring value propositions</p>
            </div>
            <button
              onClick={handleFetchProjects}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
            >
              Recommend projects
            </button>
          </div>

          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="p-4 bg-slate-950 border border-slate-850 rounded space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">{proj.title}</span>
                  <div className="flex gap-2">
                    <span className="text-[9px] bg-slate-900 border border-slate-850 text-slate-400 px-2 py-0.5 rounded font-bold uppercase">
                      {proj.scale}
                    </span>
                    <span className="text-[9px] bg-blue-950 border border-blue-900 text-blue-400 px-2 py-0.5 rounded font-bold uppercase">
                      {proj.complexity}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  <strong className="text-slate-300 block mb-0.5">Architecture Blueprint:</strong>
                  {proj.architectureBlueprint}
                </div>

                <div className="text-[11px] text-slate-400">
                  <strong className="text-slate-300 block mb-0.5">Value Proposition to Recruiter:</strong>
                  {proj.portfolioValueProposition}
                </div>

                <div className="flex flex-wrap gap-1 pt-2">
                  {proj.techStack.map((tech, idx) => (
                    <span key={idx} className="bg-slate-900 text-slate-500 px-2 py-0.5 rounded text-[10px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: MASTERY & PROGRESS */}
      {activeTab === 'analytics' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Topic Mastery & progress Analytics</h3>
              <p className="text-xs text-slate-400">Progress metrics, consistent streaks, and revision accuracy charts</p>
            </div>
            <button
              onClick={handleFetchAnalytics}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
            >
              Update analytics
            </button>
          </div>

          {analytics && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-1">
                  <span className="text-slate-500 block">Curriculum hours</span>
                  <span className="text-xl font-bold text-white">{analytics.totalLearningHours} Hours</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-1">
                  <span className="text-slate-500 block">Weekly Completion Rate</span>
                  <span className="text-xl font-bold text-blue-500">{analytics.completionRatePercent}%</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-1">
                  <span className="text-slate-500 block">Active Study Streak</span>
                  <span className="text-xl font-bold text-amber-500">{analytics.consistencyStreakDays} Days</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-1">
                  <span className="text-slate-500 block">Revision Accuracy</span>
                  <span className="text-xl font-bold text-emerald-400">{analytics.revisionAccuracyPercent}%</span>
                </div>
              </div>

              {/* Topic Mastery progress SVG visual charts */}
              <div className="p-4 bg-slate-950 border border-slate-850 rounded-lg space-y-4">
                <span className="font-bold text-slate-300 block">Syllabus Topic Mastery level quotients</span>
                <div className="h-32 w-full flex items-end justify-between gap-1 pt-4">
                  {analytics.topicMasteryDistribution.map((topic) => (
                    <div key={topic.topicName} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[10px] text-slate-400">{topic.masteryScore}%</span>
                      <div className="w-full bg-blue-600/20 hover:bg-blue-600 rounded transition-all" style={{ height: `${topic.masteryScore}px` }} />
                      <span className="text-[9px] text-slate-500 text-center line-clamp-1">{topic.topicName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
