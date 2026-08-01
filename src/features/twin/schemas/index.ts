import { z } from 'zod';

// 1. Skill Profile Entry Schema
export const TwinSkillSchema = z.object({
  skillName: z.string(),
  currentLevel: z.number().min(1).max(5),
  targetLevel: z.number().min(1).max(5),
  confidenceScore: z.number().min(0).max(100),
  evidenceLink: z.string().optional(),
});

// 2. Learning Profile Schema
export const TwinLearningProfileSchema = z.object({
  learningSpeed: z.enum(['slow', 'moderate', 'fast']),
  preferredResources: z.array(z.string()),
  weakTopics: z.array(z.string()),
  strongTopics: z.array(z.string()),
  completionRatePercent: z.number().min(0).max(100),
  consistencyPercent: z.number().min(0).max(100),
});

// 3. Interview Profile Schema
export const TwinInterviewProfileSchema = z.object({
  pastSessionsCount: z.number(),
  questionTypesTested: z.array(z.string()),
  weakAreas: z.array(z.string()),
  strongAreas: z.array(z.string()),
  communicationScore: z.number().min(0).max(100),
  technicalScore: z.number().min(0).max(100),
  leadershipScore: z.number().min(0).max(100),
  improvementTrend: z.array(z.number()),
});

// 4. Project Profile Schema
export const TwinProjectSchema = z.object({
  projectTitle: z.string(),
  technologies: z.array(z.string()),
  complexity: z.enum(['EASY', 'MEDIUM', 'HARD']),
  architectureBlueprint: z.string(),
  businessValueScore: z.number().min(0).max(100),
  portfolioValueScore: z.number().min(0).max(100),
});

// 5. Application Profile Schema
export const TwinApplicationProfileSchema = z.object({
  totalApplications: z.number(),
  interviewsCount: z.number(),
  offersCount: z.number(),
  rejectionsCount: z.number(),
  activeFollowUpsCount: z.number(),
  feedbackSummary: z.string().optional(),
});

// 6. Career Preferences Schema
export const TwinPreferencesSchema = z.object({
  preferredDomains: z.array(z.string()),
  preferredRoles: z.array(z.string()),
  preferredCompanies: z.array(z.string()),
  locationStyle: z.enum(['remote', 'hybrid', 'onsite']),
  expectedSalary: z.string(),
  learningStyle: z.string(),
});

// 7. Career Memory Logs Schema
export const TwinMemorySchema = z.object({
  mistakesLog: z.array(z.string()),
  achievementsLog: z.array(z.string()),
  repeatedWeaknesses: z.array(z.string()),
  repeatedSuccesses: z.array(z.string()),
  careerChangesCount: z.number(),
});

// 8. Timeline Event Nodes
export const TwinTimelineEventSchema = z.object({
  id: z.string().uuid(),
  eventTitle: z.string(),
  category: z.enum(['joined', 'assessment', 'learning', 'projects', 'interviews', 'applications', 'offers', 'growth']),
  description: z.string(),
  timestamp: z.string(),
});

// 9. Unified Career Digital Twin Main Schema
export const CareerDigitalTwinSchema = z.object({
  id: z.string().uuid(),
  versionNumber: z.number(),
  updatedAt: z.string(),
  explanationOfLastUpdate: z.string(),

  // Base Profiles
  name: z.string(),
  email: z.string().email(),
  targetRole: z.string(),
  experienceYears: z.number(),
  readinessIndex: z.number().min(0).max(100),
  interviewIndex: z.number().min(0).max(100),

  // Multi-dimensional sub-profiles
  skills: z.array(TwinSkillSchema),
  learningProfile: TwinLearningProfileSchema,
  interviewProfile: TwinInterviewProfileSchema,
  projects: z.array(TwinProjectSchema),
  applicationProfile: TwinApplicationProfileSchema,
  preferences: TwinPreferencesSchema,
  memory: TwinMemorySchema,
  timeline: z.array(TwinTimelineEventSchema),
});

// 10. Twin Version Snapshots for rollback
export const TwinVersionRecordSchema = z.object({
  versionNumber: z.number(),
  timestamp: z.string(),
  explanation: z.string(),
  twinData: CareerDigitalTwinSchema,
});

export type TwinSkill = z.infer<typeof TwinSkillSchema>;
export type TwinLearningProfile = z.infer<typeof TwinLearningProfileSchema>;
export type TwinInterviewProfile = z.infer<typeof TwinInterviewProfileSchema>;
export type TwinProject = z.infer<typeof TwinProjectSchema>;
export type TwinApplicationProfile = z.infer<typeof TwinApplicationProfileSchema>;
export type TwinPreferences = z.infer<typeof TwinPreferencesSchema>;
export type TwinMemory = z.infer<typeof TwinMemorySchema>;
export type TwinTimelineEvent = z.infer<typeof TwinTimelineEventSchema>;
export type CareerDigitalTwin = z.infer<typeof CareerDigitalTwinSchema>;
export type TwinVersionRecord = z.infer<typeof TwinVersionRecordSchema>;
