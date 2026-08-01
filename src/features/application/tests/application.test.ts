import { describe, it, expect } from 'vitest';
import { ApplicationService } from '../services/applicationService';
import { JobApplication } from '../schemas';

describe('Job Application Intelligence Service', () => {
  const mockResume = {
    name: 'Alex Rivera',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    overallScore: 88,
  };

  it('should successfully compute semantic job match estimates and missing skill lists', async () => {
    const jobTitle = 'Senior Frontend Engineer';
    const estimate = await ApplicationService.getJobMatchEstimate(mockResume, jobTitle);

    expect(estimate).toBeDefined();
    expect(estimate.overallMatchScore).toBeGreaterThanOrEqual(0);
    expect(estimate.overallMatchScore).toBeLessThanOrEqual(100);
    expect(estimate.skillMatchPercent).toBeGreaterThanOrEqual(0);
    expect(estimate.missingSkills).toBeInstanceOf(Array);
    expect(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']).toContain(estimate.applicationPriority);
    expect(estimate.expectedPrepTimeHours).toBeGreaterThanOrEqual(0);
  });

  it('should generate relevant pre-application resume optimizations and project ideas', async () => {
    const jobTitle = 'Senior Frontend Engineer';
    const opt = await ApplicationService.getResumeOptimizationSuggestions(mockResume, jobTitle);

    expect(opt).toBeDefined();
    expect(opt.suggestedBulletUpdates).toBeInstanceOf(Array);
    expect(opt.criticalMissingKeywords).toBeInstanceOf(Array);
    expect(opt.projectRecommendations).toBeInstanceOf(Array);
    expect(opt.formattingCheckPassed).toBeTypeOf('boolean');
  });

  it('should formulate timing rules and personalized email follow-up templates', async () => {
    const appId = '123e4567-e89b-12d3-a456-426614174001';
    const rules = await ApplicationService.getFollowUpRules(appId, 'initial_followup');

    expect(rules).toBeDefined();
    expect(rules.recommendedTimingDays).toBeGreaterThanOrEqual(0);
    expect(rules.remindersEnabled).toBeTypeOf('boolean');
    expect(rules.followUpTemplateText).toBeTypeOf('string');
  });

  it('should analyze historic application pipeline records to identify rejection trend lines', async () => {
    const historicalApps: JobApplication[] = [
      {
        id: '123e4567-e89b-12d3-a456-426614174003',
        companyName: 'Google',
        roleTitle: 'UX Developer',
        stage: 'rejected',
        location: 'Mountain View, CA',
        savedAt: '2025-01-01',
        rejectionNotes: 'Rejected due to weak technical performance benchmarks and unoptimized REST query state schemas.',
      },
    ];

    const report = await ApplicationService.getRejectionAnalysis(historicalApps);

    expect(report).toBeDefined();
    expect(report.recurringResumeFailures).toBeInstanceOf(Array);
    expect(report.criticalSkillGapsIdentified).toBeInstanceOf(Array);
    expect(report.suggestedStrategicShift).toBeTypeOf('string');
  });

  it('should compile application statistics, response callback rates, and trends', async () => {
    const historicalApps: JobApplication[] = [
      {
        id: '123e4567-e89b-12d3-a456-426614174001',
        companyName: 'Vercel',
        roleTitle: 'Senior Frontend Engineer',
        stage: 'interview',
        savedAt: '2025-01-10',
      },
    ];

    const stats = await ApplicationService.getApplicationAnalytics(historicalApps);

    expect(stats).toBeDefined();
    expect(stats.totalApplicationsCount).toBeGreaterThanOrEqual(0);
    expect(stats.interviewRatePercent).toBeLessThanOrEqual(100);
    expect(stats.roleDistribution).toBeInstanceOf(Array);
  });
});
