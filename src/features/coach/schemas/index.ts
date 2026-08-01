import { z } from 'zod';

export const CoachMessageRoleSchema = z.enum(['assistant', 'user', 'system']);

// Structured block detailing Why, What, How for high-fidelity responses
export const StrategyBlockSchema = z.object({
  why: z.string(),
  what: z.string(),
  how: z.string(),
  expectedOutcome: z.string(),
  estimatedMinutesToComplete: z.number(),
  priority: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
});

// Single Message Node in Conversation History
export const CoachMessageSchema = z.object({
  id: z.string().uuid(),
  role: CoachMessageRoleSchema,
  content: z.string(),
  timestamp: z.string(),
  strategyDetails: StrategyBlockSchema.optional(), // AI Coach never just chats; it plans
});

// Goal tracking schemas
export const GoalNodeSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  timeframe: z.enum(['today', 'weekly', 'monthly', 'quarterly']),
  completed: z.boolean(),
  dueDate: z.string(),
});

// Accountability Metrics
export const AccountabilityMetricsSchema = z.object({
  missedTasksCount: z.number(),
  completedTasksCount: z.number(),
  learningConsistencyPercent: z.number().min(0).max(100),
  interviewPracticeHours: z.number(),
  codingPracticeSubmissions: z.number(),
  activeStreakDays: z.number(),
});

// Complete state-of-the-art Coach Strategy Package
export const CoachStrategyReportSchema = z.object({
  focusArea: z.string(),
  currentReadinessIndex: z.number().min(0).max(100),
  nextStrategicStep: z.string(),
  prioritizedRecommendations: z.array(z.object({
    recommendationTitle: z.string(),
    impactValue: z.string(),
    officialResourceUrl: z.string().url().optional(),
    officialResourceTitle: z.string().optional(),
  })),
});

export type CoachMessageRole = z.infer<typeof CoachMessageRoleSchema>;
export type StrategyBlock = z.infer<typeof StrategyBlockSchema>;
export type CoachMessage = z.infer<typeof CoachMessageSchema>;
export type GoalNode = z.infer<typeof GoalNodeSchema>;
export type AccountabilityMetrics = z.infer<typeof AccountabilityMetricsSchema>;
export type CoachStrategyReport = z.infer<typeof CoachStrategyReportSchema>;
