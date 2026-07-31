import { describe, it, expect } from 'vitest';
import { ResumeService } from '../services/resumeService';

describe('Resume Intelligence Service', () => {
  it('should successfully parse raw resume text into valid structured formats with all intelligence sub-reports', async () => {
    const rawResumeText = 'Alex Rivera - alex.rivera@example.com - Senior Frontend Engineer with React and Next.js experience.';
    const parsed = await ResumeService.parseResume(rawResumeText);

    expect(parsed).toBeDefined();
    expect(parsed.name).toBe('Alex Rivera');
    expect(parsed.email).toBe('alex.rivera@example.com');
    expect(parsed.skills).toContain('React, Next.js, TypeScript');
    expect(parsed.overallScore).toBeGreaterThanOrEqual(0);
    expect(parsed.overallScore).toBeLessThanOrEqual(100);

    // Verify ATS report compilation
    expect(parsed.atsReport).toBeDefined();
    expect(parsed.atsReport?.compatibilityScore).toBeGreaterThanOrEqual(0);
    expect(parsed.atsReport?.formattingCheckPassed).toBeTypeOf('boolean');
    expect(parsed.atsReport?.improvementPlan).toBeInstanceOf(Array);

    // Verify Recruiter scan simulation
    expect(parsed.recruiterReview).toBeDefined();
    expect(parsed.recruiterReview?.firstImpression).toBeTypeOf('string');
    expect(parsed.recruiterReview?.professionalismRating).toBeGreaterThanOrEqual(0);
    expect(parsed.recruiterReview?.improvementPriorities).toBeInstanceOf(Array);

    // Verify visual Heatmap details
    expect(parsed.heatmap).toBeDefined();
    expect(parsed.heatmap?.strongSections).toBeInstanceOf(Array);
    expect(parsed.heatmap?.lowImpactStatements).toBeInstanceOf(Array);

    // Verify Keyword extraction details
    expect(parsed.keywordDetails).toBeDefined();
    expect(parsed.keywordDetails?.technicalSkills).toBeInstanceOf(Array);
    expect(parsed.keywordDetails?.missingKeywords).toBeInstanceOf(Array);

    // Verify progression analytics indicators
    expect(parsed.analytics).toBeDefined();
    expect(parsed.analytics?.resumeGrowthPercent).toBeGreaterThanOrEqual(0);
    expect(parsed.analytics?.atsTrend).toBeInstanceOf(Array);
  });

  it('should perform high-fidelity ATS match semantic keyword evaluations', async () => {
    const resumePayload = {
      name: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      experience: [
        {
          company: 'Vercel',
          role: 'Senior Frontend Engineer',
          duration: '2 Years',
          highlights: ['Optimized dashboard loading by 45% using Server Components.'],
          quantifiedAchievementsPercentage: 100,
        },
      ],
      overallScore: 92,
    };

    const targetJobDescription = 'We are looking for a Senior Frontend Engineer proficient in React, Next.js, and TypeScript.';
    const result = await ResumeService.analyzeATSMatch(resumePayload, targetJobDescription);

    expect(result).toBeDefined();
    expect(result.matchPercentage).toBeGreaterThanOrEqual(0);
    expect(result.matchPercentage).toBeLessThanOrEqual(100);
    expect(result.missingKeywords).toBeInstanceOf(Array);
    expect(result.suggestedResumeUpdates).toBeInstanceOf(Array);
  });

  it('should execute semantic job description matching, returning overall and specific match rates', async () => {
    const resumePayload = {
      name: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      skills: ['React', 'Next.js', 'TypeScript'],
      experience: [],
      overallScore: 85,
    };

    const targetJD = 'Required: React, NextJS, TypeScript. Experience in state management and performance tuning.';
    const matchOutcome = await ResumeService.analyzeJD(resumePayload, targetJD);

    expect(matchOutcome).toBeDefined();
    expect(matchOutcome.overallMatchScore).toBeGreaterThanOrEqual(0);
    expect(matchOutcome.keywordMatchPercent).toBeGreaterThanOrEqual(0);
    expect(matchOutcome.gapAnalysis).toBeInstanceOf(Array);
    expect(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']).toContain(matchOutcome.recommendationPriority);
  });
});
