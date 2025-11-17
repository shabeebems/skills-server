import mongoose, { Schema, Document } from "mongoose";

export interface ILinkedInPost extends Document {
  studentId: Schema.Types.ObjectId;
  jobId: Schema.Types.ObjectId;
  topicId: Schema.Types.ObjectId;
  skillPlannerId: Schema.Types.ObjectId;
  topic: string;
  postText: string;
  userTopic: string;
  userContext?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LinkedInPostSchema: Schema<ILinkedInPost> = new Schema(
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
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    postText: {
      type: String,
      required: true,
    },
    userTopic: {
      type: String,
      required: true,
      trim: true,
    },
    userContext: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index for better query performance
LinkedInPostSchema.index({ studentId: 1, topicId: 1 });
LinkedInPostSchema.index({ jobId: 1, topicId: 1 });
LinkedInPostSchema.index({ skillPlannerId: 1, topicId: 1 });

const LinkedInPostModel = mongoose.model<ILinkedInPost>(
  "LinkedInPost",
  LinkedInPostSchema
);

export default LinkedInPostModel;

