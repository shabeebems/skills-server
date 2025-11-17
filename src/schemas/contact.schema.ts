import { z } from "zod";

export const createContactSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email address").trim(),
  mobile: z.string().min(1, "Mobile number is required").trim(),
  designation: z
    .enum(["mentor", "founder", "teacher", "ceo", "student", "other"])
    .optional(),
  organization: z.string().trim().optional(),
  linkedin: z.string().url("Invalid LinkedIn URL").optional(),
  note: z.string().trim().optional(),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;


export const addDesigContactSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z.string().email("Invalid email format").optional(),
  mobile: z.string().optional(),
  organization: z.string().optional(),
  linkedin: z.string().url("Invalid LinkedIn URL").optional(),
  note: z.string().optional(),
});

export type AddDesigContactInput = z.infer<typeof addDesigContactSchema>;
