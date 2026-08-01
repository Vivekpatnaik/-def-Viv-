import { AIGateway } from '@/shared/lib/ai/gateway';
import { SYSTEM_PROMPTS } from '@/shared/config/prompts';
import {
  JobMatchEstimate,
  JobMatchEstimateSchema,
  ResumeOptimizationSuggestion,
  ResumeOptimizationSuggestionSchema,
  FollowUpRule,
  FollowUpRuleSchema,
  RejectionAnalysis,
  RejectionAnalysisSchema,
  ApplicationAnalytics,
  ApplicationAnalyticsSchema,
  JobApplication,
} from '../schemas';

export class ApplicationService {
  /**
   * Compares the candidate's resume, goals, and experience to generate deep Job Match Estimates
   */
  public static async getJobMatchEstimate(
    resumeData: Record<string, unknown>,
    jobTitle: string
  ): Promise<JobMatchEstimate> {
    try {
      const payload = `
        Resume Data: ${JSON.stringify(resumeData)}
        Target Job Title: ${jobTitle}
      `;

      return await AIGateway.executeStructuredOutput<JobMatchEstimate>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.1,
          systemPrompt: SYSTEM_PROMPTS.APPLICATION.JOB_MATCH,
        },
        payload,
        JobMatchEstimateSchema
      );
    } catch (error) {
      console.error('[ApplicationService] Failed to calculate job match estimate:', error);
      throw error;
    }
  }

  /**
   * Generates resume suggests, keyword improvements, and project ideas before applying
   */
  public static async getResumeOptimizationSuggestions(
    resumeData: Record<string, unknown>,
    jobTitle: string
  ): Promise<ResumeOptimizationSuggestion> {
    try {
      const payload = `
        Resume Data: ${JSON.stringify(resumeData)}
        Target Job Title: ${jobTitle}
      `;

      return await AIGateway.executeStructuredOutput<ResumeOptimizationSuggestion>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.2,
          systemPrompt: SYSTEM_PROMPTS.APPLICATION.RESUME_OPTIMIZATION,
        },
        payload,
        ResumeOptimizationSuggestionSchema
      );
    } catch (error) {
      console.error('[ApplicationService] Failed to generate resume optimizations:', error);
      throw error;
    }
  }

  /**
   * Determines optimal follow-up timings and templates based on stage triggers
   */
  public static async getFollowUpRules(
    applicationId: string,
    triggerType: 'initial_followup' | 'interview_thank_you' | 'assessment_reminder' | 'offer_extension_request'
  ): Promise<FollowUpRule> {
    try {
      const payload = `
        Application ID: ${applicationId}
        Trigger Stage: ${triggerType}
      `;

      return await AIGateway.executeStructuredOutput<FollowUpRule>(
        {
          provider: 'openai',
          model: 'gpt-4o-mini',
          temperature: 0.2,
          systemPrompt: 'Calculate optimal follow-up days and provide a highly personalized email template to send the hiring manager or recruiter.',
        },
        payload,
        FollowUpRuleSchema
      );
    } catch (error) {
      console.error('[ApplicationService] Failed to compile follow-up rules:', error);
      throw error;
    }
  }

  /**
   * Evaluates historical rejection metrics and notes to detect failure patterns over time
   */
  public static async getRejectionAnalysis(
    applications: JobApplication[]
  ): Promise<RejectionAnalysis> {
    try {
      return await AIGateway.executeStructuredOutput<RejectionAnalysis>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.2,
          systemPrompt: SYSTEM_PROMPTS.APPLICATION.REJECTION_ANALYSIS,
        },
        JSON.stringify(applications),
        RejectionAnalysisSchema
      );
    } catch (error) {
      console.error('[ApplicationService] Failed to evaluate rejection patterns:', error);
      throw error;
    }
  }

  /**
   * Assembles complete Application Tracker Analytics, callback trends, and role placements ratios
   */
  public static async getApplicationAnalytics(
    applications: JobApplication[]
  ): Promise<ApplicationAnalytics> {
    try {
      return await AIGateway.executeStructuredOutput<ApplicationAnalytics>(
        {
          provider: 'openai',
          model: 'gpt-4o-mini',
          temperature: 0.1,
          systemPrompt: 'Calculate complete cumulative application counts, call-back rates, offer success percentages, company trends, and skill gaps patterns.',
        },
        JSON.stringify(applications),
        ApplicationAnalyticsSchema
      );
    } catch (error) {
      console.error('[ApplicationService] Failed to generate analytics dashboards:', error);
      throw error;
    }
  }
}
