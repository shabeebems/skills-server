import { Schema, model, Document } from "mongoose";

export interface IOrganization extends Document {
  name: string;
  board: string;
  establishedYear: number;
  adminName: string;
  adminEmail: string;
  mobileNumber: string;
  alternateEmail?: string;
  address: string;
  country: string;
  state: string;
  district: string;
  pincode: string;
  totalStudents: number;
  totalTeachers: number;
  principalName: string;
  status: "pending" | "active" | "rejected" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

const organizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true },
    board: { type: String, required: true },
    establishedYear: { type: Number, required: true },
    adminName: { type: String, required: true },
    adminEmail: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true, unique: true },
    alternateEmail: { type: String },
    address: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    pincode: { type: String, required: true },
    totalStudents: { type: Number, required: true },
    totalTeachers: { type: Number, required: true },
    principalName: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "active", "rejected", "inactive"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true, collection: "organizations" }
);

export default model<IOrganization>("Organization", organizationSchema);
