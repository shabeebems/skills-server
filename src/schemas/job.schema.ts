import { z } from 'zod';

export const createJobSchema = z.object({
  name: z.string().min(1, "Job name is required").trim(),
  description: z.string().optional(),
  subjectIds: z.array(z.string().min(1, "Subject ID is required")).min(1, "At least one subject ID is required"),
  organizationId: z.string().min(1, "Organization ID is required")
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
