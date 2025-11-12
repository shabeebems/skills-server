import mongoose, { Schema, Document } from "mongoose";

export interface IKeyConcept {
  title: string;
  content: string;
}

export interface IReadingModule extends Document {
  jobId: Schema.Types.ObjectId;
  topicId: Schema.Types.ObjectId;
  skillName: string;
  jobContext: string;
  introduction: string;
  keyConcepts: IKeyConcept[];
  practicalExample: string;
  summary: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ReadingModuleSchema: Schema<IReadingModule> = new Schema(
  {
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
    skillName: {
      type: String,
      required: true,
      trim: true,
    },
    jobContext: {
      type: String,
      required: true,
      trim: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    keyConcepts: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    practicalExample: {
      type: String,
      required: true,
    },
    summary: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// Index for better query performance
ReadingModuleSchema.index({ jobId: 1, topicId: 1 });

const ReadingModuleModel = mongoose.model<IReadingModule>(
  "ReadingModule",
  ReadingModuleSchema
);

export default ReadingModuleModel;

