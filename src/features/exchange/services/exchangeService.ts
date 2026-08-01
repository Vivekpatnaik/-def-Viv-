import { AIGateway } from '@/shared/lib/ai/gateway';
import { SYSTEM_PROMPTS } from '@/shared/config/prompts';
import {
  SkillExchangeMatch,
  SkillExchangeMatchSchema,
  MentorProfile,
  MentorProfileSchema,
  SessionBooking,
  SessionBookingSchema,
  RatingReview,
  RatingReviewSchema,
  ExchangeAnalytics,
  ExchangeAnalyticsSchema,
} from '../schemas';
import { z } from 'zod';

const SkillExchangeMatchesArraySchema = z.object({
  matches: z.array(SkillExchangeMatchSchema),
});

const MentorProfilesArraySchema = z.object({
  mentors: z.array(MentorProfileSchema),
});

export class ExchangeService {
  /**
   * Intelligently calculates peer matching based on skills known, skills wanted, and timezone compatibility
   */
  public static async getExchangeMatches(
    careerMemory: Record<string, unknown>
  ): Promise<SkillExchangeMatch[]> {
    try {
      const res = await AIGateway.executeStructuredOutput<z.infer<typeof SkillExchangeMatchesArraySchema>>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.1,
          systemPrompt: SYSTEM_PROMPTS.EXCHANGE.MATCHING,
        },
        JSON.stringify(careerMemory),
        SkillExchangeMatchesArraySchema
      );
      return res.matches;
    } catch (error) {
      console.error('[ExchangeService] Failed to calculate peer exchange matches:', error);
      throw error;
    }
  }

  /**
   * Fetches verified alumni and expert mentor marketplace profiles
   */
  public static async getMentorMarketplace(
    careerMemory: Record<string, unknown>
  ): Promise<MentorProfile[]> {
    try {
      const res = await AIGateway.executeStructuredOutput<z.infer<typeof MentorProfilesArraySchema>>(
        {
          provider: 'openai',
          model: 'gpt-4o-mini',
          temperature: 0.1,
          systemPrompt: 'Fetch highly compatible verified college alumni, corporate professionals, and experts.',
        },
        JSON.stringify(careerMemory),
        MentorProfilesArraySchema
      );
      return res.mentors;
    } catch (error) {
      console.error('[ExchangeService] Failed to fetch mentor marketplace profiles:', error);
      throw error;
    }
  }

  /**
   * Registers a session booking with calendars schedulers and dynamic videoconferencing meetings url
   */
  public static async createSessionBooking(
    mentorId: string,
    sessionType: '1-on-1' | 'group' | 'workshop' | 'mock_interview' | 'resume_review' | 'portfolio_review',
    dateTime: string
  ): Promise<SessionBooking> {
    try {
      const payload = `
        Mentor ID: ${mentorId}
        Session Type: ${sessionType}
        Date Time: ${dateTime}
      `;

      return await AIGateway.executeStructuredOutput<SessionBooking>(
        {
          provider: 'openai',
          model: 'gpt-4o-mini',
          temperature: 0.2,
          systemPrompt: 'Book an exchange session, calculating timezone differences and returning videoconferencing links.',
        },
        payload,
        SessionBookingSchema
      );
    } catch (error) {
      console.error('[ExchangeService] Failed to book peer session:', error);
      throw error;
    }
  }

  /**
   * Submits peer review evaluating helpfulness, communication, and punctuality
   */
  public static async submitSessionReview(
    bookingId: string,
    reviewBody: string
  ): Promise<RatingReview> {
    try {
      const payload = `
        Booking ID: ${bookingId}
        Body: ${reviewBody}
      `;

      return await AIGateway.executeStructuredOutput<RatingReview>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.2,
          systemPrompt: SYSTEM_PROMPTS.EXCHANGE.REVIEWS,
        },
        payload,
        RatingReviewSchema
      );
    } catch (error) {
      console.error('[ExchangeService] Failed to submit review:', error);
      throw error;
    }
  }

  /**
   * Compiles exchange analytics, teaching/learning hours, reputation XP points, and rating trends over time
   */
  public static async getExchangeAnalytics(
    careerMemory: Record<string, unknown>
  ): Promise<ExchangeAnalytics> {
    try {
      return await AIGateway.executeStructuredOutput<ExchangeAnalytics>(
        {
          provider: 'openai',
          model: 'gpt-4o-mini',
          temperature: 0.1,
          systemPrompt: 'Calculate learning hours, teaching hours, community reputation XP levels, and reviews trends over time.',
        },
        JSON.stringify(careerMemory),
        ExchangeAnalyticsSchema
      );
    } catch (error) {
      console.error('[ExchangeService] Failed to fetch exchange analytics curves:', error);
      throw error;
    }
  }
}
