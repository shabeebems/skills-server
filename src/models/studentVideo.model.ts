import mongoose, { Schema, Document } from "mongoose";

export interface IStudentVideo extends Document {
  studentId: Schema.Types.ObjectId;
  jobId: Schema.Types.ObjectId;
  topicId: Schema.Types.ObjectId;
  skillPlannerId: Schema.Types.ObjectId;
  title: string;
  link: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentVideoSchema: Schema<IStudentVideo> = new Schema(
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
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index for better query performance
StudentVideoSchema.index({ studentId: 1, topicId: 1 });
StudentVideoSchema.index({ jobId: 1, topicId: 1 });
StudentVideoSchema.index({ skillPlannerId: 1, topicId: 1 });

const StudentVideoModel = mongoose.model<IStudentVideo>(
  "StudentVideo",
  StudentVideoSchema
);

export default StudentVideoModel;

