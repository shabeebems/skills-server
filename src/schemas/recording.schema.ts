import { z } from "zod";

export const createRecordingSchema = z.object({
  name: z.string().min(1, "Recording name is required").trim(),
  link: z.string().min(1, "Recording link is required").trim().url("Invalid URL format"),
  description: z.string().optional(),
  duration: z.string().min(1, "Duration is required").trim(),
  topicId: z.string().min(1, "Topic ID is required").trim(),
  subjectId: z.string().min(1, "Subject ID is required").trim(),
});

export type CreateRecordingInput = z.infer<typeof createRecordingSchema>;

