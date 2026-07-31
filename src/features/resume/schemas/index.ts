import { z } from 'zod';

export const ResumeExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  duration: z.string(),
  highlights: z.array(z.string()),
  quantifiedAchievementsPercentage: z.number().min(0).max(100),
});

export const RoleMatchSchema = z.object({
  roleName: z.string(),
  compatibilityScore: z.number().min(0).max(100),
  justification: z.string(),
});

export const CompanyMatchSchema = z.object({
  companyName: z.string(),
  estimatedMatchPercent: z.number().min(0).max(100),
  keyPrerequisiteLacking: z.string(),
});

export const ParsedResumeSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  skills: z.array(z.string()),
  experience: z.array(ResumeExperienceSchema),
  overallScore: z.number().min(0).max(100),
  roleMatches: z.array(RoleMatchSchema).optional(),
  companyMatches: z.array(CompanyMatchSchema).optional(),
});

export const STARResponseSchema = z.object({
  id: z.string().uuid().optional(),
  originalText: z.string(),
  suggestedText: z.string(),
  reason: z.string(),
});

export const ATSMatchResultSchema = z.object({
  matchPercentage: z.number().min(0).max(100),
  missingKeywords: z.array(z.string()),
  semanticGapAnalysis: z.string(),
  suggestedResumeUpdates: z.array(STARResponseSchema),
});

export const ResumeVersionRecordSchema = z.object({
  versionNumber: z.number(),
  timestamp: z.string(),
  scoreDifference: z.number(),
  overallScore: z.number(),
  resumeData: ParsedResumeSchema,
});

export type ParsedResume = z.infer<typeof ParsedResumeSchema>;
export type ResumeExperience = z.infer<typeof ResumeExperienceSchema>;
export type RoleMatch = z.infer<typeof RoleMatchSchema>;
export type CompanyMatch = z.infer<typeof CompanyMatchSchema>;
export type ATSMatchResult = z.infer<typeof ATSMatchResultSchema>;
export type STARResponse = z.infer<typeof STARResponseSchema>;
export type ResumeVersionRecord = z.infer<typeof ResumeVersionRecordSchema>;
