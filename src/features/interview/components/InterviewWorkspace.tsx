'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InterviewSetupSchema, InterviewSetupInput, GeneratedQuestion, ComprehensiveEvaluation } from '../schemas';
import { useToast } from '@/shared/providers/ToastProvider';
import { InterviewService } from '../services/interviewService';
import { Card } from '@/shared/components/ui/Card';
import { Badge } from '@/shared/components/ui/Badge';
import { Mic, MicOff, CheckCircle, HelpCircle, Loader2, Sparkles, Send, Play } from 'lucide-react';

export function InterviewWorkspace() {
  const [sessionState, setSessionState] = useState<'setup' | 'active' | 'completed'>('setup');
  const [setupData, setSetupData] = useState<InterviewSetupInput | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<GeneratedQuestion | null>(null);
  const [lastScore, setLastScore] = useState<number>(0);
  const [transcriptLogs, setTranscriptLogs] = useState<{ speaker: 'ai' | 'user'; text: string }[]>([]);
  const [answerInput, setTranscriptAnswer] = useState('');
  const [evaluationReport, setEvaluationReport] = useState<ComprehensiveEvaluation | null>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InterviewSetupInput>({
    resolver: zodResolver(InterviewSetupSchema),
    defaultValues: {
      roleName: 'Senior Frontend Engineer',
      companyName: 'Google',
      experienceLevel: 'mid',
      startingDifficulty: 'medium',
    },
  });

  const handleStartInterview = async (data: InterviewSetupInput) => {
    setIsProcessing(true);
    setSetupData(data);
    addToast('Generating custom interview template plan...', 'info');

    try {
      await InterviewService.generateInterviewPlan(data);
      const startQuestion = await InterviewService.generateNextQuestion(
        data.roleName,
        data.startingDifficulty === 'adaptive' ? 'medium' : data.startingDifficulty as 'easy' | 'medium' | 'hard',
        0
      );

      setCurrentQuestion(startQuestion);
      setTranscriptLogs([{ speaker: 'ai', text: startQuestion.questionText }]);
      setSessionState('active');
      addToast('Interview session successfully initialized! Start speaking.', 'success');
    } catch (err) {
      console.error(err);
      addToast('Generation failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answerInput.trim() || !currentQuestion) {
      addToast('Please provide or speak your answer first.', 'info');
      return;
    }

    setIsProcessing(true);
    const textToSubmit = answerInput;
    setTranscriptAnswer('');

    // Append user answer transcript inline
    setTranscriptLogs((prev) => [...prev, { speaker: 'user', text: textToSubmit }]);

    try {
      addToast('Analyzing response logic and speech clarity...', 'info');
      const grading = await InterviewService.evaluateAnswer(currentQuestion.questionText, textToSubmit);

      setLastScore(grading.score);
      addToast(`Answer evaluated! score: ${grading.score}%`, 'success');

      // Check if a follow-up trigger applies
      if (grading.suggestedFollowUpQuestion) {
        setTranscriptLogs((prev) => [
          ...prev,
          { speaker: 'ai', text: grading.suggestedFollowUpQuestion as string },
        ]);
        setCurrentQuestion({
          questionText: grading.suggestedFollowUpQuestion,
          questionType: 'technical',
          difficultyLevel: currentQuestion.difficultyLevel,
          idealResponseOutline: 'Explain REST statelessness and cache controls.',
          isFollowUp: true,
        });
      } else {
        // Step to next adaptive difficulty question
        addToast('Adapting interview parameters to next level...', 'info');
        const nextQ = await InterviewService.generateNextQuestion(
          setupData?.roleName || 'Senior Frontend Engineer',
          currentQuestion.difficultyLevel,
          grading.score
        );
        setCurrentQuestion(nextQ);
        setTranscriptLogs((prev) => [...prev, { speaker: 'ai', text: nextQ.questionText }]);
      }
    } catch (err) {
      console.error(err);
      addToast('Failed to parse response. Please retry.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFinalizeInterview = async () => {
    setIsProcessing(true);
    addToast('Compiling multi-dimensional report card...', 'info');

    try {
      const report = await InterviewService.finalizeEvaluationReport(
        'mock-session-id',
        setupData?.roleName || 'Senior Frontend Engineer',
        setupData?.companyName || 'Google'
      );
      setEvaluationReport(report);
      setSessionState('completed');
      addToast('Interview evaluation completed! View report details.', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to compile report card.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto text-left">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Adaptive AI Mock Interviews</h1>
        <p className="text-slate-400 text-sm">Simulate enterprise interview pressure under dynamic adaptive difficulty controls</p>
      </div>

      {/* SETUP STATE VIEW */}
      {sessionState === 'setup' && (
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <h2 className="text-lg font-bold text-white mb-6 text-center">Configure Interview Parameters</h2>
            <form onSubmit={handleSubmit(handleStartInterview)} className="space-y-5">
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Job Role</label>
                <select
                  {...register('roleName')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                >
                  <option value="Senior Frontend Engineer">Senior Frontend Engineer</option>
                  <option value="Backend System Architect">Backend System Architect</option>
                  <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                </select>
                {errors.roleName && <p className="mt-1 text-xs text-rose-500">{errors.roleName.message}</p>}
              </div>

              {/* Company Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Enterprise Company</label>
                <select
                  {...register('companyName')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-md py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                >
                  <option value="Google">Google</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Meta">Meta</option>
                </select>
                {errors.companyName && <p className="mt-1 text-xs text-rose-500">{errors.companyName.message}</p>}
              </div>

              {/* Experience selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Experience level</label>
                  <select
                    {...register('experienceLevel')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="entry">Intern / Entry</option>
                    <option value="mid">Mid-Level</option>
                    <option value="senior">Senior Hiring</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Difficulty</label>
                  <select
                    {...register('startingDifficulty')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-md py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="easy">Easy Baseline</option>
                    <option value="medium">Medium Standard</option>
                    <option value="hard">Hard Pressure</option>
                    <option value="adaptive">Dynamic Adaptive</option>
                  </select>
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
                    <span>Configuring Plan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Launch AI Interview</span>
                  </>
                )}
              </button>
            </form>
          </Card>
        </div>
      )}

      {/* ACTIVE STATE SIMULATOR VIEW */}
      {sessionState === 'active' && currentQuestion && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Visual Waveform Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 text-center flex flex-col items-center justify-center space-y-6 bg-slate-900/50">
              <div className="flex justify-between items-center w-full border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="brand">{currentQuestion.questionType}</Badge>
                  <Badge variant={currentQuestion.difficultyLevel === 'hard' ? 'danger' : currentQuestion.difficultyLevel === 'medium' ? 'warning' : 'success'}>
                    {currentQuestion.difficultyLevel} level
                  </Badge>
                </div>
                {lastScore > 0 && <span className="text-xs text-slate-500 font-medium">Last Score: {lastScore}%</span>}
              </div>

              {/* Animated Waveform Wrapper */}
              <div className="w-full h-32 flex items-center justify-center gap-1.5 px-12">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full bg-blue-500 transition-all duration-300 ${
                      isProcessing ? 'animate-pulse' : ''
                    }`}
                    style={{
                      height: isProcessing ? `${Math.sin(i) * 60 + 80}%` : '20%',
                    }}
                  />
                ))}
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-md w-full text-left">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Current Question</span>
                <p className="text-sm font-semibold text-white leading-relaxed">{currentQuestion.questionText}</p>
              </div>

              {/* Input Area */}
              <div className="w-full space-y-3">
                <textarea
                  value={answerInput}
                  onChange={(e) => setTranscriptAnswer(e.target.value)}
                  placeholder="Speak or type your detailed response here..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-md p-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-600 min-h-[100px]"
                />

                {/* Voice mode controllers */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setIsMicMuted(!isMicMuted);
                      addToast(isMicMuted ? 'Microphone unmuted.' : 'Microphone muted.', 'info');
                    }}
                    className={`p-2.5 rounded-full border cursor-pointer shrink-0 ${
                      isMicMuted ? 'border-rose-800 bg-rose-950/20 text-rose-500' : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                    aria-label="Toggle Microphone"
                  >
                    {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={handleFinalizeInterview}
                      disabled={isProcessing}
                      className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-semibold py-2 px-4 rounded text-xs cursor-pointer disabled:opacity-50"
                    >
                      End & Evaluate
                    </button>
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={isProcessing}
                      className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-5 rounded border-0 text-xs cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      <span>Submit Answer</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Dialogue Transcript Column */}
          <div className="space-y-6">
            <Card className="p-6 h-[450px] flex flex-col">
              <h3 className="text-sm font-semibold text-white mb-4 border-b border-slate-800 pb-2">Dialogue Log</h3>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {transcriptLogs.map((log, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-md text-xs leading-relaxed max-w-[85%] text-left ${
                      log.speaker === 'ai'
                        ? 'bg-slate-950 border border-slate-800 text-slate-300 self-start mr-auto'
                        : 'bg-blue-950/30 border border-blue-900/50 text-blue-100 self-end ml-auto'
                    }`}
                  >
                    <span className="font-bold uppercase tracking-wider text-[9px] block mb-1 text-slate-500">
                      {log.speaker === 'ai' ? 'AI Interviewer' : 'You'}
                    </span>
                    <p>{log.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* COMPLETED REPORT CARD VIEW */}
      {sessionState === 'completed' && evaluationReport && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Aggregate Gauge */}
            <Card className="p-6 text-center space-y-3 bg-slate-900/50">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Score</h3>
              <div className="w-20 h-20 rounded-full border-4 border-emerald-600 flex items-center justify-center font-bold text-xl text-white mx-auto">
                {evaluationReport.overallScore}%
              </div>
              <Badge variant="success">Interview Ready</Badge>
            </Card>
            {/* Tech Score */}
            <Card className="p-4 text-center space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Technical Score</span>
              <span className="text-lg font-bold text-white block">{evaluationReport.technicalScore}%</span>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full" style={{ width: `${evaluationReport.technicalScore}%` }} />
              </div>
            </Card>
            {/* Communication Score */}
            <Card className="p-4 text-center space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Communication</span>
              <span className="text-lg font-bold text-white block">{evaluationReport.communicationScore}%</span>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full" style={{ width: `${evaluationReport.communicationScore}%` }} />
              </div>
            </Card>
            {/* Confidence Score */}
            <Card className="p-4 text-center space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Confidence Rating</span>
              <span className="text-lg font-bold text-white block">{evaluationReport.confidenceScore}%</span>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full" style={{ width: `${evaluationReport.confidenceScore}%` }} />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Strengths & Weaknesses Cards */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Core Strengths</h3>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {evaluationReport.strengths.map((str, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-sm font-semibold text-white mb-4">Areas of Improvement</h3>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {evaluationReport.weaknesses.map((weak, i) => (
                    <li key={i} className="flex gap-2">
                      <HelpCircle className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Targeted Growth Actions & Resources */}
            <Card className="p-6 space-y-4">
              <h3 className="text-sm font-semibold text-white">Recommended Study Roadmap Sync</h3>
              <p className="text-xs text-slate-400">The platform has automatically injected these targeted tasks into your active roadmap to address technical debt:</p>

              <div className="space-y-4">
                {evaluationReport.suggestedResources.map((res, i) => (
                  <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-md text-left">
                    <span className="text-xs font-semibold text-white block">{res.title}</span>
                    <p className="text-[10px] text-slate-400 mt-1">{res.reason}</p>
                    <button
                      onClick={() => {
                        addToast(`Opening recommended study URL: ${res.url}`, 'info');
                      }}
                      className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium py-1 px-3 rounded border-0 text-[10px] cursor-pointer mt-3"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Study Resource</span>
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
