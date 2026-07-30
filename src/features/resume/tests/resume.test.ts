import { describe, it, expect } from 'vitest';
import { ResumeService } from '../services/resumeService';

describe('Resume Intelligence Service', () => {
  it('should successfully parse raw resume text into valid structured formats', async () => {
    const rawResumeText = 'Alex Rivera - alex.rivera@example.com - Senior Frontend Engineer with React and Next.js experience.';
    const parsed = await ResumeService.parseResume(rawResumeText);

    expect(parsed).toBeDefined();
    expect(parsed.name).toBe('Alex Rivera');
    expect(parsed.email).toBe('alex.rivera@example.com');
    expect(parsed.skills).toContain('React, Next.js, TypeScript');
    expect(parsed.overallScore).toBeGreaterThanOrEqual(0);
    expect(parsed.overallScore).toBeLessThanOrEqual(100);
    expect(parsed.experience).toBeInstanceOf(Array);
    expect(parsed.experience[0].company).toBe('Vercel');
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
});
