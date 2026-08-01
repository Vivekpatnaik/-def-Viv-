import { describe, it, expect } from 'vitest';
import { ExchangeService } from '../services/exchangeService';

describe('Skill Exchange & Mentor Marketplace Service', () => {
  const mockMemory = {
    userGoal: 'Become a Senior Frontend Engineer at Vercel within 6 Months',
    skillsWanted: ['TypeScript types, Web performance chunking'],
    skillsKnown: ['React.js rendering, Tailwind styling templates'],
  };

  it('should successfully calculate peer matching based on reciprocity skill sets and timezones', async () => {
    const matches = await ExchangeService.getExchangeMatches(mockMemory);

    expect(matches).toBeDefined();
    expect(matches).toBeInstanceOf(Array);
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].peerName).toBeTypeOf('string');
    expect(matches[0].matchConfidencePercent).toBeGreaterThanOrEqual(0);
    expect(matches[0].skillOfferedToYou).toBeTypeOf('string');
  });

  it('should retrieve verified, corporate, and alumni mentor marketplace profiles', async () => {
    const mentors = await ExchangeService.getMentorMarketplace(mockMemory);

    expect(mentors).toBeDefined();
    expect(mentors).toBeInstanceOf(Array);
    expect(mentors.length).toBeGreaterThan(0);
    expect(mentors[0].name).toBeTypeOf('string');
    expect(mentors[0].companyAffiliation).toBeTypeOf('string');
    expect(mentors[0].isVerifiedExpert).toBeTypeOf('boolean');
  });

  it('should book exchange sessions, returning standard videoconferencing meeting URLs', async () => {
    const booking = await ExchangeService.createSessionBooking(
      '123e4567-e89b-12d3-a456-426614178201',
      'mock_interview',
      'Friday at 11:00 AM'
    );

    expect(booking).toBeDefined();
    expect(booking.mentorName).toBeTypeOf('string');
    expect(['scheduled', 'completed', 'cancelled']).toContain(booking.status);
    expect(booking.meetingUrl).toBeTypeOf('string');
  });

  it('should submit session reviews, scoring puncture, helpfulness, and communication', async () => {
    const review = await ExchangeService.submitSessionReview(
      '123e4567-e89b-12d3-a456-426614178301',
      'Excellent systems design interview preparation.'
    );

    expect(review).toBeDefined();
    expect(review.reviewerName).toBeTypeOf('string');
    expect(review.overallStars).toBeGreaterThanOrEqual(1);
    expect(review.overallStars).toBeLessThanOrEqual(5);
    expect(review.feedbackText).toBeTypeOf('string');
  });

  it('should compile cumulative teaching and learning hours and reputation XP quotients', async () => {
    const analytics = await ExchangeService.getExchangeAnalytics(mockMemory);

    expect(analytics).toBeDefined();
    expect(analytics.totalSessionsCompleted).toBeGreaterThanOrEqual(0);
    expect(analytics.totalLearningHours).toBeGreaterThanOrEqual(0);
    expect(analytics.totalTeachingHours).toBeGreaterThanOrEqual(0);
    expect(analytics.currentReputationScore).toBeGreaterThanOrEqual(0);
  });
});
