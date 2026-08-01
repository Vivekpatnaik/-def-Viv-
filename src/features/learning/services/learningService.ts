import { AIGateway } from '@/shared/lib/ai/gateway';
import { SYSTEM_PROMPTS } from '@/shared/config/prompts';
import {
  LearningPlan,
  LearningPlanSchema,
  PrepModule,
  PrepModuleSchema,
  RevisionTask,
  RevisionTaskSchema,
  PracticeQuestion,
  PracticeQuestionSchema,
  ProjectRecommendation,
  ProjectRecommendationSchema,
  LearningAnalytics,
  LearningAnalyticsSchema,
} from '../schemas';
import { z } from 'zod';

const PrepModulesArraySchema = z.object({
  modules: z.array(PrepModuleSchema),
});

const RevisionTasksArraySchema = z.object({
  revisions: z.array(RevisionTaskSchema),
});

const PracticeQuestionsArraySchema = z.object({
  questions: z.array(PracticeQuestionSchema),
});

const ProjectRecommendationsArraySchema = z.object({
  projects: z.array(ProjectRecommendationSchema),
});

export class LearningService {
  /**
   * Generates dynamic, orchestrated Daily, Weekly, and Monthly study plans
   */
  public static async generateLearningPlan(
    careerMemory: Record<string, unknown>
  ): Promise<LearningPlan> {
    try {
      return await AIGateway.executeStructuredOutput<LearningPlan>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.1,
          systemPrompt: SYSTEM_PROMPTS.LEARNING.ORCHESTRATION,
        },
        JSON.stringify(careerMemory),
        LearningPlanSchema
      );
    } catch (error) {
      console.error('[LearningService] Failed to generate study plan:', error);
      throw error;
    }
  }

  /**
   * Fetches technical, logical, aptitude, and verbal case modules
   */
  public static async getPrepModules(
    careerMemory: Record<string, unknown>
  ): Promise<PrepModule[]> {
    try {
      const res = await AIGateway.executeStructuredOutput<z.infer<typeof PrepModulesArraySchema>>(
        {
          provider: 'openai',
          model: 'gpt-4o-mini',
          temperature: 0.1,
          systemPrompt: 'Generate structured preparation modules, completions percents, and topics list.',
        },
        JSON.stringify(careerMemory),
        PrepModulesArraySchema
      );
      return res.modules;
    } catch (error) {
      console.error('[LearningService] Failed to fetch prep modules:', error);
      throw error;
    }
  }

  /**
   * Generates revision tasks, quick concept definition cards, and weak topics checklists
   */
  public static async generateRevisionPlan(
    careerMemory: Record<string, unknown>
  ): Promise<RevisionTask[]> {
    try {
      const res = await AIGateway.executeStructuredOutput<z.infer<typeof RevisionTasksArraySchema>>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.2,
          systemPrompt: SYSTEM_PROMPTS.LEARNING.REVISION,
        },
        JSON.stringify(careerMemory),
        RevisionTasksArraySchema
      );
      return res.revisions;
    } catch (error) {
      console.error('[LearningService] Failed to compile revision tasks:', error);
      throw error;
    }
  }

  /**
   * Creates custom practical questions, scenarios, or technical assignments
   */
  public static async generatePracticeQuestions(
    careerMemory: Record<string, unknown>
  ): Promise<PracticeQuestion[]> {
    try {
      const res = await AIGateway.executeStructuredOutput<z.infer<typeof PracticeQuestionsArraySchema>>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.2,
          systemPrompt: SYSTEM_PROMPTS.LEARNING.PRACTICE,
        },
        JSON.stringify(careerMemory),
        PracticeQuestionsArraySchema
      );
      return res.questions;
    } catch (error) {
      console.error('[LearningService] Failed to generate exercises:', error);
      throw error;
    }
  }

  /**
   * Recommends portfolio scale developer/business projects with blueprints
   */
  public static async getProjectRecommendations(
    careerMemory: Record<string, unknown>
  ): Promise<ProjectRecommendation[]> {
    try {
      const res = await AIGateway.executeStructuredOutput<z.infer<typeof ProjectRecommendationsArraySchema>>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.2,
          systemPrompt: SYSTEM_PROMPTS.LEARNING.PROJECTS,
        },
        JSON.stringify(careerMemory),
        ProjectRecommendationsArraySchema
      );
      return res.projects;
    } catch (error) {
      console.error('[LearningService] Failed to recommend projects:', error);
      throw error;
    }
  }

  /**
   * Computes topic mastery curves, revision progress metrics, and consistency streaks
   */
  public static async getLearningAnalytics(
    careerMemory: Record<string, unknown>
  ): Promise<LearningAnalytics> {
    try {
      return await AIGateway.executeStructuredOutput<LearningAnalytics>(
        {
          provider: 'openai',
          model: 'gpt-4o-mini',
          temperature: 0.1,
          systemPrompt: 'Calculate topic mastery quotients, learning hours, streaks, and cumulative skill growth ratios.',
        },
        JSON.stringify(careerMemory),
        LearningAnalyticsSchema
      );
    } catch (error) {
      console.error('[LearningService] Failed to generate analytics records:', error);
      throw error;
    }
  }
}
