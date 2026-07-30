import { AIGateway } from '@/shared/lib/ai/gateway';
import { ParsedResume, ParsedResumeSchema, ATSMatchResult, ATSMatchResultSchema } from '../schemas';

export class ResumeService {
  /**
   * Processes raw resume text using our structured AI Gateway to output verified standard JSON resume format.
   */
  public static async parseResume(rawText: string): Promise<ParsedResume> {
    try {
      return await AIGateway.executeStructuredOutput<ParsedResume>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.1,
          systemPrompt: `
            You are a world-class candidate recruiting resume parser.
            Analyze the provided resume and return structured details exactly matching the schema.
            For each experience highlight, determine the percentage of accomplishments that are quantified using the STAR methodology.
            Calculate an overall professional resume score from 0 to 100.
          `,
        },
        rawText,
        ParsedResumeSchema
      );
    } catch (error) {
      console.error('[ResumeService] Failed to parse candidate resume:', error);
      throw error;
    }
  }

  /**
   * Compares parsed resume elements against standard Job Description requirements to output ATS match percent,
   * missing key skills, and STAR-focused suggestions to bypass applicant filters.
   */
  public static async analyzeATSMatch(resumeData: ParsedResume, jobDescription: string): Promise<ATSMatchResult> {
    try {
      const userPrompt = `
        Resume Data: ${JSON.stringify(resumeData)}
        Job Description: ${jobDescription}
      `;

      return await AIGateway.executeStructuredOutput<ATSMatchResult>(
        {
          provider: 'anthropic',
          model: 'claude-3-5-sonnet',
          temperature: 0.2,
          systemPrompt: `
            You are an expert corporate applicant tracking system (ATS) validator.
            Compare the parsed resume details with the provided target job description.
            1. Calculate a semantic match score (0-100%).
            2. Extract any high-leverage missing keywords and skills.
            3. Rewrite non-quantifiable experience highlights to align with the STAR methodology to bypass system criteria.
          `,
        },
        userPrompt,
        ATSMatchResultSchema
      );
    } catch (error) {
      console.error('[ResumeService] Failed to execute ATS gap analysis:', error);
      throw error;
    }
  }
}
