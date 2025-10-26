import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  name: string;
  description?: string;
  subjectIds: Schema.Types.ObjectId[];
  organizationId: Schema.Types.ObjectId; // Added field
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema<IJob> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    subjectIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
      },
    ],
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
