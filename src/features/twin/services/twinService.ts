import { AIGateway } from '@/shared/lib/ai/gateway';
import { SYSTEM_PROMPTS } from '@/shared/config/prompts';
import {
  CareerDigitalTwin,
  CareerDigitalTwinSchema,
  TwinTimelineEvent,
  TwinVersionRecord,
} from '../schemas';

export class TwinService {
  /**
   * Initializes or retrieves the candidate's Career Digital Twin representation
   */
  public static async getCareerDigitalTwin(
    userId: string
  ): Promise<CareerDigitalTwin> {
    try {
      const payload = `User ID: ${userId}`;
      return await AIGateway.executeStructuredOutput<CareerDigitalTwin>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.1,
          systemPrompt: 'Initialize a complete, multi-dimensional Career Digital Twin representation matching the schema.',
        },
        payload,
        CareerDigitalTwinSchema
      );
    } catch (error) {
      console.error('[TwinService] Failed to initialize digital twin:', error);
      throw error;
    }
  }

  /**
   * Evolves the Digital Twin's skills levels, confidence scores, and readiness indices.
   * Dispatches events and appends explanation timeline events.
   */
  public static async evolveTwinOnActivity(
    activeTwin: CareerDigitalTwin,
    activityCategory: 'joined' | 'assessment' | 'learning' | 'projects' | 'interviews' | 'applications' | 'offers' | 'growth',
    outcomeDetails: Record<string, unknown>,
    explanationText: string
  ): Promise<CareerDigitalTwin> {
    try {
      const payload = `
        Active Twin State: ${JSON.stringify(activeTwin)}
        Completed Activity Category: ${activityCategory}
        Outcome Parameters: ${JSON.stringify(outcomeDetails)}
        Activity Explanation: ${explanationText}
      `;

      const evolvedTwin = await AIGateway.executeStructuredOutput<CareerDigitalTwin>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.2,
          systemPrompt: SYSTEM_PROMPTS.TWIN.EVOLUTION,
        },
        payload,
        CareerDigitalTwinSchema
      );

      // Append new timeline event node
      const nextEvent: TwinTimelineEvent = {
        id: crypto.randomUUID(),
        eventTitle: `Completed ${activityCategory.toUpperCase()} activity`,
        category: activityCategory,
        description: explanationText,
        timestamp: new Date().toLocaleTimeString(),
      };

      return {
        ...evolvedTwin,
        versionNumber: activeTwin.versionNumber + 1,
        updatedAt: new Date().toLocaleTimeString(),
        explanationOfLastUpdate: explanationText,
        timeline: [nextEvent, ...evolvedTwin.timeline],
      };
    } catch (error) {
      console.error('[TwinService] Failed to evolve Career Digital Twin:', error);
      throw error;
    }
  }

  /**
   * Rolls back the twin state to a target historical version record
   */
  public static rollbackTwinToVersion(
    versionHistory: TwinVersionRecord[],
    targetVersionNumber: number
  ): CareerDigitalTwin {
    const matchedRecord = versionHistory.find((v) => v.versionNumber === targetVersionNumber);
    if (!matchedRecord) {
      throw new Error(`Target version V${targetVersionNumber} not found in history logs.`);
    }
    return matchedRecord.twinData;
  }
}
