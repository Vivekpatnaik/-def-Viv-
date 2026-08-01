import { z } from 'zod';

export const UserTypeSchema = z.enum([
  'student',
  'professional',
  'mentor',
  'expert',
  'recruiter',
  'faculty',
]);

// 1. Skill Profile entry
export const ExchangeSkillEntrySchema = z.object({
  skillName: z.string(),
  proficiencyLevel: z.number().min(1).max(5),
  confidenceScore: z.number().min(0).max(100),
});

// 2. Peer Skill Exchange Profile
export const SkillExchangeProfileSchema = z.object({
  userId: z.string().uuid(),
  userName: z.string(),
  userType: UserTypeSchema,
  skillsKnown: z.array(ExchangeSkillEntrySchema),
  skillsWanted: z.array(ExchangeSkillEntrySchema),
  preferredLanguage: z.string(),
  timezone: z.string(),
  availabilityHoursWeekly: z.number(),
  communityReputationXP: z.number(),
});

// 3. Mentor Marketplace Profile (Corporate, Alumni, Experts)
export const MentorProfileSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  companyAffiliation: z.string(),
  roleTitle: z.string(),
  avatarUrl: z.string().optional(),
  mentorRating: z.number().min(0).max(5),
  isVerifiedExpert: z.boolean(),
  hourlyRateUSD: z.number(), // 0 represents Free / Community
  topicsCovered: z.array(z.string()),
  languagesSupported: z.array(z.string()),
});

// 4. Booking System Schemas
export const SessionBookingSchema = z.object({
  id: z.string().uuid(),
  mentorId: z.string().uuid(),
  mentorName: z.string(),
  dateTime: z.string(),
  sessionType: z.enum(['1-on-1', 'group', 'workshop', 'mock_interview', 'resume_review', 'portfolio_review']),
  status: z.enum(['scheduled', 'completed', 'cancelled']),
  meetingUrl: z.string().url(),
  notes: z.string().optional(),
  actionItems: z.array(z.string()).optional(),
});

// 5. Review & Mentor Reputation Schemas
export const RatingReviewSchema = z.object({
  id: z.string().uuid(),
  reviewerName: z.string(),
  knowledgeScore: z.number().min(1).max(5),
  communicationScore: z.number().min(1).max(5),
  helpfulnessScore: z.number().min(1).max(5),
  professionalismScore: z.number().min(1).max(5),
  punctualityScore: z.number().min(1).max(5),
  overallStars: z.number().min(1).max(5),
  feedbackText: z.string(),
  timestamp: z.string(),
});

// 6. Matching Results Schema
export const SkillExchangeMatchSchema = z.object({
  matchId: z.string().uuid(),
  peerUserId: z.string().uuid(),
  peerName: z.string(),
  matchConfidencePercent: z.number().min(0).max(100),
  skillOfferedToYou: z.string(),
  skillRequestedFromYou: z.string(),
  commonTimezone: z.string(),
  availableSlot: z.string(),
});

// 7. Exchange Analytics Dashboard Schema
export const ExchangeAnalyticsSchema = z.object({
  totalSessionsCompleted: z.number(),
  totalLearningHours: z.number(),
  totalTeachingHours: z.number(),
  currentReputationScore: z.number(),
  mentorTierLevel: z.number(),
  communityEngagementScorePercent: z.number().min(0).max(100),
  ratingEvolution: z.array(z.number()),
});

export type UserType = z.infer<typeof UserTypeSchema>;
export type ExchangeSkillEntry = z.infer<typeof ExchangeSkillEntrySchema>;
export type SkillExchangeProfile = z.infer<typeof SkillExchangeProfileSchema>;
export type MentorProfile = z.infer<typeof MentorProfileSchema>;
export type SessionBooking = z.infer<typeof SessionBookingSchema>;
export type RatingReview = z.infer<typeof RatingReviewSchema>;
export type SkillExchangeMatch = z.infer<typeof SkillExchangeMatchSchema>;
export type ExchangeAnalytics = z.infer<typeof ExchangeAnalyticsSchema>;
