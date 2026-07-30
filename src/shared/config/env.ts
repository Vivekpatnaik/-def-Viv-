import { z } from 'zod';

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().default('https://placeholder-project.supabase.co'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).default('placeholder-anon-key'),
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  POSTHOG_KEY: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;

/**
 * Validates and exports the environmental variables.
 * Gracefully defaults to safe variables in development to preserve outstanding Developer Experience (DX).
 */
export const validateEnv = (): Env => {
  const runtimeEnv = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
    POSTHOG_KEY: process.env.POSTHOG_KEY,
  };

  const parsed = EnvSchema.safeParse(runtimeEnv);

  if (!parsed.success) {
    console.error('❌ Invalid environment configuration:', parsed.error.format());
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Missing critical environment variables in production.');
    }
  }

  return parsed.success ? parsed.data : EnvSchema.parse({});
};

export const env = validateEnv();
