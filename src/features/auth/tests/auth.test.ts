import { describe, it, expect } from 'vitest';
import { SignupSchema, LoginSchema } from '../schemas';

describe('Authentication Validation Schemas', () => {
  it('should successfully validate standard registration payloads', () => {
    const validPayload = {
      fullName: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      password: 'SecurePassword123',
      country: 'US',
      roleType: 'student',
      acceptTerms: true,
    };

    const parsed = SignupSchema.safeParse(validPayload);
    expect(parsed.success).toBe(true);
  });

  it('should reject registrations with weak passwords or unaccepted terms', () => {
    const weakPayload = {
      fullName: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      password: 'weak', // too short, no upper, no number
      country: 'US',
      roleType: 'student',
      acceptTerms: false,
    };

    const parsed = SignupSchema.safeParse(weakPayload);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      const errorMap = parsed.error.flatten().fieldErrors;
      expect(errorMap.password).toBeDefined();
      expect(errorMap.acceptTerms).toBeDefined();
    }
  });

  it('should validate standard logins', () => {
    const validLogin = {
      email: 'alex.rivera@example.com',
      password: 'SecurePassword123',
    };

    const parsed = LoginSchema.safeParse(validLogin);
    expect(parsed.success).toBe(true);
  });
});
