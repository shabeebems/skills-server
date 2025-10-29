import { z } from 'zod';

export const createTopicSchema = z.object({
  name: z.string().min(1, "Topic name is required").trim(),
  description: z.string().optional(),
  difficultyLevel: z.enum(["Easy", "Medium", "Hard"], {
    message: "Difficulty level must be Easy, Medium, or Hard"
  }),
  organizationId: z.string().min(1, "Organization ID is required"),
  departmentId: z.string().optional(),
  subjectId: z.string().optional(),
  jobId: z.string().optional()
});

export type CreateTopicInput = z.infer<typeof createTopicSchema>;
