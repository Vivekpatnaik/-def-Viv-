import { describe, it, expect } from 'vitest';
import { TwinService } from '../services/twinService';
import { TwinVersionRecord } from '../schemas';

describe('Career Digital Twin Engine Service', () => {
  it('should successfully initialize and retrieve Career Digital Twin representation matching the schema', async () => {
    const twin = await TwinService.getCareerDigitalTwin('test-user-id');

    expect(twin).toBeDefined();
    expect(twin.id).toBeTypeOf('string');
    expect(twin.versionNumber).toBeGreaterThanOrEqual(1);
    expect(twin.readinessIndex).toBeGreaterThanOrEqual(0);
    expect(twin.interviewIndex).toBeGreaterThanOrEqual(0);

    // Verify sub-profiles
    expect(twin.skills).toBeInstanceOf(Array);
    expect(twin.learningProfile).toBeDefined();
    expect(twin.learningProfile.completionRatePercent).toBeGreaterThanOrEqual(0);
    expect(twin.interviewProfile).toBeDefined();
    expect(twin.interviewProfile.communicationScore).toBeGreaterThanOrEqual(0);
    expect(twin.projects).toBeInstanceOf(Array);
    expect(twin.timeline).toBeInstanceOf(Array);
  });

  it('should successfully evolve twin skills, indices, and timeline nodes on activity completed', async () => {
    const initialTwin = await TwinService.getCareerDigitalTwin('test-user-id');
    const outcome = { score: 92, verifiedBadge: 'Webpack performance' };
    const evolved = await TwinService.evolveTwinOnActivity(
      initialTwin,
      'learning',
      outcome,
      'Completed Webpack performance dynamic import study module.'
    );

    expect(evolved).toBeDefined();
    expect(evolved.versionNumber).toBe(initialTwin.versionNumber + 1);
    expect(evolved.timeline.length).toBeGreaterThan(initialTwin.timeline.length);
    expect(evolved.timeline[0].category).toBe('learning');
    expect(evolved.explanationOfLastUpdate).toBe('Completed Webpack performance dynamic import study module.');
  });

  it('should successfully support rolling back to target historical version snapshot logs', async () => {
    const initialTwin = await TwinService.getCareerDigitalTwin('test-user-id');
    initialTwin.versionNumber = 1; // Align mock with target expectation

    const snapshots: TwinVersionRecord[] = [
      {
        versionNumber: 1,
        timestamp: '10:00 AM',
        explanation: 'Baseline assessment completed.',
        twinData: initialTwin,
      },
    ];

    const rolledTwin = TwinService.rollbackTwinToVersion(snapshots, 1);

    expect(rolledTwin).toBeDefined();
    expect(rolledTwin.versionNumber).toBe(1);
    expect(rolledTwin.id).toBe(initialTwin.id);
  });
});
