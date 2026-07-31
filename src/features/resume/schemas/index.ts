import { z } from 'zod';

// Base Experience Highlight
export const ResumeExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  duration: z.string(),
  highlights: z.array(z.string()),
  quantifiedAchievementsPercentage: z.number().min(0).max(100),
});

// Role Matching Schema (15-role matrix compatible)
export const RoleMatchSchema = z.object({
  roleName: z.string(),
  compatibilityScore: z.number().min(0).max(100),
  justification: z.string(),
});

// Company Match Schema (13-company matrix compatible)
export const CompanyMatchSchema = z.object({
  companyName: z.string(),
  estimatedMatchPercent: z.number().min(0).max(100),
  keyPrerequisiteLacking: z.string(),
});

// Resume Heatmap Schema
export const ResumeHeatmapSchema = z.object({
  strongSections: z.array(z.string()),
  weakSections: z.array(z.string()),
  ignoredSections: z.array(z.string()),
  denseAreas: z.array(z.string()),
  missingInformation: z.array(z.string()),
  lowImpactStatements: z.array(z.object({
    originalText: z.string(),
    suggestion: z.string(),
    reason: z.string(),
  })),
});

// ATS Compatibility & Improvement Plan
export const ATSReportSchema = z.object({
  compatibilityScore: z.number().min(0).max(100),
  formattingCheckPassed: z.boolean(),
  sectionOrderCorrect: z.boolean(),
  readabilityScore: z.number().min(0).max(100),
  improvementPlan: z.array(z.string()),
  parsingWarnings: z.array(z.string()),
});

// Recruiter Intelligence Simulation
export const RecruiterReviewSchema = z.object({
  firstImpression: z.string(),
  professionalismRating: z.number().min(0).max(100),
  readabilityScore: z.number().min(0).max(100),
  confidenceEstimatePercent: z.number().min(0).max(100),
  leadershipSignals: z.array(z.string()),
  ownershipSignals: z.array(z.string()),
  businessImpactAnalysis: z.string(),
  improvementPriorities: z.array(z.object({
    topic: z.string(),
    priority: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
    recommendation: z.string(),
  })),
});

// Job Description Match Schema
export const JDMatchResultSchema = z.object({
  overallMatchScore: z.number().min(0).max(100),
  keywordMatchPercent: z.number().min(0).max(100),
  experienceMatchPercent: z.number().min(0).max(100),
  skillMatchPercent: z.number().min(0).max(100),
  gapAnalysis: z.array(z.string()),
  missingKeywords: z.array(z.string()),
  overusedKeywords: z.array(z.string()),
  recommendationPriority: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
});

// Keyword Engine Extraction
export const KeywordExtractionSchema = z.object({
  technicalSkills: z.array(z.string()),
  domainSkills: z.array(z.string()),
  softSkills: z.array(z.string()),
  industryTerms: z.array(z.string()),
  actionVerbs: z.array(z.string()),
  duplicateKeywords: z.array(z.string()),
  overusedKeywords: z.array(z.string()),
  missingKeywords: z.array(z.string()),
});

// Resume Growth Analytics
export const ResumeAnalyticsSchema = z.object({
  resumeGrowthPercent: z.number().min(0).max(100),
  atsTrend: z.array(z.number()),
  roleMatchTrend: z.array(z.number()),
  improvementTrend: z.array(z.number()),
  keywordGrowthCount: z.number(),
  projectGrowthCount: z.number(),
});

// Unified Parsed Resume Workspace Schema
export const ParsedResumeSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  skills: z.array(z.string()),
  experience: z.array(ResumeExperienceSchema),
  overallScore: z.number().min(0).max(100),
  roleMatches: z.array(RoleMatchSchema).optional(),
  companyMatches: z.array(CompanyMatchSchema).optional(),
  heatmap: ResumeHeatmapSchema.optional(),
  atsReport: ATSReportSchema.optional(),
  recruiterReview: RecruiterReviewSchema.optional(),
  keywordDetails: KeywordExtractionSchema.optional(),
  analytics: ResumeAnalyticsSchema.optional(),
});

// STAR Suggestion Type Schema
export const STARResponseSchema = z.object({
  id: z.string().uuid().optional(),
  originalText: z.string(),
  suggestedText: z.string(),
  reason: z.string(),
});

// Old ATS Match Schema (maintained for test backward compatibility)
export const ATSMatchResultSchema = z.object({
  matchPercentage: z.number().min(0).max(100),
  missingKeywords: z.array(z.string()),
  semanticGapAnalysis: z.string(),
  suggestedResumeUpdates: z.array(STARResponseSchema),
});

// Resume Version Timeline Record
export const ResumeVersionRecordSchema = z.object({
  versionNumber: z.number(),
  timestamp: z.string(),
  scoreDifference: z.number(),
  overallScore: z.number(),
  resumeData: ParsedResumeSchema,
});

// TypeScript typings mapping directly to Zod schemas
export type ParsedResume = z.infer<typeof ParsedResumeSchema>;
export type ResumeExperience = z.infer<typeof ResumeExperienceSchema>;
export type RoleMatch = z.infer<typeof RoleMatchSchema>;
export type CompanyMatch = z.infer<typeof CompanyMatchSchema>;
export type ResumeHeatmap = z.infer<typeof ResumeHeatmapSchema>;
export type ATSReport = z.infer<typeof ATSReportSchema>;
export type RecruiterReview = z.infer<typeof RecruiterReviewSchema>;
export type JDMatchResult = z.infer<typeof JDMatchResultSchema>;
export type KeywordExtraction = z.infer<typeof KeywordExtractionSchema>;
export type ResumeAnalytics = z.infer<typeof ResumeAnalyticsSchema>;
export type ATSMatchResult = z.infer<typeof ATSMatchResultSchema>;
export type STARResponse = z.infer<typeof STARResponseSchema>;
export type ResumeVersionRecord = z.infer<typeof ResumeVersionRecordSchema>;
