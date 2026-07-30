import { DbClient } from '@/shared/lib/db/config';
import { Profile, UserSkill, PlacementReadiness } from '../schemas';

export class ProfileRepository {
  /**
   * Fetches the candidate profile by user ID
   */
  public static async getProfile(userId: string): Promise<Profile | null> {
    try {
      const records = await DbClient.query<Profile>('profiles', 'select', null, { id: userId });
      return records.length > 0 ? records[0] : null;
    } catch (error) {
      console.error(`[ProfileRepository] Error fetching profile for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Saves or updates a candidate profile
   */
  public static async saveProfile(profile: Profile): Promise<Profile> {
    try {
      const records = await DbClient.query<Profile>('profiles', 'insert', profile);
      return records[0];
    } catch (error) {
      console.error(`[ProfileRepository] Error saving profile:`, error);
      throw error;
    }
  }

  /**
   * Retrieves the candidate's list of registered and verified skills
   */
  public static async getUserSkills(userId: string): Promise<UserSkill[]> {
    try {
      return await DbClient.query<UserSkill>('user_skills', 'select', null, { userId });
    } catch (error) {
      console.error(`[ProfileRepository] Error fetching skills for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Retrieves or initializes real-time Job Readiness Scoring
   */
  public static async getPlacementReadiness(userId: string): Promise<PlacementReadiness> {
    try {
      const records = await DbClient.query<PlacementReadiness>('placement_readiness', 'select', null, { userId });
      if (records.length > 0) {
        return records[0];
      }

      // Initialize brand new placement readiness structure on demand to prevent empty dashboard experiences
      const newReadiness: PlacementReadiness = {
        id: crypto.randomUUID(),
        userId,
        overallReadinessIndex: 0,
        resumeScore: 0,
        codingScore: 0,
        interviewScore: 0,
        assessmentScore: 0,
        skillsPercentile: 0,
        updatedAt: new Date().toISOString(),
      };

      await DbClient.query<PlacementReadiness>('placement_readiness', 'insert', newReadiness);
      return newReadiness;
    } catch (error) {
      console.error(`[ProfileRepository] Error in placement readiness engine for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Recalculates and updates the overall Job-Readiness index based on underlying modules metrics
   */
  public static async updatePlacementReadiness(
    userId: string,
    metrics: Partial<Omit<PlacementReadiness, 'id' | 'userId' | 'updatedAt'>>
  ): Promise<PlacementReadiness> {
    try {
      const current = await this.getPlacementReadiness(userId);
      const updated: PlacementReadiness = {
        ...current,
        ...metrics,
        updatedAt: new Date().toISOString(),
      };

      // Calculate weighted index based on PRD requirements section 4 module 14
      const weightedScore = Math.round(
        updated.resumeScore * 0.25 +
        updated.codingScore * 0.25 +
        updated.interviewScore * 0.30 +
        updated.assessmentScore * 0.20
      );

      updated.overallReadinessIndex = weightedScore;

      await DbClient.query<PlacementReadiness>('placement_readiness', 'update', updated, { userId });
      return updated;
    } catch (error) {
      console.error(`[ProfileRepository] Failed to update placement readiness for user ${userId}:`, error);
      throw error;
    }
  }
}
