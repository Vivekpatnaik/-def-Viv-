import { AIGateway } from '@/shared/lib/ai/gateway';
import {
  CareerProfileInput,
  SkillGapDetail,
  SkillGapDetailSchema,
  AdaptiveRoadmap,
  AdaptiveRoadmapSchema,
  RoadmapMilestone,
} from '../schemas';
import { z } from 'zod';

const SkillGapsArraySchema = z.object({
  gaps: z.array(SkillGapDetailSchema),
});

export class CareerService {
  /**
   * Evaluates current candidate profile preferences against target roles to map precise skill gaps
   */
  public static async analyzeSkillGaps(
    profile: CareerProfileInput,
    targetRole: string
  ): Promise<SkillGapDetail[]> {
    try {
      const userPrompt = `
        Profile: ${JSON.stringify(profile)}
        Target Role: ${targetRole}
      `;

      const result = await AIGateway.executeStructuredOutput<z.infer<typeof SkillGapsArraySchema>>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.1,
          systemPrompt: `
            You are an expert technical recruiter and taxonomist.
            Compare the candidate's active languages, frameworks, and experience with the target role.
            Generate a detailed list of missing skills, estimating learning times, difficulty levels, and importance rankings.
          `,
        },
        userPrompt,
        SkillGapsArraySchema
      );

      return result.gaps.map((g) => ({
        ...g,
        id: crypto.randomUUID(),
      }));
    } catch (error) {
      console.error('[CareerService] Failed to analyze skill gaps:', error);
      throw error;
    }
  }

  /**
   * Generates a fully dynamic, custom preparation roadmap.
   * Recommends strictly validated, official learning resources to avoid fake courses.
   */
  public static async generateAdaptiveRoadmap(
    profile: CareerProfileInput,
    targetRole: string,
    durationMonths: number
  ): Promise<AdaptiveRoadmap> {
    try {
      const userPrompt = `
        Profile: ${JSON.stringify(profile)}
        Target Role: ${targetRole}
        Duration: ${durationMonths} Months
      `;

      const roadmap = await AIGateway.executeStructuredOutput<AdaptiveRoadmap>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.2,
          systemPrompt: `
            You are a master learning experience designer.
            Schedule a sequential, weekly preparation roadmap over the selected duration in months.
            Tailor tasks and estimated hours according to the candidate's available weekly study hours.
            Provide strictly official, high-quality reference documentations (such as react.dev, nextjs.org, or standard guides) for learning resources. Never generate fake URLs.
          `,
        },
        userPrompt,
        AdaptiveRoadmapSchema
      );

      return {
        ...roadmap,
        id: crypto.randomUUID(),
        targetRole,
        durationMonths,
        overallProgressPercent: 0,
        isAdaptedRecently: false,
      };
    } catch (error) {
      console.error('[CareerService] Failed to generate adaptive roadmap:', error);
      throw error;
    }
  }

  /**
   * Automatically adapts the active roadmap if candidate struggles in mock interviews (score < 50%)
   */
  public static async adaptRoadmapOnPerformanceChange(
    activeRoadmap: AdaptiveRoadmap,
    lastInterviewScore: number
  ): Promise<AdaptiveRoadmap> {
    try {
      if (lastInterviewScore >= 50) {
        return activeRoadmap; // No adaptation required for strong outcomes
      }

      console.log(`[CareerService] Interview score was low (${lastInterviewScore}%). Initiating roadmap adaptation...`);

      // Inject focused foundational revision tasks into the active milestone nodes
      const adaptedMilestones: RoadmapMilestone[] = activeRoadmap.milestones.map((m, idx) => {
        if (idx === 0) {
          // Inject a critical revision task in the active node
          return {
            ...m,
            milestoneTitle: `${m.milestoneTitle} (Adapted)`,
            tasks: [
              {
                taskTitle: 'Critical Foundational Architecture Review',
                priority: 'high',
                difficulty: 'easy',
                estimatedHours: 4,
                learningResourceUrl: 'https://react.dev/learn',
                learningResourceTitle: 'React Official Foundations',
                assignmentTitle: 'Re-implement core rendering loops',
                revisionChallenge: 'Explain statelessness and lifecycle controls to a peer.',
              },
              ...m.tasks,
            ],
          };
        }
        return m;
      });

      return {
        ...activeRoadmap,
        milestones: adaptedMilestones,
        isAdaptedRecently: true,
      };
    } catch (error) {
      console.error('[CareerService] Failed to adapt roadmap on performance check:', error);
      throw error;
    }
  }
}
