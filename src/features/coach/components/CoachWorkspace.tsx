'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  Loader2,
  Send,
  Calendar,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useToast } from '@/shared/providers/ToastProvider';
import { CoachService } from '../services/coachService';
import { CoachMessage, GoalNode, AccountabilityMetrics, CoachStrategyReport } from '../schemas';

type ActiveTabType = 'dialogue' | 'goals' | 'accountability' | 'strategy';

export function CoachWorkspace() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('dialogue');
  const [isProcessing, setIsProcessing] = useState(false);
  const { addToast } = useToast();

  // Mock Career Memory Data
  const mockMemory = {
    userGoal: 'Become a Senior Frontend Engineer at Vercel within 6 Months',
    completedTasksCount: 42,
    activeStreakDays: 14,
    weakTopics: ['Webpack bundling, Web performance, GIN indexing'],
  };

  // 1. Stateful Dialogue State (Stateful Dialogue, never a generic chat)
  const [messages, setMessages] = useState<CoachMessage[]>([
    {
      id: '123e4567-e89b-12d3-a456-426614175001',
      role: 'assistant',
      content: 'Welcome Alex. I have reviewed your target goal, skill gap report, and resume formatting logs. Let\'s outline your critical objectives.',
      timestamp: '10:00 AM',
      strategyDetails: {
        why: 'Webpack and GIN indexing are verified bottlenecks preventing you from passing senior technical assessments.',
        what: 'Re-architect state management flow and configure multi-tenant GIN index constraints.',
        how: 'Fulfill react.dev rendering guides and configure partial indexing tables in Supabase.',
        expectedOutcome: 'Placement readiness score increases by +4% and mock session errors drop by 30%.',
        estimatedMinutesToComplete: 60,
        priority: 'CRITICAL',
      },
    },
  ]);
  const [inputText, setInputText] = useState('');

  // 2. Goal Engine State
  const [goals, setGoals] = useState<GoalNode[]>([
    {
      id: '123e4567-e89b-12d3-a456-426614175101',
      title: 'Analyze Webpack performance chunking and load sizes',
      timeframe: 'today',
      completed: false,
      dueDate: 'Today',
    },
    {
      id: '123e4567-e89b-12d3-a456-426614175102',
      title: 'Conduct an adaptive technical mock interview',
      timeframe: 'weekly',
      completed: true,
      dueDate: 'End of week',
    },
    {
      id: '123e4567-e89b-12d3-a456-426614175103',
      title: 'Solve 15 coding sandbox database indexes challenges',
      timeframe: 'monthly',
      completed: false,
      dueDate: 'End of month',
    },
  ]);

  // 3. Accountability Metrics State
  const [accountability, setAccountability] = useState<AccountabilityMetrics | null>({
    missedTasksCount: 2,
    completedTasksCount: 42,
    learningConsistencyPercent: 94,
    interviewPracticeHours: 12,
    codingPracticeSubmissions: 35,
    activeStreakDays: 14,
  });

  // 4. Strategic Recommendations State
  const [strategy, setStrategy] = useState<CoachStrategyReport | null>({
    focusArea: 'Technical Web Performance & Bundling Optimization',
    currentReadinessIndex: 82,
    nextStrategicStep: 'Optimize Next.js dynamically imported chunk sizes',
    prioritizedRecommendations: [
      {
        recommendationTitle: 'Deep review of NextJS Server Components and layout rendering loops',
        impactValue: '+5% Hiring Callback Potential',
        officialResourceUrl: 'https://nextjs.org/docs',
        officialResourceTitle: 'NextJS Official Server Docs',
      },
      {
        recommendationTitle: 'Resolve SQL indices partial filters performance blocks',
        impactValue: '+3% Technical score increase',
        officialResourceUrl: 'https://react.dev/learn',
        officialResourceTitle: 'React State Documentation',
      },
    ],
  });

  // --- HANDLERS ---

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: CoachMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);
    addToast('Coach is reasoning over your career history...', 'info');

    try {
      const response = await CoachService.sendMessageToCoach(
        [...messages, userMsg],
        inputText,
        mockMemory
      );
      setMessages((prev) => [...prev, response]);
      addToast('New coaching directive received!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Messaging failed. Please retry.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleGoalComplete = (id: string) => {
    setGoals(
      goals.map((g) => {
        if (g.id === id) {
          const nextState = !g.completed;
          addToast(nextState ? 'Goal checked off!' : 'Goal unchecked.', 'info');
          return { ...g, completed: nextState };
        }
        return g;
      })
    );
  };

  const handleGenerateGoals = async () => {
    setIsProcessing(true);
    addToast('Re-compiling study roadmaps and generating goals...', 'info');
    try {
      const res = await CoachService.generateGoals(mockMemory);
      setGoals(res);
      addToast('Dynamic goal checklist compiled successfully!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Goals generation failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFetchAccountability = async () => {
    setIsProcessing(true);
    addToast('Analyzing streaks and completed tasks database...', 'info');
    try {
      const res = await CoachService.getAccountabilityMetrics(mockMemory);
      setAccountability(res);
      addToast('Accountability report updated!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Metrics failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFetchStrategy = async () => {
    setIsProcessing(true);
    addToast('Analyzing technical debt and target benchmarks...', 'info');
    try {
      const res = await CoachService.getCareerStrategy(mockMemory);
      setStrategy(res);
      addToast('Targeted strategic steps compiled!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Strategy report failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">AI Career Mentor & Strategist</h1>
          <p className="text-slate-400 text-sm">Stateful coaching over goals, roadmaps, and accountability check-offs</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 py-1.5 px-3 rounded text-xs text-slate-300 font-semibold shrink-0">
          <Zap className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>Consistency Streak: {mockMemory.activeStreakDays} Days</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-1 overflow-x-auto text-xs font-semibold scrollbar-none">
        {[
          { id: 'dialogue', label: 'Mentorship dialogue', icon: MessageSquare },
          { id: 'goals', label: 'Goals Engine', icon: Calendar },
          { id: 'accountability', label: 'Accountability tracker', icon: ShieldCheck },
          { id: 'strategy', label: 'Strategic recommendations', icon: TrendingUp },
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

      {/* TAB 1: STRATEGIC MENTORSHIP DIALOGUE */}
      {activeTab === 'dialogue' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 align-top">
          {/* Main conversation history stream */}
          <div className="lg:col-span-2 space-y-6 flex flex-col min-h-[480px]">
            <div className="flex-1 bg-slate-950 border border-slate-900 rounded-lg p-4 space-y-4 overflow-y-auto max-h-[380px]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col gap-1.5 p-3 rounded-md text-xs leading-relaxed max-w-[85%] ${
                  msg.role === 'user' ? 'bg-blue-950/40 border border-blue-900/40 text-blue-100 self-end ml-auto text-right' : 'bg-slate-900 border border-slate-850 text-slate-300 self-start mr-auto'
                }`}>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold mb-1">
                    <span>{msg.role === 'user' ? 'Alex Rivera' : 'CareerOS Mentor'}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <p>{msg.content}</p>

                  {msg.strategyDetails && (
                    <div className="mt-3 border-t border-slate-800 pt-3 space-y-3 text-left">
                      <div className="flex justify-between items-center text-[9px] uppercase font-bold text-slate-500">
                        <span>Strategy Directive</span>
                        <span className="text-red-400 font-bold">{msg.strategyDetails.priority}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                        <div>
                          <span className="font-bold text-white block">Why:</span>
                          <span className="text-slate-400">{msg.strategyDetails.why}</span>
                        </div>
                        <div>
                          <span className="font-bold text-white block">What:</span>
                          <span className="text-slate-400">{msg.strategyDetails.what}</span>
                        </div>
                        <div>
                          <span className="font-bold text-white block">How:</span>
                          <span className="text-slate-400">{msg.strategyDetails.how}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask your mentor about resume, coding, or salary negotiations..."
                className="flex-1 bg-slate-950 text-slate-100 border border-slate-800 rounded px-3 py-2.5 text-xs outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                disabled={isProcessing || !inputText.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded text-xs border-0 cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Right Panel: Conversation context details card */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-4 text-xs h-fit">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-800">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span>State-Aware context parameters</span>
            </h3>
            <div className="space-y-3 text-slate-400">
              <div className="space-y-1">
                <span className="text-slate-500 block">Goal Target:</span>
                <span className="text-white font-bold block">{mockMemory.userGoal}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block">Identified weak areas:</span>
                <span className="text-rose-400 font-bold block">{mockMemory.weakTopics.join(', ')}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 block">Completed Achievements:</span>
                <span className="text-emerald-400 font-bold block">{mockMemory.completedTasksCount} validated milestones</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GOALS CHECKLIST */}
      {activeTab === 'goals' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Dynamic coaching Goals Checklist</h3>
              <p className="text-xs text-slate-400">Track and check off today, weekly, and monthly milestones targets</p>
            </div>
            <button
              onClick={handleGenerateGoals}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
            >
              Generate dynamic goals
            </button>
          </div>

          <div className="space-y-4">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center justify-between p-4 bg-slate-950 border border-slate-850 rounded-md text-xs"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => toggleGoalComplete(goal.id)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                  <span className={`text-slate-200 font-medium ${goal.completed ? 'line-through text-slate-600' : ''}`}>
                    {goal.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-slate-900 text-slate-500 px-2 py-0.5 rounded border border-slate-850 uppercase font-bold">
                    {goal.timeframe}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ACCOUNTABILITY TRACKER */}
      {activeTab === 'accountability' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Coaching consistency & Streak tracker</h3>
              <p className="text-xs text-slate-400">Streak, consistency rate, and technical mock hours analysis</p>
            </div>
            <button
              onClick={handleFetchAccountability}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
            >
              Compute accountability metrics
            </button>
          </div>

          {accountability && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-1">
                  <span className="text-slate-500 block">Streak Days</span>
                  <span className="text-xl font-bold text-amber-500">{accountability.activeStreakDays} Days</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-1">
                  <span className="text-slate-500 block">Consistency Rate</span>
                  <span className="text-xl font-bold text-emerald-400">{accountability.learningConsistencyPercent}%</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-1">
                  <span className="text-slate-500 block">Completed Tasks</span>
                  <span className="text-xl font-bold text-white">{accountability.completedTasksCount} Verified</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-1">
                  <span className="text-slate-500 block">Mock Session Hours</span>
                  <span className="text-xl font-bold text-purple-400">{accountability.interviewPracticeHours} Hours</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-850 rounded flex gap-2 font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Missed targets: You had {accountability.missedTasksCount} missed checklist items this week. Let&apos;s schedule a study review block!</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CAREER STRATEGY RECOMMENDATIONS */}
      {activeTab === 'strategy' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Personalized Priority Career Strategy</h3>
              <p className="text-xs text-slate-400">Target strategic goals and prioritized official reference materials recommendations</p>
            </div>
            <button
              onClick={handleFetchStrategy}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
            >
              Analyze career strategies
            </button>
          </div>

          {strategy && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-2">
                  <span className="text-slate-500 block uppercase font-bold text-[10px]">Active Focus Area</span>
                  <span className="text-white font-bold text-sm block">{strategy.focusArea}</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-2">
                  <span className="text-slate-500 block uppercase font-bold text-[10px]">Next Milestone Step</span>
                  <span className="text-emerald-400 font-bold text-sm block">{strategy.nextStrategicStep}</span>
                </div>
              </div>

              <div className="space-y-4">
                <span className="font-bold text-slate-300 block uppercase tracking-wider text-[10px]">Priority Recommendations</span>
                <div className="space-y-4">
                  {strategy.prioritizedRecommendations.map((rec, idx) => (
                    <div key={idx} className="p-4 bg-slate-950 border border-slate-850 rounded space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-200">{rec.recommendationTitle}</span>
                        <span className="text-[10px] bg-slate-900 border border-slate-850 px-2 py-0.5 rounded text-blue-400">
                          {rec.impactValue}
                        </span>
                      </div>
                      {rec.officialResourceUrl && (
                        <div className="text-[11px] text-slate-400">
                          <span>Official Reference Documentation: </span>
                          <a
                            href={rec.officialResourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-400 font-semibold no-underline"
                          >
                            {rec.officialResourceTitle}
                          </a>
                        </div>
                      )}
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
