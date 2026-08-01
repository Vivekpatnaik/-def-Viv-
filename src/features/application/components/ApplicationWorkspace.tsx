'use client';

import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  TrendingUp,
  Clock,
  AlertTriangle,
  Plus,
  Activity,
  Bell,
  Trash,
} from 'lucide-react';
import { useToast } from '@/shared/providers/ToastProvider';
import { ApplicationService } from '../services/applicationService';
import {
  JobApplication,
  JobMatchEstimate,
  ResumeOptimizationSuggestion,
  FollowUpRule,
  RejectionAnalysis,
  ApplicationAnalytics,
  TrackingStage,
} from '../schemas';

type TabType = 'kanban' | 'match' | 'optimizer' | 'followup' | 'rejections' | 'analytics';

export function ApplicationWorkspace() {
  const [activeTab, setActiveTab] = useState<TabType>('kanban');
  const [isProcessing, setIsProcessing] = useState(false);
  const { addToast } = useToast();

  // Mock Active Resume Data for internal simulation
  const mockResume = {
    name: 'Alex Rivera',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    overallScore: 88,
  };

  // 1. Applications State (Initialize with robust seed metrics matching lifecycle columns)
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      companyName: 'Vercel',
      roleTitle: 'Senior Frontend Engineer',
      stage: 'interview',
      salary: '$135,000 / year',
      location: 'Remote',
      savedAt: '2025-01-10',
      appliedAt: '2025-01-12',
      interviewDate: '2025-01-25',
      notes: 'Passed initial coding assessment. Recruiter scheduled Manager round.',
      resumeVersionUsed: 1,
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174002',
      companyName: 'Linear',
      roleTitle: 'Product Engineer',
      stage: 'offer',
      salary: '$140,000 / year',
      location: 'Hybrid (San Francisco)',
      savedAt: '2025-01-05',
      appliedAt: '2025-01-08',
      offerExpiryDate: '2025-02-05',
      notes: 'Received official offer letter! Deciding over health package adjustments.',
      resumeVersionUsed: 1,
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174003',
      companyName: 'Google',
      roleTitle: 'UX Developer',
      stage: 'rejected',
      location: 'Mountain View, CA',
      savedAt: '2025-01-01',
      appliedAt: '2025-01-03',
      rejectionNotes: 'Rejected after recruiter call. Lacked verified GIN index optimization and performance benchmarks.',
      resumeVersionUsed: 1,
    },
  ]);

  // Form input state for adding manual job submissions
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newSalary, setNewSalary] = useState('');

  // 2. Job Match Engine State
  const [targetJobTitle, setTargetJobTitle] = useState('Senior Frontend Developer');
  const [matchResult, setMatchResult] = useState<JobMatchEstimate | null>(null);

  // 3. Pre-Application Resume Optimization State
  const [optResult, setOptResult] = useState<ResumeOptimizationSuggestion | null>(null);

  // 4. Follow-Up Engine State
  const [followUpResult, setFollowUpResult] = useState<FollowUpRule | null>(null);
  const [selectedFollowUpTrigger, setSelectedFollowUpTrigger] = useState<'initial_followup' | 'interview_thank_you' | 'assessment_reminder' | 'offer_extension_request'>('initial_followup');

  // 5. Rejection Analytics State
  const [rejectionReport, setRejectionReport] = useState<RejectionAnalysis | null>(null);

  // 6. Cumulative Analytics State
  const [analyticsReport, setAnalyticsReport] = useState<ApplicationAnalytics | null>(null);

  // --- HANDLERS ---

  const handleStageChange = (id: string, nextStage: TrackingStage) => {
    setApplications(
      applications.map((app) => (app.id === id ? { ...app, stage: nextStage } : app))
    );
    addToast(`Updated application stage to '${nextStage}'!`, 'success');
  };

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) {
      addToast('Company Name and Role Title are required.', 'error');
      return;
    }
    const newApp: JobApplication = {
      id: crypto.randomUUID(),
      companyName: newCompany,
      roleTitle: newRole,
      stage: 'saved',
      location: newLocation || undefined,
      salary: newSalary || undefined,
      savedAt: new Date().toISOString().split('T')[0],
      notes: 'Manually logged application.',
    };
    setApplications([...applications, newApp]);
    setNewCompany('');
    setNewRole('');
    setNewLocation('');
    setNewSalary('');
    setShowAddForm(false);
    addToast('Successfully appended manual job submission!', 'success');
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(applications.filter((app) => app.id !== id));
    addToast('Application deleted.', 'info');
  };

  // Trigger Match Analysis
  const handleJobMatch = async () => {
    setIsProcessing(true);
    addToast('Executing semantic matching indices...', 'info');
    try {
      const res = await ApplicationService.getJobMatchEstimate(mockResume, targetJobTitle);
      setMatchResult(res);
      addToast('Job matching complete!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Matching failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Trigger Resume Optimizer
  const handleResumeOptimize = async () => {
    setIsProcessing(true);
    addToast('Analyzing resume gaps and preparing suggestions...', 'info');
    try {
      const res = await ApplicationService.getResumeOptimizationSuggestions(mockResume, targetJobTitle);
      setOptResult(res);
      addToast('Suggestions compiled successfully!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Optimization compilation failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Trigger Follow-up compiling
  const handleFollowUpFetch = async () => {
    setIsProcessing(true);
    addToast('Generating reminder and personalized timing...', 'info');
    try {
      const res = await ApplicationService.getFollowUpRules(
        '123e4567-e89b-12d3-a456-426614174001',
        selectedFollowUpTrigger
      );
      setFollowUpResult(res);
      addToast('Follow-up rules and templates compiled!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Timing rules compilation failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Trigger Rejections analyzer
  const handleRejectionAnalysis = async () => {
    setIsProcessing(true);
    addToast('Parsing historic rejections notes and resume versions...', 'info');
    try {
      const res = await ApplicationService.getRejectionAnalysis(applications);
      setRejectionReport(res);
      addToast('Strategic shift report compiled!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Rejection analysis failed.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Trigger analytics compilation
  const handleAnalyticsFetch = async () => {
    setIsProcessing(true);
    addToast('Compiling applications history database...', 'info');
    try {
      const res = await ApplicationService.getApplicationAnalytics(applications);
      setAnalyticsReport(res);
      addToast('Metrics and bar-charts compiled!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to compile metrics.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Job Application Intelligence</h1>
          <p className="text-slate-400 text-sm">Optimize resume targeting, monitor application timing pipelines, and analyze rejection failures</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded text-xs font-semibold cursor-pointer border-0 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Manual Job Entry</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddApplication} className="p-6 bg-slate-900 border border-slate-800 rounded-lg grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 block font-semibold">Company Name *</span>
            <input
              type="text"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              placeholder="e.g. Stripe"
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded p-2 outline-none"
            />
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 block font-semibold">Role Title *</span>
            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="e.g. Frontend Dev"
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded p-2 outline-none"
            />
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 block font-semibold">Location</span>
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="e.g. SF, CA"
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded p-2 outline-none"
            />
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 block font-semibold">Salary Range</span>
            <input
              type="text"
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              placeholder="e.g. $130k/yr"
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded p-2 outline-none"
            />
          </div>
          <div className="sm:col-span-4 flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-transparent border border-slate-800 text-slate-400 py-1.5 px-3 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-1.5 px-4 rounded border-0 cursor-pointer"
            >
              Save Job Submission
            </button>
          </div>
        </form>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-1 overflow-x-auto text-xs font-semibold scrollbar-none">
        {[
          { id: 'kanban', label: 'Kanban Tracker', icon: Layers },
          { id: 'match', label: 'Job Match Analyzer', icon: Activity },
          { id: 'optimizer', label: 'Resume Optimizer', icon: Sparkles },
          { id: 'followup', label: 'Reminders & Follow-Up', icon: Bell },
          { id: 'rejections', label: 'Rejection Strategies', icon: AlertTriangle },
          { id: 'analytics', label: 'Dashboard Analytics', icon: TrendingUp },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
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

      {/* TAB 1: KANBAN TRACKER */}
      {activeTab === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 align-top">
          {([
            { stage: 'saved', label: 'Saved', color: 'border-slate-800 bg-slate-900/30' },
            { stage: 'applied', label: 'Applied', color: 'border-blue-900/40 bg-blue-950/10' },
            { stage: 'interview', label: 'Interviewing', color: 'border-purple-900/40 bg-purple-950/10' },
            { stage: 'offer', label: 'Offers', color: 'border-emerald-900/40 bg-emerald-950/10' },
          ] as const).map((col) => {
            const columnApps = applications.filter((app) => app.stage === col.stage || (col.stage === 'interview' && (app.stage === 'assessment' || app.stage === 'hr' || app.stage === 'manager' || app.stage === 'interview')));
            return (
              <div key={col.stage} className={`border rounded-lg p-4 space-y-4 text-left flex flex-col min-h-[400px] ${col.color}`}>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{col.label}</span>
                  <span className="text-[10px] bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded font-bold">
                    {columnApps.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {columnApps.map((app) => (
                    <div key={app.id} className="p-3 bg-slate-950 border border-slate-850 rounded hover:border-slate-700 transition-all space-y-3">
                      <div>
                        <span className="text-xs font-bold text-white block">{app.companyName}</span>
                        <span className="text-[10px] text-slate-500 block">{app.roleTitle}</span>
                      </div>

                      {app.salary && (
                        <span className="text-[9px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-850">
                          {app.salary}
                        </span>
                      )}

                      <p className="text-[10px] text-slate-400 leading-normal line-clamp-2">
                        {app.rejectionNotes || app.notes}
                      </p>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-900 text-[10px]">
                        <select
                          value={app.stage}
                          onChange={(e) => handleStageChange(app.id, e.target.value as TrackingStage)}
                          className="bg-slate-900 border border-slate-800 rounded p-1 text-[10px] text-slate-300 outline-none"
                        >
                          <option value="saved">Saved</option>
                          <option value="applied">Applied</option>
                          <option value="assessment">Assessment</option>
                          <option value="interview">Interviewing</option>
                          <option value="hr">HR Round</option>
                          <option value="manager">Manager</option>
                          <option value="offer">Offer</option>
                          <option value="rejected">Rejected</option>
                          <option value="withdrawn">Withdrawn</option>
                          <option value="joined">Joined</option>
                        </select>

                        <button
                          onClick={() => handleDeleteApplication(app.id)}
                          className="text-slate-600 hover:text-rose-500 bg-transparent border-0 cursor-pointer p-1"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {columnApps.length === 0 && (
                    <div className="text-center py-12 text-slate-600 text-xs font-semibold">
                      Empty stage column
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: JOB MATCH ANALYZER */}
      {activeTab === 'match' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Compare Skills & Experience against Goals</h3>
            <p className="text-xs text-slate-400">Match resume parameters, historical coding testing, and validated skills matrices</p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={targetJobTitle}
              onChange={(e) => setTargetJobTitle(e.target.value)}
              className="flex-1 bg-slate-950 text-slate-100 border border-slate-800 rounded px-3 py-2 text-xs outline-none"
            />
            <button
              onClick={handleJobMatch}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded text-xs border-0 cursor-pointer shrink-0"
            >
              Analyze Job Fit
            </button>
          </div>

          {matchResult && (
            <div className="border-t border-slate-800 pt-6 space-y-6">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-slate-300">Match Analysis result</h4>
                  <span className="text-[10px] text-slate-500 block">Recommended priority: {matchResult.applicationPriority}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Overall Alignment</span>
                  <span className="text-lg font-bold text-blue-500">{matchResult.overallMatchScore}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-slate-950 border border-slate-850 rounded">
                  <span className="text-xs text-slate-500 block">Skills match</span>
                  <span className="text-sm font-bold text-emerald-400">{matchResult.skillMatchPercent}%</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded">
                  <span className="text-xs text-slate-500 block">Experience Match</span>
                  <span className="text-sm font-bold text-blue-400">{matchResult.experienceMatchPercent}%</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded">
                  <span className="text-xs text-slate-500 block">Resume Format</span>
                  <span className="text-sm font-bold text-white">{matchResult.resumeMatchPercent}%</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-2">
                <div className="flex gap-2 text-xs font-semibold text-slate-300">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Expected Preparation Target: {matchResult.expectedPrepTimeHours} Hours</span>
                </div>
                <p className="text-xs text-slate-400">{matchResult.priorityReason}</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">Key Skill Gaps Lacking:</span>
                <div className="flex flex-wrap gap-1.5">
                  {matchResult.missingSkills.map((sk, idx) => (
                    <span key={idx} className="bg-red-950 text-red-400 border border-red-900 px-2 py-0.5 rounded text-[10px]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: RESUME OPTIMIZER */}
      {activeTab === 'optimizer' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Pre-Application Resume Optimization</h3>
              <p className="text-xs text-slate-400">Identify suggestions and targeted missing keywords for {targetJobTitle}</p>
            </div>
            <button
              onClick={handleResumeOptimize}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
            >
              Compile Optimizations
            </button>
          </div>

          {optResult && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-3">
                  <span className="font-bold text-white block">Suggest STAR bullet rewrites</span>
                  {optResult.suggestedBulletUpdates.map((bullet, idx) => (
                    <div key={idx} className="space-y-2 border-b border-slate-900 pb-2">
                      <span className="text-slate-500 block">Original: &ldquo;{bullet.originalHighlight}&rdquo;</span>
                      <span className="text-blue-400 block font-semibold">Recommended: &ldquo;{bullet.optimizedSTARHighlight}&rdquo;</span>
                      <p className="text-[10px] text-slate-500 block">Impact: {bullet.benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-3">
                  <span className="font-bold text-white block">Portfolio Project Recommendations</span>
                  {optResult.projectRecommendations.map((proj, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center font-bold text-slate-300">
                        <span>{proj.topic}</span>
                        <span className="text-[9px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-850">
                          {proj.complexity}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">{proj.justification}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: FOLLOW-UP Cockpit */}
      {activeTab === 'followup' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Reminders & Follow-Up timing rules</h3>
              <p className="text-xs text-slate-400">Calculate optimal timings and personalized triggers</p>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedFollowUpTrigger}
                onChange={(e) => setSelectedFollowUpTrigger(e.target.value as 'initial_followup' | 'interview_thank_you' | 'assessment_reminder' | 'offer_extension_request')}
                className="bg-slate-950 border border-slate-800 rounded p-1.5 text-xs text-slate-300 outline-none"
              >
                <option value="initial_followup">Initial Followup</option>
                <option value="interview_thank_you">Interview Thank-You</option>
                <option value="assessment_reminder">Assessment Reminder</option>
                <option value="offer_extension_request">Offer Extension Request</option>
              </select>
              <button
                onClick={handleFollowUpFetch}
                disabled={isProcessing}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
              >
                Compile Timing Rules
              </button>
            </div>
          </div>

          {followUpResult && (
            <div className="p-4 bg-slate-950 border border-slate-850 rounded-lg space-y-4 text-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-500 animate-pulse" />
                  <span>Recommended timing: Send in {followUpResult.recommendedTimingDays} Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">Enable Reminders</span>
                  <input
                    type="checkbox"
                    checked={followUpResult.remindersEnabled}
                    onChange={() => {}}
                    className="w-3.5 h-3.5 accent-blue-600"
                  />
                </div>
              </div>

              <div className="border-t border-slate-900 pt-4 space-y-2">
                <span className="text-xs font-bold text-slate-400 block">Personalized Template:</span>
                <textarea
                  readOnly
                  value={followUpResult.followUpTemplateText}
                  className="w-full h-32 bg-slate-900 text-slate-200 border border-slate-800 rounded p-3 text-xs outline-none"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: REJECTION STRATEGY */}
      {activeTab === 'rejections' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Rejection trend & Failure-Pattern Analysis</h3>
              <p className="text-xs text-slate-400">Detect recurring failures over resume versions and application strategies</p>
            </div>
            <button
              onClick={handleRejectionAnalysis}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
            >
              Analyze Rejections
            </button>
          </div>

          {rejectionReport && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-2">
                  <span className="font-bold text-white block">Detected Resume Gaps & GIN indices lacks</span>
                  <div className="space-y-1 text-slate-400">
                    {rejectionReport.recurringResumeFailures.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-2">
                  <span className="font-bold text-white block">Interview weaknesses trend</span>
                  <div className="space-y-1 text-slate-400">
                    {rejectionReport.interviewWeaknessesTrend.map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-850 rounded space-y-2">
                <span className="font-bold text-blue-500 block">Recommended Strategic Shift:</span>
                <p className="text-slate-300 font-semibold leading-relaxed">&ldquo;{rejectionReport.suggestedStrategicShift}&rdquo;</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: ANALYTICS DASHBOARD */}
      {activeTab === 'analytics' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Applications Performance Analytics</h3>
              <p className="text-xs text-slate-400">Cumulative metrics, interview rates, and resume version success callbacks</p>
            </div>
            <button
              onClick={handleAnalyticsFetch}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-1.5 px-4 rounded text-xs border-0 cursor-pointer"
            >
              Compile Analytics
            </button>
          </div>

          {analyticsReport && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-slate-950 border border-slate-850 rounded">
                  <span className="text-slate-500 block">Total Applications</span>
                  <span className="text-xl font-bold text-white">{analyticsReport.totalApplicationsCount} Jobs</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded">
                  <span className="text-slate-500 block">Interview Rate</span>
                  <span className="text-xl font-bold text-purple-400">{analyticsReport.interviewRatePercent}%</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded">
                  <span className="text-slate-500 block">Offer Rate</span>
                  <span className="text-xl font-bold text-emerald-400">{analyticsReport.offerRatePercent}%</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-850 rounded">
                  <span className="text-slate-500 block">Acceptance Ratio</span>
                  <span className="text-xl font-bold text-blue-500">{analyticsReport.acceptanceRatePercent}%</span>
                </div>
              </div>

              {/* Version Success Trend bar chart */}
              <div className="p-4 bg-slate-950 border border-slate-850 rounded-lg space-y-4">
                <span className="font-bold text-slate-300 block">Interview callback success over resume versions</span>
                <div className="h-32 w-full flex items-end justify-between gap-1 pt-4">
                  {analyticsReport.resumeVersionPerformance.map((ver) => (
                    <div key={ver.versionNumber} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[10px] text-slate-400">{ver.interviewCallbackRate}%</span>
                      <div className="w-full bg-emerald-600/20 hover:bg-emerald-600 rounded transition-all" style={{ height: `${ver.interviewCallbackRate}px` }} />
                      <span className="text-[9px] text-slate-500">Version {ver.versionNumber}</span>
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
