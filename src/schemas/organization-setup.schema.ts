import { z } from "zod";

// Department schema
export const departmentSchema = z.object({
  name: z.string().min(2, "Department name is required"),
  description: z.string().optional(),
  organizationId: z.string().min(24, "Organization ID must be a valid ObjectId"),
});

export const departmentUpdateSchema = z.object({
  name: z.string().min(2, "Department name is required").optional(),
  description: z.string().optional()
});

export type DepartmentInput = z.infer<typeof departmentSchema>;
export type DepartmentUpdateInput = z.infer<typeof departmentUpdateSchema>;


// Class schema
export const classSchema = z.object({
  name: z.string().min(2, "Class name is required"),
  description: z.string().optional(),
  organizationId: z.string().min(24, "Organization ID must be a valid ObjectId"),
});

export const classUpdateSchema = z.object({
  name: z.string().min(2, "Class name is required").optional(),
  description: z.string().optional()
});

export type ClassInput = z.infer<typeof classSchema>;
export type ClassUpdateInput = z.infer<typeof classUpdateSchema>;


// Section schema
export const sectionSchema = z.object({
  name: z.string().min(2, "Section name is required"),
  description: z.string().optional(),
  organizationId: z.string().min(24, "Organization ID must be a valid ObjectId")
});

export const sectionUpdateSchema = z.object({
  name: z.string().min(2, "Section name is required").optional(),
  description: z.string().optional()
});

export type SectionInput = z.infer<typeof sectionSchema>;
export type SectionUpdateInput = z.infer<typeof sectionUpdateSchema>;


// Subject schema
export const subjectSchema = z.object({
  name: z.string().min(2, "Subject name is required"),
  description: z.string().optional(),
  code: z.string().optional(),
  credits: z.string().optional(),
  type: z.string().min(1, "Subject type is required"),
  organizationId: z.string().min(24, "Organization ID must be a valid ObjectId")
});

export const subjectUpdateSchema = z.object({
  name: z.string().min(2, "Subject name is required").optional(),
  description: z.string().optional(),
  code: z.string().optional(),
  credits: z.union([z.string(), z.number()]).optional(),
  type: z.string().min(1, "Subject type is required").optional()
});

export type SubjectInput = z.infer<typeof subjectSchema>;
export type SubjectUpdateInput = z.infer<typeof subjectUpdateSchema>;


// Assignment schema
export const assignmentSchema = z.object({
  sectionIds: z.array(
    z.string().min(24, "Section ID must be a valid ObjectId")
  ).nonempty("At least one section is required"),
  classId: z.string().min(24, "Class ID must be a valid ObjectId"),
  departmentId: z.string().min(24, "Department ID must be a valid ObjectId"),
  organizationId: z.string().min(24, "Organization ID must be a valid ObjectId")
});

export const assignmentUpdateSchema = z.object({
  sectionId: z.string().min(24, "Section ID must be a valid ObjectId").optional(),
  classId: z.string().min(24, "Class ID must be a valid ObjectId").optional(),
  departmentId: z.string().min(24, "Department ID must be a valid ObjectId").optional(),
});


export type AssignmentInput = z.infer<typeof assignmentSchema>;
export type AssignmentUpdateInput = z.infer<typeof assignmentUpdateSchema>;