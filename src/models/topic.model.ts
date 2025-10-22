import mongoose, { Schema, Document } from "mongoose";

export interface ITopic extends Document {
  name: string;
  description?: string;
  subjectId: Schema.Types.ObjectId;
  difficultyLevel: "Easy" | "Medium" | "Hard";
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema: Schema<ITopic> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    difficultyLevel: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
  },
  { timestamps: true }
);

const TopicModel = mongoose.model<ITopic>("Topic", TopicSchema);
export default TopicModel;
