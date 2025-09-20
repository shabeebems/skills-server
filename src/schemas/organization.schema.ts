import { z } from "zod";

export const organizationSchema = z.object({
  name: z.string().min(2, "Organization name is required"),
  board: z.string().min(2, "Board is required"),
  establishedYear: z
    .number()
    .min(1800, "Established year seems invalid")
    .max(new Date().getFullYear(), "Established year cannot be in the future"),
  adminName: z.string().min(2, "Admin name is required"),
  adminEmail: z.string().email("Invalid admin email"),
  mobileNumber: z.string().min(10, "Mobile number is required"),
  alternateEmail: z.string().email("Invalid alternate email").optional(),
  address: z.string().min(2, "Address is required"),
  country: z.string().min(2, "Country is required"),
  state: z.string().min(2, "State is required"),
  district: z.string().min(2, "District is required"),
  pincode: z.string().min(2, "Pincode is required"),
  status: z.string().optional(),
});

export type OrganizationInput = z.infer<typeof organizationSchema>;
