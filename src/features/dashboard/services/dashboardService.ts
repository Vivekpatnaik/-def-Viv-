import { ProfileRepository } from '../repositories/profileRepository';
import { AIGateway } from '@/shared/lib/ai/gateway';
import { z } from 'zod';

const DailyPrioritiesSchema = z.object({
  priorities: z.array(
    z.object({
      task: z.string(),
      reason: z.string(),
      estimatedMinutes: z.number(),
    })
  ).length(3),
});

export type DailyPriorities = z.infer<typeof DailyPrioritiesSchema>;

export class DashboardService {
  /**
   * Orchestrates the retrieval of all main dashboard workspace indicators
   */
  public static async getWorkspaceIndicators(userId: string) {
    try {
      const [profile, skills, readiness] = await Promise.all([
        ProfileRepository.getProfile(userId),
        ProfileRepository.getUserSkills(userId),
        ProfileRepository.getPlacementReadiness(userId),
      ]);

      return {
        profile,
        skills,
        readiness,
      };
    } catch (error) {
      console.error(`[DashboardService] Error assembling dashboard workspace for ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Dynamically constructs 3 high-impact daily actionable goals for the candidate based on readiness metrics
   */
  public static async getDailyActionablePriorities(userId: string): Promise<DailyPriorities> {
    try {
      const metrics = await ProfileRepository.getPlacementReadiness(userId);

      const promptPayload = `
        Resume Score: ${metrics.resumeScore}/100
        Coding Score: ${metrics.codingScore}/100
        Mock Interview Score: ${metrics.interviewScore}/100
        Technical Assessment Score: ${metrics.assessmentScore}/100
        Overall Readiness Index: ${metrics.overallReadinessIndex}/100
      `;

      return await AIGateway.executeStructuredOutput<DailyPriorities>(
        {
          provider: 'openai',
          model: 'gpt-4o-mini',
          temperature: 0.3,
          systemPrompt: `
            You are an elite, results-focused technical career coach.
            Given the user's detailed preparation scores, identify their most significant structural gap.
            Provide exactly three highly specific daily tasks (including estimated time in minutes) the candidate should execute today to optimize their overall hiring probability.
            Be direct, constructive, and action-oriented.
          `,
        },
        promptPayload,
        DailyPrioritiesSchema
      );
    } catch (error) {
      console.error(`[DashboardService] Failed to assemble priorities for user ${userId}:`, error);
      // Fail-safe, high-impact default priorities to keep candidate focused if external models throw exceptions
      return {
        priorities: [
          {
            task: 'Quantify Achievements on your Resume',
            reason: 'Your resume overall score is low. Rewrite at least three bullet points using the STAR methodology.',
            estimatedMinutes: 30,
          },
          {
            task: 'Complete an Adaptive Coding Challenge',
            reason: 'Consistency is key to passing technical coding assessments. Solve one intermediate problem.',
            estimatedMinutes: 45,
          },
          {
            task: 'Initiate a Practice Communication Module',
            reason: 'Hone your verbal clarity by explaining a system architecture topic for 3 minutes.',
            estimatedMinutes: 15,
          },
        ],
      };
    }
  }
}
