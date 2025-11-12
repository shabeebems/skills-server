import mongoose, { Schema, Document } from "mongoose";

export interface IVideoScript extends Document {
  studentId: Schema.Types.ObjectId;
  jobId: Schema.Types.ObjectId;
  topicId: Schema.Types.ObjectId;
  skillPlannerId: Schema.Types.ObjectId;
  userIdea: string;
  selectedLength: string;
  createdAt: Date;
  updatedAt: Date;
}

const VideoScriptSchema: Schema<IVideoScript> = new Schema(
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
    userIdea: {
      type: String,
      required: true,
      trim: true,
    },
    selectedLength: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index for better query performance
VideoScriptSchema.index({ jobId: 1, topicId: 1 });
VideoScriptSchema.index({ studentId: 1, topicId: 1 });
VideoScriptSchema.index({ skillPlannerId: 1, topicId: 1 });

const VideoScriptModel = mongoose.model<IVideoScript>(
  "VideoScript",
  VideoScriptSchema
);

export default VideoScriptModel;

