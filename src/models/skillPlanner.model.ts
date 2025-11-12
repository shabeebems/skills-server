import mongoose, { Schema, Document } from "mongoose";

export interface ISkillPlanner extends Document {
  studentId: Schema.Types.ObjectId;
  jobId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SkillPlannerSchema: Schema<ISkillPlanner> = new Schema(
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
  },
  { timestamps: true }
);

// Index for better query performance
SkillPlannerSchema.index({ studentId: 1, jobId: 1 });

const SkillPlannerModel = mongoose.model<ISkillPlanner>(
  "SkillPlanner",
  SkillPlannerSchema
);

export default SkillPlannerModel;

