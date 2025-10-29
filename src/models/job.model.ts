import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  name: string;
  description?: string;
  companyName: string;
  departmentId: Schema.Types.ObjectId;
  role: string;
  place: string;
  salaryRange?: string;
  requirements?: string[];
  organizationId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema<IJob> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    companyName: { type: String, required: true, trim: true },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    role: { type: String, required: true, trim: true },
    place: { type: String, required: true, trim: true },
    salaryRange: { type: String, trim: true },
    requirements: [{ type: String, trim: true }],
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
  },
  { timestamps: true }
);

const JobModel = mongoose.model<IJob>("Job", JobSchema);
export default JobModel;
