import { z } from 'zod';

export const createTopicSchema = z.object({
  name: z.string().min(1, "Topic name is required").trim(),
  description: z.string().optional(),
  subjectId: z.string().min(1, "Subject ID is required"),
  difficultyLevel: z.enum(["Easy", "Medium", "Hard"], {
    message: "Difficulty level must be Easy, Medium, or Hard"
  })
});

export type CreateTopicInput = z.infer<typeof createTopicSchema>;
