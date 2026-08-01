import { AIGateway } from '@/shared/lib/ai/gateway';
import { SYSTEM_PROMPTS } from '@/shared/config/prompts';
import {
  CoachMessage,
  CoachMessageSchema,
  GoalNode,
  GoalNodeSchema,
  AccountabilityMetrics,
  AccountabilityMetricsSchema,
  CoachStrategyReport,
  CoachStrategyReportSchema,
} from '../schemas';
import { z } from 'zod';

const GoalsArraySchema = z.object({
  goals: z.array(GoalNodeSchema),
});

export class CoachService {
  /**
   * Stateful Career Coach Dialog Router.
   * Compiles Conversation messages, integrates Career Memory, and appends Why/What/How Strategy Blocks.
   */
  public static async sendMessageToCoach(
    conversationHistory: CoachMessage[],
    userText: string,
    careerMemory: Record<string, unknown>
  ): Promise<CoachMessage> {
    try {
      const payload = `
        History: ${JSON.stringify(conversationHistory)}
        New Message: ${userText}
        Career Memory: ${JSON.stringify(careerMemory)}
      `;

      return await AIGateway.executeStructuredOutput<CoachMessage>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.2,
          systemPrompt: SYSTEM_PROMPTS.COACH.DIALOGUE,
        },
        payload,
        CoachMessageSchema
      );
    } catch (error) {
      console.error('[CoachService] Failed stateful dialogue messaging:', error);
      throw error;
    }
  }

  /**
   * Dynamic Goal Engine. Generates Today, Weekly, Monthly, and Quarterly target action-lists.
   */
  public static async generateGoals(
    careerMemory: Record<string, unknown>
  ): Promise<GoalNode[]> {
    try {
      const res = await AIGateway.executeStructuredOutput<z.infer<typeof GoalsArraySchema>>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.1,
          systemPrompt: SYSTEM_PROMPTS.COACH.GOALS,
        },
        JSON.stringify(careerMemory),
        GoalsArraySchema
      );
      return res.goals;
    } catch (error) {
      console.error('[CoachService] Failed to generate dynamic coach goals:', error);
      throw error;
    }
  }

  /**
   * Dynamic Accountability Analyzer. Computes practice streaks, missed checklists, and consistency.
   */
  public static async getAccountabilityMetrics(
    careerMemory: Record<string, unknown>
  ): Promise<AccountabilityMetrics> {
    try {
      return await AIGateway.executeStructuredOutput<AccountabilityMetrics>(
        {
          provider: 'openai',
          model: 'gpt-4o-mini',
          temperature: 0.1,
          systemPrompt: 'Calculate candidate completion patterns, consistency, and active streaks based on historical memory.',
        },
        JSON.stringify(careerMemory),
        AccountabilityMetricsSchema
      );
    } catch (error) {
      console.error('[CoachService] Failed to calculate accountability metrics:', error);
      throw error;
    }
  }

  /**
   * Career Strategy formulator. Assembles multi-dimensional targeted recommendations.
   */
  public static async getCareerStrategy(
    careerMemory: Record<string, unknown>
  ): Promise<CoachStrategyReport> {
    try {
      return await AIGateway.executeStructuredOutput<CoachStrategyReport>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.2,
          systemPrompt: SYSTEM_PROMPTS.COACH.STRATEGY,
        },
        JSON.stringify(careerMemory),
        CoachStrategyReportSchema
      );
    } catch (error) {
      console.error('[CoachService] Failed to compile career strategy recommendations:', error);
      throw error;
    }
  }
}
