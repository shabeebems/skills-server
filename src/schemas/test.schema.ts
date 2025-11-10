import { z } from "zod";

const questionInputSchema = z.object({
  questionText: z.string().min(1, "Question text is required").trim(),
  options: z
    .array(z.string().min(1).trim())
    .min(2, "At least two options are required"),
  topicId: z.string().min(1, "Topic ID is required").trim(),
  difficultyLevel: z
    .enum(["Easy", "Medium", "Hard"]) // optional, will default to test difficulty if omitted
    .optional(),
  correctAnswer: z.string().min(1, "Correct answer is required").trim(),
});

export const createTestSchema = z
  .object({
    name: z.string().min(1, "Test name is required").trim(),
    description: z.string().min(1, "Description is required").trim(),
    subjectId: z.string().min(1).trim().optional(),
    topicId: z.string().min(1).trim().optional(),
    jobId: z.string().min(1).trim().optional(),
    difficultyLevel: z.enum(["Easy", "Medium", "Hard"]),
    organizationId: z.string().min(1, "Organization ID is required").trim(),
    questionCount: z.number().int().min(0).optional(),
    questions: z
      .array(questionInputSchema)
      .min(1, "At least one question is required"),
  })
  .superRefine((val, ctx) => {
    // Ensure each question's correctAnswer exists in its options
    val.questions.forEach((q, idx) => {
      if (!q.options.includes(q.correctAnswer)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["questions", idx, "correctAnswer"],
          message: "Correct answer must be one of the provided options",
        });
      }
    });
  });

export type CreateTestInput = z.infer<typeof createTestSchema>;


