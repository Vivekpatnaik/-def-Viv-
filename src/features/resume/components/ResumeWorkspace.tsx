'use client';

import React, { useState } from 'react';
import { UploadCloud, CheckCircle, AlertTriangle, Play, Loader2 } from 'lucide-react';
import { useToast } from '@/shared/providers/ToastProvider';

export function ResumeWorkspace() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'parsing' | 'success'>('idle');
  const [score, setScore] = useState(0);
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
    setFile(selectedFile);
    startMockParsingPipeline();
  };

  const startMockParsingPipeline = async () => {
    setUploadStatus('uploading');
    addToast('Uploading resume to secure Supabase storage...', 'info');

    // Step 1: Upload simulation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUploadStatus('parsing');
    addToast('Executing structured Claude 3.5 parsing checks...', 'info');

    // Step 2: Parse and score simulation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUploadStatus('success');
    setScore(85);
    addToast('Resume processed successfully! View suggestions inline.', 'success');
  };

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Resume Intelligence</h1>
          <p className="text-slate-400 text-sm">Quantify experience and align keywords to bypass applicant filters</p>
        </div>
      </div>

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

      {uploadStatus === 'success' && file && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-20 h-20 rounded-full border-4 border-emerald-600 flex items-center justify-center font-bold text-xl text-white mx-auto">
                {score}%
              </div>
              <h3 className="text-sm font-semibold text-white">Resume Alignment</h3>
              <p className="text-xs text-slate-500">Quantifiable experience highlights are strong</p>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-4">
              <div className="flex gap-3 text-xs text-slate-400">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <span className="font-semibold text-white">Contact info matched</span>
                  <p className="text-[10px] mt-0.5">Found validated email and name profiles.</p>
                </div>
              </div>
              <div className="flex gap-3 text-xs text-slate-400">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <span className="font-semibold text-white">Missing target credentials</span>
                  <p className="text-[10px] mt-0.5">Lacks exact keywords for Next.js App Router architectures.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-white">Rewrite Recommendations</h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-md space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-400">Original Experience Bullet</span>
                  <span className="text-[10px] bg-amber-950 text-amber-500 px-2 py-0.5 rounded border border-amber-800">
                    Needs STAR Quantification
                  </span>
                </div>
                <p className="text-xs text-slate-300">{"\"Wrote backend routes and maintained local query clients.\""}</p>
                <div className="border-t border-slate-800 pt-3">
                  <span className="text-xs font-semibold text-blue-500 block mb-1">Recommended STAR Bullet:</span>
                  <p className="text-xs text-slate-200">
                    {"\"Engineered 14 modular relational backend query routes, increasing data parsing speeds by 30% and reducing database transaction latencies to 150ms.\""}
                  </p>
                </div>
                <button
                  onClick={() => {
                    addToast('Suggested rewrite accepted and synchronized!', 'success');
                  }}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium py-1 px-3 rounded border-0 text-[10px] cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Accept Rewrite</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
