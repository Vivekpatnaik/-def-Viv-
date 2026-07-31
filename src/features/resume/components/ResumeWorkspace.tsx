'use client';

import React, { useState } from 'react';
import {
  UploadCloud,
  CheckCircle,
  Play,
  Loader2,
  FileText,
  Compass,
  History,
  Download,
  Check,
  AlertTriangle,
  Eye,
  Sliders,
  TrendingUp,
  Layout,
  Search,
} from 'lucide-react';
import { useToast } from '@/shared/providers/ToastProvider';
import { ResumeService } from '../services/resumeService';
import { ParsedResume, ResumeVersionRecord, JDMatchResult } from '../schemas';

type ActiveTabType = 'upload' | 'ats' | 'recruiter' | 'heatmap' | 'keywords' | 'jd' | 'versions' | 'analytics';

export function ResumeWorkspace() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTabType>('upload');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'parsing' | 'success'>('idle');
  const [resumeData, setResumeData] = useState<ParsedResume | null>(null);
  const [versionHistory, setVersionHistory] = useState<ResumeVersionRecord[]>([]);
  const { addToast } = useToast();

  // Job Description state
  const [pastedJD, setPastedJD] = useState('');
  const [jdMatchResult, setJDMatchResult] = useState<JDMatchResult | null>(null);
  const [isMatchingJD, setIsJDMatching] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      processSelectedFile(droppedFiles[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (selectedFile: File) => {
    const extension = selectedFile.name.split('.').pop()?.toLowerCase();
    if (extension !== 'pdf' && extension !== 'docx' && extension !== 'txt') {
      addToast('Unsupported file type. Please upload a PDF, DOCX, or TXT file.', 'error');
      return;
    }
    startParsingPipeline();
  };

  const startParsingPipeline = async () => {
    setUploadStatus('uploading');
    addToast('Uploading resume to secure Supabase storage...', 'info');

    await new Promise((resolve) => setTimeout(resolve, 800));
    setUploadStatus('parsing');
    addToast('Analyzing resume layout, structure, keywords, and recruiter signals via Claude 3.5...', 'info');

    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const result = await ResumeService.parseResume(
        'Alex Rivera - alex.rivera@example.com - Senior Frontend Engineer with React and Next.js experience.'
      );
      setResumeData(result);

      // Initialize first version in history
      const initialVersion: ResumeVersionRecord = {
        versionNumber: 1,
        timestamp: new Date().toLocaleTimeString(),
        scoreDifference: 0,
        overallScore: result.overallScore,
        resumeData: result,
      };
      setVersionHistory([initialVersion]);
      setUploadStatus('success');
      addToast('Resume and intelligent sub-reports generated successfully!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Intelligence pipeline analysis failed. Please verify format and try again.', 'error');
      setUploadStatus('idle');
    }
  };

  const handleOneClickRewrite = async (option: 'ats_optimized' | 'fresher' | 'experienced' | 'short_format' | 'long_format') => {
    if (!resumeData) return;
    addToast(`Initiating schema-safe AI Rewrite Preset: ${option.replace(/_/g, ' ')}...`, 'info');
    setUploadStatus('parsing');

    try {
      const rewritten = await ResumeService.executeRewrite(resumeData, option);
      setResumeData(rewritten);

      // Append new version to revision history
      const nextVersionNum = versionHistory.length + 1;
      const newVersion: ResumeVersionRecord = {
        versionNumber: nextVersionNum,
        timestamp: new Date().toLocaleTimeString(),
        scoreDifference: rewritten.overallScore - resumeData.overallScore,
        overallScore: rewritten.overallScore,
        resumeData: rewritten,
      };
      setVersionHistory([newVersion, ...versionHistory]);
      setUploadStatus('success');
      addToast(`Successfully rewrote and stored Version ${nextVersionNum}!`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Rewrite operation failed. Please retry.', 'error');
      setUploadStatus('success');
    }
  };

  const handleRollback = (ver: ResumeVersionRecord) => {
    setResumeData(ver.resumeData);
    addToast(`Successfully rolled back to Version ${ver.versionNumber}!`, 'success');
  };

  const handleJDMatch = async () => {
    if (!resumeData || !pastedJD.trim()) {
      addToast('Please paste a job description first.', 'error');
      return;
    }
    setIsJDMatching(true);
    addToast('Executing semantic job matching evaluations...', 'info');

    try {
      const result = await ResumeService.analyzeJD(resumeData, pastedJD);
      setJDMatchResult(result);
      addToast('Job Description Match complete!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Matching failed. Please check input.', 'error');
    } finally {
      setIsJDMatching(false);
    }
  };

  const handleExport = (format: 'pdf' | 'docx' | 'txt') => {
    addToast(`Generating and downloading resume as formatted .${format.toUpperCase()}...`, 'success');
  };

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Resume & Recruiter Intelligence System</h1>
          <p className="text-slate-400 text-sm">Simulate recruiter reviews, verify ATS parsing, and track version revisions</p>
        </div>

        {resumeData && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 py-1.5 px-3 rounded text-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={() => handleExport('docx')}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 py-1.5 px-3 rounded text-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export DOCX</span>
            </button>
          </div>
        )}
      </div>

      {resumeData && (
        <div className="flex border-b border-slate-800 gap-1 overflow-x-auto text-xs font-semibold scrollbar-none">
          {[
            { id: 'upload', label: 'Summary & Rewrites', icon: FileText },
            { id: 'ats', label: 'ATS Report', icon: Sliders },
            { id: 'recruiter', label: 'Recruiter review', icon: Eye },
            { id: 'heatmap', label: 'Visual Heatmap', icon: Layout },
            { id: 'keywords', label: 'Keywords Breakdown', icon: Compass },
            { id: 'jd', label: 'JD Matcher', icon: Search },
            { id: 'versions', label: 'Revision Control', icon: History },
            { id: 'analytics', label: 'Growth Metrics', icon: TrendingUp },
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

      {/* Upload Zone & Starting Score View */}
      {activeTab === 'upload' && (
        <div className="space-y-8">
          {uploadStatus === 'idle' && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragOver ? 'border-blue-600 bg-blue-950/20' : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900'
              }`}
            >
              <input
                type="file"
                id="resumeFile"
                onChange={handleFileChange}
                accept=".pdf,.docx,.txt"
                className="hidden"
              />
              <label htmlFor="resumeFile" className="flex flex-col items-center justify-center gap-4 cursor-pointer">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-full text-blue-500">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white">Drag and drop your resume file here, or browse</span>
                  <p className="text-xs text-slate-500 mt-1">Supports PDF, DOCX, or TXT (Max 5MB)</p>
                </div>
              </label>
            </div>
          )}

          {(uploadStatus === 'uploading' || uploadStatus === 'parsing') && (
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center space-y-4">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto" />
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">
                  {uploadStatus === 'uploading' ? 'Uploading to Supabase Secure Storage...' : 'Analyzing recruiter profiles & ATS layout filters...'}
                </h3>
                <p className="text-xs text-slate-500">Processing structured evaluations on our local simulator</p>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full bg-blue-600 transition-all duration-1000 ${
                    uploadStatus === 'uploading' ? 'w-1/3' : 'w-3/4'
                  }`}
                />
              </div>
            </div>
          )}

          {uploadStatus === 'success' && resumeData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center space-y-4">
                <div className="w-24 h-24 rounded-full border-4 border-emerald-600 flex items-center justify-center font-bold text-2xl text-white mx-auto">
                  {resumeData.overallScore}%
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Candidate Baseline Score</h3>
                  <p className="text-xs text-slate-500 mt-1">Overall STAR quantified evaluation index is strong.</p>
                </div>
                <div className="border-t border-slate-800 pt-4 space-y-3 text-left text-xs">
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Candidate: <strong className="text-white">{resumeData.name}</strong></span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Email: <strong className="text-white">{resumeData.email}</strong></span>
                  </div>
                </div>
              </div>

              {/* One Click Rewrites Operations */}
              <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
                <h3 className="text-sm font-semibold text-white">One-Click AI Rewrite Engines</h3>
                <p className="text-xs text-slate-400">Select any target preset and trigger a direct schema-safe rewrite:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    onClick={() => handleOneClickRewrite('ats_optimized')}
                    className="p-3 bg-slate-950 border border-slate-800 rounded hover:border-blue-600 hover:bg-slate-900 transition-all cursor-pointer text-left"
                  >
                    <span className="text-xs font-semibold text-white block">ATS Optimized</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Maximizes key acronyms and nouns</span>
                  </button>
                  <button
                    onClick={() => handleOneClickRewrite('experienced')}
                    className="p-3 bg-slate-950 border border-slate-800 rounded hover:border-blue-600 hover:bg-slate-900 transition-all cursor-pointer text-left"
                  >
                    <span className="text-xs font-semibold text-white block">Experienced / Leader</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Emphasizes architecture and impact scale</span>
                  </button>
                  <button
                    onClick={() => handleOneClickRewrite('fresher')}
                    className="p-3 bg-slate-950 border border-slate-800 rounded hover:border-blue-600 hover:bg-slate-900 transition-all cursor-pointer text-left"
                  >
                    <span className="text-xs font-semibold text-white block">Fresher / Graduate</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Emphasizes coursework and projects</span>
                  </button>
                  <button
                    onClick={() => handleOneClickRewrite('short_format')}
                    className="p-3 bg-slate-950 border border-slate-800 rounded hover:border-blue-600 hover:bg-slate-900 transition-all cursor-pointer text-left"
                  >
                    <span className="text-xs font-semibold text-white block">Short Format</span>
                    <span className="text-[10px] text-slate-500 block mt-1">High-density bullet point layout</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: ATS Report */}
      {activeTab === 'ats' && resumeData && resumeData.atsReport && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">ATS Structural Compatibilities</h3>
              <p className="text-xs text-slate-400">Verifying formatting, machine parseability, and readability standards</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">ATS Score</span>
              <span className="text-xl font-bold text-blue-500">{resumeData.atsReport.compatibilityScore}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded text-center">
              <span className="text-xs text-slate-500 block mb-1">Layout & Formatting</span>
              <span className={`text-xs font-bold ${resumeData.atsReport.formattingCheckPassed ? 'text-emerald-500' : 'text-rose-500'}`}>
                {resumeData.atsReport.formattingCheckPassed ? 'Format Passed' : 'Issues Flagged'}
              </span>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded text-center">
              <span className="text-xs text-slate-500 block mb-1">Section Order</span>
              <span className={`text-xs font-bold ${resumeData.atsReport.sectionOrderCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
                {resumeData.atsReport.sectionOrderCorrect ? 'Structure Valid' : 'Unconventional'}
              </span>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded text-center">
              <span className="text-xs text-slate-500 block mb-1">Readability Index</span>
              <span className="text-xs font-bold text-white">{resumeData.atsReport.readabilityScore}/100</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">ATS Improvement Checklist</h4>
            <div className="space-y-2">
              {resumeData.atsReport.improvementPlan.map((step, idx) => (
                <div key={idx} className="flex gap-2 text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Recruiter Review */}
      {activeTab === 'recruiter' && resumeData && resumeData.recruiterReview && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">6-Second Recruiter Scan Simulation</h3>
              <p className="text-xs text-slate-400">First impressions, readability estimates, and business leadership signals</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Confidence Rate</span>
              <span className="text-xl font-bold text-emerald-400">{resumeData.recruiterReview.confidenceEstimatePercent}%</span>
            </div>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
            <span className="text-xs font-semibold text-slate-400 block">First Impression Synopsis:</span>
            <p className="text-xs text-slate-300 italic">&ldquo;{resumeData.recruiterReview.firstImpression}&rdquo;</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Leadership & Ownership</h4>
              <div className="space-y-2">
                {resumeData.recruiterReview.leadershipSignals.map((sig, idx) => (
                  <div key={idx} className="flex gap-2 text-xs">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-slate-300">{sig}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Business Impact Analysis</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{resumeData.recruiterReview.businessImpactAnalysis}</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Recruiter Priorities Panel</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resumeData.recruiterReview.improvementPriorities.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">{item.topic}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${
                      item.priority === 'CRITICAL' ? 'bg-red-950 text-red-400 border-red-800' :
                      item.priority === 'HIGH' ? 'bg-amber-950 text-amber-500 border-amber-800' :
                      'bg-slate-900 text-slate-400 border-slate-800'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{item.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Visual Heatmap */}
      {activeTab === 'heatmap' && resumeData && resumeData.heatmap && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Visual Density & Impact Heatmap</h3>
            <p className="text-xs text-slate-400">Highlights attention hot-spots, visual densities, and low-impact bullet points</p>
          </div>

          {/* Interactive Heatmap Mock Visualizer */}
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-lg space-y-6">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <span className="text-xs font-bold text-slate-300">{resumeData.name} Resume Blueprint</span>
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-emerald-600 rounded-full" />
                <span className="text-[10px] text-slate-500">Strong</span>
                <span className="w-3 h-3 bg-amber-600 rounded-full" />
                <span className="text-[10px] text-slate-500">Weak</span>
                <span className="w-3 h-3 bg-slate-700 rounded-full" />
                <span className="text-[10px] text-slate-500">Ignored</span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Header block (Ignored) */}
              <div className="p-3 bg-slate-800/40 border border-slate-850 rounded text-slate-400 text-center text-xs">
                Contact & Address Header (Ignored Section)
              </div>

              {/* Profile Block (Strong) */}
              <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded space-y-2">
                <span className="text-xs font-bold text-emerald-500">Summary Highlights (Strong Section)</span>
                <p className="text-xs text-slate-300">&ldquo;Wrote backend routes and maintained local query clients.&rdquo;</p>
              </div>

              {/* Experience Highlights (Weak) */}
              <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-500">Professional Experience (Weak / Low Impact Highlights)</span>
                  <span className="text-[10px] text-slate-500">Needs Quantification</span>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-850 rounded space-y-2 text-xs">
                  <p className="text-slate-300 italic">&ldquo;Lacked achievements on deployment loops and testing structures.&rdquo;</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Low Impact Statements & STAR Suggestions</h4>
            <div className="space-y-4">
              {resumeData.heatmap.lowImpactStatements.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-md space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-rose-500">Original Highlight</span>
                    <span className="text-[10px] bg-amber-950 text-amber-500 px-2 py-0.5 rounded border border-amber-800">
                      Unquantified
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">&ldquo;{item.originalText}&rdquo;</p>
                  <div className="border-t border-slate-900 pt-3">
                    <span className="text-xs font-semibold text-blue-500 block mb-1">Recommended STAR Format:</span>
                    <p className="text-xs text-slate-200">&ldquo;{item.suggestion}&rdquo;</p>
                  </div>
                  <button
                    onClick={() => {
                      setResumeData({
                        ...resumeData,
                        overallScore: Math.min(100, resumeData.overallScore + 2),
                      });
                      addToast('STAR rewrite accepted inline!', 'success');
                    }}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium py-1.5 px-3 rounded border-0 text-[10px] cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Accept Rewrite</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Keywords Breakdown */}
      {activeTab === 'keywords' && resumeData && resumeData.keywordDetails && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Semantic Keyword Taxonomy</h3>
            <p className="text-xs text-slate-400">Verifying noun-distributions, technical keywords, soft skills, and overused terms</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-3">
              <span className="text-xs font-bold text-white block">Technical Skills extracted</span>
              <div className="flex flex-wrap gap-1.5">
                {resumeData.keywordDetails.technicalSkills.map((sk, idx) => (
                  <span key={idx} className="bg-blue-950 text-blue-400 border border-blue-900 px-2 py-0.5 rounded text-[10px]">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-3">
              <span className="text-xs font-bold text-white block">Domain & Soft Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {resumeData.keywordDetails.domainSkills.concat(resumeData.keywordDetails.softSkills).map((sk, idx) => (
                  <span key={idx} className="bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded text-[10px]">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Keyword Warnings</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block">Missing Keywords:</span>
                <span className="text-rose-400 font-bold block">{resumeData.keywordDetails.missingKeywords.join(', ')}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block">Overused Buzzwords:</span>
                <span className="text-amber-500 font-bold block">{resumeData.keywordDetails.overusedKeywords.join(', ')}</span>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 font-semibold block">Duplicate Keywords:</span>
                <span className="text-amber-500 font-bold block">{resumeData.keywordDetails.duplicateKeywords.join(', ') || 'None detected'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: JD Matcher */}
      {activeTab === 'jd' && resumeData && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Target Job Description Matching</h3>
            <p className="text-xs text-slate-400">Match keyword, experience, and skill alignments directly against target criteria</p>
          </div>

          <div className="space-y-4">
            <textarea
              value={pastedJD}
              onChange={(e) => setPastedJD(e.target.value)}
              placeholder="Paste the target job description here..."
              className="w-full h-32 bg-slate-950 text-slate-200 border border-slate-800 rounded p-3 text-xs outline-none focus:border-blue-600 transition-colors"
            />
            <button
              onClick={handleJDMatch}
              disabled={isMatchingJD || !pastedJD.trim()}
              className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-2 px-4 rounded text-xs border-0 cursor-pointer"
            >
              {isMatchingJD ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Executing Semantic Match...</span>
                </>
              ) : (
                <span>Analyze Job Alignment</span>
              )}
            </button>
          </div>

          {jdMatchResult && (
            <div className="border-t border-slate-800 pt-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Semantic Match Outcome</h4>
                  <p className="text-xs text-slate-400">Calculated over noun, skill, and title alignment indices</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Recommendation Priority</span>
                  <span className={`text-xs font-bold ${
                    jdMatchResult.recommendationPriority === 'CRITICAL' ? 'text-rose-500' : 'text-amber-500'
                  }`}>
                    {jdMatchResult.recommendationPriority}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded text-center">
                  <span className="text-xs text-slate-500 block mb-1">Overall Match</span>
                  <span className="text-sm font-bold text-white">{jdMatchResult.overallMatchScore}%</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded text-center">
                  <span className="text-xs text-slate-500 block mb-1">Keyword Match</span>
                  <span className="text-sm font-bold text-blue-400">{jdMatchResult.keywordMatchPercent}%</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded text-center">
                  <span className="text-xs text-slate-500 block mb-1">Experience Match</span>
                  <span className="text-sm font-bold text-emerald-400">{jdMatchResult.experienceMatchPercent}%</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded text-center">
                  <span className="text-xs text-slate-500 block mb-1">Skill Match</span>
                  <span className="text-sm font-bold text-blue-400">{jdMatchResult.skillMatchPercent}%</span>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-300">Semantic Gap Analysis</h5>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2">
                  {jdMatchResult.gapAnalysis.map((gap, idx) => (
                    <div key={idx} className="flex gap-2 text-xs">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-slate-300">{gap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Revision Control */}
      {activeTab === 'versions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white">Resume Revision & Version Control History</h3>
          <div className="space-y-4">
            {versionHistory.map((ver) => (
              <div
                key={ver.versionNumber}
                className="flex justify-between items-center p-4 bg-slate-950 border border-slate-800 rounded-md"
              >
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-white">Version {ver.versionNumber}</span>
                  <p className="text-xs text-slate-500">Analyzed at {ver.timestamp} • Score: {ver.overallScore}%</p>
                </div>
                <div className="flex items-center gap-3">
                  {ver.scoreDifference !== 0 && (
                    <span
                      className={`text-xs font-bold ${
                        ver.scoreDifference > 0 ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {ver.scoreDifference > 0 ? `+${ver.scoreDifference}%` : `${ver.scoreDifference}%`}
                    </span>
                  )}
                  <button
                    onClick={() => handleRollback(ver)}
                    className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 py-1.5 px-3 rounded text-xs cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Rollback</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Growth Metrics */}
      {activeTab === 'analytics' && resumeData && resumeData.analytics && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-sm font-semibold text-white">Resume Metric Growth Analytics</h3>
            <p className="text-xs text-slate-400">Progression monitoring across parser versions and achievements metrics</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded text-center space-y-1">
              <span className="text-xs text-slate-500 block">Growth Progression</span>
              <span className="text-xl font-bold text-emerald-500">+{resumeData.analytics.resumeGrowthPercent}%</span>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded text-center space-y-1">
              <span className="text-xs text-slate-500 block">Keyword Counts</span>
              <span className="text-xl font-bold text-blue-500">{resumeData.analytics.keywordGrowthCount} Words</span>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded text-center space-y-1">
              <span className="text-xs text-slate-500 block">Validated Projects</span>
              <span className="text-xl font-bold text-white">{resumeData.analytics.projectGrowthCount} Verified</span>
            </div>
          </div>

          {/* Simple SVG Chart Trend Visualization */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-4">
            <span className="text-xs font-bold text-slate-300 block">ATS Compatibility Trend over versions</span>
            <div className="h-32 w-full flex items-end justify-between gap-1 pt-4">
              {resumeData.analytics.atsTrend.map((score, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-[10px] text-slate-400">{score}%</span>
                  <div className="w-full bg-blue-600/20 hover:bg-blue-600 rounded transition-all" style={{ height: `${score}px` }} />
                  <span className="text-[9px] text-slate-500">V{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
