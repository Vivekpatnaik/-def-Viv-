import { describe, it, expect } from 'vitest';
import { InterviewService } from '../services/interviewService';

describe('Adaptive Interview Engine', () => {
  it('should step up difficulty if candidate score >= 80%', () => {
    expect(InterviewService.calculateAdaptiveDifficulty('easy', 85)).toBe('medium');
    expect(InterviewService.calculateAdaptiveDifficulty('medium', 90)).toBe('hard');
    expect(InterviewService.calculateAdaptiveDifficulty('hard', 95)).toBe('hard'); // Cap at hard
  });

  it('should step down difficulty if candidate score < 50%', () => {
    expect(InterviewService.calculateAdaptiveDifficulty('hard', 40)).toBe('medium');
    expect(InterviewService.calculateAdaptiveDifficulty('medium', 35)).toBe('easy');
    expect(InterviewService.calculateAdaptiveDifficulty('easy', 20)).toBe('easy'); // Floor at easy
  });

  it('should maintain difficulty level for mid-range scoring outcomes', () => {
    expect(InterviewService.calculateAdaptiveDifficulty('medium', 70)).toBe('medium');
    expect(InterviewService.calculateAdaptiveDifficulty('hard', 65)).toBe('hard');
  });

  it('should generate accurate response evaluations with inline follow-up triggers', async () => {
    const questionText = 'What is the value of a REST API?';
    const responseText = 'We used a REST API to serialize data between local components.';

    const evaluation = await InterviewService.evaluateAnswer(questionText, responseText);

    expect(evaluation).toBeDefined();
    expect(evaluation.score).toBeGreaterThanOrEqual(0);
    expect(evaluation.score).toBeLessThanOrEqual(100);
    expect(evaluation.feedbackText).toBeDefined();
    expect(evaluation.suggestedFollowUpQuestion).toBe('How does REST statelessness affect session scalability?');
  });
});
