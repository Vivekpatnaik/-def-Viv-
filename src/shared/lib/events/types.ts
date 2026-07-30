import { z } from 'zod';

export const EventSchema = z.object({
  id: z.string().uuid(),
  name: z.enum([
    'RESUME_UPLOADED',
    'ASSESSMENT_COMPLETED',
    'ROADMAP_GENERATED',
    'CODE_SUBMITTED',
    'INTERVIEW_COMPLETED',
    'APPLICATION_STATUS_CHANGED',
  ]),
  payload: z.record(z.string(), z.any()),
  metadata: z.object({
    userId: z.string().uuid(),
    timestamp: z.string().datetime(),
    correlationId: z.string().uuid(),
  }),
});

export type CareerOSEvent = z.infer<typeof EventSchema>;

export interface EventListener {
  onEvent(event: CareerOSEvent): Promise<void>;
}
