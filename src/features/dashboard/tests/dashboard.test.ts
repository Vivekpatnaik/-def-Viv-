import { describe, it, expect } from 'vitest';
import { DashboardService } from '../services/dashboardService';

describe('Dashboard Service Engine', () => {
  it('should assemble dynamic daily coaching goals correctly', async () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';
    const result = await DashboardService.getDailyActionablePriorities(userId);

    expect(result).toBeDefined();
    expect(result.priorities).toBeInstanceOf(Array);
    expect(result.priorities).toHaveLength(3);
    expect(result.priorities[0].task).toBeDefined();
    expect(result.priorities[0].reason).toBeDefined();
    expect(result.priorities[0].estimatedMinutes).toBeGreaterThan(0);
  });

  it('should gracefully return default priorities on exception fallback', async () => {
    // Passing our trigger identifier to test robust error handling fallback
    const result = await DashboardService.getDailyActionablePriorities('trigger-fallback-id');

    expect(result).toBeDefined();
    expect(result.priorities).toHaveLength(3);
    expect(result.priorities[0].task).toBe('Quantify Achievements on your Resume');
  });
});
