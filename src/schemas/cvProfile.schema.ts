import { z } from "zod";

export const createOrUpdateCVProfileSchema = z.object({
  address: z.string().min(1, "Address is required").trim(),
  linkedIn: z.string().trim().optional(),
  github: z.string().trim().optional(),
  portfolio: z.string().trim().optional(),
  aboutMe: z.string().min(1, "About me is required").trim(),
});

export type CreateOrUpdateCVProfileInput = z.infer<typeof createOrUpdateCVProfileSchema>;

