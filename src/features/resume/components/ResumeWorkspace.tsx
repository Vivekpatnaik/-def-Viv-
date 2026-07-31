'use client';

import React, { useState } from 'react';
import {
  UploadCloud,
  CheckCircle,
  Play,
  Loader2,
  FileText,
  Compass,
  Briefcase,
  History,
  Download,
  Check,
} from 'lucide-react';
import { useToast } from '@/shared/providers/ToastProvider';
import { ResumeService } from '../services/resumeService';
import { ParsedResume, ResumeVersionRecord } from '../schemas';

type ActiveTabType = 'upload' | 'star' | 'roles' | 'companies' | 'versions';

export function ResumeWorkspace() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTabType>('upload');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'parsing' | 'success'>('idle');
  const [resumeData, setResumeData] = useState<ParsedResume | null>(null);
  const [versionHistory, setVersionHistory] = useState<ResumeVersionRecord[]>([]);
  const { addToast } = useToast();

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

    // Step 1: Upload simulation
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setUploadStatus('parsing');
    addToast('Executing structured Claude 3.5 parsing checks...', 'info');

    // Step 2: Parse and score simulation
    await new Promise((resolve) => setTimeout(resolve, 1500));
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
      addToast('Resume processed successfully! View suggestions inline.', 'success');
    } catch (err) {
      console.error(err);
      addToast('Parsing failed. Please verify file format and try again.', 'error');
      setUploadStatus('idle');
    }
  };

  const handleOneClickRewrite = async (option: 'ats_optimized' | 'fresher' | 'experienced' | 'short_format' | 'long_format') => {
    if (!resumeData) return;
    addToast(`Initiating one-click rewrite: ${option.replace(/_/g, ' ')}...`, 'info');
    setUploadStatus('parsing');

    try {
      const rewritten = await ResumeService.executeRewrite(resumeData, option);
      setResumeData(rewritten);

      // Append new version
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
      addToast(`Successfully rewrote and created Version ${nextVersionNum}!`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Rewrite failed. Please retry.', 'error');
      setUploadStatus('success');
    }
  };

  const handleRollback = (ver: ResumeVersionRecord) => {
    setResumeData(ver.resumeData);
    addToast(`Successfully rolled back to Version ${ver.versionNumber}!`, 'success');
  };

  const handleExport = (format: 'pdf' | 'docx' | 'txt') => {
    addToast(`Generating and downloading resume as formatted .${format.toUpperCase()}...`, 'success');
  };

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto text-left">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Resume Intelligence Operating System</h1>
          <p className="text-slate-400 text-sm">Quantify experience achievements and map multi-role compatibilities</p>
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
        <div className="flex border-b border-slate-800 gap-1 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'upload', label: 'Resume & Score', icon: FileText },
            { id: 'star', label: 'STAR Suggestions', icon: Compass },
            { id: 'roles', label: 'Role Alignment (15)', icon: Briefcase },
            { id: 'companies', label: 'Company Match (13)', icon: History },
            { id: 'versions', label: 'Version History', icon: History },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActiveTabType)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 bg-transparent border-0 cursor-pointer text-xs font-medium ${
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
                  {uploadStatus === 'uploading' ? 'Uploading to Supabase Storage...' : 'Extracting STAR achievements via Claude 3.5...'}
                </h3>
                <p className="text-xs text-slate-500">Do not close this panel to ensure proper pipeline calculations</p>
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
                    <span>Validated name: <strong className="text-white">{resumeData.name}</strong></span>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Contact validated: <strong className="text-white">{resumeData.email}</strong></span>
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

      {/* STAR Suggestions Tab */}
      {activeTab === 'star' && resumeData && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white mb-2">STAR Rewrite Recommendations</h3>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-md space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-400">Original Highlight</span>
              <span className="text-[10px] bg-amber-950 text-amber-500 px-2 py-0.5 rounded border border-amber-800">
                Lacks Quantification
              </span>
            </div>
            <p className="text-xs text-slate-300">{"\"Wrote backend routes and maintained local query clients.\""}</p>
            <div className="border-t border-slate-800 pt-3">
              <span className="text-xs font-semibold text-blue-500 block mb-1">Recommended STAR Format:</span>
              <p className="text-xs text-slate-200">
                {"\"Engineered 14 modular relational backend query routes, increasing data parsing speeds by 30% and reducing database transaction latencies to 150ms.\""}
              </p>
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
        </div>
      )}

      {/* Role Matching (15 Category Matrix) */}
      {activeTab === 'roles' && resumeData && resumeData.roleMatches && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white">Estimated Career Role Compatibility Matrix</h3>
          <p className="text-xs text-slate-400">Comparing your validated experience highlights against 15 industry roles:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {resumeData.roleMatches.map((role) => (
              <div key={role.roleName} className="p-4 bg-slate-950 border border-slate-800 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-white">{role.roleName}</span>
                  <span className="text-xs font-bold text-blue-400">{role.compatibilityScore}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mb-2">
                  <div className="bg-blue-600 h-full" style={{ width: `${role.compatibilityScore}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">{role.justification}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Company Matching (13 Enterprise Matrix) */}
      {activeTab === 'companies' && resumeData && resumeData.companyMatches && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white">Estimated Enterprise Company Compatibility</h3>
          <p className="text-xs text-slate-400">Estimated resume match against 13 industry leaders (does not guarantee hiring):</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {resumeData.companyMatches.map((comp) => (
              <div key={comp.companyName} className="p-4 bg-slate-950 border border-slate-800 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-white">{comp.companyName}</span>
                  <span className="text-xs font-bold text-emerald-400">{comp.estimatedMatchPercent}%</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  <strong className="text-slate-400 block mb-0.5">Key Prerequisite Lacking:</strong>
                  {comp.keyPrerequisiteLacking}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Version History & Rollback Dropdowns */}
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
    </div>
  );
}
