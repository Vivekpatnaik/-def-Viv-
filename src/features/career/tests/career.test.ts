import { describe, it, expect } from 'vitest';
import { CareerService } from '../services/careerService';
import { CareerProfileInput } from '../schemas';

const mockProfile: CareerProfileInput = {
  currentEducation: 'Bachelors',
  collegeName: 'State University',
  degreeMajor: 'Computer Science',
  programmingLanguages: ['typescript', 'python'],
  frameworks: ['react', 'nextjs'],
  preferredLocation: 'Remote',
  expectedSalary: '$115,000 / year',
  availableStudyHoursWeekly: 20,
  preferredLearningStyle: 'hands-on',
};

describe('Career Planning & Skill Gap Engine', () => {
  it('should successfully compute technical skill gaps against target benchmarks', async () => {
    const gaps = await CareerService.analyzeSkillGaps(mockProfile, 'Senior Frontend Engineer');

    expect(gaps).toBeDefined();
    expect(gaps).toBeInstanceOf(Array);
    expect(gaps.length).toBeGreaterThan(0);
    expect(gaps[0].skillName).toBeDefined();
    expect(gaps[0].estimatedLearningHours).toBeGreaterThan(0);
  });

  it('should generate customizable roadmap timelines with verified documentation resources', async () => {
    const roadmap = await CareerService.generateAdaptiveRoadmap(mockProfile, 'Senior Frontend Engineer', 6);

    expect(roadmap).toBeDefined();
    expect(roadmap.durationMonths).toBe(6);
    expect(roadmap.milestones).toBeInstanceOf(Array);
    expect(roadmap.milestones[0].tasks[0].learningResourceUrl).toContain('https://');
  });

  it('should automatically trigger roadmap adaptation when performance setbacks are detected', async () => {
    const activeRoadmap = await CareerService.generateAdaptiveRoadmap(mockProfile, 'Senior Frontend Engineer', 6);

    // Simulate low mock interview performance (40%) to trigger automatic foundations injection
    const adapted = await CareerService.adaptRoadmapOnPerformanceChange(activeRoadmap, 40);

    expect(adapted).toBeDefined();
    expect(adapted.isAdaptedRecently).toBe(true);
    expect(adapted.milestones[0].milestoneTitle).toContain('(Adapted)');
    expect(adapted.milestones[0].tasks[0].taskTitle).toBe('Critical Foundational Architecture Review');
  });
});
