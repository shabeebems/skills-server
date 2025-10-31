import mongoose, { Schema, Document } from "mongoose";

export interface ITest extends Document {
  name: string;
  description: string;
  subjectId?: Schema.Types.ObjectId;
  topicId?: Schema.Types.ObjectId;
  jobId?: Schema.Types.ObjectId;
  difficultyLevel: "Easy" | "Medium" | "Hard";
  organizationId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TestSchema: Schema<ITest> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: false,
    },
    topicId: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: false,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: false,
    },
    difficultyLevel: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
  },
  { timestamps: true }
);

const TestModel = mongoose.model<ITest>("Test", TestSchema);
export default TestModel;
