import { z } from 'zod';

export const ResumeExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  duration: z.string(),
  highlights: z.array(z.string()),
  quantifiedAchievementsPercentage: z.number().min(0).max(100),
});

export const ParsedResumeSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string().email(),
  skills: z.array(z.string()),
  experience: z.array(ResumeExperienceSchema),
  overallScore: z.number().min(0).max(100),
});

export const STARResponseSchema = z.object({
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

export type ParsedResume = z.infer<typeof ParsedResumeSchema>;
export type ResumeExperience = z.infer<typeof ResumeExperienceSchema>;
export type ATSMatchResult = z.infer<typeof ATSMatchResultSchema>;
export type STARResponse = z.infer<typeof STARResponseSchema>;
