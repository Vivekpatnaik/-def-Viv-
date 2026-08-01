import { describe, it, expect } from 'vitest';
import { CoachService } from '../services/coachService';
import { CoachMessage } from '../schemas';

describe('AI Career Coach Service', () => {
  const mockMemory = {
    userGoal: 'Become a Senior Frontend Engineer at Vercel within 6 Months',
    completedTasksCount: 42,
    activeStreakDays: 14,
    weakTopics: ['Webpack bundling, Web performance, GIN indexing'],
  };

  it('should successfully engage in stateful dialogue, outputting conversational text with rich strategic blocks', async () => {
    const chatHistory: CoachMessage[] = [];
    const userText = 'I am struggling with Webpack bundling optimizations. How do I proceed?';
    const response = await CoachService.sendMessageToCoach(chatHistory, userText, mockMemory);

    expect(response).toBeDefined();
    expect(response.role).toBe('assistant');
    expect(response.content).toBeTypeOf('string');

    // Verify Strategy Block details
    expect(response.strategyDetails).toBeDefined();
    expect(response.strategyDetails?.why).toBeTypeOf('string');
    expect(response.strategyDetails?.what).toBeTypeOf('string');
    expect(response.strategyDetails?.how).toBeTypeOf('string');
    expect(response.strategyDetails?.expectedOutcome).toBeTypeOf('string');
    expect(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']).toContain(response.strategyDetails?.priority);
  });

  it('should generate dynamic, prioritized Today, Weekly, and Monthly goal checklists', async () => {
    const goals = await CoachService.generateGoals(mockMemory);

    expect(goals).toBeDefined();
    expect(goals).toBeInstanceOf(Array);
    expect(goals.length).toBeGreaterThan(0);
    expect(goals[0].title).toBeTypeOf('string');
    expect(['today', 'weekly', 'monthly', 'quarterly']).toContain(goals[0].timeframe);
    expect(goals[0].completed).toBeTypeOf('boolean');
  });

  it('should compute consistency, completed achievements, and practice hours', async () => {
    const metrics = await CoachService.getAccountabilityMetrics(mockMemory);

    expect(metrics).toBeDefined();
    expect(metrics.activeStreakDays).toBeGreaterThanOrEqual(0);
    expect(metrics.learningConsistencyPercent).toBeGreaterThanOrEqual(0);
    expect(metrics.learningConsistencyPercent).toBeLessThanOrEqual(100);
    expect(metrics.completedTasksCount).toBeGreaterThanOrEqual(0);
  });

  it('should formulate focused career path strategies and prioritized learning tasks', async () => {
    const strategy = await CoachService.getCareerStrategy(mockMemory);

    expect(strategy).toBeDefined();
    expect(strategy.focusArea).toBeTypeOf('string');
    expect(strategy.currentReadinessIndex).toBeGreaterThanOrEqual(0);
    expect(strategy.currentReadinessIndex).toBeLessThanOrEqual(100);
    expect(strategy.nextStrategicStep).toBeTypeOf('string');
    expect(strategy.prioritizedRecommendations).toBeInstanceOf(Array);
  });
});
