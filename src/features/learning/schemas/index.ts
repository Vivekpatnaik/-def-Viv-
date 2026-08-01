import { z } from 'zod';

export const StudyPrioritySchema = z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']);

// Base Learning Task Schema
export const LearningTaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  priority: StudyPrioritySchema,
  timeToCompleteMinutes: z.number(),
  officialResourceUrl: z.string().url(),
  officialResourceTitle: z.string(),
  outcome: z.string(),
});

// Daily, Weekly, Monthly Plans
export const LearningPlanSchema = z.object({
  id: z.string().uuid(),
  dailyTasks: z.array(LearningTaskSchema),
  weeklyTheme: z.string(),
  weeklyStudyHoursGoal: z.number(),
  monthlyTargetMilestone: z.string(),
});

// Preparation OS Topics (Aptitude, Verbal, Case studies, technical)
export const PrepModuleSchema = z.object({
  moduleTitle: z.string(),
  category: z.enum(['technical', 'aptitude', 'verbal', 'logical', 'case_study', 'presentation']),
  topicsList: z.array(z.string()),
  completionPercentage: z.number().min(0).max(100),
});

// Revision Task Schema (Flashcards, Quick Notes, Weak topics checklist)
export const RevisionTaskSchema = z.object({
  id: z.string().uuid(),
  conceptTitle: z.string(),
  quickNotes: z.string(),
  isWeakTopic: z.boolean(),
  lastRevisedAt: z.string().optional(),
  revisionPriority: StudyPrioritySchema,
});

// Practice Problem / Question Schema (Coding problem, scenario, assignment)
export const PracticeQuestionSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  type: z.enum(['coding', 'scenario', 'verbal_exercise', 'case_question']),
  description: z.string(),
  idealResponseSummary: z.string(),
  userAnswerText: z.string().optional(),
  isPassed: z.boolean().optional(),
});

// Project Recommendation Mapped to role and experience
export const ProjectRecommendationSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  scale: z.enum(['mini', 'medium', 'large', 'portfolio']),
  techStack: z.array(z.string()),
  complexity: z.enum(['EASY', 'MEDIUM', 'HARD']),
  architectureBlueprint: z.string(),
  portfolioValueProposition: z.string(),
});

// Topic Mastery & Time Analytics
export const LearningAnalyticsSchema = z.object({
  totalLearningHours: z.number(),
  completionRatePercent: z.number().min(0).max(100),
  consistencyStreakDays: z.number(),
  revisionAccuracyPercent: z.number().min(0).max(100),
  skillGrowthPercent: z.number().min(0).max(100),
  topicMasteryDistribution: z.array(z.object({
    topicName: z.string(),
    masteryScore: z.number().min(0).max(100),
  })),
});

export type StudyPriority = z.infer<typeof StudyPrioritySchema>;
export type LearningTask = z.infer<typeof LearningTaskSchema>;
export type LearningPlan = z.infer<typeof LearningPlanSchema>;
export type PrepModule = z.infer<typeof PrepModuleSchema>;
export type RevisionTask = z.infer<typeof RevisionTaskSchema>;
export type PracticeQuestion = z.infer<typeof PracticeQuestionSchema>;
export type ProjectRecommendation = z.infer<typeof ProjectRecommendationSchema>;
export type LearningAnalytics = z.infer<typeof LearningAnalyticsSchema>;
