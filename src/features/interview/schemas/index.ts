import { z } from 'zod';

export const InterviewSetupSchema = z.object({
  roleName: z.string().min(1, 'Please select your target job role'),
  companyName: z.string().min(1, 'Please select your target company'),
  experienceLevel: z.enum(['entry', 'mid', 'senior']),
  startingDifficulty: z.enum(['easy', 'medium', 'hard', 'adaptive']),
});

export const GeneratedQuestionSchema = z.object({
  id: z.string().uuid().optional(),
  questionText: z.string(),
  questionType: z.enum(['technical', 'behavioral', 'architecture', 'concept']),
  difficultyLevel: z.enum(['easy', 'medium', 'hard']),
  idealResponseOutline: z.string(),
  isFollowUp: z.boolean().default(false),
});

export const AnswerGradingSchema = z.object({
  score: z.number().min(0).max(100),
  feedbackText: z.string(),
  suggestedFollowUpQuestion: z.string().optional(),
});

export const ComprehensiveEvaluationSchema = z.object({
  overallScore: z.number().min(0).max(100),
  technicalScore: z.number().min(0).max(100),
  communicationScore: z.number().min(0).max(100),
  confidenceScore: z.number().min(0).max(100),
  problemSolvingScore: z.number().min(0).max(100),
  behavioralScore: z.number().min(0).max(100),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  criticalMistakes: z.array(z.string()),
  suggestedResources: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
      reason: z.string(),
    })
  ),
});

export type InterviewSetupInput = z.infer<typeof InterviewSetupSchema>;
export type GeneratedQuestion = z.infer<typeof GeneratedQuestionSchema>;
export type AnswerGrading = z.infer<typeof AnswerGradingSchema>;
export type ComprehensiveEvaluation = z.infer<typeof ComprehensiveEvaluationSchema>;
