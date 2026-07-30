import { z } from 'zod';

export const UserRoleSchema = z.enum(['student', 'professional', 'college_admin', 'recruiter', 'super_admin']);

export const ProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().min(1),
  role: UserRoleSchema,
  avatarUrl: z.string().url().nullable().optional(),
  targetJobTitle: z.string().nullable().optional(),
  targetIndustry: z.string().nullable().optional(),
  experienceYears: z.number().min(0).default(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const UserSkillSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  skillId: z.string().uuid(),
  skillName: z.string().min(1),
  category: z.string().min(1),
  proficiencyLevel: z.number().min(1).max(5),
  verified: z.boolean().default(false),
  lastTestedAt: z.string().datetime().nullable().optional(),
});

export const PlacementReadinessSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  overallReadinessIndex: z.number().min(0).max(100),
  resumeScore: z.number().min(0).max(100),
  codingScore: z.number().min(0).max(100),
  interviewScore: z.number().min(0).max(100),
  assessmentScore: z.number().min(0).max(100),
  skillsPercentile: z.number().min(0).max(100),
  updatedAt: z.string().datetime(),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type UserSkill = z.infer<typeof UserSkillSchema>;
export type PlacementReadiness = z.infer<typeof PlacementReadinessSchema>;
