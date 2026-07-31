import { z } from 'zod';

export const CareerProfileInputSchema = z.object({
  currentEducation: z.string().min(1, 'Please specify your education level'),
  collegeName: z.string().min(1, 'Please specify your university name'),
  degreeMajor: z.string().min(1, 'Please specify your major/specialisation'),
  programmingLanguages: z.array(z.string()).min(1, 'Please select at least one language'),
  frameworks: z.array(z.string()).min(1, 'Please select at least one framework'),
  preferredLocation: z.string().min(1, 'Please specify your preferred job location'),
  expectedSalary: z.string().min(1, 'Please specify expected salary'),
  availableStudyHoursWeekly: z.number().min(5).max(80),
  preferredLearningStyle: z.enum(['visual', 'text', 'hands-on']),
});

export const SkillGapDetailSchema = z.object({
  id: z.string().uuid().optional(),
  skillName: z.string(),
  priority: z.enum(['critical', 'high', 'medium', 'low']),
  estimatedLearningHours: z.number().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  interviewImportance: z.enum(['critical', 'high', 'medium', 'low']),
  resumeImportance: z.enum(['critical', 'high', 'medium', 'low']),
});

export const RoadmapTaskSchema = z.object({
  taskTitle: z.string(),
  priority: z.enum(['high', 'medium', 'low']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  estimatedHours: z.number(),
  learningResourceUrl: z.string().url(),
  learningResourceTitle: z.string(),
  assignmentTitle: z.string(),
  revisionChallenge: z.string(),
});

export const RoadmapMilestoneSchema = z.object({
  milestoneTitle: z.string(),
  weekRange: z.string(),
  tasks: z.array(RoadmapTaskSchema),
});

export const AdaptiveRoadmapSchema = z.object({
  id: z.string().uuid().optional(),
  targetRole: z.string(),
  durationMonths: z.number(),
  overallProgressPercent: z.number().min(0).max(100),
  milestones: z.array(RoadmapMilestoneSchema),
  isAdaptedRecently: z.boolean().default(false),
});

export type CareerProfileInput = z.infer<typeof CareerProfileInputSchema>;
export type SkillGapDetail = z.infer<typeof SkillGapDetailSchema>;
export type RoadmapTask = z.infer<typeof RoadmapTaskSchema>;
export type RoadmapMilestone = z.infer<typeof RoadmapMilestoneSchema>;
export type AdaptiveRoadmap = z.infer<typeof AdaptiveRoadmapSchema>;
