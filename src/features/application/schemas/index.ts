import { z } from 'zod';

export const TrackingStageSchema = z.enum([
  'saved',
  'applied',
  'assessment',
  'interview',
  'hr',
  'manager',
  'offer',
  'rejected',
  'withdrawn',
  'joined',
]);

// Single Job Application Tracker Schema
export const JobApplicationSchema = z.object({
  id: z.string().uuid(),
  companyName: z.string(),
  roleTitle: z.string(),
  stage: TrackingStageSchema,
  salary: z.string().optional(),
  location: z.string().optional(),
  savedAt: z.string(),
  appliedAt: z.string().optional(),
  interviewDate: z.string().optional(),
  offerExpiryDate: z.string().optional(),
  notes: z.string().optional(),
  resumeVersionUsed: z.number().optional(),
  rejectionNotes: z.string().optional(),
  recruiterNotes: z.string().optional(),
});

// Job Match Engine Result Schema
export const JobMatchEstimateSchema = z.object({
  overallMatchScore: z.number().min(0).max(100),
  skillMatchPercent: z.number().min(0).max(100),
  experienceMatchPercent: z.number().min(0).max(100),
  resumeMatchPercent: z.number().min(0).max(100),
  missingSkills: z.array(z.string()),
  applicationPriority: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
  priorityReason: z.string(),
  expectedPrepTimeHours: z.number(),
});

// Resume Pre-Application Optimization Schema
export const ResumeOptimizationSuggestionSchema = z.object({
  suggestedBulletUpdates: z.array(z.object({
    originalHighlight: z.string(),
    optimizedSTARHighlight: z.string(),
    benefit: z.string(),
  })),
  criticalMissingKeywords: z.array(z.string()),
  projectRecommendations: z.array(z.object({
    topic: z.string(),
    justification: z.string(),
    complexity: z.enum(['EASY', 'MEDIUM', 'HARD']),
  })),
  formattingCheckPassed: z.boolean(),
});

// Follow-Up Engine Suggestion Schema
export const FollowUpRuleSchema = z.object({
  applicationId: z.string().uuid(),
  recommendedTimingDays: z.number(),
  remindersEnabled: z.boolean(),
  followUpTemplateText: z.string(),
  followUpTriggerType: z.enum([
    'initial_followup',
    'interview_thank_you',
    'assessment_reminder',
    'offer_extension_request',
  ]),
});

// Rejection Failure-Pattern Analysis Schema
export const RejectionAnalysisSchema = z.object({
  rejectionCountAnalyzed: z.number(),
  recurringResumeFailures: z.array(z.string()),
  criticalSkillGapsIdentified: z.array(z.string()),
  interviewWeaknessesTrend: z.array(z.string()),
  applicationStrategyFailureTrends: z.array(z.string()),
  suggestedStrategicShift: z.string(),
});

// Complete Application Analytics Dashboard Schema
export const ApplicationAnalyticsSchema = z.object({
  totalApplicationsCount: z.number(),
  interviewRatePercent: z.number().min(0).max(100),
  offerRatePercent: z.number().min(0).max(100),
  acceptanceRatePercent: z.number().min(0).max(100),
  roleDistribution: z.array(z.object({
    roleName: z.string(),
    count: z.number(),
  })),
  companyDistribution: z.array(z.object({
    companyName: z.string(),
    count: z.number(),
  })),
  skillGapTrends: z.array(z.string()),
  resumeVersionPerformance: z.array(z.object({
    versionNumber: z.number(),
    interviewCallbackRate: z.number().min(0).max(100),
  })),
});

// B2B Dashboard Support
export const CollegePlacementReportSchema = z.object({
  cohortName: z.string(),
  totalStudentsCount: z.number(),
  placementRatePercent: z.number().min(0).max(100),
  averageSalaryUSD: z.number(),
  topHiringCompanies: z.array(z.string()),
  majorSkillGapClusters: z.array(z.string()),
});

export type TrackingStage = z.infer<typeof TrackingStageSchema>;
export type JobApplication = z.infer<typeof JobApplicationSchema>;
export type JobMatchEstimate = z.infer<typeof JobMatchEstimateSchema>;
export type ResumeOptimizationSuggestion = z.infer<typeof ResumeOptimizationSuggestionSchema>;
export type FollowUpRule = z.infer<typeof FollowUpRuleSchema>;
export type RejectionAnalysis = z.infer<typeof RejectionAnalysisSchema>;
export type ApplicationAnalytics = z.infer<typeof ApplicationAnalyticsSchema>;
export type CollegePlacementReport = z.infer<typeof CollegePlacementReportSchema>;
