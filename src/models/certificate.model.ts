import mongoose, { Schema, Document } from "mongoose";

export interface ICertificate extends Document {
  studentId: Schema.Types.ObjectId;
  jobId: Schema.Types.ObjectId;
  topicId: Schema.Types.ObjectId;
  skillPlannerId: Schema.Types.ObjectId;
  title: string;
  link: string;
  storageProvider: "google drive" | "dropbox";
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema: Schema<ICertificate> = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    topicId: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    skillPlannerId: {
      type: Schema.Types.ObjectId,
      ref: "SkillPlanner",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    storageProvider: {
      type: String,
      enum: ["google drive", "dropbox"],
      required: true,
    },
  },
  { timestamps: true }
);

// Index for better query performance
CertificateSchema.index({ studentId: 1, topicId: 1 });
CertificateSchema.index({ jobId: 1, topicId: 1 });
CertificateSchema.index({ skillPlannerId: 1, topicId: 1 });

const CertificateModel = mongoose.model<ICertificate>(
  "Certificate",
  CertificateSchema
);

export default CertificateModel;