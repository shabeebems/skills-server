import { z } from "zod";

// Department schema
export const departmentSchema = z.object({
  name: z.string().min(2, "Department name is required"),
  description: z.string().optional(),
  organizationId: z
    .string()
    .min(24, "Organization ID must be a valid ObjectId"),
});

export type DepartmentInput = z.infer<typeof departmentSchema>;

// Class schema
export const classSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  description: z.string().optional(),
  organizationId: z
    .string()
    .min(24, "Organization ID must be a valid ObjectId"),
});

export type ClassInput = z.infer<typeof classSchema>;

// Section schema
export const sectionSchema = z.object({
  name: z.string().min(1, "Section name is required"),
  description: z.string().optional(),
  organizationId: z
    .string()
    .min(24, "Organization ID must be a valid ObjectId"),
});

export type SectionInput = z.infer<typeof sectionSchema>;

// Subject schema
export const subjectSchema = z.object({
  name: z.string().min(2, "Subject name is required"),
  code: z.string().min(2, "Subject code is required"),
  description: z.string().optional(),
  organizationId: z
    .string()
    .min(24, "Organization ID must be a valid ObjectId"),
  departmentId: z.string().min(24, "Department ID must be a valid ObjectId"),
});

export type SubjectInput = z.infer<typeof subjectSchema>;

// Assignment schema
export const assignmentSchema = z.object({
  sectionIds: z
    .array(z.string().min(24, "Section ID must be a valid ObjectId"))
    .nonempty("At least one section is required"),
  classId: z.string().min(24, "Class ID must be a valid ObjectId"),
  departmentId: z.string().min(24, "Department ID must be a valid ObjectId"),
  organizationId: z
    .string()
    .min(24, "Organization ID must be a valid ObjectId"),
});

export type AssignmentInput = z.infer<typeof assignmentSchema>;
