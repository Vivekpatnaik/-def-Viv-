'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CareerProfileInputSchema, CareerProfileInput, SkillGapDetail, AdaptiveRoadmap } from '../schemas';
import { useToast } from '@/shared/providers/ToastProvider';
import { CareerService } from '../services/careerService';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { Compass, ShieldAlert, Clock, Sparkles, Loader2, Award } from 'lucide-react';

export function CareerWorkspace() {
  const [sessionState, setSessionState] = useState<'setup' | 'active'>('setup');
  const [gaps, setGaps] = useState<SkillGapDetail[]>([]);
  const [roadmap, setRoadmap] = useState<AdaptiveRoadmap | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CareerProfileInput>({
    resolver: zodResolver(CareerProfileInputSchema),
    defaultValues: {
      currentEducation: 'Bachelors',
      collegeName: 'State University',
      degreeMajor: 'Computer Science',
      programmingLanguages: ['typescript', 'python'],
      frameworks: ['react', 'nextjs'],
      preferredLocation: 'Remote',
      expectedSalary: '$110,000 / year',
      availableStudyHoursWeekly: 20,
      preferredLearningStyle: 'hands-on',
    },
  });

  const handleStartAnalysis = async (data: CareerProfileInput) => {
    setIsProcessing(true);
    addToast('Executing semantic skill gap comparisons...', 'info');

    try {
      const parsedGaps = await CareerService.analyzeSkillGaps(data, 'Senior Frontend Engineer');
      setGaps(parsedGaps);

      addToast('Generating custom weekly roadmap timeline...', 'info');
      const parsedRoadmap = await CareerService.generateAdaptiveRoadmap(data, 'Senior Frontend Engineer', 6);
      setRoadmap(parsedRoadmap);

      setSessionState('active');
      addToast('Career path assessment completed!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Assessment failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSimulateStruggleAdapt = async () => {
    if (!roadmap) return;
    setIsProcessing(true);
    addToast('Simulating mock interview struggle (Score: 40%)...', 'info');

    try {
      const adapted = await CareerService.adaptRoadmapOnPerformanceChange(roadmap, 40);
      setRoadmap(adapted);
      addToast('Roadmap adapted successfully! Core foundations injected.', 'success');
    } catch (err) {
      console.error(err);
      addToast('Adaptation failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto text-left">
      <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Career Assessment & Roadmaps</h1>
          <p className="text-slate-400 text-sm">Analyze technical debt, benchmark skills, and generate adaptive milestones</p>
        </div>

        {sessionState === 'active' && (
          <button
            onClick={handleSimulateStruggleAdapt}
            disabled={isProcessing}
            className="flex items-center gap-1.5 bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-400 font-semibold py-2 px-4 rounded text-xs cursor-pointer disabled:opacity-50 shrink-0"
          >
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>Simulate Interview Struggle</span>
          </button>
        )}
      </div>

      {/* SETUP STATE VIEW */}
      {sessionState === 'setup' && (
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <h2 className="text-lg font-bold text-white mb-6 text-center">Configure Career Profile</h2>
            <form onSubmit={handleSubmit(handleStartAnalysis)} className="space-y-5">
              {/* College & Degree */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">University Name</label>
                <input
                  type="text"
                  {...register('collegeName')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                />
                {errors.collegeName && <p className="mt-1 text-xs text-rose-500">{errors.collegeName.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Education</label>
                  <select
                    {...register('currentEducation')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="Bachelors">Bachelors</option>
                    <option value="Masters">Masters</option>
                    <option value="PhD">Ph.D. / Doctorate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Major</label>
                  <input
                    type="text"
                    {...register('degreeMajor')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Study Hours & learning style */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Weekly Hours</label>
                  <input
                    type="number"
                    {...register('availableStudyHoursWeekly', { valueAsNumber: true })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Style</label>
                  <select
                    {...register('preferredLearningStyle')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="hands-on">Hands-On Code</option>
                    <option value="visual">Video Playlists</option>
                    <option value="text">Official Docs</option>
                  </select>
                </div>
              </div>

              {/* Salary & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Salary</label>
                  <input
                    type="text"
                    {...register('expectedSalary')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Preferred Location</label>
                  <input
                    type="text"
                    {...register('preferredLocation')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Action trigger button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer border-0 text-sm disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Career Profile...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Career Roadmap</span>
                  </>
                )}
              </button>
            </form>
          </Card>
        </div>
      )}

      {/* ACTIVE ROADMAP VIEW */}
      {sessionState === 'active' && roadmap && (
        <div className="space-y-8">
          {/* Adaptive alert notice */}
          {roadmap.isAdaptedRecently && (
            <div className="bg-rose-950/40 border border-rose-800/60 p-4 rounded-lg flex items-center gap-3 text-left">
              <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
              <p className="text-xs text-rose-200 leading-normal">
                <strong>Roadmap Adapted:</strong> We have dynamically adjusted your first milestone to strengthen core foundations due to recent mock interview setbacks.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Skill Gap Report Panel */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span>Targeted Skill Gaps</span>
                </h3>

                <div className="space-y-4">
                  {gaps.map((gap) => (
                    <div key={gap.skillName} className="p-3 bg-slate-950 border border-slate-800 rounded space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-white">{gap.skillName}</span>
                        <Badge variant={gap.priority === 'critical' || gap.priority === 'high' ? 'danger' : 'warning'}>
                          {gap.priority}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {gap.estimatedLearningHours}h study
                        </span>
                        <span>Diff: {gap.difficulty}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Middle & Right: Learning Timeline */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-blue-500" />
                    <h3 className="text-sm font-semibold text-white">Dynamic 6-Month Roadmap</h3>
                  </div>
                  <Badge variant="success">100% Validated Sources</Badge>
                </div>

                <div className="relative pl-6 border-l-2 border-slate-800 space-y-8 ml-3">
                  {roadmap.milestones.map((milestone, idx) => (
                    <div key={idx} className="relative">
                      {/* Interactive node indicator */}
                      <div
                        className={`absolute -left-[31px] top-0 rounded-full w-4 h-4 flex items-center justify-center font-bold text-[9px] ${
                          idx === 0 ? 'bg-blue-600 ring-4 ring-blue-950' : 'bg-slate-950 border border-slate-800 text-slate-500'
                        }`}
                      />

                      <div className="space-y-4">
                        <div>
                          <span className="text-xs font-semibold text-white">{milestone.milestoneTitle}</span>
                          <span className="text-[10px] text-slate-500 ml-2">Week {milestone.weekRange}</span>
                        </div>

                        <div className="space-y-4 pl-2">
                          {milestone.tasks.map((task, tIdx) => (
                            <div key={tIdx} className="p-4 bg-slate-950 border border-slate-800 rounded-md text-left space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-200">{task.taskTitle}</span>
                                <Badge variant={task.priority === 'high' ? 'danger' : 'neutral'}>{task.priority}</Badge>
                              </div>

                              <div className="border-t border-slate-900 pt-2.5 space-y-2">
                                {/* Study Link */}
                                <div className="flex justify-between items-center text-[10px] text-slate-400">
                                  <span>Official Learning Resource:</span>
                                  <a
                                    href={task.learningResourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-400 font-semibold no-underline"
                                  >
                                    {task.learningResourceTitle}
                                  </a>
                                </div>

                                {/* Mini Assignment */}
                                <div className="text-[10px] text-slate-400">
                                  <strong className="text-slate-300">Hands-on Assignment:</strong> {task.assignmentTitle}
                                </div>

                                {/* Peer challenge */}
                                <div className="text-[10px] text-slate-400">
                                  <strong className="text-slate-300">Peer Revision Challenge:</strong> {task.revisionChallenge}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
