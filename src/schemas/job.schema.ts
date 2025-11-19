import { z } from "zod";

export const createJobSchema = z.object({
  name: z.string().min(1, "Job name is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
  companyName: z.string().min(1, "Company name is required").trim(),
  departmentId: z.string().min(1, "Department ID is required").trim(),
  place: z.string().min(1, "Place is required").trim(),
  salaryRange: z.string().trim().optional(),
  requirements: z.array(z.string().trim()).optional(),
  organizationId: z.string().min(1, "Organization ID is required").trim(),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
