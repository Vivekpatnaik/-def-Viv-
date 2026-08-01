import { describe, it, expect } from 'vitest';
import { LearningService } from '../services/learningService';

describe('Learning Orchestrator & Prep Operating System Service', () => {
  const mockMemory = {
    userGoal: 'Become a Senior Frontend Engineer at Vercel within 6 Months',
    weakTopics: ['Webpack bundling, SQL indices, GIN constraints'],
  };

  it('should generate curated Daily, Weekly, and Monthly personalized study plans', async () => {
    const plan = await LearningService.generateLearningPlan(mockMemory);

    expect(plan).toBeDefined();
    expect(plan.dailyTasks).toBeInstanceOf(Array);
    expect(plan.dailyTasks.length).toBeGreaterThan(0);
    expect(plan.dailyTasks[0].title).toBeTypeOf('string');
    expect(plan.dailyTasks[0].officialResourceUrl).toBeTypeOf('string');
    expect(plan.dailyTasks[0].officialResourceTitle).toBeTypeOf('string');
    expect(plan.weeklyTheme).toBeTypeOf('string');
    expect(plan.weeklyStudyHoursGoal).toBeGreaterThan(0);
  });

  it('should fetch targeted preparation OS modules mapped to categories', async () => {
    const modules = await LearningService.getPrepModules(mockMemory);

    expect(modules).toBeDefined();
    expect(modules).toBeInstanceOf(Array);
    expect(modules.length).toBeGreaterThan(0);
    expect(['technical', 'aptitude', 'verbal', 'logical', 'case_study', 'presentation']).toContain(modules[0].category);
    expect(modules[0].topicsList).toBeInstanceOf(Array);
    expect(modules[0].completionPercentage).toBeGreaterThanOrEqual(0);
  });

  it('should compile smart revision cards, weak topics indicators, and prioritized topics', async () => {
    const revisions = await LearningService.generateRevisionPlan(mockMemory);

    expect(revisions).toBeDefined();
    expect(revisions).toBeInstanceOf(Array);
    expect(revisions.length).toBeGreaterThan(0);
    expect(revisions[0].conceptTitle).toBeTypeOf('string');
    expect(revisions[0].quickNotes).toBeTypeOf('string');
    expect(revisions[0].isWeakTopic).toBeTypeOf('boolean');
  });

  it('should formulate scenarios, coding problems, and assignments questions', async () => {
    const questions = await LearningService.generatePracticeQuestions(mockMemory);

    expect(questions).toBeDefined();
    expect(questions).toBeInstanceOf(Array);
    expect(questions.length).toBeGreaterThan(0);
    expect(questions[0].title).toBeTypeOf('string');
    expect(['coding', 'scenario', 'verbal_exercise', 'case_question']).toContain(questions[0].type);
    expect(questions[0].description).toBeTypeOf('string');
  });

  it('should recommend scalable mini, medium, and portfolio scale development projects', async () => {
    const projects = await LearningService.getProjectRecommendations(mockMemory);

    expect(projects).toBeDefined();
    expect(projects).toBeInstanceOf(Array);
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].title).toBeTypeOf('string');
    expect(['mini', 'medium', 'large', 'portfolio']).toContain(projects[0].scale);
    expect(projects[0].architectureBlueprint).toBeTypeOf('string');
  });

  it('should compute topic mastery quotients and curriculum consistency streak logs', async () => {
    const analytics = await LearningService.getLearningAnalytics(mockMemory);

    expect(analytics).toBeDefined();
    expect(analytics.totalLearningHours).toBeGreaterThanOrEqual(0);
    expect(analytics.completionRatePercent).toBeGreaterThanOrEqual(0);
    expect(analytics.topicMasteryDistribution).toBeInstanceOf(Array);
  });
});
