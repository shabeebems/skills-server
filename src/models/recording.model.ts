import mongoose, { Schema, Document } from "mongoose";

export interface IRecording extends Document {
  name: string;
  link: string;
  description?: string;
  duration: string;
  subId: Schema.Types.ObjectId;
  topicId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RecordingSchema: Schema<IRecording> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    duration: { type: String, required: true, trim: true },
    subId: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    topicId: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
  },
  { timestamps: true }
);

const RecordingModel = mongoose.model<IRecording>("Recording", RecordingSchema);
export default RecordingModel;
